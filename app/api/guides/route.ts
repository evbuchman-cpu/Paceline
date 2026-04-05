import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { guide, purchase, questionnaire } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, desc, and, isNull } from "drizzle-orm";
import { logger } from "@/lib/logger";

export const dynamic = 'force-dynamic';

/**
 * GET /api/guides
 * List all non-archived guides for the authenticated user
 */
export async function GET(req: NextRequest) {
  try {
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

    const userGuides = await db
      .select({
        id: guide.id,
        pdfUrl: guide.pdfUrl,
        status: guide.status,
        createdAt: guide.createdAt,
        updatedAt: guide.updatedAt,
        generationTime: guide.generationTime,
        aiCost: guide.aiCost,
        raceName: questionnaire.raceName,
        raceDate: questionnaire.raceDate,
        goalFinishTime: questionnaire.goalFinishTime,
        tier: purchase.tier,
      })
      .from(guide)
      .innerJoin(questionnaire, eq(guide.questionnaireId, questionnaire.id))
      .innerJoin(purchase, eq(guide.purchaseId, purchase.id))
      .where(and(eq(purchase.userId, session.user.id), isNull(guide.archivedAt)))
      .orderBy(desc(guide.createdAt));

    logger.info("Guides fetched successfully", {
      userId: session.user.id,
      count: userGuides.length
    });

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
