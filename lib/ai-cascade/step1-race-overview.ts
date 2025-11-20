import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withRetry, parseAndValidate } from "./utils";
import {
  raceOverviewSchema,
  RaceOverview,
  RaceOverviewInput,
  AIStepResponse,
} from "../schemas/guide-sections";

const SYSTEM_PROMPT = `You are an expert ultramarathon race analyst with deep knowledge of trail races, mountain ultras, and endurance events worldwide. Your role is to provide comprehensive, accurate race overviews that help runners plan their race day execution.

When analyzing a race, you must:
1. Provide accurate aid station names, locations (mile markers), and cutoff times when known
2. Create realistic elevation profiles with key landmarks
3. Identify the toughest sections and explain why they're challenging
4. Include historical weather patterns for the race month
5. Note any assumptions in the courseNotes field when exact data is unavailable

Be specific and tactical. Runners rely on this information for race planning.

CRITICAL: Return ONLY valid JSON. No markdown formatting, no explanation text, just the JSON object matching the exact schema provided.`;

export async function generateRaceOverview(
  input: RaceOverviewInput
): Promise<AIStepResponse<RaceOverview>> {
  const startTime = Date.now();
  console.log("🚀 Step 1 - Race Overview:", input.raceName);

  const userPrompt = `Analyze this ultramarathon race and provide a comprehensive overview:

Race Name: ${input.raceName}
Race Website: ${input.raceWebsite || "Not provided"}
Race Date: ${input.raceDate}

Return a JSON object with this exact structure:
{
  "description": "Comprehensive race description including history, course characteristics, and what makes this race unique",
  "distance": <number in miles>,
  "elevationGain": <number in feet>,
  "elevationProfile": [
    {
      "mile": <number>,
      "elevation": <number in feet>,
      "landmark": "<optional landmark name>"
    }
  ],
  "aidStations": [
    {
      "name": "<station name>",
      "mile": <number>,
      "cutoff": "<cutoff time in format like '10:30 AM' or 'None'>",
      "crewAccess": <boolean>,
      "dropBagAccess": <boolean>,
      "services": ["<service1>", "<service2>"]
    }
  ],
  "weatherPatterns": {
    "month": "<race month>",
    "avgHighTemp": <number in Fahrenheit>,
    "avgLowTemp": <number in Fahrenheit>,
    "precipitation": "<precipitation description>",
    "sunriseTime": "<time>",
    "sunsetTime": "<time>"
  },
  "toughSections": [
    {
      "name": "<section name>",
      "miles": "<mile range like '45-52'>",
      "difficulty": "<moderate|hard|brutal>",
      "elevationChange": "<description like '+3000ft over 7 miles'>",
      "notes": "<why this section is challenging and tactical advice>"
    }
  ],
  "courseNotes": "Additional notes including any assumptions made, course markings info, common mistakes runners make, and other helpful tactical information"
}

Provide elevation profile points at key locations (start, major climbs/descents, aid stations, finish) - aim for 10-20 points total.
Include all aid stations with accurate cutoff times if this is a well-known race.
Identify 3-5 tough sections that require special attention.`;

  const response = await withRetry(
    () =>
      anthropic.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      }),
    "generateRaceOverview"
  );

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";
  const data = parseAndValidate(content, raceOverviewSchema, "generateRaceOverview");

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
