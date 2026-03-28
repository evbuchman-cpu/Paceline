import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { guide, purchase } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

// Maps elapsed time buckets to a simulated step number for the UI.
// The actual pipeline runs synchronously — we cycle through step names visually.
const GENERATION_STEPS = [
  "Analyzing race course",
  "Building your pacing strategy",
  "Mapping cutoff windows",
  "Planning crew logistics",
  "Designing drop bag strategy",
  "Calculating nutrition timeline",
  "Writing contingency protocols",
  "Crafting mental strategy",
];

function getSimulatedStep(createdAt: Date): { step: number; stepName: string; totalSteps: number } {
  const elapsed = Date.now() - createdAt.getTime();
  const stepDuration = 15_000; // cycle every 15s
  const stepIndex = Math.floor(elapsed / stepDuration) % GENERATION_STEPS.length;
  return {
    step: stepIndex + 1,
    stepName: GENERATION_STEPS[stepIndex],
    totalSteps: GENERATION_STEPS.length,
  };
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ guideId: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { guideId } = await params;

    const result = await db
      .select({ guide, purchase })
      .from(guide)
      .innerJoin(purchase, eq(guide.purchaseId, purchase.id))
      .where(eq(guide.id, guideId))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 });
    }

    const { guide: g, purchase: p } = result[0];

    if (p.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const response: Record<string, unknown> = {
      guideId: g.id,
      status: g.status,
      pdfUrl: g.pdfUrl || null,
      error: g.error || null,
      createdAt: g.createdAt,
      updatedAt: g.updatedAt,
    };

    if (g.status === "generating") {
      const simulated = getSimulatedStep(g.createdAt);
      response.step = simulated.step;
      response.stepName = simulated.stepName;
      response.totalSteps = simulated.totalSteps;
    }

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
