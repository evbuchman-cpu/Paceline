import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "@/db/drizzle";
import { questionnaire } from "@/db/schema";
import { desc } from "drizzle-orm";

async function checkQuestionnaires() {
  console.log("🔍 Checking questionnaires in database...\n");

  try {
    const questionnaires = await db
      .select()
      .from(questionnaire)
      .orderBy(desc(questionnaire.createdAt));

    console.log(`📋 Total Questionnaires: ${questionnaires.length}\n`);

    if (questionnaires.length === 0) {
      console.log("ℹ️  No questionnaires found yet.");
      console.log("\nTo test questionnaire submission:");
      console.log("1. Go to http://localhost:3000/dashboard/questionnaire");
      console.log("2. Fill out the form");
      console.log("3. Click 'Submit Questionnaire'");
      console.log("4. Run this script again to verify it saved!");
    } else {
      questionnaires.forEach((q, i) => {
        console.log(`${i + 1}. Questionnaire:`);
        console.log(`   ID: ${q.id}`);
        console.log(`   Purchase ID: ${q.purchaseId}`);
        console.log(`   Race Name: ${q.raceName}`);
        console.log(`   Race Date: ${q.raceDate?.toLocaleDateString() || "Not set"}`);
        console.log(`   Goal Time: ${q.goalFinishTime}`);
        console.log(`   First Name: ${q.firstName}`);
        console.log(`   Email: ${q.email}`);
        console.log(`   Ultras Completed: ${q.ultrasCompleted}`);
        console.log(`   Climbing Strength: ${q.climbingStrength}`);
        console.log(`   Crew Support: ${q.crewSupport}`);

        // Custom tier fields
        if (q.recentRaceResults) {
          console.log(`   Recent Races: ${q.recentRaceResults}`);
        }
        if (q.biggestRaceFears) {
          console.log(`   Biggest Fears: ${q.biggestRaceFears}`);
        }

        console.log(`   Completed: ${q.completedAt ? "✅ Yes" : "❌ No (draft)"}`);
        console.log(`   Created: ${q.createdAt?.toLocaleString()}`);
        console.log("");
      });
    }

  } catch (error) {
    console.error("💥 Error:", error);
    process.exit(1);
  }

  process.exit(0);
}

checkQuestionnaires();
