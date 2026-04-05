import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

/**
 * Strava OAuth Authorization Endpoint
 * Redirects user to Strava's OAuth authorization page
 *
 * GET /api/strava/authorize?questionnaireId=xxx
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const questionnaireId = searchParams.get("questionnaireId");

    if (!questionnaireId) {
      return Response.json(
        { error: "questionnaireId is required" },
        { status: 400 }
      );
    }

    // Build Strava OAuth URL
    const stravaAuthUrl = new URL("https://www.strava.com/oauth/authorize");
    stravaAuthUrl.searchParams.append(
      "client_id",
      process.env.STRAVA_CLIENT_ID!
    );
    stravaAuthUrl.searchParams.append(
      "redirect_uri",
      process.env.STRAVA_REDIRECT_URI!
    );
    stravaAuthUrl.searchParams.append("response_type", "code");
    stravaAuthUrl.searchParams.append("scope", "activity:read_all");
    stravaAuthUrl.searchParams.append("state", questionnaireId); // Pass questionnaireId through state

    // Redirect to Strava
    return Response.redirect(stravaAuthUrl.toString());
  } catch (error) {
    console.error("Strava authorization error:", error);
    return Response.json(
      { error: "Failed to initiate Strava authorization" },
      { status: 500 }
    );
  }
}
