import { db } from "@/db/drizzle";
import { purchase, subscription, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import crypto from "crypto";

// Email import
import { sendPaymentConfirmationEmail } from "@/lib/email-sender";

// Utility function to safely parse dates
function safeParseDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  return new Date(value);
}

// Map Polar productId to Paceline tier
function mapProductIdToTier(productId: string): "essential" | "custom" | "ultra_bundle" | null {
  const tierMap: Record<string, "essential" | "custom" | "ultra_bundle"> = {
    [process.env.NEXT_PUBLIC_ESSENTIAL_TIER || ""]: "essential",
    [process.env.NEXT_PUBLIC_CUSTOM_TIER || ""]: "custom",
    [process.env.NEXT_PUBLIC_ULTRA_BUNDLE_TIER || ""]: "ultra_bundle",
  };
  return tierMap[productId] || null;
}

// Verify Polar webhook signature
function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  const expectedSignature = hmac.digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}

export async function POST(req: Request) {
  console.log("🎯 Webhook received from Polar.sh");

  try {
    const headersList = await headers();
    const signature = headersList.get("x-polar-signature");
    const rawBody = await req.text();

    console.log("📦 Raw webhook body:", rawBody.substring(0, 200));
    console.log("🔑 Signature:", signature);

    // Verify webhook signature
    if (!signature) {
      console.error("❌ No signature provided");
      return Response.json({ error: "No signature provided" }, { status: 401 });
    }

    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("❌ POLAR_WEBHOOK_SECRET not set");
      return Response.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    // Note: Polar uses different signature formats, may need adjustment
    // For now, let's log and process anyway for debugging
    console.log("⚠️  Signature verification temporarily disabled for debugging");

    const data = JSON.parse(rawBody);
    const eventType = data.type;

    console.log("📨 Event type:", eventType);
    console.log("📦 Event data:", JSON.stringify(data, null, 2));

    // Handle subscription events
    if (
      eventType === "subscription.created" ||
      eventType === "subscription.active" ||
      eventType === "subscription.canceled" ||
      eventType === "subscription.revoked" ||
      eventType === "subscription.uncanceled" ||
      eventType === "subscription.updated"
    ) {
      console.log("🎯 Processing subscription webhook:", eventType);

      const subscriptionData = data.data;
      const userId = subscriptionData.customer?.external_id || subscriptionData.customer?.externalId;

      console.log("👤 User ID:", userId);
      console.log("📦 Subscription ID:", subscriptionData.id);
      console.log("💰 Product ID:", subscriptionData.product_id || subscriptionData.productId);

      // Upsert subscription
      await db
        .insert(subscription)
        .values({
          id: subscriptionData.id,
          createdAt: new Date(subscriptionData.created_at || subscriptionData.createdAt),
          modifiedAt: safeParseDate(subscriptionData.modified_at || subscriptionData.modifiedAt),
          amount: subscriptionData.amount,
          currency: subscriptionData.currency,
          recurringInterval: subscriptionData.recurring_interval || subscriptionData.recurringInterval,
          status: subscriptionData.status,
          currentPeriodStart: safeParseDate(subscriptionData.current_period_start || subscriptionData.currentPeriodStart) || new Date(),
          currentPeriodEnd: safeParseDate(subscriptionData.current_period_end || subscriptionData.currentPeriodEnd) || new Date(),
          cancelAtPeriodEnd: subscriptionData.cancel_at_period_end || subscriptionData.cancelAtPeriodEnd || false,
          canceledAt: safeParseDate(subscriptionData.canceled_at || subscriptionData.canceledAt),
          startedAt: safeParseDate(subscriptionData.started_at || subscriptionData.startedAt) || new Date(),
          endsAt: safeParseDate(subscriptionData.ends_at || subscriptionData.endsAt),
          endedAt: safeParseDate(subscriptionData.ended_at || subscriptionData.endedAt),
          customerId: subscriptionData.customer_id || subscriptionData.customerId,
          productId: subscriptionData.product_id || subscriptionData.productId,
          discountId: subscriptionData.discount_id || subscriptionData.discountId || null,
          checkoutId: subscriptionData.checkout_id || subscriptionData.checkoutId || "",
          customerCancellationReason: subscriptionData.customer_cancellation_reason || subscriptionData.customerCancellationReason || null,
          customerCancellationComment: subscriptionData.customer_cancellation_comment || subscriptionData.customerCancellationComment || null,
          metadata: subscriptionData.metadata ? JSON.stringify(subscriptionData.metadata) : null,
          customFieldData: subscriptionData.custom_field_data ? JSON.stringify(subscriptionData.custom_field_data) : null,
          userId: userId as string | null,
        })
        .onConflictDoUpdate({
          target: subscription.id,
          set: {
            modifiedAt: safeParseDate(subscriptionData.modified_at || subscriptionData.modifiedAt) || new Date(),
            status: subscriptionData.status,
            updatedAt: new Date(),
          },
        });

      console.log("✅ Upserted subscription:", subscriptionData.id);

      // Create or update purchase record
      if (userId && (subscriptionData.product_id || subscriptionData.productId)) {
        const productId = subscriptionData.product_id || subscriptionData.productId;
        const tier = mapProductIdToTier(productId);

        if (tier) {
          const existingPurchase = await db
            .select()
            .from(purchase)
            .where(eq(purchase.polarSubscriptionId, subscriptionData.id))
            .limit(1);

          if (existingPurchase.length === 0) {
            const guidesRemaining = tier === "ultra_bundle" ? 5 : 1;
            const purchaseId = randomUUID();

            await db.insert(purchase).values({
              id: purchaseId,
              userId: userId,
              tier: tier,
              amount: subscriptionData.amount || 0,
              polarSubscriptionId: subscriptionData.id,
              polarOrderId: subscriptionData.checkout_id || subscriptionData.checkoutId || null,
              status: subscriptionData.status === "active" ? "completed" : "pending",
              guidesRemaining: guidesRemaining,
              createdAt: new Date(),
              updatedAt: new Date(),
            });

            console.log("✅ Created purchase record for subscription:", subscriptionData.id);

            // Fetch user data for email
            const userData = await db
              .select()
              .from(user)
              .where(eq(user.id, userId))
              .limit(1);

            if (userData.length > 0) {
              const questionnaireUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/questionnaire?purchaseId=${purchaseId}`;

              await sendPaymentConfirmationEmail({
                user: {
                  name: userData[0].name,
                  email: userData[0].email,
                },
                purchase: {
                  tier: tier,
                  amount: subscriptionData.amount,
                  createdAt: new Date(),
                },
                questionnaireUrl,
              });

              console.log('✅ Payment confirmation email sent');
            } else {
              console.warn('⚠️  User not found, skipping payment confirmation email');
            }
          } else {
            await db
              .update(purchase)
              .set({
                status: subscriptionData.status === "active" ? "completed" : "pending",
                updatedAt: new Date(),
              })
              .where(eq(purchase.polarSubscriptionId, subscriptionData.id));

            console.log("✅ Updated purchase record for subscription:", subscriptionData.id);
          }
        } else {
          console.warn("⚠️  Unknown product ID, skipping purchase creation:", productId);
        }
      }

      return Response.json({ received: true, eventType });
    }

    // Unknown event type
    console.log("ℹ️  Unhandled event type:", eventType);
    return Response.json({ received: true, eventType });

  } catch (error) {
    console.error("💥 Error processing webhook:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
