import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withConciseRetry, robustParseAndValidate } from "./utils";
import {
  contingencyProtocolsSchema,
  ContingencyProtocols,
  ContingencyInput,
  AIStepResponse,
} from "../schemas/guide-sections";

// Increased token limit for contingency protocols (detailed protocols with multiple scenarios)
const MAX_TOKENS = 12288;

const SYSTEM_PROMPT = `You are an ultramarathon safety specialist. Create contingency protocols for race problems.

Principles:
- Early intervention before race-ending
- Clear, measurable thresholds for action
- Specific criteria for when to DNF

OUTPUT CONSTRAINTS (critical):
- "protocols": Max 8 protocols total
- "warningSignals": Max 3 per protocol, 10 words each
- "immediateActions": Max 4 per protocol, 12 words each
- "prevention": Max 3 per protocol, 10 words each
- "whenToStop": Max 20 words
- "emergencyContacts": Max 30 words
- "dnfDecisionFramework": Max 50 words
- "raceHotlineInfo": Max 30 words

Return ONLY valid JSON. No markdown.`;

export async function generateContingencyProtocols(
  input: ContingencyInput
): Promise<AIStepResponse<ContingencyProtocols>> {
  const startTime = Date.now();
  console.log("🚀 Step 7 - Contingency Protocols");

  // Compact race info
  const raceInfo = `${input.raceOverview.distance}mi, ${input.raceOverview.elevationGain}ft gain, ${input.pacingStrategy.totalEstimatedTime} total`;

  // Compact weather
  const weather = input.weatherPatterns;
  const weatherInfo = `${weather.avgLowTemp}-${weather.avgHighTemp}°F, ${weather.precipitation}`;

  // Build priority list based on vulnerabilities
  const priorities = [];
  if (input.giIssuesHistory) priorities.push(`GI (HIGH: ${input.giIssuesHistory})`);
  if (input.blisterProneAreas) priorities.push(`Blisters (HIGH: ${input.blisterProneAreas})`);
  if (input.medicalConditions) priorities.push(`${input.medicalConditions} (HIGH)`);

  const userPrompt = `Create contingency protocols:

RACE: ${raceInfo}
WEATHER: ${weatherInfo}
VULNERABILITIES: GI=${input.giIssuesHistory || "none"}, Blisters=${input.blisterProneAreas || "none"}, Medical=${input.medicalConditions || "none"}

Return JSON:
{
  "protocols": [{"scenario": "string", "severity": "low|medium|high|critical", "warningSignals": ["max 3, 10 words each"], "immediateActions": ["max 4, 12 words each"], "prevention": ["max 3, 10 words each"], "whenToStop": "max 20 words"}],
  "emergencyContacts": "max 30 words",
  "dnfDecisionFramework": "max 50 words",
  "raceHotlineInfo": "max 30 words"
}

Create 8 protocols: ${priorities.length > 0 ? priorities.join(", ") + ", plus " : ""}GI, Blisters, Cutoffs, Heat, Cold, Cramps, Equipment, Mental.
Be specific: "vomiting 3+ times/hr" not "severe vomiting".`;

  // Use concise retry to handle truncation
  const response = await withConciseRetry({
    anthropic,
    model: CLAUDE_MODEL,
    maxTokens: MAX_TOKENS,
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
    stepName: "generateContingencyProtocols",
    maxRetries: 2,
  });

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Use robust parser with truncation detection
  const { data, truncationDetected, recoveryApplied } = robustParseAndValidate(
    content,
    contingencyProtocolsSchema,
    {
      stepName: "generateContingencyProtocols",
      maxTokens: MAX_TOKENS,
      usage: response.usage,
      stopReason: response.stop_reason,
    }
  );

  if (truncationDetected) {
    console.warn(`⚠️ Step 7 - Contingency Protocols: Truncation detected`);
  }
  if (recoveryApplied) {
    console.log(`🔧 Step 7 - Contingency Protocols: Recovery applied`);
  }

  const generationTime = Date.now() - startTime;
  console.log(
    `✅ Step 7 - Contingency Protocols complete: ${generationTime}ms | ${response.usage.input_tokens} in / ${response.usage.output_tokens} out`
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
