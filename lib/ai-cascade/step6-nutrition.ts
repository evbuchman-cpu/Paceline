import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withRetry, parseAndValidate } from "./utils";
import {
  nutritionTimelineSchema,
  NutritionTimeline,
  NutritionInput,
  AIStepResponse,
} from "../schemas/guide-sections";

const SYSTEM_PROMPT = `You are an expert ultramarathon sports nutritionist with years of experience helping runners fuel 100-mile races. Your role is to create personalized, practical nutrition timelines that prevent bonking, GI issues, and hyponatremia.

Key nutrition principles for ultramarathons:
1. CALORIE TARGETS: 200-300 calories/hour (lower early, can decrease late)
2. SODIUM: 300-600mg/hour depending on conditions and sweat rate
3. FLUIDS: 16-24 oz/hour (more in heat, less at night)
4. TIMING: Eat before you're hungry, drink before you're thirsty
5. VARIETY: Flavor fatigue is real - alternate sweet/salty
6. REAL FOOD: After ~8 hours, transition from gels to real food
7. GI PREVENTION: Nothing new on race day, reduce fiber pre-race, slow down to eat

Common mistakes to prevent:
- Too many gels (causes GI distress after hour 8)
- Not enough sodium (leads to hyponatremia)
- Drinking plain water only (dilutes electrolytes)
- Eating too much solid food early when running hard
- Not adjusting for heat/cold/altitude

CRITICAL: Return ONLY valid JSON. No markdown formatting, no explanation text, just the JSON object matching the exact schema provided.`;

export async function generateNutritionTimeline(
  input: NutritionInput
): Promise<AIStepResponse<NutritionTimeline>> {
  const startTime = Date.now();
  console.log("🚀 Step 6 - Nutrition Timeline");

  const userPrompt = `Create a detailed nutrition timeline for this ultramarathon:

PACING STRATEGY:
${JSON.stringify({
  totalEstimatedTime: input.pacingStrategy.totalEstimatedTime,
  sections: input.pacingStrategy.sections.map(s => ({
    name: s.name,
    startMile: s.startMile,
    endMile: s.endMile,
    cumulativeTime: s.cumulativeTime,
    terrainType: s.terrainType,
  }))
}, null, 2)}

AID STATIONS:
${JSON.stringify(input.aidStations.map(s => ({
  name: s.name,
  mile: s.mile,
  services: s.services,
})), null, 2)}

RUNNER INFO:
- Goal Finish Time: ${input.goalFinishTime}
- Nutrition Preferences: ${JSON.stringify(input.nutritionPreferences || { vegan: false, glutenFree: false, caffeineSensitive: false })}
- GI Issues History: ${input.giIssuesHistory || "None reported"}
- Body Weight: ${input.bodyWeight ? `${input.bodyWeight} lbs` : "Not provided"}

Return a JSON object with this exact structure:
{
  "timeline": [
    {
      "mile": <number>,
      "time": "<clock time like '7:30 AM'>",
      "timeElapsed": "<elapsed time like '2:15'>",
      "calories": <number>,
      "sodium": <mg number>,
      "fluids": <oz number>,
      "foods": [
        "<specific food item and amount>"
      ],
      "notes": "<timing or technique notes>"
    }
  ],
  "summary": {
    "totalCalories": <number>,
    "caloriesPerHour": <number>,
    "totalSodium": <mg number>,
    "sodiumPerHour": <mg number>,
    "totalFluids": <oz number>,
    "fluidsPerHour": <oz number>
  },
  "preRaceNutrition": "<what to eat night before and morning of>",
  "hydrationStrategy": "<overall hydration approach>",
  "caffeineStrategy": "<when to use caffeine, how much, ${input.nutritionPreferences?.caffeineSensitive ? 'considering caffeine sensitivity' : 'typical approach'}>",
  "stomachIssuesPrevention": [
    "<tip 1>",
    "<tip 2>",
    "<etc - 4-6 tips>"
  ],
  "aidStationStrategy": "<how to efficiently get nutrition at aid stations>"
}

For the timeline:
- Create entries at each aid station plus between-station fueling points
- Be specific about foods (e.g., "1 Honey Stinger waffle (160 cal)" not just "waffle")
- Account for nutrition preferences (vegan, gluten-free options)
- Transition from gels to real food after hour 6-8
- Include variety (alternate sweet/salty, different textures)
- Higher sodium if hot conditions expected
- Factor in GI issues history with gentler options if needed

The timeline should give specific, actionable nutrition at each checkpoint.`;

  const response = await withRetry(
    () =>
      anthropic.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      }),
    "generateNutritionTimeline"
  );

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";
  const data = parseAndValidate(content, nutritionTimelineSchema, "generateNutritionTimeline");

  const generationTime = Date.now() - startTime;
  console.log(
    `✅ Step 6 - Nutrition Timeline complete: ${generationTime}ms | ${response.usage.input_tokens} in / ${response.usage.output_tokens} out`
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
