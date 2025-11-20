import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withRetry, parseAndValidate } from "./utils";
import {
  cutoffManagementSchema,
  CutoffManagement,
  CutoffInput,
  AIStepResponse,
} from "../schemas/guide-sections";

const SYSTEM_PROMPT = `You are an expert ultramarathon race strategist specializing in cutoff management. Your role is to analyze pacing plans against race cutoffs and provide clear, actionable guidance on time buffers.

Cutoff buffer status rules (MUST FOLLOW EXACTLY):
- 🟢 GREEN: 3+ hours buffer - comfortable, can afford to slow down
- 🟡 YELLOW: 1-3 hours buffer - manageable but requires attention
- 🔴 RED: Less than 1 hour buffer - critical, may need contingency pacing

Key analysis principles:
1. Calculate buffer = Cutoff Time - Predicted Arrival Time (in minutes)
2. Identify critical checkpoints where buffer is tightest
3. Note cascade effects - falling behind early compounds later
4. Consider terrain difficulty after each checkpoint
5. Account for typical slowdown patterns in ultras

Be direct about risk. If a plan is aggressive, say so. Runners need honest assessment.

CRITICAL: Return ONLY valid JSON. No markdown formatting, no explanation text, just the JSON object matching the exact schema provided.`;

export async function generateCutoffManagement(
  input: CutoffInput
): Promise<AIStepResponse<CutoffManagement>> {
  const startTime = Date.now();
  console.log("🚀 Step 3 - Cutoff Management:", input.aidStations.length, "stations");

  const userPrompt = `Analyze cutoff times against the pacing strategy and provide detailed buffer analysis:

PACING STRATEGY:
${JSON.stringify(input.pacingStrategy, null, 2)}

AID STATIONS WITH CUTOFFS:
${JSON.stringify(input.aidStations, null, 2)}

Return a JSON object with this exact structure:
{
  "stations": [
    {
      "name": "<aid station name>",
      "mile": <number>,
      "cutoffTime": "<cutoff time or 'None' if no cutoff>",
      "predictedArrival": "<predicted arrival time based on pacing>",
      "bufferMinutes": <number - positive means ahead of cutoff, negative means behind>,
      "bufferFormatted": "<buffer in H:MM format like '+2:30' or '-0:45'>",
      "status": "<green|yellow|red>",
      "statusEmoji": "<🟢|🟡|🔴>",
      "riskLevel": "<Low|Moderate|High|Critical>",
      "notes": "<specific tactical advice for this checkpoint - what to do if behind/ahead>"
    }
  ],
  "overallRisk": "<Low|Medium|High>",
  "criticalCheckpoints": [
    "<checkpoint name where buffer is tightest>",
    "<second tightest>",
    "<etc>"
  ],
  "bufferStrategy": "<paragraph explaining buffer management strategy, when to bank time, when to spend it>",
  "contingencyNotes": "<specific guidance if falling behind - where to make up time, when to abandon goal pace>"
}

Include ALL aid stations, even those without cutoffs (mark as "None").
For stations without cutoffs, estimate a reasonable status based on overall pace.
Identify the 2-4 most critical checkpoints.
Be specific in contingency notes - tell runner exactly what to do if behind at each critical checkpoint.`;

  const response = await withRetry(
    () =>
      anthropic.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      }),
    "generateCutoffManagement"
  );

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";
  const data = parseAndValidate(content, cutoffManagementSchema, "generateCutoffManagement");

  const generationTime = Date.now() - startTime;
  console.log(
    `✅ Step 3 - Cutoff Management complete: ${generationTime}ms | ${response.usage.input_tokens} in / ${response.usage.output_tokens} out`
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
