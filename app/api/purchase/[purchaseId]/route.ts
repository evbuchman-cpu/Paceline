import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { purchase } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";

export const dynamic = "force-dynamic";

// PATCH — archive or restore a purchase (hides/shows its card on dashboard)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ purchaseId: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { purchaseId } = await params;
    const { action } = await req.json(); // "archive" | "restore"

    const rows = await db
      .select()
      .from(purchase)
      .where(and(eq(purchase.id, purchaseId), eq(purchase.userId, session.user.id)))
      .limit(1);

    if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await db
      .update(purchase)
      .set({
        archivedAt: action === "archive" ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(purchase.id, purchaseId));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
