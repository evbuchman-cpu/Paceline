import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "@/db/drizzle";
import { purchase, questionnaire } from "@/db/schema";
import { desc } from "drizzle-orm";

async function testQuestionnaireSubmit() {
  console.log("🧪 Testing questionnaire submission...\n");

  try {
    // Get the most recent purchase
    const purchases = await db
      .select()
      .from(purchase)
      .orderBy(desc(purchase.createdAt))
      .limit(1);

    if (purchases.length === 0) {
      console.error("❌ No purchases found");
      process.exit(1);
    }

    const testPurchase = purchases[0];
    console.log(`✓ Found purchase: ${testPurchase.id} (${testPurchase.tier})\n`);

    // Create test questionnaire data
    const testData = {
      purchaseId: testPurchase.id,
      raceName: "Test Race 100",
      raceWebsite: "https://testrace.com",
      raceDate: new Date("2025-06-15"),
      goalFinishTime: "24:00",
      ultrasCompleted: "1-3",
      recentFlatPace: "10:00",
      climbingStrength: "average",
      weeklyTrainingVolume: 40,
      crewSupport: "yes",
      firstName: "Test",
      email: "test@example.com",
      // Custom tier fields
      stravaAthleteId: "",
      recentRaceResults: "Leadville 100 - 28:30",
      biggestClimbTrained: "3000 ft at Mount X",
      giIssuesHistory: "no",
      blisterProneAreas: "Toes,Heels",
      nutritionPreferences: {
        vegan: false,
        glutenFree: true,
        caffeineSensitive: false,
      },
      biggestRaceFears: "Missing cutoffs",
    };

    console.log("📤 Submitting test questionnaire via API...");

    // Submit via API (simulating form submission)
    const response = await fetch("http://localhost:3000/api/questionnaire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("❌ API Error:", error);
      process.exit(1);
    }

    const result = await response.json();
    console.log("✅ API Response:", result);

    // Check database
    console.log("\n🔍 Checking database...");
    const questionnaires = await db
      .select()
      .from(questionnaire)
      .orderBy(desc(questionnaire.createdAt));

    console.log(`\n📋 Questionnaires in database: ${questionnaires.length}`);
    questionnaires.forEach((q, i) => {
      console.log(`\n${i + 1}. Questionnaire ID: ${q.id}`);
      console.log(`   Purchase ID: ${q.purchaseId}`);
      console.log(`   Race Name: ${q.raceName}`);
      console.log(`   Race Date: ${q.raceDate}`);
      console.log(`   Completed At: ${q.completedAt || "Not completed"}`);
      console.log(`   Created At: ${q.createdAt}`);
    });

    if (questionnaires.length > 0) {
      console.log("\n✅ SUCCESS! Questionnaire was saved to the database!");
    } else {
      console.log("\n❌ FAILED! No questionnaires found in database.");
    }

  } catch (error) {
    console.error("💥 Error:", error);
    process.exit(1);
  }

  process.exit(0);
}

testQuestionnaireSubmit();
