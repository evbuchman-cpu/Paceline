import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withConciseRetry, robustParseAndValidate } from "./utils";
import {
  pacingStrategySchema,
  PacingStrategy,
  PacingInput,
  AIStepResponse,
} from "../schemas/guide-sections";

const MAX_TOKENS = 8192;

const SYSTEM_PROMPT = `You are an expert ultramarathon pacing coach. Create section-by-section pacing plans accounting for terrain, elevation, and fatigue.

Pacing rules:
- ELEVATION: +30s/mi per 1000ft (strong climber), +45s (average), +60s (struggles)
- FATIGUE: Slow 10-15% after mile 60-70
- TERRAIN: Technical trails +20-30% vs runnable
- EARLY: Start conservative (slower than goal) first 20-30%
- NIGHT: Add 10-20% for darkness

OUTPUT CONSTRAINTS (critical for token efficiency):
- "notes" field: Max 30 words, tactical only
- "paceStrategy": Max 100 words
- "keyPacingNotes": 4-6 items, max 20 words each
- Create 8-12 sections (not more)
- No redundant information between sections

Return ONLY valid JSON. No markdown, no explanation.`;

export async function generatePacingStrategy(
  input: PacingInput
): Promise<AIStepResponse<PacingStrategy>> {
  const startTime = Date.now();
  console.log("🚀 Step 2 - Pacing Strategy:", input.goalFinishTime, "goal");

  // Extract only needed fields from raceOverview (minimize input tokens)
  const raceData = {
    distance: input.raceOverview.distance,
    elevationGain: input.raceOverview.elevationGain,
    aidStations: input.raceOverview.aidStations.map(s => ({
      name: s.name,
      mile: s.mile,
      cutoff: s.cutoff
    })),
    // Only include key elevation points (reduce from full profile)
    keyElevation: input.raceOverview.elevationProfile
      .filter((_, i, arr) => i === 0 || i === arr.length - 1 || i % Math.ceil(arr.length / 8) === 0)
      .map(p => ({ mile: p.mile, elevation: p.elevation }))
  };

  // Compact Strava summary
  const stravaInfo = input.stravaData
    ? `Strava: pace ${input.stravaData.recentActivities?.avgPace || "N/A"}, ` +
      `${input.stravaData.recentActivities?.totalDistance || 0}mi/90days, ` +
      `fitness ${input.stravaData.fitnessScore || "N/A"}`
    : "No Strava data";

  const userPrompt = `Create pacing strategy:

RACE: ${JSON.stringify(raceData)}

RUNNER: Goal ${input.goalFinishTime}, ${input.climbingStrength} climber, ${input.ultrasCompleted} ultras. ${stravaInfo}

Return JSON:
{
  "sections": [{"name": "string", "startMile": num, "endMile": num, "distance": num, "elevationGain": num, "elevationLoss": num, "terrainType": "runnable|technical|mixed|road", "targetPace": "MM:SS/mi", "sectionTime": "H:MM", "cumulativeTime": "H:MM", "cumulativeMile": num, "notes": "max 30 words"}],
  "totalEstimatedTime": "H:MM",
  "averagePace": "MM:SS/mi",
  "cutoffBuffer": "string",
  "paceStrategy": "max 100 words",
  "keyPacingNotes": ["max 20 words each", "4-6 items"]
}

Rules: 8-12 sections using aid stations as endpoints. Include 2-5min aid station time (5-15min for crew stations).`;

  // Use concise retry to handle truncation
  const response = await withConciseRetry({
    anthropic,
    model: CLAUDE_MODEL,
    maxTokens: MAX_TOKENS,
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
    stepName: "generatePacingStrategy",
    maxRetries: 2,
  });

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Use robust parser with truncation detection
  const { data, truncationDetected, recoveryApplied } = robustParseAndValidate(
    content,
    pacingStrategySchema,
    {
      stepName: "generatePacingStrategy",
      maxTokens: MAX_TOKENS,
      usage: response.usage,
      stopReason: response.stop_reason,
    }
  );

  if (truncationDetected) {
    console.warn(`⚠️ Step 2 - Pacing Strategy: Truncation detected`);
  }
  if (recoveryApplied) {
    console.log(`🔧 Step 2 - Pacing Strategy: Recovery applied`);
  }

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
