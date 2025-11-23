import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";

// === TYPES ===

interface ParseOptions {
  stepName: string;
  maxTokens: number;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
  stopReason: string;
}

interface ParseResult<T> {
  data: T;
  truncationDetected: boolean;
  recoveryApplied: boolean;
}

interface RetryWithConciseOptions {
  anthropic: Anthropic;
  model: string;
  maxTokens: number;
  systemPrompt: string;
  userPrompt: string;
  stepName: string;
  maxRetries?: number;
}

// === ITERATIVE RETRY FOR TRUNCATION ===

/**
 * Wraps API call with automatic retry on truncation.
 *
 * SAFEGUARDS:
 * - Hard limit of maxRetries (default 2, max 3)
 * - Always returns a response after max attempts
 * - Each retry adds concise instructions to reduce output
 * - Will never loop infinitely
 */
export async function withConciseRetry(
  options: RetryWithConciseOptions
): Promise<Anthropic.Messages.Message> {
  const { anthropic, model, maxTokens, systemPrompt, stepName } = options;
  // Enforce maximum of 3 retries to prevent runaway
  const maxRetries = Math.min(options.maxRetries ?? 2, 3);
  let currentPrompt = options.userPrompt;
  let lastResponse: Anthropic.Messages.Message | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`📤 ${stepName}: Attempt ${attempt}/${maxRetries}`);

    const response = await withRetry(
      () => anthropic.messages.create({
        model,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [{ role: "user", content: currentPrompt }],
      }),
      stepName
    );

    lastResponse = response;

    // Check for truncation
    const tokenUtilization = response.usage.output_tokens / maxTokens;
    const isTruncated = response.stop_reason === "max_tokens" || tokenUtilization >= 0.99;

    if (!isTruncated) {
      console.log(`✅ ${stepName}: Complete response received on attempt ${attempt}`);
      return response;
    }

    // Log truncation status
    console.log(
      `⚠️ ${stepName}: Truncated (${response.usage.output_tokens}/${maxTokens} tokens, ${(tokenUtilization * 100).toFixed(1)}%)`
    );

    // If this is the last attempt, return what we have
    if (attempt === maxRetries) {
      console.warn(
        `⚠️ ${stepName}: Max retries (${maxRetries}) reached, proceeding with truncated output`
      );
      return response;
    }

    // Add progressively stronger concise instructions for next attempt
    const conciseLevel = attempt === 1 ? "30-40%" : "50-60%";
    currentPrompt = `${options.userPrompt}

CRITICAL: Previous response was truncated at ${response.usage.output_tokens} tokens. Be MORE CONCISE:
- Reduce ALL text fields by ${conciseLevel}
- Use bullet points, not paragraphs
- Max 15-20 words per text field
- Only essential, actionable content
- No redundant information`;
  }

  // This should never be reached, but return last response as safety
  if (lastResponse) {
    return lastResponse;
  }
  throw new Error(`${stepName}: No response received after ${maxRetries} attempts`);
}

// === LEGACY RETRY FUNCTION (kept for backwards compatibility) ===

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

// === ROBUST JSON PARSER ===

