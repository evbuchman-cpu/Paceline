import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { guide, purchase, questionnaire } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, and, isNull } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/guides
 * List all non-archived guides belonging to the authenticated user.
 */
export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await db
      .select({
        guide,
        questionnaire,
        purchase,
      })
      .from(guide)
      .innerJoin(purchase, eq(guide.purchaseId, purchase.id))
      .innerJoin(questionnaire, eq(guide.questionnaireId, questionnaire.id))
      .where(
        and(
          eq(purchase.userId, session.user.id),
          isNull(guide.archivedAt)
        )
      )
      .orderBy(guide.createdAt);

    const guides = rows.map(({ guide: g, questionnaire: q, purchase: p }) => ({
      id: g.id,
      status: g.status,
      pdfUrl: g.status === "completed" ? g.pdfUrl : null,
      raceName: q.raceName,
      raceDate: q.raceDate,
      tier: p.tier,
      generationTime: g.generationTime,
      createdAt: g.createdAt,
      updatedAt: g.updatedAt,
    }));

    return NextResponse.json({ guides });
  } catch (error) {
    console.error("Error listing guides:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
