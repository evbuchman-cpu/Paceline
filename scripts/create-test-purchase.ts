import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "@/db/drizzle";
import { purchase, user } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { randomUUID } from "crypto";

async function createTestPurchase() {
  console.log("🔍 Creating test purchase for most recent user...");

  try {
    // Get the most recent user (likely you!)
    const users = await db
      .select()
      .from(user)
      .orderBy(desc(user.createdAt))
      .limit(1);

    if (users.length === 0) {
      console.error("❌ No users found in database");
      process.exit(1);
    }

    const currentUser = users[0];
    console.log(`Found user: ${currentUser.name} (${currentUser.email})`);

    // Check if user already has a purchase
    const existingPurchases = await db
      .select()
      .from(purchase)
      .where(eq(purchase.userId, currentUser.id));

    if (existingPurchases.length > 0) {
      console.log(`✓ User already has ${existingPurchases.length} purchase(s)`);
      console.log("Existing purchases:");
      existingPurchases.forEach((p, i) => {
        console.log(`  ${i + 1}. ${p.tier} - $${p.amount / 100} - ${p.status}`);
      });

      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      readline.question("\nCreate another test purchase? (yes/no): ", async (answer: string) => {
        if (answer.toLowerCase() !== "yes" && answer.toLowerCase() !== "y") {
          console.log("Cancelled.");
          readline.close();
          process.exit(0);
        }
        readline.close();
        await createPurchase(currentUser.id);
      });
    } else {
      await createPurchase(currentUser.id);
    }
  } catch (error) {
    console.error("💥 Error creating test purchase:", error);
    process.exit(1);
  }
}

async function createPurchase(userId: string) {
  // Ask which tier
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question(
    "\nWhich tier? (1=Essential $29, 2=Custom $99, 3=Ultra Bundle $497): ",
    async (answer: string) => {
      let tier: "essential" | "custom" | "ultra_bundle";
      let amount: number;
      let guidesRemaining: number;

      switch (answer) {
        case "1":
          tier = "essential";
          amount = 2900;
          guidesRemaining = 1;
          break;
        case "2":
          tier = "custom";
          amount = 9900;
          guidesRemaining = 1;
          break;
        case "3":
          tier = "ultra_bundle";
          amount = 49700;
          guidesRemaining = 5;
          break;
        default:
          console.error("Invalid choice");
          readline.close();
          process.exit(1);
      }

      const purchaseId = randomUUID();

      await db.insert(purchase).values({
        id: purchaseId,
        userId: userId,
        tier: tier,
        amount: amount,
        polarSubscriptionId: null,
        polarOrderId: null,
        status: "completed",
        guidesRemaining: guidesRemaining,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log(`\n✅ Created test purchase:`);
      console.log(`   ID: ${purchaseId}`);
      console.log(`   Tier: ${tier}`);
      console.log(`   Amount: $${amount / 100}`);
      console.log(`   Guides Remaining: ${guidesRemaining}`);
      console.log(`\n🎉 You can now go to /dashboard/questionnaire to fill it out!`);

      readline.close();
      process.exit(0);
    }
  );
}

createTestPurchase();
