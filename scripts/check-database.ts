import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "@/db/drizzle";
import { purchase, subscription, user } from "@/db/schema";

async function checkDatabase() {
  console.log("🔍 Checking database...\n");

  try {
    // Check users
    const users = await db.select().from(user);
    console.log(`👥 Users: ${users.length}`);
    users.forEach(u => {
      console.log(`   - ${u.name} (${u.email})`);
    });

    // Check subscriptions
    const subscriptions = await db.select().from(subscription);
    console.log(`\n📋 Subscriptions: ${subscriptions.length}`);
    subscriptions.forEach(s => {
      console.log(`   - ID: ${s.id}`);
      console.log(`     Status: ${s.status}`);
      console.log(`     User ID: ${s.userId}`);
      console.log(`     Product ID: ${s.productId}`);
    });

    // Check purchases
    const purchases = await db.select().from(purchase);
    console.log(`\n💰 Purchases: ${purchases.length}`);
    purchases.forEach(p => {
      console.log(`   - ID: ${p.id}`);
      console.log(`     Tier: ${p.tier}`);
      console.log(`     Status: ${p.status}`);
      console.log(`     User ID: ${p.userId}`);
    });

    if (subscriptions.length === 0 && purchases.length === 0) {
      console.log("\n⚠️  NO SUBSCRIPTIONS OR PURCHASES FOUND!");
      console.log("This means the webhook from Polar.sh was never received.\n");
    }

  } catch (error) {
    console.error("💥 Error checking database:", error);
  }

  process.exit(0);
}

checkDatabase();
