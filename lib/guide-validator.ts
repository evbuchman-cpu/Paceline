/**
 * Guide Validation & Auto-Correction Orchestrator
 *
 * Main entry point for validating and auto-correcting AI-generated guide data.
 * Runs all validators in sequence and aggregates results.
 */

import type { GuideData } from "@/lib/pdf-generator";
import { validateAndCorrectCutoffs } from "@/lib/validation/cutoff-validator";
import { validateAndCorrectNutrition } from "@/lib/validation/nutrition-validator";
import { validateAndCorrectTimes } from "@/lib/validation/time-validator";
import { validateAndCorrectConsistency } from "@/lib/validation/consistency-validator";

export interface ValidationResult {
  isValid: boolean;
  wasAutoCorrected: boolean;
  corrections: Array<{
    section: string;
    field: string;
    oldValue: unknown;
    newValue: unknown;
    reason: string;
  }>;
  errors: Array<{
    section: string;
    field: string;
    message: string;
  }>;
  warnings: Array<{
    section: string;
    field: string;
    message: string;
  }>;
}

/**
 * Validate and auto-correct AI-generated guide data
 *
 * This function runs all validators on the guide data and attempts to
 * auto-correct any fixable errors. It returns the validation result
 * along with the corrected data.
 *
 * @param guideData - The raw AI-generated guide data
 * @returns Validation result and corrected data
 */
export function validateAndCorrectGuideData(guideData: GuideData): {
  result: ValidationResult;
  correctedData: GuideData;
} {
  const result: ValidationResult = {
    isValid: true,
    wasAutoCorrected: false,
    corrections: [],
    errors: [],
    warnings: [],
  };

  // Create a mutable copy of the guide data
  const correctedData: GuideData = {
    raceOverview: guideData.raceOverview,
    pacingStrategy: { ...guideData.pacingStrategy },
    cutoffManagement: { ...guideData.cutoffManagement },
    crewLogistics: { ...guideData.crewLogistics },
    dropBagStrategy: { ...guideData.dropBagStrategy },
    nutritionTimeline: { ...guideData.nutritionTimeline },
    contingencyProtocols: guideData.contingencyProtocols,
    mentalStrategy: guideData.mentalStrategy,
  };

  // Step 1: Validate and correct time consistency (pacing strategy)
  const timeValidation = validateAndCorrectTimes(correctedData.pacingStrategy);
  aggregateResults(result, timeValidation.result);
  correctedData.pacingStrategy = timeValidation.correctedData;

  // Step 2: Validate and correct cutoff buffers
  const cutoffValidation = validateAndCorrectCutoffs(correctedData.cutoffManagement);
  aggregateResults(result, cutoffValidation.result);
  correctedData.cutoffManagement = cutoffValidation.correctedData;

  // Step 3: Validate and correct nutrition totals
  const nutritionValidation = validateAndCorrectNutrition(correctedData.nutritionTimeline);
  aggregateResults(result, nutritionValidation.result);
  correctedData.nutritionTimeline = nutritionValidation.correctedData;

  // Step 4: Validate cross-section consistency
  const consistencyValidation = validateAndCorrectConsistency(
    correctedData.raceOverview,
    correctedData.cutoffManagement,
    correctedData.crewLogistics,
    correctedData.dropBagStrategy
  );
  aggregateResults(result, consistencyValidation.result);
  correctedData.cutoffManagement = consistencyValidation.correctedCutoff;
  correctedData.crewLogistics = consistencyValidation.correctedCrew;
  correctedData.dropBagStrategy = consistencyValidation.correctedDropBag;

  // Step 5: Validate pacing section distances sum to total
  const pacingDistanceValidation = validatePacingDistances(correctedData);
  aggregateResults(result, pacingDistanceValidation.result);
  if (pacingDistanceValidation.correctedPacing) {
    correctedData.pacingStrategy = pacingDistanceValidation.correctedPacing;
  }

  // Determine final validity
  result.isValid = result.errors.length === 0;
  result.wasAutoCorrected = result.corrections.length > 0;

  return {
    result,
    correctedData,
  };
}

/**
 * Validate pacing distances sum to race total
 */
