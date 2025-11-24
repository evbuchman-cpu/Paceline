import { z } from "zod";

// ============================================================================
// RACE OVERVIEW (Step 1)
// ============================================================================

export const elevationPointSchema = z.object({
  mile: z.number(),
  elevation: z.number(),
  landmark: z.string().optional(),
});

export const aidStationSchema = z.object({
  name: z.string(),
  mile: z.number(),
  cutoff: z.string().nullable(), // Can be null for stations without cutoffs
  crewAccess: z.boolean(),
  dropBagAccess: z.boolean(),
  services: z.array(z.string()),
});

export const weatherPatternsSchema = z.object({
  month: z.string(),
  avgHighTemp: z.number(),
  avgLowTemp: z.number(),
  precipitation: z.string(),
  sunriseTime: z.string(),
  sunsetTime: z.string(),
});

export const toughSectionSchema = z.object({
  name: z.string(),
  miles: z.string(),
  difficulty: z.enum(["moderate", "hard", "brutal"]),
  elevationChange: z.string(),
  notes: z.string(),
});

export const raceOverviewSchema = z.object({
  description: z.string(),
  distance: z.number(),
  elevationGain: z.number(),
  elevationProfile: z.array(elevationPointSchema),
  aidStations: z.array(aidStationSchema),
  weatherPatterns: weatherPatternsSchema,
  toughSections: z.array(toughSectionSchema),
  courseNotes: z.string(),
});

export type RaceOverview = z.infer<typeof raceOverviewSchema>;

export interface RaceOverviewInput {
  raceName: string;
  raceWebsite?: string;
  raceDate: string;
  websiteContent?: string; // Fetched and extracted content from race website
}

// ============================================================================
// PACING STRATEGY (Step 2)
// ============================================================================

export const pacingSectionSchema = z.object({
  name: z.string(),
  startMile: z.number(),
  endMile: z.number(),
  distance: z.number(),
  elevationGain: z.number(),
  elevationLoss: z.number(),
  terrainType: z.string(),
  targetPace: z.string(),
  sectionTime: z.string(),
  cumulativeTime: z.string(),
  cumulativeMile: z.number(),
  notes: z.string(),
});

export const pacingStrategySchema = z.object({
  sections: z.array(pacingSectionSchema),
  totalEstimatedTime: z.string(),
  averagePace: z.string(),
  cutoffBuffer: z.string(),
  paceStrategy: z.string(),
  keyPacingNotes: z.array(z.string()),
});

export type PacingStrategy = z.infer<typeof pacingStrategySchema>;

export interface StravaData {
  athleteId: string;
  recentActivities?: {
    avgPace?: string;
    avgHeartRate?: number;
    totalDistance?: number;
    elevationGain?: number;
  };
  fitnessScore?: number;
  estimatedFTP?: number;
}

export interface PacingInput {
  raceOverview: RaceOverview;
  goalFinishTime: string;
  stravaData?: StravaData;
  climbingStrength: string;
  ultrasCompleted: string;
}

// ============================================================================
// CUTOFF MANAGEMENT (Step 3)
// ============================================================================

export const cutoffStationSchema = z.object({
  name: z.string(),
  mile: z.number(),
  cutoffTime: z.string().nullable(), // Can be null for stations without cutoffs
  predictedArrival: z.string(),
  bufferMinutes: z.number().nullable(), // Can be null for stations without cutoffs
  bufferFormatted: z.string().nullable(), // Can be null for stations without cutoffs
  status: z.enum(["green", "yellow", "red"]),
  statusEmoji: z.enum(["🟢", "🟡", "🔴"]),
  riskLevel: z.string(),
  notes: z.string(),
});

export const cutoffManagementSchema = z.object({
  stations: z.array(cutoffStationSchema),
  overallRisk: z.enum(["Low", "Medium", "High"]),
  criticalCheckpoints: z.array(z.string()),
  bufferStrategy: z.string(),
  contingencyNotes: z.string(),
});

export type CutoffManagement = z.infer<typeof cutoffManagementSchema>;

export interface CutoffInput {
  pacingStrategy: PacingStrategy;
  aidStations: Array<{
    name: string;
    mile: number;
    cutoff: string | null;
    crewAccess: boolean;
    dropBagAccess: boolean;
    services: string[];
  }>;
}

// ============================================================================
// CREW LOGISTICS (Step 4)
// ============================================================================

export const crewStationSchema = z.object({
  name: z.string(),
  mile: z.number(),
  predictedArrival: z.string(),
  arrivalWindow: z.string(),
  timeAtStation: z.string(),
  priorities: z.array(z.string()),
  crewTasks: z.array(z.string()),
  gearChanges: z.array(z.string()),
  nutritionNeeds: z.array(z.string()),
  mentalSupport: z.string(),
  warningSignsToWatch: z.array(z.string()),
});

export const crewLogisticsSchema = z.object({
  hasCrewSupport: z.boolean(),
  crewStations: z.array(crewStationSchema),
  crewTimingSheet: z.string(),
  crewPackingList: z.array(z.string()),
  communicationPlan: z.string(),
  emergencyProtocol: z.string(),
});

export type CrewLogistics = z.infer<typeof crewLogisticsSchema>;

export interface CrewInput {
  pacingStrategy: PacingStrategy;
  aidStations: Array<{
    name: string;
    mile: number;
    cutoff: string | null;
    crewAccess: boolean;
    dropBagAccess: boolean;
    services: string[];
  }>;
  crewSupport: string;
  firstName?: string;
}

// ============================================================================
// DROP BAG STRATEGY (Step 5)
// ============================================================================

export const dropBagItemSchema = z.object({
  item: z.string(),
  quantity: z.string(),
  reason: z.string(),
});

