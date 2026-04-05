import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withConciseRetry, robustParseAndValidate } from "./utils";
import {
  mentalStrategySchema,
  MentalStrategy,
  MentalInput,
  AIStepResponse,
} from "../schemas/guide-sections";
import { logger } from "@/lib/logger";

const MAX_TOKENS = 8192;

const SYSTEM_PROMPT = `You are an ultramarathon sports psychologist. Create personalized mental strategies.

Principles:
- Specific mantras (not vague "stay positive")
- Anticipate hard sections with strategies
- Process focus: next aid station, not finish

Race stages:
- 0-30mi: Restraint
- 30-60mi: Grind
- 60-80mi: Low point
- 80-100mi: Push

OUTPUT CONSTRAINTS (critical):
- "raceDayMindset": Max 80 words
- "mantras": Max 4 mantras, 5 words each, useCase/explanation 15 words each
- "toughSections": Match input sections, strategies max 3 per section, 12 words each
- "darkMomentProtocol": Max 60 words
- "motivationalAnchors": Max 3, 12 words each
- "celebrationMilestones": Max 5
- "finishLineVisualization": Max 50 words

Return ONLY valid JSON. No markdown.`;

export async function generateMentalStrategy(
  input: MentalInput
): Promise<AIStepResponse<MentalStrategy>> {
  const startTime = Date.now();
  logger.debug("AI Step 8: Mental Strategy");

  // Compact race info
  const raceInfo = `${input.raceOverview.distance}mi, ${input.raceOverview.elevationGain}ft, ${input.pacingStrategy.totalEstimatedTime}`;

  // Compact tough sections
  const toughSections = input.toughSections.map(s => ({
    name: s.name,
    miles: s.miles,
    difficulty: s.difficulty
  }));

  // Experience level context
  const expLevel = input.ultrasCompleted === "0" ? "first-timer" :
                   input.ultrasCompleted === "1-3" ? "some experience" : "experienced";

  const userPrompt = `Create mental strategy:

RACE: ${raceInfo}
TOUGH SECTIONS: ${JSON.stringify(toughSections)}
RUNNER: ${input.firstName || "Runner"}, ${expLevel} (${input.ultrasCompleted} ultras), fears: ${input.biggestRaceFears || "none specified"}

Return JSON:
{
  "raceDayMindset": "max 80 words",
  "mantras": [{"mantra": "max 5 words", "useCase": "max 15 words", "explanation": "max 15 words"}],
  "toughSections": [{"sectionName": "string", "miles": "range", "mentalChallenge": "string", "strategies": ["max 3, 12 words each"], "mantras": ["1-2"], "focusPoints": ["1-2"]}],
  "darkMomentProtocol": "max 60 words, specific steps",
  "motivationalAnchors": ["max 3, 12 words each"],
  "celebrationMilestones": [{"mile": num, "celebration": "string"}],
  "finishLineVisualization": "max 50 words"
}

Max 4 mantras, max 5 celebration milestones. Tailor to ${expLevel} level.`;

  // Use concise retry to handle truncation
  const response = await withConciseRetry({
    anthropic,
    model: CLAUDE_MODEL,
    maxTokens: MAX_TOKENS,
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
    stepName: "generateMentalStrategy",
    maxRetries: 2,
  });

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Use robust parser with truncation detection
  const { data, truncationDetected, recoveryApplied } = robustParseAndValidate(
    content,
    mentalStrategySchema,
    {
      stepName: "generateMentalStrategy",
      maxTokens: MAX_TOKENS,
      usage: response.usage,
      stopReason: response.stop_reason,
    }
  );

  if (truncationDetected) {
    logger.warn("AI Step 8: Truncation detected", { step: "Mental Strategy" });
  }
  if (recoveryApplied) {
    logger.debug("AI Step 8: Recovery applied", { step: "Mental Strategy" });
  }

  const generationTime = Date.now() - startTime;
  logger.debug("AI Step 8: Mental Strategy complete", {
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
