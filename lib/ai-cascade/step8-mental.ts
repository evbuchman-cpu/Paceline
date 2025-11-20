import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withRetry, parseAndValidate } from "./utils";
import {
  mentalStrategySchema,
  MentalStrategy,
  MentalInput,
  AIStepResponse,
} from "../schemas/guide-sections";

const SYSTEM_PROMPT = `You are an expert sports psychologist specializing in ultramarathon mental performance. Your role is to create personalized mental strategies that help runners navigate the psychological challenges of 100-mile races.

Key mental strategy principles:
1. SPECIFICITY: Vague mantras ("stay positive") don't work under extreme fatigue - need specific, actionable mental cues
2. SEGMENTATION: Break the race into smaller mental chunks
3. ANTICIPATION: Know exactly which sections will be hardest and have specific strategies ready
4. PERSONALIZATION: Address the runner's specific fears and experience level
5. PROCESS FOCUS: Focus on the next aid station, not the finish line
6. CELEBRATION: Build in small wins to maintain motivation

Mental challenges at different race stages:
- Miles 0-30: Restraint (don't go out too fast, save mental energy)
- Miles 30-60: The grind (fatigue sets in, still far from finish)
- Miles 60-80: The low point (dark patches, questioning everything)
- Miles 80-100: The push (finding reserves, smelling the barn)

Dark moment protocol is critical - everyone has them, preparation is key.

CRITICAL: Return ONLY valid JSON. No markdown formatting, no explanation text, just the JSON object matching the exact schema provided.`;

export async function generateMentalStrategy(
  input: MentalInput
): Promise<AIStepResponse<MentalStrategy>> {
  const startTime = Date.now();
  console.log("🚀 Step 8 - Mental Strategy");

  const userPrompt = `Create a comprehensive mental strategy for this ultramarathon:

RACE OVERVIEW:
${JSON.stringify({
  distance: input.raceOverview.distance,
  elevationGain: input.raceOverview.elevationGain,
  courseNotes: input.raceOverview.courseNotes,
}, null, 2)}

TOUGH SECTIONS:
${JSON.stringify(input.toughSections, null, 2)}

PACING INFO:
- Total Estimated Time: ${input.pacingStrategy.totalEstimatedTime}
- Average Pace: ${input.pacingStrategy.averagePace}

RUNNER INFO:
- First Name: ${input.firstName || "Runner"}
- Ultras Completed: ${input.ultrasCompleted}
- Biggest Race Fears: ${input.biggestRaceFears || "Not specified"}

Return a JSON object with this exact structure:
{
  "raceDayMindset": "<1-2 paragraph description of the overall mental approach for this specific race>",
  "mantras": [
    {
      "mantra": "<short, powerful phrase>",
      "useCase": "<when to use this mantra>",
      "explanation": "<why this works psychologically>"
    }
  ],
  "toughSections": [
    {
      "sectionName": "<name from tough sections>",
      "miles": "<mile range>",
      "mentalChallenge": "<what makes this section mentally hard>",
      "strategies": [
        "<specific strategy 1>",
        "<specific strategy 2>",
        "<specific strategy 3>"
      ],
      "mantras": [
        "<mantra for this section>"
      ],
      "focusPoints": [
        "<what to focus on mentally during this section>"
      ]
    }
  ],
  "darkMomentProtocol": "<detailed protocol for when everything feels terrible - specific steps to follow>",
  "motivationalAnchors": [
    "<reason 1 for doing this race - to recall when struggling>",
    "<reason 2>",
    "<reason 3>"
  ],
  "celebrationMilestones": [
    {
      "mile": <number>,
      "celebration": "<small mental or physical celebration>"
    }
  ],
  "finishLineVisualization": "<detailed visualization of crossing the finish line>"
}

Guidelines:
- Create 4-6 mantras that are short (5 words max), specific, and actionable
- Address each tough section with tailored strategies
- Make the dark moment protocol extremely specific and step-by-step
- Tailor to experience level: ${input.ultrasCompleted === "0" ? "first-timer needs more reassurance and basic mental skills" : input.ultrasCompleted === "1-3" ? "some experience but still building mental toolkit" : "experienced - focus on race-specific challenges"}
- Address specific fears: ${input.biggestRaceFears || "general ultramarathon fears"}
- Include 4-6 celebration milestones spread throughout the race
- Make finish line visualization vivid and personal`;

  const response = await withRetry(
    () =>
      anthropic.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      }),
    "generateMentalStrategy"
  );

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";
  const data = parseAndValidate(content, mentalStrategySchema, "generateMentalStrategy");

  const generationTime = Date.now() - startTime;
  console.log(
    `✅ Step 8 - Mental Strategy complete: ${generationTime}ms | ${response.usage.input_tokens} in / ${response.usage.output_tokens} out`
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
