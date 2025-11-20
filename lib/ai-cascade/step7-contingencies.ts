import { anthropic, calculateCost, CLAUDE_MODEL } from "../anthropic-client";
import { withRetry, parseAndValidate } from "./utils";
import {
  contingencyProtocolsSchema,
  ContingencyProtocols,
  ContingencyInput,
  AIStepResponse,
} from "../schemas/guide-sections";

const SYSTEM_PROMPT = `You are an expert ultramarathon medical advisor and race safety specialist. Your role is to create comprehensive contingency protocols that help runners make smart decisions when things go wrong during a 100-mile race.

Key contingency principles:
1. EARLY INTERVENTION: Address problems early before they become race-ending
2. CLEAR THRESHOLDS: Specific criteria for when to stop (not vague "if it gets bad")
3. ACTIONABLE STEPS: Exact actions to take, in order
4. KNOW WHEN TO DNF: A DNF today means you can race again - permanent injury doesn't
5. PERSONALIZATION: Account for runner's specific vulnerabilities

Common race-day problems:
- GI distress (nausea, vomiting, diarrhea) - #1 reason for DNF
- Blisters and foot problems
- Muscle cramps
- Chafing
- Hypothermia/hyperthermia
- Hyponatremia
- Falling behind on cutoffs
- Equipment failure (headlamp, shoes, poles)
- Mental breakdown / dark patches
- Injury (rolled ankle, fall)

For each protocol:
- Warning signals: What to watch for
- Immediate actions: First 1-3 things to do
- Prevention: What to do beforehand to avoid this
- When to stop: Clear, measurable criteria

CRITICAL: Return ONLY valid JSON. No markdown formatting, no explanation text, just the JSON object matching the exact schema provided.`;

export async function generateContingencyProtocols(
  input: ContingencyInput
): Promise<AIStepResponse<ContingencyProtocols>> {
  const startTime = Date.now();
  console.log("🚀 Step 7 - Contingency Protocols");

  const userPrompt = `Create comprehensive contingency protocols for this ultramarathon:

RACE OVERVIEW:
${JSON.stringify({
  distance: input.raceOverview.distance,
  elevationGain: input.raceOverview.elevationGain,
  toughSections: input.raceOverview.toughSections,
  courseNotes: input.raceOverview.courseNotes,
}, null, 2)}

WEATHER PATTERNS:
${JSON.stringify(input.weatherPatterns, null, 2)}

RUNNER VULNERABILITIES:
- GI Issues History: ${input.giIssuesHistory || "None reported"}
- Blister-Prone Areas: ${input.blisterProneAreas || "None reported"}
- Medical Conditions: ${input.medicalConditions || "None reported"}

PACING INFO:
- Total Estimated Time: ${input.pacingStrategy.totalEstimatedTime}
- Number of sections: ${input.pacingStrategy.sections.length}

Return a JSON object with this exact structure:
{
  "protocols": [
    {
      "scenario": "<specific problem like 'Nausea and Vomiting'>",
      "severity": "<low|medium|high|critical>",
      "warningSignals": [
        "<early warning sign 1>",
        "<early warning sign 2>",
        "<etc>"
      ],
      "immediateActions": [
        "<step 1>",
        "<step 2>",
        "<step 3>"
      ],
      "prevention": [
        "<preventive measure 1>",
        "<preventive measure 2>"
      ],
      "whenToStop": "<specific, measurable criteria for when to DNF>"
    }
  ],
  "emergencyContacts": "<what numbers to have saved, who to call>",
  "dnfDecisionFramework": "<clear framework for making DNF decisions rationally>",
  "raceHotlineInfo": "<info about race medical support, sweep times, etc.>"
}

Create protocols for these scenarios (minimum 8, prioritize based on runner's vulnerabilities):
1. GI Distress (nausea/vomiting) - ${input.giIssuesHistory ? 'HIGH PRIORITY - runner has history' : 'standard'}
2. Blisters/Foot Problems - ${input.blisterProneAreas ? 'HIGH PRIORITY - runner is prone in: ' + input.blisterProneAreas : 'standard'}
3. Falling Behind Cutoffs
4. Heat-related illness (if relevant to weather)
5. Hypothermia/Cold exposure (if night sections or cold weather)
6. Muscle Cramps
7. Equipment Failure
8. Mental Breakdown / Dark Patch
${input.medicalConditions ? `9. ${input.medicalConditions}-related issues` : ''}

For each protocol:
- Be specific with numbers (e.g., "if vomiting more than 3 times in an hour")
- Give actionable immediate steps in priority order
- Include prevention that can be done before and during race
- Make "when to stop" criteria objective and measurable`;

  const response = await withRetry(
    () =>
      anthropic.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      }),
    "generateContingencyProtocols"
  );

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";
  const data = parseAndValidate(content, contingencyProtocolsSchema, "generateContingencyProtocols");

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
