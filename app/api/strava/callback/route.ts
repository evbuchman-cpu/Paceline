import { db } from "@/db/drizzle";
import { account, questionnaire } from "@/db/schema";
import { auth } from "@/lib/auth";
import { exchangeCodeForToken } from "@/lib/strava-client";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

/**
 * Strava OAuth Callback Endpoint
 * Handles the OAuth callback from Strava
 *
 * GET /api/strava/callback?code=xxx&state=questionnaireId
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get("code");
    const questionnaireId = searchParams.get("state"); // questionnaireId passed through state
    const error = searchParams.get("error");

    // Handle user denial
    if (error === "access_denied") {
      const redirectUrl = new URL(
        `/dashboard/questionnaire/${questionnaireId}`,
        process.env.NEXT_PUBLIC_APP_URL
      );
      redirectUrl.searchParams.set("strava_error", "access_denied");
      return Response.redirect(redirectUrl.toString());
    }

    // Validate required parameters
    if (!code || !questionnaireId) {
      return Response.json(
        { error: "Missing code or questionnaireId" },
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

    // Exchange code for access token
    const tokenResponse = await exchangeCodeForToken(code);

    // Store Strava tokens in account table (Better Auth pattern)
    // Check if Strava account already exists
    const existingAccount = await db
      .select()
      .from(account)
      .where(eq(account.userId, session.user.id))
      .where(eq(account.providerId, "strava"))
      .limit(1);

    if (existingAccount.length > 0) {
      // Update existing account
      await db
        .update(account)
        .set({
          accessToken: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token,
          accessTokenExpiresAt: new Date(tokenResponse.expires_at * 1000),
          updatedAt: new Date(),
        })
        .where(eq(account.id, existingAccount[0].id));
    } else {
      // Create new account entry
      await db.insert(account).values({
        id: `strava_${tokenResponse.athlete.id}`,
        accountId: tokenResponse.athlete.id.toString(),
        providerId: "strava",
        userId: session.user.id,
        accessToken: tokenResponse.access_token,
        refreshToken: tokenResponse.refresh_token,
        accessTokenExpiresAt: new Date(tokenResponse.expires_at * 1000),
        scope: "activity:read_all",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Update questionnaire with Strava athlete ID
    await db
      .update(questionnaire)
      .set({
        stravaAthleteId: tokenResponse.athlete.id.toString(),
        updatedAt: new Date(),
      })
      .where(eq(questionnaire.id, questionnaireId));

    console.log("✅ Strava OAuth successful for user:", session.user.id);

    // Check if this is a test questionnaire (temporary for testing)
    const questionnaireData = await db
      .select()
      .from(questionnaire)
      .where(eq(questionnaire.id, questionnaireId))
      .limit(1);

    const isTestQuestionnaire =
      questionnaireData[0]?.raceName?.includes("Test Race - Strava OAuth");

    // Redirect back to appropriate page
    const redirectUrl = isTestQuestionnaire
      ? new URL(`/test-strava`, process.env.NEXT_PUBLIC_APP_URL)
      : new URL(
          `/dashboard/questionnaire/${questionnaireId}`,
          process.env.NEXT_PUBLIC_APP_URL
        );

    redirectUrl.searchParams.set("strava_success", "true");
    redirectUrl.searchParams.set("questionnaireId", questionnaireId);

    return Response.redirect(redirectUrl.toString());
  } catch (error) {
    console.error("Strava callback error:", error);

    // Redirect with error message
    const redirectUrl = new URL(
      "/dashboard/questionnaire",
      process.env.NEXT_PUBLIC_APP_URL
    );
    redirectUrl.searchParams.set("strava_error", "connection_failed");

    return Response.redirect(redirectUrl.toString());
  }
}
