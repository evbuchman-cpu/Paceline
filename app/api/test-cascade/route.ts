import { NextResponse } from "next/server";
import {
  generateRaceOverview,
  generatePacingStrategy,
  generateCutoffManagement,
  generateCrewLogistics,
  generateDropBagStrategy,
  generateNutritionTimeline,
  generateContingencyProtocols,
  generateMentalStrategy,
} from "@/lib/ai-cascade";

// Test endpoint for AI cascade - DELETE before production
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    // Default test data - Wasatch Front 100
    const testInput = {
      raceName: body.raceName || "Wasatch Front 100",
      raceWebsite: body.raceWebsite || "https://wasatch100.com",
      raceDate: body.raceDate || "September 2025",
      goalFinishTime: body.goalFinishTime || "28:00",
      crewSupport: body.crewSupport || "yes",
      stravaData: body.stravaData || {
        avgPace: "10:30",
        weeklyMiles: 50,
        recentLongRuns: [20, 22, 18],
        elevationGain: 8000,
      },
      // Additional fields for steps 5-8
      nutritionPreferences: body.nutritionPreferences || {
        vegan: false,
        glutenFree: false,
        caffeineSensitive: false,
      },
      giIssuesHistory: body.giIssuesHistory || "Occasional nausea after mile 60",
      blisterProneAreas: body.blisterProneAreas || "Ball of foot, pinky toes",
      biggestRaceFears: body.biggestRaceFears || "Missing cutoffs, GI issues shutting me down",
      ultrasCompleted: body.ultrasCompleted || "1-3",
      firstName: body.firstName || "Alex",
    };

    // Determine which steps to run
    const stepsToRun = body.steps || ["overview"]; // Default to just step 1
    const results: Record<string, unknown> = {};
    let totalCost = 0;
    let totalTime = 0;

    console.log("\n========================================");
    console.log("🧪 AI CASCADE TEST STARTED");
    console.log("========================================\n");

    // Step 1: Race Overview
    if (stepsToRun.includes("overview") || stepsToRun.includes("all")) {
      const overviewResult = await generateRaceOverview({
        raceName: testInput.raceName,
        raceWebsite: testInput.raceWebsite,
        raceDate: testInput.raceDate,
      });
      results.overview = overviewResult;
      totalCost += overviewResult.usage.estimatedCost;
      totalTime += overviewResult.generationTime;

      // Step 2: Pacing Strategy (requires overview)
      if (stepsToRun.includes("pacing") || stepsToRun.includes("all")) {
        const pacingResult = await generatePacingStrategy({
          raceOverview: overviewResult.data,
          goalFinishTime: testInput.goalFinishTime,
          stravaData: testInput.stravaData,
          climbingStrength: "average",
          ultrasCompleted: testInput.ultrasCompleted,
        });
        results.pacing = pacingResult;
        totalCost += pacingResult.usage.estimatedCost;
        totalTime += pacingResult.generationTime;

        // Step 3: Cutoff Management (requires overview + pacing)
        if (stepsToRun.includes("cutoffs") || stepsToRun.includes("all")) {
          const cutoffResult = await generateCutoffManagement({
            pacingStrategy: pacingResult.data,
            aidStations: overviewResult.data.aidStations,
          });
          results.cutoffs = cutoffResult;
          totalCost += cutoffResult.usage.estimatedCost;
          totalTime += cutoffResult.generationTime;
        }

        // Step 4: Crew Logistics (requires overview + pacing)
        if (stepsToRun.includes("crew") || stepsToRun.includes("all")) {
          const crewResult = await generateCrewLogistics({
            pacingStrategy: pacingResult.data,
            aidStations: overviewResult.data.aidStations,
            crewSupport: testInput.crewSupport,
            firstName: testInput.firstName,
          });
          results.crew = crewResult;
          totalCost += crewResult.usage.estimatedCost;
          totalTime += crewResult.generationTime;
        }

        // Step 5: Drop Bag Strategy (requires overview + pacing)
        if (stepsToRun.includes("dropbags") || stepsToRun.includes("all")) {
          const dropBagResult = await generateDropBagStrategy({
            raceOverview: overviewResult.data,
            pacingStrategy: pacingResult.data,
            aidStations: overviewResult.data.aidStations,
            weatherPatterns: overviewResult.data.weatherPatterns,
            nutritionPreferences: testInput.nutritionPreferences,
          });
          results.dropbags = dropBagResult;
          totalCost += dropBagResult.usage.estimatedCost;
          totalTime += dropBagResult.generationTime;
        }

        // Step 6: Nutrition Timeline (requires pacing)
        if (stepsToRun.includes("nutrition") || stepsToRun.includes("all")) {
          const nutritionResult = await generateNutritionTimeline({
            pacingStrategy: pacingResult.data,
            aidStations: overviewResult.data.aidStations,
            goalFinishTime: testInput.goalFinishTime,
            nutritionPreferences: testInput.nutritionPreferences,
            giIssuesHistory: testInput.giIssuesHistory,
          });
          results.nutrition = nutritionResult;
          totalCost += nutritionResult.usage.estimatedCost;
          totalTime += nutritionResult.generationTime;
        }

        // Step 7: Contingency Protocols (requires overview + pacing)
        if (stepsToRun.includes("contingencies") || stepsToRun.includes("all")) {
          const contingencyResult = await generateContingencyProtocols({
            raceOverview: overviewResult.data,
            pacingStrategy: pacingResult.data,
            giIssuesHistory: testInput.giIssuesHistory,
            blisterProneAreas: testInput.blisterProneAreas,
            weatherPatterns: overviewResult.data.weatherPatterns,
          });
          results.contingencies = contingencyResult;
          totalCost += contingencyResult.usage.estimatedCost;
          totalTime += contingencyResult.generationTime;
        }

        // Step 8: Mental Strategy (requires overview + pacing)
        if (stepsToRun.includes("mental") || stepsToRun.includes("all")) {
          const mentalResult = await generateMentalStrategy({
            raceOverview: overviewResult.data,
            pacingStrategy: pacingResult.data,
            biggestRaceFears: testInput.biggestRaceFears,
            ultrasCompleted: testInput.ultrasCompleted,
            toughSections: overviewResult.data.toughSections,
            firstName: testInput.firstName,
          });
          results.mental = mentalResult;
          totalCost += mentalResult.usage.estimatedCost;
          totalTime += mentalResult.generationTime;
        }
      }
    }

    console.log("\n========================================");
    console.log("✅ AI CASCADE TEST COMPLETE");
    console.log(`Total Time: ${(totalTime / 1000).toFixed(2)}s`);
    console.log(`Total Cost: $${totalCost.toFixed(4)}`);
    console.log("========================================\n");

    return NextResponse.json({
      success: true,
      input: testInput,
      results,
      summary: {
        stepsCompleted: Object.keys(results).length,
        totalTimeMs: totalTime,
        totalTimeSec: (totalTime / 1000).toFixed(2),
        totalCost: `$${totalCost.toFixed(4)}`,
      },
    });
  } catch (error) {
    console.error("❌ AI Cascade test failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET endpoint for easy browser testing
export async function GET() {
  return NextResponse.json({
    message: "AI Cascade Test Endpoint - All 8 Steps",
    usage: {
      method: "POST",
      body: {
        raceName: "optional - defaults to Wasatch Front 100",
        raceWebsite: "optional",
        raceDate: "optional - defaults to September 2025",
        goalFinishTime: "optional - defaults to 28:00",
        crewSupport: "optional - defaults to yes",
        nutritionPreferences: "optional - { vegan, glutenFree, caffeineSensitive }",
        giIssuesHistory: "optional - defaults to sample text",
        blisterProneAreas: "optional - defaults to sample text",
        biggestRaceFears: "optional - defaults to sample text",
        ultrasCompleted: "optional - defaults to 1-3",
        firstName: "optional - defaults to Alex",
        steps: ["overview", "pacing", "cutoffs", "crew", "dropbags", "nutrition", "contingencies", "mental"],
      },
      examples: [
        {
          description: "Test Step 1 only (quickest)",
          body: { steps: ["overview"] },
        },
        {
          description: "Test all 8 steps (full cascade)",
          body: { steps: ["all"] },
        },
        {
          description: "Test steps 5-8 only (requires all for dependencies)",
          body: { steps: ["all"] },
          note: "Steps 5-8 depend on steps 1-2, so use 'all' to run complete cascade",
        },
        {
          description: "Custom race",
          body: {
            raceName: "Western States 100",
            raceDate: "June 2025",
            steps: ["all"],
          },
        },
      ],
    },
  });
}
