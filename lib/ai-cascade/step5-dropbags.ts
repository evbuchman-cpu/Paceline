import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withRetry, parseAndValidate } from "./utils";
import {
  dropBagStrategySchema,
  DropBagStrategy,
  DropBagInput,
  AIStepResponse,
} from "../schemas/guide-sections";

const SYSTEM_PROMPT = `You are an expert ultramarathon gear specialist with years of experience helping runners prepare drop bags for 100-mile races. Your role is to create detailed, station-specific packing lists that account for time of day, weather conditions, and race progression.

Key drop bag principles:
1. TIME OF DAY: Pack different items for morning (cold/fresh), afternoon (hot/tired), evening (cooling/dark), night (cold/fatigue)
2. WEATHER ADAPTATION: Adjust for expected conditions - extra warmth gear if cold, sun protection if hot
3. RACE PROGRESSION: Early stations need less, later stations need more (backup gear, comfort items)
4. REDUNDANCY: Don't rely on a single drop bag for critical items
5. LABELING: Clear system so runner can grab items quickly while fatigued
6. SIMPLICITY: Don't over-pack - decision fatigue is real at mile 70+

For each station, consider:
- What time will runner arrive?
- What weather conditions are expected?
- What might have failed/run out by this point?
- What's the next section like (technical, exposed, long gap to next aid)?

CRITICAL: Return ONLY valid JSON. No markdown formatting, no explanation text, just the JSON object matching the exact schema provided.`;

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

  const userPrompt = `Create a detailed drop bag strategy for this ultramarathon:

RACE OVERVIEW:
${JSON.stringify({
  distance: input.raceOverview.distance,
  elevationGain: input.raceOverview.elevationGain,
  courseNotes: input.raceOverview.courseNotes,
}, null, 2)}

PACING STRATEGY:
${JSON.stringify({
  totalEstimatedTime: input.pacingStrategy.totalEstimatedTime,
  sections: input.pacingStrategy.sections.map(s => ({
    name: s.name,
    cumulativeTime: s.cumulativeTime,
    cumulativeMile: s.cumulativeMile,
  }))
}, null, 2)}

DROP BAG STATIONS:
${JSON.stringify(dropBagStations, null, 2)}

WEATHER PATTERNS:
${JSON.stringify(input.weatherPatterns, null, 2)}

NUTRITION PREFERENCES:
${JSON.stringify(input.nutritionPreferences || { vegan: false, glutenFree: false, caffeineSensitive: false }, null, 2)}

Return a JSON object with this exact structure:
{
  "stations": [
    {
      "name": "<station name>",
      "mile": <number>,
      "expectedArrival": "<time like '2:30 PM' or '10:15 PM'>",
      "timeOfDay": "<morning|afternoon|evening|night>",
      "weatherConditions": "<expected conditions at arrival time>",
      "packingList": [
        {
          "item": "<specific item name>",
          "quantity": "<amount like '2 pairs' or '1'>",
          "reason": "<why this item at this station>"
        }
      ],
      "priorityItems": [
        "<most critical item to grab>",
        "<second most critical>"
      ],
      "notes": "<station-specific advice>"
    }
  ],
  "generalPackingTips": [
    "<tip 1>",
    "<tip 2>",
    "<etc - 5-7 tips>"
  ],
  "labelingSystem": "<clear description of how to label bags for quick identification>",
  "dropOffInstructions": "<when and where to drop off bags, any race-specific requirements>"
}

For each station:
- Be specific about items (e.g., "Injinji toe socks" not just "socks")
- Include quantities (e.g., "2 gel flasks" not just "gels")
- Explain WHY each item is needed at that specific station
- Consider what might fail by that point (shoes worn out, headlamp battery dead)
- Account for nutrition preferences in food items
- Priority items should be things runner MUST grab even if rushed`;

  const response = await withRetry(
    () =>
      anthropic.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      }),
    "generateDropBagStrategy"
  );

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";
  const data = parseAndValidate(content, dropBagStrategySchema, "generateDropBagStrategy");

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
