/**
 * Cutoff Buffer Validation & Auto-Correction
 *
 * Validates and corrects cutoff buffer calculations:
 * - Recalculates bufferMinutes from cutoff and predicted arrival
 * - Fixes status to match buffer thresholds
 * - Flags unfixable errors when predicted arrival is impossibly late
 */

import type { CutoffManagement } from "@/lib/schemas/guide-sections";

export interface CutoffValidationResult {
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

// Time parsing helpers
function parseTimeToMinutes(timeStr: string): number | null {
  if (!timeStr) return null;

  // Handle HH:MM AM/PM format
  const amPmMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (amPmMatch) {
    let hours = parseInt(amPmMatch[1], 10);
    const minutes = parseInt(amPmMatch[2], 10);
    const period = amPmMatch[3]?.toUpperCase();

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  }

  // Handle elapsed time format HH:MM:SS or H:MM
  const elapsedMatch = timeStr.match(/(\d+):(\d{2})(?::(\d{2}))?/);
  if (elapsedMatch) {
    const hours = parseInt(elapsedMatch[1], 10);
    const minutes = parseInt(elapsedMatch[2], 10);
    return hours * 60 + minutes;
  }

  return null;
}

function formatMinutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Format as "HH hours MM min" or similar readable format
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}m`;
  }
}

function getStatusForBuffer(bufferMinutes: number): {
  status: "green" | "yellow" | "red";
  statusEmoji: string;
} {
  if (bufferMinutes >= 180) {
    return { status: "green", statusEmoji: "🟢" };
  } else if (bufferMinutes >= 60) {
    return { status: "yellow", statusEmoji: "🟡" };
  } else {
    return { status: "red", statusEmoji: "🔴" };
  }
}

export function validateAndCorrectCutoffs(
  cutoffData: CutoffManagement
): { result: CutoffValidationResult; correctedData: CutoffManagement } {
  const result: CutoffValidationResult = {
    corrections: [],
    errors: [],
    warnings: [],
  };

  const correctedStations = cutoffData.stations.map((station, index) => {
    const stationName = station.name || `Station ${index + 1}`;
    const correctedStation = { ...station };

    // Skip stations without cutoffs
    if (!station.cutoffTime) {
      return correctedStation;
    }

    const cutoffMinutes = parseTimeToMinutes(station.cutoffTime);
    const arrivalMinutes = parseTimeToMinutes(station.predictedArrival);

    if (cutoffMinutes === null) {
      result.warnings.push({
        section: "cutoffManagement",
        field: `stations[${index}].cutoffTime`,
        message: `Could not parse cutoff time "${station.cutoffTime}" for ${stationName}`,
      });
      return correctedStation;
    }

    if (arrivalMinutes === null) {
      result.warnings.push({
        section: "cutoffManagement",
        field: `stations[${index}].predictedArrival`,
        message: `Could not parse predicted arrival "${station.predictedArrival}" for ${stationName}`,
      });
      return correctedStation;
    }

    // Calculate correct buffer
    const calculatedBuffer = cutoffMinutes - arrivalMinutes;

    // Check for impossibly late arrival (more than 30 minutes past cutoff)
    if (calculatedBuffer < -30) {
      result.errors.push({
        section: "cutoffManagement",
        field: `stations[${index}]`,
        message: `Predicted arrival at ${stationName} is ${Math.abs(calculatedBuffer)} minutes after cutoff - impossible pace`,
      });
      return correctedStation;
    }

    // Correct buffer minutes if different
    if (station.bufferMinutes !== calculatedBuffer) {
      result.corrections.push({
        section: "cutoffManagement",
        field: `stations[${index}].bufferMinutes`,
        oldValue: station.bufferMinutes,
        newValue: calculatedBuffer,
        reason: `Recalculated from cutoff (${station.cutoffTime}) - arrival (${station.predictedArrival})`,
      });
      correctedStation.bufferMinutes = calculatedBuffer;
      correctedStation.bufferFormatted = formatMinutesToTime(Math.abs(calculatedBuffer));
    }

    // Correct status based on buffer
    const correctStatus = getStatusForBuffer(calculatedBuffer);

    if (station.status !== correctStatus.status) {
      result.corrections.push({
        section: "cutoffManagement",
        field: `stations[${index}].status`,
        oldValue: station.status,
        newValue: correctStatus.status,
        reason: `Buffer of ${calculatedBuffer} minutes requires status "${correctStatus.status}"`,
      });
      correctedStation.status = correctStatus.status;
    }

    if (station.statusEmoji !== correctStatus.statusEmoji) {
      result.corrections.push({
        section: "cutoffManagement",
        field: `stations[${index}].statusEmoji`,
        oldValue: station.statusEmoji,
        newValue: correctStatus.statusEmoji,
        reason: `Status emoji must match status "${correctStatus.status}"`,
      });
      correctedStation.statusEmoji = correctStatus.statusEmoji;
    }

    // Warning for tight buffers (yellow zone)
    if (calculatedBuffer >= 0 && calculatedBuffer < 60) {
      result.warnings.push({
        section: "cutoffManagement",
        field: `stations[${index}]`,
        message: `Tight buffer of ${calculatedBuffer} minutes at ${stationName} - consider adjusting pace`,
      });
    }

    return correctedStation;
  });

  // Update overall risk based on corrected stations
  const hasRedStation = correctedStations.some(s => s.status === "red");
  const hasYellowStation = correctedStations.some(s => s.status === "yellow");

  let correctOverallRisk: "Low" | "Medium" | "High";
  if (hasRedStation) {
    correctOverallRisk = "High";
  } else if (hasYellowStation) {
    correctOverallRisk = "Medium";
  } else {
    correctOverallRisk = "Low";
  }

  if (cutoffData.overallRisk !== correctOverallRisk) {
    result.corrections.push({
      section: "cutoffManagement",
      field: "overallRisk",
      oldValue: cutoffData.overallRisk,
      newValue: correctOverallRisk,
      reason: `Updated based on station statuses`,
    });
  }

  return {
    result,
    correctedData: {
      ...cutoffData,
      stations: correctedStations,
      overallRisk: correctOverallRisk,
    },
  };
}
