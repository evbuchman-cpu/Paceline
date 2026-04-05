import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withConciseRetry, robustParseAndValidate } from "./utils";
import {
  crewLogisticsSchema,
  CrewLogistics,
  CrewInput,
  AIStepResponse,
} from "../schemas/guide-sections";
import { logger } from "@/lib/logger";

// Increased token limit for crew logistics (verbose output)
const MAX_TOKENS = 12288;

const SYSTEM_PROMPT = `You are an ultramarathon crew chief. Create actionable crew instructions for race day.

Crew principles:
- Arrive 30-60 min before runner
- Have everything ready, minimize station time
- Clear priorities list
- Watch for warning signs

OUTPUT CONSTRAINTS (critical):
- "priorities": Max 3 items, 8 words each
- "crewTasks": Max 5 items, 10 words each
- "mentalSupport": Max 20 words
- "warningSignsToWatch": Max 3 items
- "crewTimingSheet": Simple markdown table, one row per station
- "crewPackingList": Max 15 essential items
- "communicationPlan": Max 40 words
- "emergencyProtocol": Max 40 words

Return ONLY valid JSON. No markdown wrapping.`;

export async function generateCrewLogistics(
  input: CrewInput
): Promise<AIStepResponse<CrewLogistics>> {
  const startTime = Date.now();
  logger.debug("AI Step 4: Crew Logistics:", input.crewSupport);

  // Handle no crew support case
  const hasCrewSupport = input.crewSupport.toLowerCase() !== "no" &&
                         input.crewSupport.toLowerCase() !== "none";

  if (!hasCrewSupport) {
    logger.debug("AI Step 4: No crew support - generating minimal logistics");

    const generationTime = Date.now() - startTime;
    logger.debug("AI Step 4: Crew Logistics complete (no crew)", { generationTime });

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

  // Filter to crew-access stations and extract only needed timing data
  const crewAccessStations = input.aidStations.filter((s) => s.crewAccess);

  // Match stations with pacing arrival times
  const crewStationTiming = crewAccessStations.map(station => {
    const pacingSection = input.pacingStrategy.sections.find(
      s => s.cumulativeMile >= station.mile
    );
    return {
      name: station.name,
      mile: station.mile,
      arrival: pacingSection?.cumulativeTime || "TBD"
    };
  });

  const userPrompt = `Create crew logistics:

CREW STATIONS: ${JSON.stringify(crewStationTiming)}

RUNNER: ${input.firstName || "Runner"}, ${input.crewSupport} crew support
RACE: ${input.pacingStrategy.totalEstimatedTime} total time

Return JSON:
{
  "hasCrewSupport": true,
  "crewStations": [{"name": "string", "mile": num, "predictedArrival": "time", "arrivalWindow": "±15-30min range", "timeAtStation": "8-10 min", "priorities": ["max 3, 8 words each"], "crewTasks": ["max 5, 10 words each"], "gearChanges": ["or empty"], "nutritionNeeds": ["specific items"], "mentalSupport": "max 20 words", "warningSignsToWatch": ["max 3"]}],
  "crewTimingSheet": "markdown table: Station|Mile|Arrival|Priority|Gear",
  "crewPackingList": ["max 15 essential items"],
  "communicationPlan": "max 40 words",
  "emergencyProtocol": "max 40 words"
}

Tailor mental support to race stage: early=restraint, middle=grind, late=push.`;

  // Use concise retry to handle truncation
  const response = await withConciseRetry({
    anthropic,
    model: CLAUDE_MODEL,
    maxTokens: MAX_TOKENS,
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
    stepName: "generateCrewLogistics",
    maxRetries: 2,
  });

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Use robust parser with truncation detection
  const { data, truncationDetected, recoveryApplied } = robustParseAndValidate(
    content,
    crewLogisticsSchema,
    {
      stepName: "generateCrewLogistics",
      maxTokens: MAX_TOKENS,
      usage: response.usage,
      stopReason: response.stop_reason,
    }
  );

  if (truncationDetected) {
    logger.warn("AI Step 4: Truncation detected", { step: "Crew Logistics" });
  }
  if (recoveryApplied) {
    logger.debug("AI Step 4: Recovery applied", { step: "Crew Logistics" });
  }

  const generationTime = Date.now() - startTime;
  logger.debug("AI Step 4: Crew Logistics complete", {
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
