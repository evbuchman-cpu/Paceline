import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { guide, purchase } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/guides/[id]/download
 * Verify ownership then redirect to the R2 PDF URL.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: guideId } = await params;

    const rows = await db
      .select({ guide, purchase })
      .from(guide)
      .innerJoin(purchase, eq(guide.purchaseId, purchase.id))
      .where(eq(guide.id, guideId))
      .limit(1);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 });
    }

    const { guide: g, purchase: p } = rows[0];

    if (p.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (g.status !== "completed" || !g.pdfUrl) {
      return NextResponse.json({ error: "Guide PDF not available" }, { status: 404 });
    }

    // Redirect to the R2 public URL
    return NextResponse.redirect(g.pdfUrl, { status: 302 });
  } catch (error) {
    console.error("Error downloading guide:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
