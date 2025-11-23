import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withConciseRetry, robustParseAndValidate } from "./utils";
import {
  raceOverviewSchema,
  RaceOverview,
  RaceOverviewInput,
  AIStepResponse,
} from "../schemas/guide-sections";

const MAX_TOKENS = 8192;

const SYSTEM_PROMPT = `You are an ultramarathon race analyst. Provide accurate race overviews for race day planning.

Include:
- Aid stations with mile markers, cutoffs, crew/drop bag access
- Elevation profile at key points
- Tough sections with tactical advice
- Historical weather for race month

OUTPUT CONSTRAINTS (critical for downstream steps):
- "description": Max 100 words
- "elevationProfile": Max 12 points (start, finish, major climbs/descents, aid stations)
- "aidStations": Include only essential services (water, medical, food types)
- "toughSections": 3-5 sections, notes max 30 words each
- "courseNotes": Max 80 words

Return ONLY valid JSON. No markdown.`;

export async function generateRaceOverview(
  input: RaceOverviewInput
): Promise<AIStepResponse<RaceOverview>> {
  const startTime = Date.now();
  console.log("🚀 Step 1 - Race Overview:", input.raceName);

  const userPrompt = `Analyze race:

Race: ${input.raceName}
Website: ${input.raceWebsite || "Not provided"}
Date: ${input.raceDate}

Return JSON:
{
  "description": "max 100 words",
  "distance": num,
  "elevationGain": num,
  "elevationProfile": [{"mile": num, "elevation": num, "landmark": "optional"}],
  "aidStations": [{"name": "string", "mile": num, "cutoff": "time or None", "crewAccess": bool, "dropBagAccess": bool, "services": ["essential only"]}],
  "weatherPatterns": {"month": "string", "avgHighTemp": num, "avgLowTemp": num, "precipitation": "string", "sunriseTime": "time", "sunsetTime": "time"},
  "toughSections": [{"name": "string", "miles": "range", "difficulty": "moderate|hard|brutal", "elevationChange": "string", "notes": "max 30 words"}],
  "courseNotes": "max 80 words"
}

Max 12 elevation points. Include all aid stations. Identify 3-5 tough sections.`;

  // Use concise retry to handle truncation
  const response = await withConciseRetry({
    anthropic,
    model: CLAUDE_MODEL,
    maxTokens: MAX_TOKENS,
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
    stepName: "generateRaceOverview",
    maxRetries: 2,
  });

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Use robust parser with truncation detection
  const { data, truncationDetected, recoveryApplied } = robustParseAndValidate(
    content,
    raceOverviewSchema,
    {
      stepName: "generateRaceOverview",
      maxTokens: MAX_TOKENS,
      usage: response.usage,
      stopReason: response.stop_reason,
    }
  );

  if (truncationDetected) {
    console.warn(`⚠️ Step 1 - Race Overview: Truncation detected`);
  }
  if (recoveryApplied) {
    console.log(`🔧 Step 1 - Race Overview: Recovery applied`);
  }

  const generationTime = Date.now() - startTime;
  console.log(
    `✅ Step 1 - Race Overview complete: ${generationTime}ms | ${response.usage.input_tokens} in / ${response.usage.output_tokens} out`
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
