import { db } from "@/db/drizzle";
import { purchase, subscription, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { randomUUID, createHmac, timingSafeEqual } from "crypto";
import { headers } from "next/headers";
import { logger } from "@/lib/logger";

// Email import
import { sendPaymentConfirmationEmail } from "@/lib/email-sender";

export const dynamic = 'force-dynamic';

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

// Webhook signature verification for production security
function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  try {
    const hmac = createHmac("sha256", secret);
    hmac.update(payload);
    const expectedSignature = hmac.digest("hex");

    if (signature.length !== expectedSignature.length) {
      return false;
    }

    return timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch (error) {
    logger.error("Error verifying webhook signature", { error });
    return false;
  }
}

export async function POST(req: Request) {
  logger.debug("Webhook request received from Polar.sh");

  try {
    const headersList = await headers();
    const signature = headersList.get("x-polar-signature");
    const rawBody = await req.text();

    logger.debug("Webhook signature and body received", {
      hasSignature: !!signature,
      bodyPreview: rawBody.substring(0, 100), // Reduced from 200 for security
    });

    // Verify webhook signature
    if (!signature) {
      logger.error("Webhook signature validation failed: No signature provided");
      return Response.json({ error: "No signature provided" }, { status: 401 });
    }

    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
    if (!webhookSecret) {
      logger.error("Configuration error: POLAR_WEBHOOK_SECRET not set");
      return Response.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    const isValidSignature = verifyWebhookSignature(rawBody, signature, webhookSecret);
    if (!isValidSignature) {
      logger.error("Webhook signature validation failed: Invalid signature", {
        providedSignature: signature.substring(0, 10) + "...",
      });
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }

    logger.info("Webhook signature verified successfully");

    const data = JSON.parse(rawBody);
    const eventType = data.type;

    logger.debug("Webhook event parsed", { eventType });

    // Handle subscription events
    if (
      eventType === "subscription.created" ||
      eventType === "subscription.active" ||
      eventType === "subscription.canceled" ||
      eventType === "subscription.revoked" ||
      eventType === "subscription.uncanceled" ||
      eventType === "subscription.updated"
    ) {
      const subscriptionData = data.data;
      const userId = subscriptionData.customer?.external_id || subscriptionData.customer?.externalId;

      // Audit log for subscription webhook (always logged for compliance)
      logger.audit("subscription_webhook_processing", {
        eventType,
        subscriptionId: subscriptionData.id,
        userId,
        productId: subscriptionData.product_id || subscriptionData.productId,
        status: subscriptionData.status,
      });

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
          },
        });

      logger.info("Subscription upserted successfully", {
        subscriptionId: subscriptionData.id,
        status: subscriptionData.status,
      });

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

            logger.info("Purchase record created for subscription", {
              subscriptionId: subscriptionData.id,
              purchaseId,
              tier,
              guidesRemaining,
            });

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

              logger.info("Payment confirmation email sent", {
                userId,
                purchaseId,
                tier,
              });
            } else {
              logger.warn("User not found, skipping payment confirmation email", {
                userId,
                subscriptionId: subscriptionData.id,
              });
            }
          } else {
            await db
              .update(purchase)
              .set({
                status: subscriptionData.status === "active" ? "completed" : "pending",
                updatedAt: new Date(),
              })
              .where(eq(purchase.polarSubscriptionId, subscriptionData.id));

            logger.info("Purchase record updated for subscription", {
              subscriptionId: subscriptionData.id,
              newStatus: subscriptionData.status === "active" ? "completed" : "pending",
            });
          }
        } else {
          logger.warn("Unknown product ID, skipping purchase creation", {
            productId,
            subscriptionId: subscriptionData.id,
          });
        }
      }

      return Response.json({ received: true, eventType });
    }

    // Unknown event type
    logger.info("Unhandled webhook event type received", { eventType });
    return Response.json({ received: true, eventType });

  } catch (error) {
    logger.error("Error processing webhook", error, {
      hasRawBody: true,
    });
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
