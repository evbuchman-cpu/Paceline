/**
 * Cross-Section Consistency Validation & Auto-Correction
 *
 * Validates and corrects data consistency across sections:
 * - Uses raceOverview aid stations as source of truth
 * - Updates station names/mileages in other sections to match
 * - Flags unfixable errors when station counts don't match
 */

import type {
  RaceOverview,
  CutoffManagement,
  CrewLogistics,
  DropBagStrategy,
} from "@/lib/schemas/guide-sections";

export interface ConsistencyValidationResult {
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

interface AidStationReference {
  name: string;
  mile: number;
}

// Normalize station name for matching (lowercase, remove extra spaces)
function normalizeStationName(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, " ");
}

// Find best matching station from reference list
function findMatchingStation(
  stationName: string,
  stationMile: number,
  referenceStations: AidStationReference[]
): AidStationReference | null {
  const normalizedName = normalizeStationName(stationName);

  // First try exact match by mile
  const mileMatch = referenceStations.find(
    (ref) => Math.abs(ref.mile - stationMile) < 0.5
  );
  if (mileMatch) return mileMatch;

  // Then try by name similarity
  const nameMatch = referenceStations.find((ref) => {
    const refNormalized = normalizeStationName(ref.name);
    return (
      refNormalized === normalizedName ||
      refNormalized.includes(normalizedName) ||
      normalizedName.includes(refNormalized)
    );
  });
  if (nameMatch) return nameMatch;

  return null;
}

