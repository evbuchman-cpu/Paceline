import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const CLAUDE_MODEL = "claude-sonnet-4-5-20250929";

export function calculateCost(usage: { input_tokens: number; output_tokens: number }): number {
  // Claude Sonnet 4 pricing: $3/M input, $15/M output
  const inputCost = (usage.input_tokens / 1000000) * 3;
  const outputCost = (usage.output_tokens / 1000000) * 15;
  return Math.round((inputCost + outputCost) * 10000) / 10000;
}