export function robustParseAndValidate<T>(
  content: string,
  schema: z.ZodSchema<T>,
  options: ParseOptions
): ParseResult<T> {
  const { stepName, maxTokens, usage, stopReason } = options;

  // Track issues for error reporting
  const issues: string[] = [];
  let truncationDetected = false;
  let recoveryApplied = false;

  // === 1. TRUNCATION DETECTION (before parsing) ===

  // Check stop_reason
  if (stopReason === "max_tokens") {
    truncationDetected = true;
    issues.push(`stop_reason was "max_tokens"`);
  }

  // Check 99% threshold
  const tokenUtilization = usage.output_tokens / maxTokens;
  if (tokenUtilization >= 0.99) {
    truncationDetected = true;
    issues.push(`Token utilization at ${(tokenUtilization * 100).toFixed(1)}% (${usage.output_tokens}/${maxTokens})`);
  }

  // === 2. STRIP MARKDOWN CODE BLOCKS ===

  let jsonString = content.trim();

  if (jsonString.startsWith("```json")) {
    jsonString = jsonString.slice(7);
  } else if (jsonString.startsWith("```")) {
    jsonString = jsonString.slice(3);
  }
  if (jsonString.endsWith("```")) {
    jsonString = jsonString.slice(0, -3);
  }
  jsonString = jsonString.trim();

  // === 3. VALIDATE JSON STRUCTURE ===

  // Check for balanced braces
  const openBraces = (jsonString.match(/{/g) || []).length;
  const closeBraces = (jsonString.match(/}/g) || []).length;
  if (openBraces !== closeBraces) {
    issues.push(`Unbalanced braces: ${openBraces} open, ${closeBraces} close`);
  }

  // Check for balanced brackets
  const openBrackets = (jsonString.match(/\[/g) || []).length;
  const closeBrackets = (jsonString.match(/]/g) || []).length;
  if (openBrackets !== closeBrackets) {
    issues.push(`Unbalanced brackets: ${openBrackets} open, ${closeBrackets} close`);
  }

  // Check for unterminated strings (simple heuristic)
  // Count unescaped quotes - should be even
  const quoteMatches = jsonString.match(/(?<!\\)"/g) || [];
  if (quoteMatches.length % 2 !== 0) {
    issues.push(`Unterminated string detected (odd number of quotes: ${quoteMatches.length})`);
  }

  // Check ending character
  const lastChar = jsonString.slice(-1);
  if (lastChar !== "}" && lastChar !== "]") {
    issues.push(`JSON does not end with } or ] (ends with "${lastChar}")`);
  }

  // === 4. ATTEMPT REPAIR IF TRUNCATED ===

  if (truncationDetected || issues.length > 0) {
    const repairedJson = attemptJsonRepair(jsonString);
    if (repairedJson !== jsonString) {
      jsonString = repairedJson;
      recoveryApplied = true;
      issues.push("Attempted JSON repair");
    }
  }

  // === 5. PARSE JSON ===

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch (error) {
    const parseError = error instanceof Error ? error.message : "Unknown parse error";

    // Build detailed error message
    const errorDetails = [
      `${stepName}: JSON parse failed`,
      ``,
      `Parse error: ${parseError}`,
      ``,
      `Diagnostics:`,
      `- Tokens: ${usage.output_tokens}/${maxTokens} (${(tokenUtilization * 100).toFixed(1)}%)`,
      `- Stop reason: ${stopReason}`,
      `- Truncation detected: ${truncationDetected}`,
      `- Content length: ${jsonString.length} chars`,
      issues.length > 0 ? `- Issues: ${issues.join("; ")}` : null,
      ``,
      `Last 300 characters:`,
      `"${jsonString.slice(-300)}"`,
    ].filter(Boolean).join("\n");

    console.error(errorDetails);
    throw new Error(errorDetails);
  }

  // === 6. VALIDATE WITH ZOD (with defaults) ===

  try {
    // Use safeParse to get detailed errors
    const result = schema.safeParse(parsed);

    if (!result.success) {
      // Try to apply defaults for missing fields
      const withDefaults = applyDefaults(parsed);
      const retryResult = schema.safeParse(withDefaults);

      if (retryResult.success) {
        recoveryApplied = true;
        console.log(`${stepName}: Applied defaults for missing fields`);
        return {
          data: retryResult.data,
          truncationDetected,
          recoveryApplied,
        };
      }

      // Still failed - throw detailed error
      const zodErrors = result.error.errors.map(e =>
        `  - ${e.path.join(".")}: ${e.message}`
      ).join("\n");

      throw new Error(
        `${stepName}: Schema validation failed\n` +
        `Tokens: ${usage.output_tokens}/${maxTokens}\n` +
        `Truncation: ${truncationDetected}\n` +
        `Errors:\n${zodErrors}`
      );
    }

    return {
      data: result.data,
      truncationDetected,
      recoveryApplied,
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes("Schema validation")) {
      throw error; // Re-throw our formatted error
    }
    throw new Error(
      `${stepName}: Validation error - ${error instanceof Error ? error.message : "Unknown"}`
    );
  }
}

// === HELPER: Attempt to repair truncated JSON ===

function attemptJsonRepair(json: string): string {
  let repaired = json;

  // Close any unclosed strings
  const quotes = (repaired.match(/(?<!\\)"/g) || []).length;
  if (quotes % 2 !== 0) {
    repaired += '"';
  }

  // Close any unclosed arrays/objects
  const openBraces = (repaired.match(/{/g) || []).length;
  const closeBraces = (repaired.match(/}/g) || []).length;
  const openBrackets = (repaired.match(/\[/g) || []).length;
  const closeBrackets = (repaired.match(/]/g) || []).length;

  // Add missing brackets first (usually arrays are inside objects)
  for (let i = 0; i < openBrackets - closeBrackets; i++) {
    repaired += "]";
  }

  // Add missing braces
  for (let i = 0; i < openBraces - closeBraces; i++) {
    repaired += "}";
  }

  return repaired;
}

// === HELPER: Apply defaults for missing fields ===

function applyDefaults(data: unknown): unknown {
  if (typeof data !== "object" || data === null) {
    return data;
  }

  const obj = { ...data as Record<string, unknown> };

  // Common defaults for Paceline guide sections
  const commonDefaults: Record<string, unknown> = {
    // Cutoff status indicators
    statusEmoji: "🟢",
    status: "on_track",

    // Empty arrays for optional lists
    warnings: [],
    notes: [],
    tips: [],
    warningSignsToWatch: [],
    gearChanges: [],

    // Default strings
    recommendation: "Continue as planned",
    summary: "See details above",
    mentalSupport: "Stay focused and positive",
    communicationPlan: "Text updates at each crew station",
    emergencyProtocol: "Contact race officials if emergency assistance needed",
  };

  // Apply defaults for any missing keys that we have defaults for
  for (const [key, defaultValue] of Object.entries(commonDefaults)) {
    if (obj[key] === undefined) {
      obj[key] = defaultValue;
    }
  }

  // Recursively apply to nested objects and arrays
  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      obj[key] = value.map(item => applyDefaults(item));
    } else if (typeof value === "object" && value !== null) {
      obj[key] = applyDefaults(value);
    }
  }

  return obj;
}

// === LEGACY PARSER (kept for reference, not used) ===

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