export function validateAndCorrectConsistency(
  raceOverview: RaceOverview,
  cutoffManagement: CutoffManagement,
  crewLogistics: CrewLogistics,
  dropBagStrategy: DropBagStrategy
): {
  result: ConsistencyValidationResult;
  correctedCutoff: CutoffManagement;
  correctedCrew: CrewLogistics;
  correctedDropBag: DropBagStrategy;
} {
  const result: ConsistencyValidationResult = {
    corrections: [],
    errors: [],
    warnings: [],
  };

  // Use race overview aid stations as the source of truth
  const referenceStations: AidStationReference[] = raceOverview.aidStations.map(
    (station) => ({
      name: station.name,
      mile: station.mile,
    })
  );

  // Validate cutoff management stations
  const correctedCutoffStations = cutoffManagement.stations.map(
    (station, index) => {
      const correctedStation = { ...station };
      const matchingRef = findMatchingStation(
        station.name,
        station.mile,
        referenceStations
      );

      if (matchingRef) {
        // Correct station name if different
        if (station.name !== matchingRef.name) {
          result.corrections.push({
            section: "cutoffManagement",
            field: `stations[${index}].name`,
            oldValue: station.name,
            newValue: matchingRef.name,
            reason: `Matched to race overview station name`,
          });
          correctedStation.name = matchingRef.name;
        }

        // Correct mile marker if different
        if (Math.abs(station.mile - matchingRef.mile) > 0.1) {
          result.corrections.push({
            section: "cutoffManagement",
            field: `stations[${index}].mile`,
            oldValue: station.mile,
            newValue: matchingRef.mile,
            reason: `Matched to race overview station mileage`,
          });
          correctedStation.mile = matchingRef.mile;
        }
      } else {
        result.warnings.push({
          section: "cutoffManagement",
          field: `stations[${index}]`,
          message: `Station "${station.name}" at mile ${station.mile} not found in race overview`,
        });
      }

      return correctedStation;
    }
  );

  // Validate crew logistics stations
  const correctedCrewStations = crewLogistics.crewStations.map(
    (station, index) => {
      const correctedStation = { ...station };
      const matchingRef = findMatchingStation(
        station.name,
        station.mile,
        referenceStations
      );

      if (matchingRef) {
        // Correct station name if different
        if (station.name !== matchingRef.name) {
          result.corrections.push({
            section: "crewLogistics",
            field: `crewStations[${index}].name`,
            oldValue: station.name,
            newValue: matchingRef.name,
            reason: `Matched to race overview station name`,
          });
          correctedStation.name = matchingRef.name;
        }

        // Correct mile marker if different
        if (Math.abs(station.mile - matchingRef.mile) > 0.1) {
          result.corrections.push({
            section: "crewLogistics",
            field: `crewStations[${index}].mile`,
            oldValue: station.mile,
            newValue: matchingRef.mile,
            reason: `Matched to race overview station mileage`,
          });
          correctedStation.mile = matchingRef.mile;
        }
      } else {
        result.warnings.push({
          section: "crewLogistics",
          field: `crewStations[${index}]`,
          message: `Station "${station.name}" at mile ${station.mile} not found in race overview`,
        });
      }

      return correctedStation;
    }
  );

  // Validate drop bag strategy stations
  const correctedDropBagStations = dropBagStrategy.stations.map(
    (station, index) => {
      const correctedStation = { ...station };
      const matchingRef = findMatchingStation(
        station.name,
        station.mile,
        referenceStations
      );

      if (matchingRef) {
        // Correct station name if different
        if (station.name !== matchingRef.name) {
          result.corrections.push({
            section: "dropBagStrategy",
            field: `stations[${index}].name`,
            oldValue: station.name,
            newValue: matchingRef.name,
            reason: `Matched to race overview station name`,
          });
          correctedStation.name = matchingRef.name;
        }

        // Correct mile marker if different
        if (Math.abs(station.mile - matchingRef.mile) > 0.1) {
          result.corrections.push({
            section: "dropBagStrategy",
            field: `stations[${index}].mile`,
            oldValue: station.mile,
            newValue: matchingRef.mile,
            reason: `Matched to race overview station mileage`,
          });
          correctedStation.mile = matchingRef.mile;
        }
      } else {
        result.warnings.push({
          section: "dropBagStrategy",
          field: `stations[${index}]`,
          message: `Station "${station.name}" at mile ${station.mile} not found in race overview`,
        });
      }

      return correctedStation;
    }
  );

  // Check for station count mismatches (potential errors)
  const referenceCount = referenceStations.length;

  // For cutoffs, we expect all stations with cutoffs
  const stationsWithCutoffs = raceOverview.aidStations.filter(s => s.cutoff).length;
  if (cutoffManagement.stations.length !== stationsWithCutoffs && stationsWithCutoffs > 0) {
    if (Math.abs(cutoffManagement.stations.length - stationsWithCutoffs) > 2) {
      result.errors.push({
        section: "cutoffManagement",
        field: "stations",
        message: `Station count mismatch: cutoff management has ${cutoffManagement.stations.length} stations but race overview has ${stationsWithCutoffs} stations with cutoffs`,
      });
    } else {
      result.warnings.push({
        section: "cutoffManagement",
        field: "stations",
        message: `Station count differs: cutoff management has ${cutoffManagement.stations.length} stations, race overview has ${stationsWithCutoffs} stations with cutoffs`,
      });
    }
  }

  // For crew, we only expect stations with crew access
  const crewAccessStations = raceOverview.aidStations.filter(s => s.crewAccess).length;
  if (crewLogistics.hasCrewSupport && crewLogistics.crewStations.length !== crewAccessStations) {
    if (Math.abs(crewLogistics.crewStations.length - crewAccessStations) > 2) {
      result.errors.push({
        section: "crewLogistics",
        field: "crewStations",
        message: `Station count mismatch: crew logistics has ${crewLogistics.crewStations.length} stations but race overview has ${crewAccessStations} crew-accessible stations`,
      });
    } else {
      result.warnings.push({
        section: "crewLogistics",
        field: "crewStations",
        message: `Station count differs: crew logistics has ${crewLogistics.crewStations.length} stations, race overview has ${crewAccessStations} crew-accessible stations`,
      });
    }
  }

  // For drop bags, we only expect stations with drop bag access
  const dropBagStations = raceOverview.aidStations.filter(s => s.dropBagAccess).length;
  if (dropBagStrategy.stations.length !== dropBagStations && dropBagStations > 0) {
    if (Math.abs(dropBagStrategy.stations.length - dropBagStations) > 2) {
      result.errors.push({
        section: "dropBagStrategy",
        field: "stations",
        message: `Station count mismatch: drop bag strategy has ${dropBagStrategy.stations.length} stations but race overview has ${dropBagStations} drop bag stations`,
      });
    } else {
      result.warnings.push({
        section: "dropBagStrategy",
        field: "stations",
        message: `Station count differs: drop bag strategy has ${dropBagStrategy.stations.length} stations, race overview has ${dropBagStations} drop bag stations`,
      });
    }
  }

  // Validate total race distance consistency
  if (raceOverview.distance) {
    const lastAidStation = raceOverview.aidStations[raceOverview.aidStations.length - 1];
    if (lastAidStation && lastAidStation.mile > raceOverview.distance + 1) {
      result.warnings.push({
        section: "raceOverview",
        field: "distance",
        message: `Last aid station at mile ${lastAidStation.mile} is beyond race distance of ${raceOverview.distance} miles`,
      });
    }
  }

  return {
    result,
    correctedCutoff: {
      ...cutoffManagement,
      stations: correctedCutoffStations,
    },
    correctedCrew: {
      ...crewLogistics,
      crewStations: correctedCrewStations,
    },
    correctedDropBag: {
      ...dropBagStrategy,
      stations: correctedDropBagStations,
    },
  };
}
