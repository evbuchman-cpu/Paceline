import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withConciseRetry, robustParseAndValidate } from "./utils";
import {
  nutritionTimelineSchema,
  NutritionTimeline,
  NutritionInput,
  AIStepResponse,
} from "../schemas/guide-sections";
import { logger } from "@/lib/logger";

// Increased token limit for nutrition timeline (many entries)
const MAX_TOKENS = 10240;

const SYSTEM_PROMPT = `You are an ultramarathon nutritionist. Create practical fueling timelines.

Nutrition rules:
- Calories: 200-300/hr
- Sodium: 300-600mg/hr
- Fluids: 16-24oz/hr
- After 8hrs: transition gels to real food
- Alternate sweet/salty for variety

OUTPUT CONSTRAINTS (critical):
- "timeline": Max 15 entries (at aid stations + key points)
- "foods" array: Max 3 items per entry
- "notes" field: Max 15 words per entry
- "preRaceNutrition": Max 50 words
- "hydrationStrategy": Max 40 words
- "caffeineStrategy": Max 40 words
- "stomachIssuesPrevention": 4-5 tips, max 12 words each
- "aidStationStrategy": Max 40 words

Return ONLY valid JSON. No markdown.`;

export async function generateNutritionTimeline(
  input: NutritionInput
): Promise<AIStepResponse<NutritionTimeline>> {
  const startTime = Date.now();
  logger.debug("AI Step 6: Nutrition Timeline");

  // Extract only needed timing from pacing
  const pacingTiming = input.pacingStrategy.sections.map(s => ({
    name: s.name,
    mile: s.cumulativeMile,
    time: s.cumulativeTime
  }));

  // Compact station list
  const stations = input.aidStations.map(s => ({
    name: s.name,
    mile: s.mile
  }));

  // Compact preferences
  const prefs = input.nutritionPreferences || {};
  const dietInfo = [
    prefs.vegan && "vegan",
    prefs.glutenFree && "GF",
    prefs.caffeineSensitive && "caff-sensitive"
  ].filter(Boolean).join(", ") || "none";

  const userPrompt = `Create nutrition timeline:

TIMING: ${JSON.stringify(pacingTiming)}
STATIONS: ${JSON.stringify(stations)}
RUNNER: ${input.goalFinishTime} goal, diet: ${dietInfo}, GI: ${input.giIssuesHistory || "none"}${input.bodyWeight ? `, ${input.bodyWeight}lbs` : ""}

Return JSON:
{
  "timeline": [{"mile": num, "time": "clock", "timeElapsed": "H:MM", "calories": num, "sodium": mg, "fluids": oz, "foods": ["max 3 items"], "notes": "max 15 words"}],
  "summary": {"totalCalories": num, "caloriesPerHour": num, "totalSodium": mg, "sodiumPerHour": mg, "totalFluids": oz, "fluidsPerHour": oz},
  "preRaceNutrition": "max 50 words",
  "hydrationStrategy": "max 40 words",
  "caffeineStrategy": "max 40 words${prefs.caffeineSensitive ? ", note sensitivity" : ""}",
  "stomachIssuesPrevention": ["4-5 tips, 12 words each"],
  "aidStationStrategy": "max 40 words"
}

Max 15 timeline entries. Be specific: "1 Honey Stinger (160cal)" not "waffle". Transition gels→real food after hr 6-8.`;

  // Use concise retry to handle truncation
  const response = await withConciseRetry({
    anthropic,
    model: CLAUDE_MODEL,
    maxTokens: MAX_TOKENS,
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
    stepName: "generateNutritionTimeline",
    maxRetries: 2,
  });

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Use robust parser with truncation detection
  const { data, truncationDetected, recoveryApplied } = robustParseAndValidate(
    content,
    nutritionTimelineSchema,
    {
      stepName: "generateNutritionTimeline",
      maxTokens: MAX_TOKENS,
      usage: response.usage,
      stopReason: response.stop_reason,
    }
  );

  if (truncationDetected) {
    logger.warn("AI Step 6: Truncation detected", { step: "Nutrition Timeline" });
  }
  if (recoveryApplied) {
    logger.debug("AI Step 6: Recovery applied", { step: "Nutrition Timeline" });
  }

  const generationTime = Date.now() - startTime;
  logger.debug("AI Step 6: Nutrition Timeline complete", {
    generationTime,
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
