import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { guide, purchase } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { logger } from "@/lib/logger";

export const dynamic = 'force-dynamic';

/**
 * GET /api/guides/[id]/download
 * Redirect to the PDF download URL (R2 storage)
 * Verifies ownership and tracks downloads
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const guideId = params.id;
    logger.info("Download request for guide", { guideId, userId: session.user.id });

    // Step 2: Fetch guide with purchase info
    const guideResult = await db
      .select({
        guide: guide,
        purchase: purchase,
      })
      .from(guide)
      .innerJoin(purchase, eq(guide.purchaseId, purchase.id))
      .where(eq(guide.id, guideId))
      .limit(1);

    if (guideResult.length === 0) {
      logger.warn("Guide not found for download", { guideId });
      return NextResponse.json(
        { error: "Guide not found" },
        { status: 404 }
      );
    }

    const { guide: g, purchase: p } = guideResult[0];

    // Step 3: Verify ownership
    if (p.userId !== session.user.id) {
      logger.warn("Unauthorized download attempt", {
        guideId,
        userId: session.user.id,
        ownerId: p.userId
      });
      return NextResponse.json(
        { error: "Unauthorized - you do not own this guide" },
        { status: 403 }
      );
    }

    // Step 4: Check if guide is completed
    if (g.status !== "completed") {
      logger.warn("Download attempt for incomplete guide", {
        guideId,
        status: g.status
      });
      return NextResponse.json(
        {
          error: "Guide is not ready for download",
          status: g.status,
          message: g.status === "generating"
            ? "Your guide is still being generated. Please check back in a few minutes."
            : "Your guide generation failed. Please contact support."
        },
        { status: 400 }
      );
    }

    // Step 5: Verify PDF URL exists
    if (!g.pdfUrl) {
      logger.error("Guide missing PDF URL", { guideId });
      return NextResponse.json(
        { error: "PDF URL not available" },
        { status: 500 }
      );
    }

    logger.info("Redirecting to PDF download", {
      guideId,
      userId: session.user.id,
      pdfUrl: g.pdfUrl
    });

    // Step 6: Redirect to R2 PDF URL
    // Using 307 Temporary Redirect to maintain GET method
    return NextResponse.redirect(g.pdfUrl, 307);

  } catch (error) {
    logger.error("Error processing download request", { error, guideId: params.id });
    return NextResponse.json(
      { error: "Failed to process download request" },
      { status: 500 }
    );
  }
}
