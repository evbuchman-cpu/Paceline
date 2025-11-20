import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withRetry, parseAndValidate } from "./utils";
import {
  pacingStrategySchema,
  PacingStrategy,
  PacingInput,
  AIStepResponse,
} from "../schemas/guide-sections";

const SYSTEM_PROMPT = `You are an expert ultramarathon coach specializing in race pacing strategy. Your role is to create personalized, section-by-section pacing plans that account for terrain, elevation, fatigue, and individual runner capabilities.

Key pacing principles you must apply:
1. ELEVATION ADJUSTMENT: Add 30-60 seconds per mile for every 1000ft of climbing, adjusted by climbing strength
   - Strong climber: +30s/mi per 1000ft
   - Average climber: +45s/mi per 1000ft
   - Struggles on climbs: +60s/mi per 1000ft
2. FATIGUE FACTOR: Slow pace by 10-15% after mile 60-70 for most runners
3. TERRAIN: Technical trails add 20-30% to pace vs runnable trails
4. EARLY RESTRAINT: Start conservative (slower than goal pace) for the first 20-30%
5. NIGHT RUNNING: Add 10-20% for sections run in darkness

If Strava data is provided, use it to calibrate paces. Otherwise, estimate based on goal finish time.

Be specific with section times. Runners need exact numbers for race planning.

CRITICAL: Return ONLY valid JSON. No markdown formatting, no explanation text, just the JSON object matching the exact schema provided.`;

export async function generatePacingStrategy(
  input: PacingInput
): Promise<AIStepResponse<PacingStrategy>> {
  const startTime = Date.now();
  console.log("🚀 Step 2 - Pacing Strategy:", input.goalFinishTime, "goal");

  // Format Strava data if available
  const stravaSection = input.stravaData
    ? `
Strava Data (90-day analysis):
- Athlete ID: ${input.stravaData.athleteId}
- Recent Avg Pace: ${input.stravaData.recentActivities?.avgPace || "N/A"}
- Recent Avg Heart Rate: ${input.stravaData.recentActivities?.avgHeartRate || "N/A"}
- Total Distance (90 days): ${input.stravaData.recentActivities?.totalDistance || "N/A"} miles
- Elevation Gained (90 days): ${input.stravaData.recentActivities?.elevationGain || "N/A"} ft
- Fitness Score: ${input.stravaData.fitnessScore || "N/A"}
`
    : "No Strava data available - estimate paces based on goal time and experience level.";

  const userPrompt = `Create a detailed pacing strategy for this ultramarathon:

RACE DATA:
${JSON.stringify(input.raceOverview, null, 2)}

RUNNER PROFILE:
- Goal Finish Time: ${input.goalFinishTime}
- Climbing Strength: ${input.climbingStrength}
- Ultras Completed: ${input.ultrasCompleted}
${stravaSection}

Return a JSON object with this exact structure:
{
  "sections": [
    {
      "name": "<section name - use aid station names as endpoints>",
      "startMile": <number>,
      "endMile": <number>,
      "distance": <number>,
      "elevationGain": <number in feet>,
      "elevationLoss": <number in feet>,
      "terrainType": "<runnable|technical|mixed|road>",
      "targetPace": "<pace in MM:SS/mi format>",
      "sectionTime": "<time in H:MM format>",
      "cumulativeTime": "<cumulative time in H:MM format>",
      "cumulativeMile": <number>,
      "notes": "<tactical notes for this section - be specific about terrain, when to push/hold back>"
    }
  ],
  "totalEstimatedTime": "<total time in H:MM format>",
  "averagePace": "<overall average pace in MM:SS/mi format>",
  "cutoffBuffer": "<estimated buffer from last cutoff>",
  "paceStrategy": "<paragraph explaining the overall strategy, key decision points, and contingency pacing>",
  "keyPacingNotes": [
    "<important pacing note 1>",
    "<important pacing note 2>",
    "<etc - include 4-6 key tactical notes>"
  ]
}

Break the course into 8-15 sections, typically using aid stations as endpoints.
Ensure cumulative times add up correctly.
Account for time spent at aid stations (2-5 min for small, 5-15 min for major crew stations).`;

  const response = await withRetry(
    () =>
      anthropic.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      }),
    "generatePacingStrategy"
  );

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";
  const data = parseAndValidate(content, pacingStrategySchema, "generatePacingStrategy");

  const generationTime = Date.now() - startTime;
  console.log(
    `✅ Step 2 - Pacing Strategy complete: ${generationTime}ms | ${response.usage.input_tokens} in / ${response.usage.output_tokens} out`
  );

  return {
    success: true,
    data,
    usage: {
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
      totalTokens: response.usage.input_tokens + response.usage.output_tokens,
      estimatedCost: calculateCost(response.usage),
    },
    generationTime,
  };
}
