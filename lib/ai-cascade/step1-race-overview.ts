import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withConciseRetry, robustParseAndValidate } from "./utils";
import {
  raceOverviewSchema,
  RaceOverview,
  RaceOverviewInput,
  AIStepResponse,
} from "../schemas/guide-sections";
import { logger } from "@/lib/logger";

const MAX_TOKENS = 8192;

const SYSTEM_PROMPT = `You are an ultramarathon race analyst. Provide accurate race overviews for race day planning.

ACCURACY RULES (critical):
1. Aid stations, miles, cutoffs, distances, elevation: Extract ONLY from provided website content. Do not guess or use prior knowledge.
2. If website shows different data than you expect, TRUST THE WEBSITE.
3. Include ALL aid stations mentioned on the website - do not skip any.
4. Use exact names, exact miles, exact cutoff times from website.
5. For weather/general advice: Use location and race month to provide reasonable estimates.

TOUGH SECTIONS: Identify the hardest climbs/descents from elevation data. Look for:
- Biggest elevation gains in shortest distances
- Technical descents
- Exposed sections
- Sections mentioned as difficult on website

OUTPUT CONSTRAINTS (critical for downstream steps):
- "description": Max 100 words
- "elevationProfile": Max 12 points (start, finish, major climbs/descents, aid stations)
- "aidStations": Include ALL stations from website with exact names/miles
- "toughSections": 3-5 hardest sections, notes max 30 words each
- "courseNotes": Max 80 words

Return ONLY valid JSON. No markdown.`;

export async function generateRaceOverview(
  input: RaceOverviewInput
): Promise<AIStepResponse<RaceOverview>> {
  const startTime = Date.now();
  logger.debug("AI Step 1: Race Overview started", { raceName: input.raceName });

  // Build prompt with website content if available
  const websiteSection = input.websiteContent
    ? `

WEBSITE CONTENT (use this as primary source):
---
${input.websiteContent}
---

Extract aid stations, cutoffs, distances, elevation, crew/drop bag access from the above content.`
    : "";

  const userPrompt = `Analyze race:

Race: ${input.raceName}
Website: ${input.raceWebsite || "Not provided"}
Date: ${input.raceDate}${websiteSection}

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
    logger.warn("AI Step 1: Truncation detected", { step: "Race Overview" });
  }
  if (recoveryApplied) {
    logger.debug("AI Step 1: Recovery applied", { step: "Race Overview" });
  }

  const generationTime = Date.now() - startTime;
  logger.debug("AI Step 1: Race Overview complete", {
    generationTimeMs: generationTime,
    inputTokens: response.usage.input_tokens,
    outputTokens: response.usage.output_tokens,
  });

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
