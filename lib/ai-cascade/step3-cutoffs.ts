import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withConciseRetry, robustParseAndValidate } from "./utils";
import {
  cutoffManagementSchema,
  CutoffManagement,
  CutoffInput,
  AIStepResponse,
} from "../schemas/guide-sections";

const MAX_TOKENS = 8192;

const SYSTEM_PROMPT = `You are an ultramarathon cutoff strategist. Analyze pacing vs cutoffs with clear buffer guidance.

Buffer status rules:
- 🟢 GREEN: 3+ hours - comfortable
- 🟡 YELLOW: 1-3 hours - needs attention
- 🔴 RED: <1 hour - critical

OUTPUT CONSTRAINTS:
- "notes" field: Max 25 words per station
- "bufferStrategy": Max 80 words
- "contingencyNotes": Max 80 words
- Only include stations with cutoffs in detail
- Be direct about risk

Return ONLY valid JSON. No markdown.`;

export async function generateCutoffManagement(
  input: CutoffInput
): Promise<AIStepResponse<CutoffManagement>> {
  const startTime = Date.now();
  console.log("🚀 Step 3 - Cutoff Management:", input.aidStations.length, "stations");

  // Extract only timing data from pacing (minimize tokens)
  const pacingTiming = input.pacingStrategy.sections.map(s => ({
    name: s.name,
    mile: s.cumulativeMile,
    arrival: s.cumulativeTime
  }));

  // Extract only cutoff-relevant station data
  const stationData = input.aidStations.map(s => ({
    name: s.name,
    mile: s.mile,
    cutoff: s.cutoff
  }));

  const userPrompt = `Analyze cutoffs vs pacing:

PACING ARRIVALS: ${JSON.stringify(pacingTiming)}

STATIONS: ${JSON.stringify(stationData)}

Return JSON:
{
  "stations": [{"name": "string", "mile": num, "cutoffTime": "time or None", "predictedArrival": "time", "bufferMinutes": num, "bufferFormatted": "+H:MM", "status": "green|yellow|red", "statusEmoji": "🟢|🟡|🔴", "riskLevel": "Low|Moderate|High|Critical", "notes": "max 25 words"}],
  "overallRisk": "Low|Medium|High",
  "criticalCheckpoints": ["2-4 tightest checkpoints"],
  "bufferStrategy": "max 80 words",
  "contingencyNotes": "max 80 words"
}

Include all stations. Mark stations without cutoffs as "None" but estimate status. Identify 2-4 critical checkpoints.`;

  // Use concise retry to handle truncation
  const response = await withConciseRetry({
    anthropic,
    model: CLAUDE_MODEL,
    maxTokens: MAX_TOKENS,
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
    stepName: "generateCutoffManagement",
    maxRetries: 2,
  });

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Pre-process to fix missing statusEmoji fields before robust parsing
  let preprocessedContent = content;
  try {
    // Remove markdown code blocks if present
    let cleanContent = content.trim();
    if (cleanContent.startsWith("```json")) {
      cleanContent = cleanContent.slice(7);
    } else if (cleanContent.startsWith("```")) {
      cleanContent = cleanContent.slice(3);
    }
    if (cleanContent.endsWith("```")) {
      cleanContent = cleanContent.slice(0, -3);
    }

    const parsedContent = JSON.parse(cleanContent.trim());

    // Fix missing statusEmoji fields based on status
    if (parsedContent.stations && Array.isArray(parsedContent.stations)) {
      parsedContent.stations = parsedContent.stations.map((station: { status?: string; statusEmoji?: string }) => {
        if (!station.statusEmoji && station.status) {
          const statusMap: Record<string, string> = {
            'green': '🟢',
            'yellow': '🟡',
            'red': '🔴'
          };
          station.statusEmoji = statusMap[station.status.toLowerCase()] || '🟡';
        }
        return station;
      });
    }

    preprocessedContent = JSON.stringify(parsedContent);
  } catch {
    // If pre-processing fails, let robust parser handle it
    preprocessedContent = content;
  }

  // Use robust parser with truncation detection
  const { data, truncationDetected, recoveryApplied } = robustParseAndValidate(
    preprocessedContent,
    cutoffManagementSchema,
    {
      stepName: "generateCutoffManagement",
      maxTokens: MAX_TOKENS,
      usage: response.usage,
      stopReason: response.stop_reason,
    }
  );

  if (truncationDetected) {
    console.warn(`⚠️ Step 3 - Cutoff Management: Truncation detected`);
  }
  if (recoveryApplied) {
    console.log(`🔧 Step 3 - Cutoff Management: Recovery applied`);
  }

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
