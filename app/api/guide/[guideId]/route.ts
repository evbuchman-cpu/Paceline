import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { guide, purchase } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ guideId: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { guideId } = await params;

    // Verify ownership before deleting
    const result = await db
      .select({ guide, purchase })
      .from(guide)
      .innerJoin(purchase, eq(guide.purchaseId, purchase.id))
      .where(eq(guide.id, guideId))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 });
    }

    if (result[0].purchase.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await db.delete(guide).where(eq(guide.id, guideId));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
