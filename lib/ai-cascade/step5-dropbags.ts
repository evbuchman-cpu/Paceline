import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withConciseRetry, robustParseAndValidate } from "./utils";
import {
  dropBagStrategySchema,
  DropBagStrategy,
  DropBagInput,
  AIStepResponse,
} from "../schemas/guide-sections";

// Increased token limit for drop bag strategy (detailed packing lists)
const MAX_TOKENS = 12288;

const SYSTEM_PROMPT = `You are an ultramarathon gear specialist. Create station-specific packing lists for drop bags.

Drop bag principles:
- TIME: morning=cold, afternoon=hot, evening=cooling, night=cold/fatigue
- PROGRESSION: Early stations=less, later=more backup gear
- SIMPLICITY: Don't over-pack (decision fatigue at mile 70+)

OUTPUT CONSTRAINTS (critical):
- "packingList": Max 8 items per station
- "reason" field: Max 10 words
- "priorityItems": Max 3 per station
- "notes": Max 20 words per station
- "generalPackingTips": Max 5 tips, 15 words each
- "labelingSystem": Max 30 words
- "dropOffInstructions": Max 40 words

Return ONLY valid JSON. No markdown.`;

export async function generateDropBagStrategy(
  input: DropBagInput
): Promise<AIStepResponse<DropBagStrategy>> {
  const startTime = Date.now();
  console.log("🚀 Step 5 - Drop Bag Strategy");

  // Filter to drop-bag-access stations only
  const dropBagStations = input.aidStations.filter((s) => s.dropBagAccess);

  if (dropBagStations.length === 0) {
    console.log("📊 No drop bag stations - generating minimal strategy");

    const generationTime = Date.now() - startTime;
    console.log(`✅ Step 5 - Drop Bag Strategy complete (no stations): ${generationTime}ms`);

    return {
      success: true,
      data: {
        stations: [],
        generalPackingTips: [
          "This race does not have drop bag access",
          "Ensure crew has all necessary gear changes",
          "Pack extra supplies in crew vehicle",
        ],
        labelingSystem: "N/A - No drop bags",
        dropOffInstructions: "N/A - No drop bags for this race",
      },
      usage: {
        inputTokens: 0,
        outputTokens: 0,
        totalTokens: 0,
        estimatedCost: 0,
      },
      generationTime,
    };
  }

  // Extract drop bag timing by matching with pacing
  const dropBagTiming = dropBagStations.map(station => {
    const pacingSection = input.pacingStrategy.sections.find(
      s => s.cumulativeMile >= station.mile
    );
    return {
      name: station.name,
      mile: station.mile,
      arrival: pacingSection?.cumulativeTime || "TBD"
    };
  });

  // Compact weather summary
  const weather = input.weatherPatterns;
  const weatherSummary = `${weather.month}: ${weather.avgLowTemp}-${weather.avgHighTemp}°F, ${weather.precipitation}`;

  // Compact nutrition prefs
  const prefs = input.nutritionPreferences || {};
  const dietInfo = [
    prefs.vegan && "vegan",
    prefs.glutenFree && "GF",
    prefs.caffeineSensitive && "caff-sensitive"
  ].filter(Boolean).join(", ") || "none";

  const userPrompt = `Create drop bag strategy:

STATIONS: ${JSON.stringify(dropBagTiming)}
RACE: ${input.raceOverview.distance}mi, ${input.raceOverview.elevationGain}ft gain
WEATHER: ${weatherSummary}
DIET: ${dietInfo}

Return JSON:
{
  "stations": [{"name": "string", "mile": num, "expectedArrival": "time", "timeOfDay": "morning|afternoon|evening|night", "weatherConditions": "string", "packingList": [{"item": "specific name", "quantity": "amount", "reason": "max 10 words"}], "priorityItems": ["max 3 critical items"], "notes": "max 20 words"}],
  "generalPackingTips": ["max 5 tips, 15 words each"],
  "labelingSystem": "max 30 words",
  "dropOffInstructions": "max 40 words"
}

Max 8 items per station packingList. Be specific (e.g., "Injinji toe socks" not "socks").`;

  // Use concise retry to handle truncation
  const response = await withConciseRetry({
    anthropic,
    model: CLAUDE_MODEL,
    maxTokens: MAX_TOKENS,
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
    stepName: "generateDropBagStrategy",
    maxRetries: 2,
  });

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Use robust parser with truncation detection
  const { data, truncationDetected, recoveryApplied } = robustParseAndValidate(
    content,
    dropBagStrategySchema,
    {
      stepName: "generateDropBagStrategy",
      maxTokens: MAX_TOKENS,
      usage: response.usage,
      stopReason: response.stop_reason,
    }
  );

  if (truncationDetected) {
    console.warn(`⚠️ Step 5 - Drop Bag Strategy: Truncation detected`);
  }
  if (recoveryApplied) {
    console.log(`🔧 Step 5 - Drop Bag Strategy: Recovery applied`);
  }

  const generationTime = Date.now() - startTime;
  console.log(
    `✅ Step 5 - Drop Bag Strategy complete: ${generationTime}ms | ${response.usage.input_tokens} in / ${response.usage.output_tokens} out`
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
