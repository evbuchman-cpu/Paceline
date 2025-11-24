/**
 * Nutrition Timeline Validation & Auto-Correction
 *
 * Validates and corrects nutrition calculations:
 * - Recalculates total calories, sodium, fluids from timeline
 * - Fixes per-hour rates based on race duration
 * - Warns if values are outside recommended ranges
 */

import type { NutritionTimeline } from "@/lib/schemas/guide-sections";

export interface NutritionValidationResult {
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

// Parse time elapsed format (e.g., "4:30" or "4h 30m") to hours
function parseTimeElapsedToHours(timeStr: string): number | null {
  if (!timeStr) return null;

  // Handle "Xh Ym" format
  const hMinMatch = timeStr.match(/(\d+)h\s*(\d+)?m?/i);
  if (hMinMatch) {
    const hours = parseInt(hMinMatch[1], 10);
    const minutes = hMinMatch[2] ? parseInt(hMinMatch[2], 10) : 0;
    return hours + minutes / 60;
  }

  // Handle "H:MM" or "HH:MM" format
  const colonMatch = timeStr.match(/(\d+):(\d{2})/);
  if (colonMatch) {
    const hours = parseInt(colonMatch[1], 10);
    const minutes = parseInt(colonMatch[2], 10);
    return hours + minutes / 60;
  }

  return null;
}

// Recommended ranges for ultramarathons
const NUTRITION_RANGES = {
  caloriesPerHour: { min: 200, max: 400, unit: "cal/hr" },
  sodiumPerHour: { min: 300, max: 1000, unit: "mg/hr" },
  fluidsPerHour: { min: 400, max: 1200, unit: "ml/hr" },
};

export function validateAndCorrectNutrition(
  nutritionData: NutritionTimeline
): { result: NutritionValidationResult; correctedData: NutritionTimeline } {
  const result: NutritionValidationResult = {
    corrections: [],
    errors: [],
    warnings: [],
  };

  // Calculate totals from timeline
  let calculatedTotalCalories = 0;
  let calculatedTotalSodium = 0;
  let calculatedTotalFluids = 0;
  let maxTimeElapsedHours = 0;

  nutritionData.timeline.forEach((entry, index) => {
    // Sum up totals
    calculatedTotalCalories += entry.calories || 0;
    calculatedTotalSodium += entry.sodium || 0;
    calculatedTotalFluids += entry.fluids || 0;

    // Track maximum time elapsed to calculate per-hour rates
    const timeElapsed = parseTimeElapsedToHours(entry.timeElapsed);
    if (timeElapsed !== null && timeElapsed > maxTimeElapsedHours) {
      maxTimeElapsedHours = timeElapsed;
    }

    // Validate individual entries
    if (entry.calories < 0) {
      result.warnings.push({
        section: "nutritionTimeline",
        field: `timeline[${index}].calories`,
        message: `Negative calories (${entry.calories}) at entry ${index + 1}`,
      });
    }

    if (entry.sodium < 0) {
      result.warnings.push({
        section: "nutritionTimeline",
        field: `timeline[${index}].sodium`,
        message: `Negative sodium (${entry.sodium}) at entry ${index + 1}`,
      });
    }

    if (entry.fluids < 0) {
      result.warnings.push({
        section: "nutritionTimeline",
        field: `timeline[${index}].fluids`,
        message: `Negative fluids (${entry.fluids}) at entry ${index + 1}`,
      });
    }
  });

  // Use at least 1 hour to avoid division by zero
  const raceHours = Math.max(maxTimeElapsedHours, 1);

  // Calculate per-hour rates
  const calculatedCaloriesPerHour = Math.round(calculatedTotalCalories / raceHours);
  const calculatedSodiumPerHour = Math.round(calculatedTotalSodium / raceHours);
  const calculatedFluidsPerHour = Math.round(calculatedTotalFluids / raceHours);

  // Correct summary values
  const correctedSummary = { ...nutritionData.summary };

  // Total calories
  if (nutritionData.summary.totalCalories !== calculatedTotalCalories) {
    result.corrections.push({
      section: "nutritionTimeline",
      field: "summary.totalCalories",
      oldValue: nutritionData.summary.totalCalories,
      newValue: calculatedTotalCalories,
      reason: `Recalculated sum from ${nutritionData.timeline.length} timeline entries`,
    });
    correctedSummary.totalCalories = calculatedTotalCalories;
  }

  // Calories per hour
  if (nutritionData.summary.caloriesPerHour !== calculatedCaloriesPerHour) {
    result.corrections.push({
      section: "nutritionTimeline",
      field: "summary.caloriesPerHour",
      oldValue: nutritionData.summary.caloriesPerHour,
      newValue: calculatedCaloriesPerHour,
      reason: `Recalculated from ${calculatedTotalCalories} cal / ${raceHours.toFixed(1)} hours`,
    });
    correctedSummary.caloriesPerHour = calculatedCaloriesPerHour;
  }

  // Total sodium
  if (nutritionData.summary.totalSodium !== calculatedTotalSodium) {
    result.corrections.push({
      section: "nutritionTimeline",
      field: "summary.totalSodium",
      oldValue: nutritionData.summary.totalSodium,
      newValue: calculatedTotalSodium,
      reason: `Recalculated sum from ${nutritionData.timeline.length} timeline entries`,
    });
    correctedSummary.totalSodium = calculatedTotalSodium;
  }

  // Sodium per hour
  if (nutritionData.summary.sodiumPerHour !== calculatedSodiumPerHour) {
    result.corrections.push({
      section: "nutritionTimeline",
      field: "summary.sodiumPerHour",
      oldValue: nutritionData.summary.sodiumPerHour,
      newValue: calculatedSodiumPerHour,
      reason: `Recalculated from ${calculatedTotalSodium} mg / ${raceHours.toFixed(1)} hours`,
    });
    correctedSummary.sodiumPerHour = calculatedSodiumPerHour;
  }

  // Total fluids
  if (nutritionData.summary.totalFluids !== calculatedTotalFluids) {
    result.corrections.push({
      section: "nutritionTimeline",
      field: "summary.totalFluids",
      oldValue: nutritionData.summary.totalFluids,
      newValue: calculatedTotalFluids,
      reason: `Recalculated sum from ${nutritionData.timeline.length} timeline entries`,
    });
    correctedSummary.totalFluids = calculatedTotalFluids;
  }

  // Fluids per hour
  if (nutritionData.summary.fluidsPerHour !== calculatedFluidsPerHour) {
    result.corrections.push({
      section: "nutritionTimeline",
      field: "summary.fluidsPerHour",
      oldValue: nutritionData.summary.fluidsPerHour,
      newValue: calculatedFluidsPerHour,
      reason: `Recalculated from ${calculatedTotalFluids} ml / ${raceHours.toFixed(1)} hours`,
    });
    correctedSummary.fluidsPerHour = calculatedFluidsPerHour;
  }

  // Check recommended ranges and add warnings
  if (
    calculatedCaloriesPerHour < NUTRITION_RANGES.caloriesPerHour.min ||
    calculatedCaloriesPerHour > NUTRITION_RANGES.caloriesPerHour.max
  ) {
    result.warnings.push({
      section: "nutritionTimeline",
      field: "summary.caloriesPerHour",
      message: `${calculatedCaloriesPerHour} cal/hr is outside recommended range (${NUTRITION_RANGES.caloriesPerHour.min}-${NUTRITION_RANGES.caloriesPerHour.max})`,
    });
  }

  if (
    calculatedSodiumPerHour < NUTRITION_RANGES.sodiumPerHour.min ||
    calculatedSodiumPerHour > NUTRITION_RANGES.sodiumPerHour.max
  ) {
    result.warnings.push({
      section: "nutritionTimeline",
      field: "summary.sodiumPerHour",
      message: `${calculatedSodiumPerHour} mg/hr is outside recommended range (${NUTRITION_RANGES.sodiumPerHour.min}-${NUTRITION_RANGES.sodiumPerHour.max})`,
    });
  }

  if (
    calculatedFluidsPerHour < NUTRITION_RANGES.fluidsPerHour.min ||
    calculatedFluidsPerHour > NUTRITION_RANGES.fluidsPerHour.max
  ) {
    result.warnings.push({
      section: "nutritionTimeline",
      field: "summary.fluidsPerHour",
      message: `${calculatedFluidsPerHour} ml/hr is outside recommended range (${NUTRITION_RANGES.fluidsPerHour.min}-${NUTRITION_RANGES.fluidsPerHour.max})`,
    });
  }

  return {
    result,
    correctedData: {
      ...nutritionData,
      summary: correctedSummary,
    },
  };
}
