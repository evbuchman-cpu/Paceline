import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { questionnaire } from "@/db/schema";
import { essentialQuestionnaireSchema } from "@/lib/schemas/questionnaire";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { randomUUID } from "crypto";

export const dynamic = 'force-dynamic';

/**
 * POST /api/questionnaire
 * Create a new questionnaire
 */
export async function POST(req: NextRequest) {
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

    // Parse and validate request body
    const body = await req.json();
    const validated = essentialQuestionnaireSchema.parse(body);

    // Create questionnaire in database
    const newQuestionnaire = await db
      .insert(questionnaire)
      .values({
        id: randomUUID(),
        purchaseId: validated.purchaseId,
        raceName: validated.raceName,
        raceWebsite: validated.raceWebsite || null,
        raceDate: validated.raceDate,
        goalFinishTime: validated.goalFinishTime,
        ultrasCompleted: validated.ultrasCompleted,
        recentFlatPace: validated.recentFlatPace || null,
        climbingStrength: validated.climbingStrength,
        weeklyTrainingVolume: validated.weeklyTrainingVolume || null,
        crewSupport: validated.crewSupport,
        firstName: validated.firstName,
        email: validated.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(
      {
        id: newQuestionnaire[0].id,
        message: "Questionnaire created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating questionnaire:", error);

    // Handle Zod validation errors
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/questionnaire
 * List all questionnaires for the authenticated user
 */
export async function GET() {
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

    // Get all questionnaires for user's purchases
    // This requires joining with purchase table
    const { purchase } = await import("@/db/schema");
    const { eq } = await import("drizzle-orm");

    const userQuestionnaires = await db
      .select({
        id: questionnaire.id,
        raceName: questionnaire.raceName,
        raceDate: questionnaire.raceDate,
        completedAt: questionnaire.completedAt,
        createdAt: questionnaire.createdAt,
        purchaseId: questionnaire.purchaseId,
      })
      .from(questionnaire)
      .innerJoin(purchase, eq(questionnaire.purchaseId, purchase.id))
      .where(eq(purchase.userId, session.user.id))
      .orderBy(questionnaire.createdAt);

    return NextResponse.json({ questionnaires: userQuestionnaires });
  } catch (error) {
    console.error("Error fetching questionnaires:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
