import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withRetry, parseAndValidate } from "./utils";
import {
  crewLogisticsSchema,
  CrewLogistics,
  CrewInput,
  AIStepResponse,
} from "../schemas/guide-sections";

const SYSTEM_PROMPT = `You are an expert ultramarathon crew chief with years of experience supporting runners at 100-mile races. Your role is to create detailed, actionable crew instructions that help crews support their runner effectively.

Key crew logistics principles:
1. TIMING: Crews need to arrive 30-60 minutes before predicted runner arrival
2. EFFICIENCY: Time at aid stations should be minimized - have everything ready
3. COMMUNICATION: Clear priorities list so crew knows what to focus on
4. OBSERVATION: Crews must watch for warning signs (confusion, stumbling, vomiting)
5. PREPARATION: Crews need to prep for next station while waiting

Generate a printable markdown timing sheet that crews can use on race day.

If crewSupport is 'no' or 'none', return hasCrewSupport: false with empty arrays.

CRITICAL: Return ONLY valid JSON. No markdown formatting, no explanation text, just the JSON object matching the exact schema provided.`;

export async function generateCrewLogistics(
  input: CrewInput
): Promise<AIStepResponse<CrewLogistics>> {
  const startTime = Date.now();
  console.log("🚀 Step 4 - Crew Logistics:", input.crewSupport);

  // Handle no crew support case
  const hasCrewSupport = input.crewSupport.toLowerCase() !== "no" &&
                         input.crewSupport.toLowerCase() !== "none";

  if (!hasCrewSupport) {
    console.log("📊 No crew support - generating minimal logistics");

    const generationTime = Date.now() - startTime;
    console.log(`✅ Step 4 - Crew Logistics complete (no crew): ${generationTime}ms`);

    return {
      success: true,
      data: {
        hasCrewSupport: false,
        crewStations: [],
        crewTimingSheet: "No crew support for this race.",
        crewPackingList: [],
        communicationPlan: "N/A - No crew support",
        emergencyProtocol: "Contact race officials at aid stations if emergency assistance is needed.",
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

  // Filter to crew-access stations only
  const crewAccessStations = input.aidStations.filter((s) => s.crewAccess);

  const userPrompt = `Create detailed crew logistics for this ultramarathon:

PACING STRATEGY:
${JSON.stringify(input.pacingStrategy, null, 2)}

CREW-ACCESS AID STATIONS:
${JSON.stringify(crewAccessStations, null, 2)}

RUNNER INFO:
- First Name: ${input.firstName || "Runner"}
- Crew Support Type: ${input.crewSupport}

Return a JSON object with this exact structure:
{
  "hasCrewSupport": true,
  "crewStations": [
    {
      "name": "<station name>",
      "mile": <number>,
      "predictedArrival": "<time like '2:30 PM'>",
      "arrivalWindow": "<time range like '2:15 PM - 2:45 PM'>",
      "timeAtStation": "<recommended time like '8-10 minutes'>",
      "priorities": [
        "<highest priority task>",
        "<second priority>",
        "<third priority>"
      ],
      "crewTasks": [
        "<specific task 1>",
        "<specific task 2>",
        "<etc>"
      ],
      "gearChanges": [
        "<gear change if any, or empty array>"
      ],
      "nutritionNeeds": [
        "<specific nutrition item and quantity>"
      ],
      "mentalSupport": "<specific mental support guidance for this point in race>",
      "warningSignsToWatch": [
        "<warning sign 1>",
        "<warning sign 2>"
      ]
    }
  ],
  "crewTimingSheet": "<printable markdown table with columns: Station | Mile | Arrival Window | Priority Tasks | Gear Changes>",
  "crewPackingList": [
    "<item 1>",
    "<item 2>",
    "<etc - comprehensive packing list for crew>"
  ],
  "communicationPlan": "<how runner and crew will communicate - texting strategy, backup plans>",
  "emergencyProtocol": "<what crew should do in emergency - who to call, when to intervene>"
}

For each crew station:
- Be specific about priorities (e.g., "Refill 2 soft flasks with Tailwind" not "refill bottles")
- Include realistic arrival windows (±15-30 min based on race distance)
- Tailor mental support to race stage (early = restraint, middle = grind, late = finish push)
- List specific warning signs appropriate to each race stage

The timing sheet should be a clean markdown table that can be printed.`;

  const response = await withRetry(
    () =>
      anthropic.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      }),
    "generateCrewLogistics"
  );

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";
  const data = parseAndValidate(content, crewLogisticsSchema, "generateCrewLogistics");

  const generationTime = Date.now() - startTime;
  console.log(
    `✅ Step 4 - Crew Logistics complete: ${generationTime}ms | ${response.usage.input_tokens} in / ${response.usage.output_tokens} out`
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