function validatePacingDistances(guideData: GuideData): {
  result: {
    corrections: ValidationResult["corrections"];
    errors: ValidationResult["errors"];
    warnings: ValidationResult["warnings"];
  };
  correctedPacing?: GuideData["pacingStrategy"];
} {
  const result: {
    corrections: ValidationResult["corrections"];
    errors: ValidationResult["errors"];
    warnings: ValidationResult["warnings"];
  } = {
    corrections: [],
    errors: [],
    warnings: [],
  };

  const raceDistance = guideData.raceOverview.distance;
  const sections = guideData.pacingStrategy.sections;

  if (!sections || sections.length === 0) {
    result.warnings.push({
      section: "pacingStrategy",
      field: "sections",
      message: "No pacing sections found",
    });
    return { result };
  }

  // Calculate total distance from sections
  const totalSectionDistance = sections.reduce(
    (sum, section) => sum + section.distance,
    0
  );

  // Check if distances match (allow 0.5 mile tolerance)
  if (Math.abs(totalSectionDistance - raceDistance) > 0.5) {
    // Try to auto-correct by scaling section distances proportionally
    const scaleFactor = raceDistance / totalSectionDistance;

    const correctedSections = sections.map((section, index) => {
      const correctedDistance = Math.round(section.distance * scaleFactor * 10) / 10;

      if (Math.abs(correctedDistance - section.distance) > 0.1) {
        result.corrections.push({
          section: "pacingStrategy",
          field: `sections[${index}].distance`,
          oldValue: section.distance,
          newValue: correctedDistance,
          reason: `Scaled proportionally to match race distance of ${raceDistance} miles`,
        });
      }

      // Recalculate start and end miles
      let newStartMile = 0;
      for (let i = 0; i < index; i++) {
        newStartMile += Math.round(sections[i].distance * scaleFactor * 10) / 10;
      }
      const newEndMile = newStartMile + correctedDistance;

      return {
        ...section,
        distance: correctedDistance,
        startMile: Math.round(newStartMile * 10) / 10,
        endMile: Math.round(newEndMile * 10) / 10,
        cumulativeMile: Math.round(newEndMile * 10) / 10,
      };
    });

    return {
      result,
      correctedPacing: {
        ...guideData.pacingStrategy,
        sections: correctedSections,
      },
    };
  }

  // Verify first section starts at 0
  if (sections[0].startMile !== 0) {
    result.corrections.push({
      section: "pacingStrategy",
      field: "sections[0].startMile",
      oldValue: sections[0].startMile,
      newValue: 0,
      reason: "First section must start at mile 0",
    });

    const correctedSections = [...sections];
    correctedSections[0] = {
      ...correctedSections[0],
      startMile: 0,
    };

    return {
      result,
      correctedPacing: {
        ...guideData.pacingStrategy,
        sections: correctedSections,
      },
    };
  }

  return { result };
}

/**
 * Aggregate results from individual validators
 */
function aggregateResults(
  mainResult: ValidationResult,
  validatorResult: {
    corrections: ValidationResult["corrections"];
    errors: ValidationResult["errors"];
    warnings: ValidationResult["warnings"];
  }
): void {
  mainResult.corrections.push(...validatorResult.corrections);
  mainResult.errors.push(...validatorResult.errors);
  mainResult.warnings.push(...validatorResult.warnings);
}

/**
 * Format validation result for logging
 */
export function formatValidationResult(result: ValidationResult): string {
  const lines: string[] = [];

  lines.push(`Validation Result: ${result.isValid ? "PASSED" : "FAILED"}`);
  lines.push(`Auto-corrected: ${result.wasAutoCorrected ? "YES" : "NO"}`);

  if (result.corrections.length > 0) {
    lines.push(`\nCorrections (${result.corrections.length}):`);
    result.corrections.forEach((c) => {
      lines.push(`  - ${c.section}.${c.field}: ${JSON.stringify(c.oldValue)} -> ${JSON.stringify(c.newValue)}`);
      lines.push(`    Reason: ${c.reason}`);
    });
  }

  if (result.errors.length > 0) {
    lines.push(`\nErrors (${result.errors.length}):`);
    result.errors.forEach((e) => {
      lines.push(`  - ${e.section}.${e.field}: ${e.message}`);
    });
  }

  if (result.warnings.length > 0) {
    lines.push(`\nWarnings (${result.warnings.length}):`);
    result.warnings.forEach((w) => {
      lines.push(`  - ${w.section}.${w.field}: ${w.message}`);
    });
  }

  return lines.join("\n");
}
