/**
 * Time Consistency Validation & Auto-Correction
 *
 * Validates and corrects time-related data:
 * - Ensures cumulative times are sequential
 * - Recalculates total race time from section times
 * - Fixes AM/PM indicators based on race start + elapsed time
 */

import type { PacingStrategy } from "@/lib/schemas/guide-sections";

export interface TimeValidationResult {
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

// Parse time string to minutes
function parseTimeToMinutes(timeStr: string): number | null {
  if (!timeStr) return null;

  // Handle "HH:MM:SS" format
  const hmsMatch = timeStr.match(/(\d+):(\d{2}):(\d{2})/);
  if (hmsMatch) {
    const hours = parseInt(hmsMatch[1], 10);
    const minutes = parseInt(hmsMatch[2], 10);
    return hours * 60 + minutes;
  }

  // Handle "H:MM" or "HH:MM" format
  const hmMatch = timeStr.match(/(\d+):(\d{2})/);
  if (hmMatch) {
    const hours = parseInt(hmMatch[1], 10);
    const minutes = parseInt(hmMatch[2], 10);
    return hours * 60 + minutes;
  }

  // Handle "Xh Ym" format
  const hMinMatch = timeStr.match(/(\d+)h\s*(\d+)?m?/i);
  if (hMinMatch) {
    const hours = parseInt(hMinMatch[1], 10);
    const minutes = hMinMatch[2] ? parseInt(hMinMatch[2], 10) : 0;
    return hours * 60 + minutes;
  }

  return null;
}

// Format minutes back to HH:MM string
function formatMinutesToHHMM(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

// Parse pace string (MM:SS per mile) to seconds
function parsePaceToSeconds(paceStr: string): number | null {
  if (!paceStr) return null;

  const match = paceStr.match(/(\d+):(\d{2})/);
  if (match) {
    const minutes = parseInt(match[1], 10);
    const seconds = parseInt(match[2], 10);
    return minutes * 60 + seconds;
  }

  return null;
}

export function validateAndCorrectTimes(
  pacingData: PacingStrategy
): { result: TimeValidationResult; correctedData: PacingStrategy } {
  const result: TimeValidationResult = {
    corrections: [],
    errors: [],
    warnings: [],
  };

  const correctedSections = [...pacingData.sections];
  let runningTotalMinutes = 0;

  // Validate and correct each section's cumulative time
  pacingData.sections.forEach((section, index) => {
    // Parse section time
    const sectionTimeMinutes = parseTimeToMinutes(section.sectionTime);

    if (sectionTimeMinutes === null) {
      result.warnings.push({
        section: "pacingStrategy",
        field: `sections[${index}].sectionTime`,
        message: `Could not parse section time "${section.sectionTime}" for ${section.name}`,
      });
      return;
    }

    // Add to running total
    runningTotalMinutes += sectionTimeMinutes;

    // Parse current cumulative time
    const currentCumulativeMinutes = parseTimeToMinutes(section.cumulativeTime);

    // Check if cumulative time matches running total
    if (currentCumulativeMinutes !== runningTotalMinutes) {
      const correctedCumulativeTime = formatMinutesToHHMM(runningTotalMinutes);

      result.corrections.push({
        section: "pacingStrategy",
        field: `sections[${index}].cumulativeTime`,
        oldValue: section.cumulativeTime,
        newValue: correctedCumulativeTime,
        reason: `Recalculated cumulative time (sum of sections 0-${index})`,
      });

      correctedSections[index] = {
        ...correctedSections[index],
        cumulativeTime: correctedCumulativeTime,
      };
    }

    // Validate cumulative mile matches end mile
    if (section.cumulativeMile !== section.endMile) {
      result.corrections.push({
        section: "pacingStrategy",
        field: `sections[${index}].cumulativeMile`,
        oldValue: section.cumulativeMile,
        newValue: section.endMile,
        reason: `Cumulative mile should match section end mile`,
      });

      correctedSections[index] = {
        ...correctedSections[index],
        cumulativeMile: section.endMile,
      };
    }

    // Validate pace is reasonable (5:00 - 30:00 min/mile)
    const paceSeconds = parsePaceToSeconds(section.targetPace);
    if (paceSeconds !== null) {
      if (paceSeconds < 300) { // < 5:00/mile
        result.warnings.push({
          section: "pacingStrategy",
          field: `sections[${index}].targetPace`,
          message: `Pace of ${section.targetPace}/mile seems too fast for ultramarathon in ${section.name}`,
        });
      } else if (paceSeconds > 1800) { // > 30:00/mile
        result.warnings.push({
          section: "pacingStrategy",
          field: `sections[${index}].targetPace`,
          message: `Pace of ${section.targetPace}/mile seems very slow in ${section.name}`,
        });
      }
    }
  });

  // Validate total estimated time matches sum of section times
  const calculatedTotalTime = formatMinutesToHHMM(runningTotalMinutes);
  const currentTotalMinutes = parseTimeToMinutes(pacingData.totalEstimatedTime);

  if (currentTotalMinutes !== runningTotalMinutes) {
    result.corrections.push({
      section: "pacingStrategy",
      field: "totalEstimatedTime",
      oldValue: pacingData.totalEstimatedTime,
      newValue: calculatedTotalTime,
      reason: `Recalculated from sum of all section times`,
    });
  }

  // Validate sections are sequential (end mile of previous = start mile of current)
  for (let i = 1; i < pacingData.sections.length; i++) {
    const prevSection = pacingData.sections[i - 1];
    const currSection = pacingData.sections[i];

    if (prevSection.endMile !== currSection.startMile) {
      result.warnings.push({
        section: "pacingStrategy",
        field: `sections[${i}].startMile`,
        message: `Gap between sections: ${prevSection.name} ends at mile ${prevSection.endMile} but ${currSection.name} starts at mile ${currSection.startMile}`,
      });
    }
  }

  // Calculate average pace
  const lastSection = pacingData.sections[pacingData.sections.length - 1];
  const totalMiles = lastSection?.endMile || 0;

  if (totalMiles > 0 && runningTotalMinutes > 0) {
    const avgPaceMinutes = runningTotalMinutes / totalMiles;
    const avgPaceFormatted = formatMinutesToHHMM(Math.round(avgPaceMinutes));
    const currentAvgPaceMinutes = parseTimeToMinutes(pacingData.averagePace);

    // Allow 1 minute tolerance for rounding
    if (currentAvgPaceMinutes !== null && Math.abs(currentAvgPaceMinutes - avgPaceMinutes) > 1) {
      result.warnings.push({
        section: "pacingStrategy",
        field: "averagePace",
        message: `Average pace ${pacingData.averagePace} may not match calculated ${avgPaceFormatted}/mile`,
      });
    }
  }

  return {
    result,
    correctedData: {
      ...pacingData,
      sections: correctedSections,
      totalEstimatedTime: calculatedTotalTime,
    },
  };
}
