import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { guide, purchase, questionnaire } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, desc, and } from "drizzle-orm";
import { logger } from "@/lib/logger";

export const dynamic = 'force-dynamic';

/**
 * GET /api/guides
 * List all guides for the authenticated user
 */
export async function GET(req: NextRequest) {
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

    logger.info("Fetching guides for user", { userId: session.user.id });

    // Step 2: Fetch all guides for the user
    const userGuides = await db
      .select({
        id: guide.id,
        pdfUrl: guide.pdfUrl,
        status: guide.status,
        createdAt: guide.createdAt,
        updatedAt: guide.updatedAt,
        generationTime: guide.generationTime,
        aiCost: guide.aiCost,
        // Join with questionnaire to get race info
        raceName: questionnaire.raceName,
        raceDate: questionnaire.raceDate,
        goalFinishTime: questionnaire.goalFinishTime,
        // Join with purchase to get tier
        tier: purchase.tier,
      })
      .from(guide)
      .innerJoin(questionnaire, eq(guide.questionnaireId, questionnaire.id))
      .innerJoin(purchase, eq(guide.purchaseId, purchase.id))
      .where(eq(purchase.userId, session.user.id))
      .orderBy(desc(guide.createdAt));

    logger.info("Guides fetched successfully", {
      userId: session.user.id,
      count: userGuides.length
    });

    // Step 3: Return guides with formatted data
    const formattedGuides = userGuides.map(g => ({
      id: g.id,
      raceName: g.raceName,
      raceDate: g.raceDate,
      goalFinishTime: g.goalFinishTime,
      tier: g.tier,
      pdfUrl: g.pdfUrl,
      status: g.status,
      createdAt: g.createdAt,
      updatedAt: g.updatedAt,
      generationTime: g.generationTime,
      aiCost: g.aiCost,
    }));

    return NextResponse.json({
      guides: formattedGuides,
      count: formattedGuides.length,
    });

  } catch (error) {
    logger.error("Error fetching guides", { error });
    return NextResponse.json(
      { error: "Failed to fetch guides" },
      { status: 500 }
    );
  }
}
