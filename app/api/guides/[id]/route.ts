import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { guide, purchase, questionnaire } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";
import { logger } from "@/lib/logger";

export const dynamic = 'force-dynamic';

/**
 * GET /api/guides/[id]
 * Get a specific guide by ID with full details including sections
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const guideId = params.id;
    logger.info("Fetching guide", { guideId, userId: session.user.id });

    // Step 2: Fetch guide with all details
    const guideResult = await db
      .select({
        guide: guide,
        questionnaire: questionnaire,
        purchase: purchase,
      })
      .from(guide)
      .innerJoin(questionnaire, eq(guide.questionnaireId, questionnaire.id))
      .innerJoin(purchase, eq(guide.purchaseId, purchase.id))
      .where(eq(guide.id, guideId))
      .limit(1);

    if (guideResult.length === 0) {
      logger.warn("Guide not found", { guideId });
      return NextResponse.json(
        { error: "Guide not found" },
        { status: 404 }
      );
    }

    const { guide: g, questionnaire: q, purchase: p } = guideResult[0];

    // Step 3: Verify ownership
    if (p.userId !== session.user.id) {
      logger.warn("Unauthorized guide access attempt", {
        guideId,
        userId: session.user.id,
        ownerId: p.userId
      });
      return NextResponse.json(
        { error: "Unauthorized - you do not own this guide" },
        { status: 403 }
      );
    }

    logger.info("Guide fetched successfully", { guideId, userId: session.user.id });

    // Step 4: Return complete guide data
    return NextResponse.json({
      id: g.id,
      pdfUrl: g.pdfUrl,
      status: g.status,
      sections: g.sections,
      createdAt: g.createdAt,
      updatedAt: g.updatedAt,
      generationTime: g.generationTime,
      aiCost: g.aiCost,
      error: g.error,
      questionnaire: {
        id: q.id,
        raceName: q.raceName,
        raceWebsite: q.raceWebsite,
        raceDate: q.raceDate,
        goalFinishTime: q.goalFinishTime,
        ultrasCompleted: q.ultrasCompleted,
        recentFlatPace: q.recentFlatPace,
        climbingStrength: q.climbingStrength,
        weeklyTrainingVolume: q.weeklyTrainingVolume,
        crewSupport: q.crewSupport,
        firstName: q.firstName,
        email: q.email,
        stravaAthleteId: q.stravaAthleteId,
        recentRaceResults: q.recentRaceResults,
        biggestClimbTrained: q.biggestClimbTrained,
        giIssuesHistory: q.giIssuesHistory,
        blisterProneAreas: q.blisterProneAreas,
        nutritionPreferences: q.nutritionPreferences,
        biggestRaceFears: q.biggestRaceFears,
      },
      purchase: {
        tier: p.tier,
        amount: p.amount,
      },
    });

  } catch (error) {
    logger.error("Error fetching guide", { error, guideId: params.id });
    return NextResponse.json(
      { error: "Failed to fetch guide" },
      { status: 500 }
    );
  }
}
