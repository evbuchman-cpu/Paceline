/**
 * Strava API Client
 * Handles OAuth and activity data fetching
 */

interface StravaTokenResponse {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
  };
}

interface StravaActivity {
  id: number;
  name: string;
  distance: number; // meters
  moving_time: number; // seconds
  elapsed_time: number; // seconds
  total_elevation_gain: number; // meters
  type: string; // "Run", "Trail Run", etc.
  start_date: string;
  average_speed: number; // m/s
  max_speed: number; // m/s
  elev_high: number;
  elev_low: number;
}

interface StravaAnalysis {
  totalActivities: number;
  totalDistance: number; // miles
  totalElevationGain: number; // feet
  averageFlatPace: string; // MM:SS per mile
  averageClimbPace: string; // MM:SS per mile
  weeklyVolume: number; // miles
  longestRun: number; // miles
  elevationTolerance: string; // "high" | "medium" | "low"
  recentActivities: Array<{
    date: string;
    distance: number;
    elevationGain: number;
    pace: string;
  }>;
}

/**
 * Exchange OAuth authorization code for access token
 */
export async function exchangeCodeForToken(
  code: string
): Promise<StravaTokenResponse> {
  const response = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID!,
      client_secret: process.env.STRAVA_CLIENT_SECRET!,
      code,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Strava token exchange failed: ${error}`);
  }

  return response.json();
}

/**
 * Fetch activities from the last 90 days
 */
export async function fetchActivities(
  accessToken: string,
  days: number = 90
): Promise<StravaActivity[]> {
  const after = Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;

  const response = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=200`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch Strava activities: ${error}`);
  }

  return response.json();
}

/**
 * Analyze 90 days of Strava activities
 * Calculates fitness metrics for race planning
 */
export async function analyzeActivities(
  activities: StravaActivity[]
): Promise<StravaAnalysis> {
  // Filter for running activities only
  const runActivities = activities.filter(
    (a) =>
      a.type === "Run" ||
      a.type === "TrailRun" ||
      a.type === "Trail Run" ||
      a.type === "VirtualRun"
  );

  if (runActivities.length === 0) {
    throw new Error("No running activities found in the last 90 days");
  }

  // Helper functions
  const metersToMiles = (meters: number) => meters * 0.000621371;
  const metersToFeet = (meters: number) => meters * 3.28084;
  const secondsPerMileToMinutes = (speed: number) => {
    // speed is in m/s, convert to min/mile
    const milesPerSecond = speed * 0.000621371;
    const minutesPerMile = 1 / (milesPerSecond * 60);
    return minutesPerMile;
  };
  const formatPace = (minutesPerMile: number) => {
    const minutes = Math.floor(minutesPerMile);
    const seconds = Math.round((minutesPerMile - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Calculate total stats
  const totalDistance = runActivities.reduce(
    (sum, a) => sum + metersToMiles(a.distance),
    0
  );
  const totalElevationGain = runActivities.reduce(
    (sum, a) => sum + metersToFeet(a.total_elevation_gain),
    0
  );

  // Calculate weekly average (over 12 weeks)
  const weeklyVolume = totalDistance / 12;

  // Find longest run
  const longestRun = Math.max(
    ...runActivities.map((a) => metersToMiles(a.distance))
  );

  // Separate flat vs hilly runs (flat = <500ft elevation per 10 miles)
  const flatRuns = runActivities.filter((a) => {
    const distanceMiles = metersToMiles(a.distance);
    const elevationFeet = metersToFeet(a.total_elevation_gain);
    const elevationPer10Miles = (elevationFeet / distanceMiles) * 10;
    return elevationPer10Miles < 500 && distanceMiles > 3; // Min 3 miles
  });

  const hillyRuns = runActivities.filter((a) => {
    const distanceMiles = metersToMiles(a.distance);
    const elevationFeet = metersToFeet(a.total_elevation_gain);
    const elevationPer10Miles = (elevationFeet / distanceMiles) * 10;
    return elevationPer10Miles >= 500 && distanceMiles > 3;
  });

  // Calculate average flat pace
  let averageFlatPace = "10:00"; // Default fallback
  if (flatRuns.length > 0) {
    const avgFlatSpeed =
      flatRuns.reduce((sum, a) => sum + a.average_speed, 0) / flatRuns.length;
    const flatPaceMinutes = secondsPerMileToMinutes(avgFlatSpeed);
    averageFlatPace = formatPace(flatPaceMinutes);
  }

  // Calculate average climb pace
  let averageClimbPace = "12:00"; // Default fallback
  if (hillyRuns.length > 0) {
    const avgHillySpeed =
      hillyRuns.reduce((sum, a) => sum + a.average_speed, 0) /
      hillyRuns.length;
    const hillyPaceMinutes = secondsPerMileToMinutes(avgHillySpeed);
    averageClimbPace = formatPace(hillyPaceMinutes);
  }

  // Determine elevation tolerance
  let elevationTolerance: "high" | "medium" | "low" = "medium";
  const avgElevationPerMile = totalElevationGain / totalDistance;
  if (avgElevationPerMile > 100) {
    elevationTolerance = "high";
  } else if (avgElevationPerMile < 50) {
    elevationTolerance = "low";
  }

  // Get recent activities (last 10)
  const recentActivities = runActivities.slice(0, 10).map((a) => ({
    date: new Date(a.start_date).toLocaleDateString(),
    distance: Math.round(metersToMiles(a.distance) * 10) / 10,
    elevationGain: Math.round(metersToFeet(a.total_elevation_gain)),
    pace: formatPace(secondsPerMileToMinutes(a.average_speed)),
  }));

  return {
    totalActivities: runActivities.length,
    totalDistance: Math.round(totalDistance),
    totalElevationGain: Math.round(totalElevationGain),
    averageFlatPace,
    averageClimbPace,
    weeklyVolume: Math.round(weeklyVolume),
    longestRun: Math.round(longestRun * 10) / 10,
    elevationTolerance,
    recentActivities,
  };
}

/**
 * Refresh Strava access token
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<StravaTokenResponse> {
  const response = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID!,
      client_secret: process.env.STRAVA_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Strava token refresh failed: ${error}`);
  }

  return response.json();
}