export const dropBagStationSchema = z.object({
  name: z.string(),
  mile: z.number(),
  expectedArrival: z.string(),
  timeOfDay: z.enum(["morning", "afternoon", "evening", "night"]),
  weatherConditions: z.string(),
  packingList: z.array(dropBagItemSchema),
  priorityItems: z.array(z.string()),
  notes: z.string(),
});

export const dropBagStrategySchema = z.object({
  stations: z.array(dropBagStationSchema),
  generalPackingTips: z.array(z.string()),
  labelingSystem: z.string(),
  dropOffInstructions: z.string(),
});

export type DropBagStrategy = z.infer<typeof dropBagStrategySchema>;

export interface DropBagInput {
  raceOverview: RaceOverview;
  pacingStrategy: PacingStrategy;
  aidStations: Array<{
    name: string;
    mile: number;
    cutoff: string | null;
    crewAccess: boolean;
    dropBagAccess: boolean;
    services: string[];
  }>;
  weatherPatterns: {
    month: string;
    avgHighTemp: number;
    avgLowTemp: number;
    precipitation: string;
    sunriseTime: string;
    sunsetTime: string;
  };
  nutritionPreferences?: {
    vegan?: boolean;
    glutenFree?: boolean;
    caffeineSensitive?: boolean;
  };
}

// ============================================================================
// NUTRITION TIMELINE (Step 6)
// ============================================================================

export const nutritionEntrySchema = z.object({
  mile: z.number(),
  time: z.string(),
  timeElapsed: z.string(),
  calories: z.number(),
  sodium: z.number(),
  fluids: z.number(),
  foods: z.array(z.string()),
  notes: z.string(),
});

export const nutritionSummarySchema = z.object({
  totalCalories: z.number(),
  caloriesPerHour: z.number(),
  totalSodium: z.number(),
  sodiumPerHour: z.number(),
  totalFluids: z.number(),
  fluidsPerHour: z.number(),
});

export const nutritionTimelineSchema = z.object({
  timeline: z.array(nutritionEntrySchema),
  summary: nutritionSummarySchema,
  preRaceNutrition: z.string(),
  hydrationStrategy: z.string(),
  caffeineStrategy: z.string(),
  stomachIssuesPrevention: z.array(z.string()),
  aidStationStrategy: z.string(),
});

export type NutritionTimeline = z.infer<typeof nutritionTimelineSchema>;

export interface NutritionInput {
  pacingStrategy: PacingStrategy;
  aidStations: Array<{
    name: string;
    mile: number;
    cutoff: string | null;
    crewAccess: boolean;
    dropBagAccess: boolean;
    services: string[];
  }>;
  goalFinishTime: string;
  nutritionPreferences?: {
    vegan?: boolean;
    glutenFree?: boolean;
    caffeineSensitive?: boolean;
  };
  giIssuesHistory?: string;
  bodyWeight?: number;
}

// ============================================================================
// CONTINGENCY PROTOCOLS (Step 7)
// ============================================================================

export const contingencyProtocolSchema = z.object({
  scenario: z.string(),
  severity: z.enum(["low", "medium", "high", "critical"]),
  warningSignals: z.array(z.string()),
  immediateActions: z.array(z.string()),
  prevention: z.array(z.string()),
  whenToStop: z.string(),
});

export const contingencyProtocolsSchema = z.object({
  protocols: z.array(contingencyProtocolSchema),
  emergencyContacts: z.string(),
  dnfDecisionFramework: z.string(),
  raceHotlineInfo: z.string(),
});

export type ContingencyProtocols = z.infer<typeof contingencyProtocolsSchema>;

export interface ContingencyInput {
  raceOverview: RaceOverview;
  pacingStrategy: PacingStrategy;
  giIssuesHistory?: string;
  blisterProneAreas?: string;
  weatherPatterns: {
    month: string;
    avgHighTemp: number;
    avgLowTemp: number;
    precipitation: string;
    sunriseTime: string;
    sunsetTime: string;
  };
  medicalConditions?: string;
}

// ============================================================================
// MENTAL STRATEGY (Step 8)
// ============================================================================

export const mantraSchema = z.object({
  mantra: z.string(),
  useCase: z.string(),
  explanation: z.string(),
});

export const toughSectionStrategySchema = z.object({
  sectionName: z.string(),
  miles: z.string(),
  mentalChallenge: z.string(),
  strategies: z.array(z.string()),
  mantras: z.array(z.string()),
  focusPoints: z.array(z.string()),
});

export const mentalStrategySchema = z.object({
  raceDayMindset: z.string(),
  mantras: z.array(mantraSchema),
  toughSections: z.array(toughSectionStrategySchema),
  darkMomentProtocol: z.string(),
  motivationalAnchors: z.array(z.string()),
  celebrationMilestones: z.array(z.object({
    mile: z.number(),
    celebration: z.string(),
  })),
  finishLineVisualization: z.string(),
});

export type MentalStrategy = z.infer<typeof mentalStrategySchema>;

export interface MentalInput {
  raceOverview: RaceOverview;
  pacingStrategy: PacingStrategy;
  biggestRaceFears?: string;
  ultrasCompleted: string;
  toughSections: Array<{
    name: string;
    miles: string;
    difficulty: string;
    elevationChange?: string;  // Optional - not needed for mental strategy
    notes?: string;            // Optional - not needed for mental strategy
  }>;
  firstName?: string;
}

// ============================================================================
// AI STEP RESPONSE WRAPPER
// ============================================================================

export interface AIStepResponse<T> {
  success: boolean;
  data: T;
  usage: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    estimatedCost: number;
  };
  generationTime: number;
}
