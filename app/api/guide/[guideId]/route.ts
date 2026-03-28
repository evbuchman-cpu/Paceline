import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { guide, purchase } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function getOwnedGuide(guideId: string, userId: string) {
  const result = await db
    .select({ guide, purchase })
    .from(guide)
    .innerJoin(purchase, eq(guide.purchaseId, purchase.id))
    .where(eq(guide.id, guideId))
    .limit(1);

  if (result.length === 0) return null;
  if (result[0].purchase.userId !== userId) return null;
  return result[0];
}

// PATCH — archive or restore
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ guideId: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { guideId } = await params;
    const { action } = await req.json(); // "archive" | "restore"

    const owned = await getOwnedGuide(guideId, session.user.id);
    if (!owned) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await db
      .update(guide)
      .set({
        archivedAt: action === "archive" ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(guide.id, guideId));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE — permanent, only works if already archived
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ guideId: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { guideId } = await params;
    const owned = await getOwnedGuide(guideId, session.user.id);
    if (!owned) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (!owned.guide.archivedAt) {
      return NextResponse.json(
        { error: "Guide must be archived before permanent deletion" },
        { status: 400 }
      );
    }

    await db.delete(guide).where(eq(guide.id, guideId));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
