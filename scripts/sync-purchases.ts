import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "@/db/drizzle";
import { purchase, subscription } from "@/db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

// Map Polar productId to Paceline tier
function mapProductIdToTier(productId: string): "essential" | "custom" | "ultra_bundle" | null {
  const tierMap: Record<string, "essential" | "custom" | "ultra_bundle"> = {
    [process.env.NEXT_PUBLIC_ESSENTIAL_TIER || ""]: "essential",
    [process.env.NEXT_PUBLIC_CUSTOM_TIER || ""]: "custom",
    [process.env.NEXT_PUBLIC_ULTRA_BUNDLE_TIER || ""]: "ultra_bundle",
  };
  return tierMap[productId] || null;
}

async function syncPurchases() {
  console.log("🔍 Checking for subscriptions without purchase records...");

  try {
    // Get all subscriptions (regardless of status)
    const subscriptions = await db
      .select()
      .from(subscription);

    console.log(`Found ${subscriptions.length} subscriptions total`);

    for (const sub of subscriptions) {
      console.log(`\nProcessing subscription ${sub.id}:`);
      console.log(`  Status: ${sub.status}`);
      console.log(`  User ID: ${sub.userId || "NONE"}`);
      console.log(`  Product ID: ${sub.productId}`);

      // Check if purchase record exists
      const existingPurchase = await db
        .select()
        .from(purchase)
        .where(eq(purchase.polarSubscriptionId, sub.id))
        .limit(1);

      if (existingPurchase.length === 0 && sub.userId) {
        const tier = mapProductIdToTier(sub.productId);

        if (tier) {
          const guidesRemaining = tier === "ultra_bundle" ? 3 : 1;

          await db.insert(purchase).values({
            id: randomUUID(),
            userId: sub.userId,
            tier: tier,
            amount: sub.amount,
            polarSubscriptionId: sub.id,
            polarOrderId: sub.checkoutId || null,
            status: sub.status === "active" ? "completed" : "pending",
            guidesRemaining: guidesRemaining,
            createdAt: sub.createdAt,
            updatedAt: new Date(),
          });

          console.log(`✅ Created purchase record for subscription ${sub.id} (${tier})`);
        } else {
          console.log(`⚠️  Unknown product ID for subscription ${sub.id}: ${sub.productId}`);
        }
      } else if (existingPurchase.length > 0) {
        console.log(`✓ Purchase record already exists for subscription ${sub.id}`);
      } else {
        console.log(`⚠️  Subscription ${sub.id} has no userId, skipping`);
      }
    }

    console.log("✅ Sync complete!");
  } catch (error) {
    console.error("💥 Error syncing purchases:", error);
    process.exit(1);
  }

  process.exit(0);
}

syncPurchases();
