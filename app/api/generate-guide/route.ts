import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { questionnaire, purchase, guide } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";
import { randomUUID } from "crypto";
import { z } from "zod";

// AI Cascade imports
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

// PDF and storage imports
import { generateGuidePDF, type GuideData, type QuestionnaireData } from "@/lib/pdf-generator";
import { uploadToR2, generateGuidePdfFileName } from "@/lib/r2-storage";

// Web fetching import
import { fetchRaceWebsite } from "@/lib/web-fetcher";

// Validation import
import { validateAndCorrectGuideData, formatValidationResult } from "@/lib/guide-validator";

// Request validation schema
const generateGuideRequestSchema = z.object({
  questionnaireId: z.string().uuid(),
});

// Type for nutrition preferences
interface NutritionPreferences {
  vegan?: boolean;
  glutenFree?: boolean;
  caffeineSensitive?: boolean;
}

/**
 * POST /api/generate-guide
 * Generate a complete race guide from a questionnaire
 */
export async function POST(req: NextRequest) {
  const startTime = Date.now();
  let guideId: string | null = null;

  try {
    // Step 1: Verify authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - please sign in" },
        { status: 401 }
      );
    }

    // Step 2: Parse and validate request body
    const body = await req.json();
    const { questionnaireId } = generateGuideRequestSchema.parse(body);

    console.log(`📋 Starting guide generation for questionnaire: ${questionnaireId}`);

    // Step 3: Fetch questionnaire with purchase (for tier info and ownership check)
    const questionnaireResult = await db
      .select({
        questionnaire: questionnaire,
        purchase: purchase,
      })
      .from(questionnaire)
      .innerJoin(purchase, eq(questionnaire.purchaseId, purchase.id))
      .where(eq(questionnaire.id, questionnaireId))
      .limit(1);

    if (questionnaireResult.length === 0) {
      return NextResponse.json(
        { error: "Questionnaire not found" },
        { status: 404 }
      );
    }

    const { questionnaire: q, purchase: p } = questionnaireResult[0];

    // Step 4: Verify ownership
    if (p.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized - you do not own this questionnaire" },
        { status: 403 }
      );
    }

    // Step 5: Check if guide already exists for this questionnaire
    const existingGuide = await db
      .select()
      .from(guide)
      .where(eq(guide.questionnaireId, questionnaireId))
      .limit(1);

    if (existingGuide.length > 0 && existingGuide[0].status === "completed") {
      return NextResponse.json(
        {
          error: "Guide already exists",
          guideId: existingGuide[0].id,
          pdfUrl: existingGuide[0].pdfUrl
        },
        { status: 409 }
      );
    }

    // Step 6: Create initial guide record with "generating" status
    guideId = randomUUID();
    await db.insert(guide).values({
      id: guideId,
      purchaseId: p.id,
      questionnaireId: questionnaireId,
      pdfUrl: "", // Will be updated after PDF generation
      sections: {}, // Will be updated after cascade
      status: "generating",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log(`🚀 Created guide record: ${guideId}`);

    // Step 7: Run 8-step AI cascade
    let totalCost = 0;

    // Pre-step: Fetch race website content
    let websiteContent: string | undefined;
    if (q.raceWebsite) {
      console.log("🌐 Fetching race website content...");
      const fetchResult = await fetchRaceWebsite(q.raceWebsite);
      if (fetchResult.success && fetchResult.content) {
        websiteContent = fetchResult.content;
        console.log(`✅ Website content fetched: ${fetchResult.content.length} chars`);
      } else {
        console.warn(`⚠️ Failed to fetch website: ${fetchResult.error || "Unknown error"}`);
      }
    }

    // Step 1: Race Overview
    console.log("🔄 Step 1/8: Generating race overview...");
    const raceOverviewResult = await generateRaceOverview({
      raceName: q.raceName,
      raceWebsite: q.raceWebsite || undefined,
      raceDate: q.raceDate.toISOString().split("T")[0],
      websiteContent: websiteContent,
    });
    totalCost += raceOverviewResult.usage.estimatedCost;

    // Step 2: Pacing Strategy
    console.log("🔄 Step 2/8: Generating pacing strategy...");
    const pacingResult = await generatePacingStrategy({
      raceOverview: raceOverviewResult.data,
      goalFinishTime: q.goalFinishTime,
      stravaData: q.stravaData ? {
        athleteId: q.stravaAthleteId || "",
        recentActivities: (q.stravaData as Record<string, unknown>).recentActivities as {
          avgPace?: string;
          avgHeartRate?: number;
          totalDistance?: number;
          elevationGain?: number;
        },
        fitnessScore: (q.stravaData as Record<string, unknown>).fitnessScore as number | undefined,
        estimatedFTP: (q.stravaData as Record<string, unknown>).estimatedFTP as number | undefined,
      } : undefined,
      climbingStrength: q.climbingStrength || "average",
      ultrasCompleted: q.ultrasCompleted,
    });
    totalCost += pacingResult.usage.estimatedCost;

    // Step 3: Cutoff Management
    console.log("🔄 Step 3/8: Generating cutoff management...");
    const cutoffResult = await generateCutoffManagement({
      pacingStrategy: pacingResult.data,
      aidStations: raceOverviewResult.data.aidStations,
    });
    totalCost += cutoffResult.usage.estimatedCost;

    // Step 4: Crew Logistics
    console.log("🔄 Step 4/8: Generating crew logistics...");
    const crewResult = await generateCrewLogistics({
      pacingStrategy: pacingResult.data,
      aidStations: raceOverviewResult.data.aidStations,
      crewSupport: q.crewSupport || "no",
      firstName: q.firstName || undefined,
    });
    totalCost += crewResult.usage.estimatedCost;

    // Parse nutrition preferences
    const nutritionPrefs = q.nutritionPreferences as NutritionPreferences | null;

    // Step 5: Drop Bag Strategy
    console.log("🔄 Step 5/8: Generating drop bag strategy...");
    const dropBagResult = await generateDropBagStrategy({
      raceOverview: raceOverviewResult.data,
      pacingStrategy: pacingResult.data,
      aidStations: raceOverviewResult.data.aidStations,
      weatherPatterns: raceOverviewResult.data.weatherPatterns,
      nutritionPreferences: nutritionPrefs || undefined,
    });
    totalCost += dropBagResult.usage.estimatedCost;

    // Step 6: Nutrition Timeline
    console.log("🔄 Step 6/8: Generating nutrition timeline...");
    const nutritionResult = await generateNutritionTimeline({
      pacingStrategy: pacingResult.data,
      aidStations: raceOverviewResult.data.aidStations,
      goalFinishTime: q.goalFinishTime,
      nutritionPreferences: nutritionPrefs || undefined,
      giIssuesHistory: q.giIssuesHistory || undefined,
    });
    totalCost += nutritionResult.usage.estimatedCost;

    // Step 7: Contingency Protocols
    console.log("🔄 Step 7/8: Generating contingency protocols...");
    const contingencyResult = await generateContingencyProtocols({
      raceOverview: raceOverviewResult.data,
      pacingStrategy: pacingResult.data,
      giIssuesHistory: q.giIssuesHistory || undefined,
      blisterProneAreas: q.blisterProneAreas || undefined,
      weatherPatterns: raceOverviewResult.data.weatherPatterns,
    });
    totalCost += contingencyResult.usage.estimatedCost;

    // Step 8: Mental Strategy
    console.log("🔄 Step 8/8: Generating mental strategy...");
    const mentalResult = await generateMentalStrategy({
      raceOverview: raceOverviewResult.data,
      pacingStrategy: pacingResult.data,
      biggestRaceFears: q.biggestRaceFears || undefined,
      ultrasCompleted: q.ultrasCompleted,
      // Slim down toughSections to reduce token usage - mental strategy only needs identifiers
      toughSections: raceOverviewResult.data.toughSections.map(s => ({
        name: s.name,
        miles: s.miles,
        difficulty: s.difficulty,
      })),
      firstName: q.firstName || undefined,
    });
    totalCost += mentalResult.usage.estimatedCost;

    console.log(`✅ AI cascade complete. Total cost: $${totalCost.toFixed(4)}`);

    // Step 8: Prepare guide data
    const rawGuideData: GuideData = {
      raceOverview: raceOverviewResult.data,
      pacingStrategy: pacingResult.data,
      cutoffManagement: cutoffResult.data,
      crewLogistics: crewResult.data,
      dropBagStrategy: dropBagResult.data,
      nutritionTimeline: nutritionResult.data,
      contingencyProtocols: contingencyResult.data,
      mentalStrategy: mentalResult.data,
    };

    // Step 9: Validate and auto-correct guide data
    console.log("🔍 Validating and correcting guide data...");
    const { result: validationResult, correctedData: guideData } = validateAndCorrectGuideData(rawGuideData);

    // Log validation results
    console.log(formatValidationResult(validationResult));

    // Check for unfixable errors
    if (!validationResult.isValid) {
      console.error("❌ Guide validation failed with unfixable errors");

      // Update guide status to failed
      await db
        .update(guide)
        .set({
          status: "failed",
          error: `Validation failed: ${validationResult.errors.map(e => e.message).join("; ")}`,
          sections: rawGuideData, // Store raw data for debugging
          updatedAt: new Date(),
        })
        .where(eq(guide.id, guideId));

      return NextResponse.json(
        {
          error: "Guide validation failed",
          details: validationResult.errors,
          warnings: validationResult.warnings,
        },
        { status: 422 }
      );
    }

    if (validationResult.wasAutoCorrected) {
      console.log(`📝 Auto-corrected ${validationResult.corrections.length} issues`);
    }

    // Step 10: Generate PDF with corrected data
    console.log("📄 Generating PDF...");
    const questionnaireData: QuestionnaireData = {
      raceName: q.raceName,
      raceDate: q.raceDate,
      goalFinishTime: q.goalFinishTime,
      firstName: q.firstName || "Runner",
      email: q.email || "",
      tier: p.tier as "essential" | "custom" | "ultra_bundle",
    };

    const pdfBuffer = await generateGuidePDF(guideData, questionnaireData);
    console.log(`✅ PDF generated: ${pdfBuffer.length} bytes`);

    // Step 11: Upload to R2
    console.log("☁️ Uploading to R2...");
    const fileName = generateGuidePdfFileName(questionnaireId);
    const pdfUrl = await uploadToR2(pdfBuffer, fileName);
    console.log(`✅ PDF uploaded: ${pdfUrl}`);

    // Step 12: Update guide record with completed status
    const generationTime = Date.now() - startTime;
    const aiCostCents = Math.round(totalCost * 100);

    await db
      .update(guide)
      .set({
        pdfUrl: pdfUrl,
        sections: guideData,
        generationTime: generationTime,
        aiCost: aiCostCents,
        status: "completed",
        updatedAt: new Date(),
      })
      .where(eq(guide.id, guideId));

    console.log(`🎉 Guide generation complete!`);
    console.log(`   - Guide ID: ${guideId}`);
    console.log(`   - Generation time: ${(generationTime / 1000).toFixed(2)}s`);
    console.log(`   - AI cost: $${totalCost.toFixed(4)}`);

    return NextResponse.json(
      {
        guideId,
        pdfUrl,
        generationTime,
        aiCost: totalCost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error generating guide:", error);

    // Update guide status to failed if we created one
    if (guideId) {
      try {
        await db
          .update(guide)
          .set({
            status: "failed",
            error: error instanceof Error ? error.message : "Unknown error",
            updatedAt: new Date(),
          })
          .where(eq(guide.id, guideId));
      } catch (updateError) {
        console.error("Failed to update guide status:", updateError);
      }
    }

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    // Handle other errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/generate-guide
 * Check status of a guide generation
 */
export async function GET(req: NextRequest) {
  try {
    // Verify authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - please sign in" },
        { status: 401 }
      );
    }

    // Get guideId from query params
    const { searchParams } = new URL(req.url);
    const guideId = searchParams.get("guideId");

    if (!guideId) {
      return NextResponse.json(
        { error: "guideId query parameter is required" },
        { status: 400 }
      );
    }

    // Fetch guide with ownership check
    const guideResult = await db
      .select({
        guide: guide,
        purchase: purchase,
      })
      .from(guide)
      .innerJoin(purchase, eq(guide.purchaseId, purchase.id))
      .where(eq(guide.id, guideId))
      .limit(1);

    if (guideResult.length === 0) {
      return NextResponse.json(
        { error: "Guide not found" },
        { status: 404 }
      );
    }

    const { guide: g, purchase: p } = guideResult[0];

    // Verify ownership
    if (p.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized - you do not own this guide" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      guideId: g.id,
      status: g.status,
      pdfUrl: g.pdfUrl || null,
      generationTime: g.generationTime,
      error: g.error || null,
      createdAt: g.createdAt,
      updatedAt: g.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching guide status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
