import { z } from "zod";

export async function withRetry<T>(
  operation: () => Promise<T>,
  operationName: string,
  maxRetries: number = 3
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const isLastAttempt = attempt === maxRetries;
      const delay = 1000 * Math.pow(2, attempt - 1);
      console.log(
        `⚠️ ${operationName}: Attempt ${attempt}/${maxRetries} failed${
          isLastAttempt ? "" : `, retrying in ${delay}ms...`
        }`
      );
      if (isLastAttempt) throw error;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("Unreachable");
}

export function parseAndValidate<T>(
  content: string,
  schema: z.ZodSchema<T>,
  stepName: string
): T {
  let jsonString = content.trim();

  // Remove markdown code blocks if present
  if (jsonString.startsWith("```json")) {
    jsonString = jsonString.slice(7);
  } else if (jsonString.startsWith("```")) {
    jsonString = jsonString.slice(3);
  }
  if (jsonString.endsWith("```")) {
    jsonString = jsonString.slice(0, -3);
  }
  jsonString = jsonString.trim();

  try {
    const parsed = JSON.parse(jsonString);
    return schema.parse(parsed);
  } catch (error) {
    console.error(`${stepName}: JSON parse/validate failed:`, error);
    throw new Error(
      `${stepName}: Invalid response format - ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
