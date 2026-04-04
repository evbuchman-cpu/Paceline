import { db } from "@/db/drizzle";
import { account, questionnaire } from "@/db/schema";
import { auth } from "@/lib/auth";
import {
  analyzeActivities,
  fetchActivities,
  refreshAccessToken,
} from "@/lib/strava-client";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { checkRateLimit, RATE_LIMITS, getRateLimitHeaders } from "@/lib/rate-limiter";
import { logger } from "@/lib/logger";

export const dynamic = 'force-dynamic';

/**
 * Strava Activity Analysis Endpoint
 * Fetches 90 days of Strava activities and analyzes fitness metrics
 *
 * POST /api/strava/analyze
 * Body: { questionnaireId: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { questionnaireId } = body;

    if (!questionnaireId) {
      return Response.json(
        { error: "questionnaireId is required" },
        { status: 400 }
      );
    }

    // Get current user session
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check rate limit (5 requests per hour)
    const rateLimitResult = checkRateLimit(
      `strava-analyze:${session.user.id}`,
      RATE_LIMITS.STRAVA_ANALYZE
    );

    if (!rateLimitResult.allowed) {
      logger.warn("Rate limit exceeded for Strava analysis", {
        userId: session.user.id,
        retryAfter: rateLimitResult.retryAfter,
      });

      return Response.json(
        {
          error: "Rate limit exceeded",
          message: `You can analyze Strava data up to 5 times per hour. Please try again in ${rateLimitResult.retryAfter} seconds.`,
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      );
    }

    // Get Strava account from database
    const stravaAccounts = await db
      .select()
      .from(account)
      .where(eq(account.userId, session.user.id))
      .where(eq(account.providerId, "strava"))
      .limit(1);

    if (stravaAccounts.length === 0) {
      return Response.json(
        { error: "Strava account not connected" },
        { status: 404 }
      );
    }

    const stravaAccount = stravaAccounts[0];
    let accessToken = stravaAccount.accessToken;

    // Check if token is expired and refresh if needed
    if (
      stravaAccount.accessTokenExpiresAt &&
      new Date(stravaAccount.accessTokenExpiresAt) < new Date()
    ) {
      console.log("🔄 Strava access token expired, refreshing...");

      if (!stravaAccount.refreshToken) {
        return Response.json(
          { error: "Refresh token not available, please reconnect Strava" },
          { status: 401 }
        );
      }

      const tokenResponse = await refreshAccessToken(
        stravaAccount.refreshToken
      );

      // Update tokens in database
      await db
        .update(account)
        .set({
          accessToken: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token,
          accessTokenExpiresAt: new Date(tokenResponse.expires_at * 1000),
          updatedAt: new Date(),
        })
        .where(eq(account.id, stravaAccount.id));

      accessToken = tokenResponse.access_token;
    }

    if (!accessToken) {
      return Response.json(
        { error: "Access token not found" },
        { status: 401 }
      );
    }

    console.log("📊 Fetching Strava activities for user:", session.user.id);

    // Fetch 90 days of activities
    const activities = await fetchActivities(accessToken, 90);

    console.log(`✅ Fetched ${activities.length} activities from Strava`);

    // Analyze activities
    const analysis = await analyzeActivities(activities);

    console.log("📈 Strava analysis complete:", {
      totalActivities: analysis.totalActivities,
      weeklyVolume: analysis.weeklyVolume,
      averageFlatPace: analysis.averageFlatPace,
    });

    // Store analysis in questionnaire
    await db
      .update(questionnaire)
      .set({
        stravaData: analysis,
        updatedAt: new Date(),
      })
      .where(eq(questionnaire.id, questionnaireId));

    return Response.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("Strava analysis error:", error);

    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes("No running activities")) {
        return Response.json(
          {
            error:
              "No running activities found in the last 90 days. Please ensure you have running activities on Strava.",
          },
          { status: 400 }
        );
      }
    }

    return Response.json(
      { error: "Failed to analyze Strava activities" },
      { status: 500 }
    );
  }
}
