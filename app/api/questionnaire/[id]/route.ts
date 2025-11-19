import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { questionnaire, purchase } from "@/db/schema";
import { updateQuestionnaireSchema } from "@/lib/schemas/questionnaire";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

/**
 * GET /api/questionnaire/[id]
 * Retrieve a specific questionnaire by ID
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // Fetch questionnaire with purchase info to verify ownership
    const result = await db
      .select({
        questionnaire: questionnaire,
        purchase: purchase,
      })
      .from(questionnaire)
      .innerJoin(purchase, eq(questionnaire.purchaseId, purchase.id))
      .where(eq(questionnaire.id, id))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Questionnaire not found" },
        { status: 404 }
      );
    }

    // Verify user owns this questionnaire
    if (result[0].purchase.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden - you don't have access to this questionnaire" },
        { status: 403 }
      );
    }

    return NextResponse.json({ questionnaire: result[0].questionnaire });
  } catch (error) {
    console.error("Error fetching questionnaire:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/questionnaire/[id]
 * Update a questionnaire (for auto-save functionality)
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // Parse request body (skip strict validation for auto-save partial updates)
    const body = await req.json();

    // Use safeParse to allow partial updates without throwing errors
    const validationResult = updateQuestionnaireSchema.safeParse({ ...body, id });

    // For auto-save, we allow validation errors and just save what we can
    // Only throw if it's a final submission (has completedAt)
    if (!validationResult.success && body.completedAt) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error },
        { status: 400 }
      );
    }

    const validated = validationResult.success ? validationResult.data : { ...body, id };

    // Verify questionnaire exists and user owns it
    const existing = await db
      .select({
        questionnaire: questionnaire,
        purchase: purchase,
      })
      .from(questionnaire)
      .innerJoin(purchase, eq(questionnaire.purchaseId, purchase.id))
      .where(eq(questionnaire.id, id))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: "Questionnaire not found" },
        { status: 404 }
      );
    }

    if (existing[0].purchase.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden - you don't have access to this questionnaire" },
        { status: 403 }
      );
    }

    // Build update object (only include defined fields)
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    // Only update fields that are present in the request
    if (validated.raceName !== undefined) updateData.raceName = validated.raceName;
    if (validated.raceWebsite !== undefined) updateData.raceWebsite = validated.raceWebsite || null;
    if (validated.raceDate !== undefined) updateData.raceDate = validated.raceDate;
    if (validated.goalFinishTime !== undefined) updateData.goalFinishTime = validated.goalFinishTime;
    if (validated.ultrasCompleted !== undefined) updateData.ultrasCompleted = validated.ultrasCompleted;
    if (validated.recentFlatPace !== undefined) updateData.recentFlatPace = validated.recentFlatPace || null;
    if (validated.climbingStrength !== undefined) updateData.climbingStrength = validated.climbingStrength;
    if (validated.weeklyTrainingVolume !== undefined) updateData.weeklyTrainingVolume = validated.weeklyTrainingVolume || null;
    if (validated.crewSupport !== undefined) updateData.crewSupport = validated.crewSupport;
    if (validated.firstName !== undefined) updateData.firstName = validated.firstName;
    if (validated.email !== undefined) updateData.email = validated.email;

    // Handle completedAt from request body (for final submission)
    if (body.completedAt !== undefined) {
      updateData.completedAt = body.completedAt ? new Date(body.completedAt) : null;
    }

    // Custom tier fields
    if (body.stravaAthleteId !== undefined) updateData.stravaAthleteId = body.stravaAthleteId || null;
    if (body.stravaData !== undefined) updateData.stravaData = body.stravaData || null;
    if (body.recentRaceResults !== undefined) updateData.recentRaceResults = body.recentRaceResults || null;
    if (body.biggestClimbTrained !== undefined) updateData.biggestClimbTrained = body.biggestClimbTrained || null;
    if (body.giIssuesHistory !== undefined) updateData.giIssuesHistory = body.giIssuesHistory || null;
    if (body.blisterProneAreas !== undefined) updateData.blisterProneAreas = body.blisterProneAreas || null;
    if (body.nutritionPreferences !== undefined) updateData.nutritionPreferences = body.nutritionPreferences || null;
    if (body.biggestRaceFears !== undefined) updateData.biggestRaceFears = body.biggestRaceFears || null;

    // Update questionnaire
    const updated = await db
      .update(questionnaire)
      .set(updateData)
      .where(eq(questionnaire.id, id))
      .returning();

    return NextResponse.json({
      questionnaire: updated[0],
      message: "Questionnaire updated successfully",
    });
  } catch (error) {
    console.error("Error updating questionnaire:", error);

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
 * DELETE /api/questionnaire/[id]
 * Delete a questionnaire (optional - for cleanup)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // Verify ownership before deleting
    const existing = await db
      .select({
        questionnaire: questionnaire,
        purchase: purchase,
      })
      .from(questionnaire)
      .innerJoin(purchase, eq(questionnaire.purchaseId, purchase.id))
      .where(eq(questionnaire.id, id))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: "Questionnaire not found" },
        { status: 404 }
      );
    }

    if (existing[0].purchase.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden - you don't have access to this questionnaire" },
        { status: 403 }
      );
    }

    // Delete questionnaire
    await db.delete(questionnaire).where(eq(questionnaire.id, id));

    return NextResponse.json({
      message: "Questionnaire deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting questionnaire:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
