// AI Cascade Functions
export { generateRaceOverview } from "./step1-race-overview";
export { generatePacingStrategy } from "./step2-pacing";
export { generateCutoffManagement } from "./step3-cutoffs";
export { generateCrewLogistics } from "./step4-crew";
export { generateDropBagStrategy } from "./step5-dropbags";
export { generateNutritionTimeline } from "./step6-nutrition";
export { generateContingencyProtocols } from "./step7-contingencies";
export { generateMentalStrategy } from "./step8-mental";

// Utilities
export { withRetry, withConciseRetry, parseAndValidate, robustParseAndValidate } from "./utils";

// Types and Schemas
export type {
  RaceOverview,
  RaceOverviewInput,
  PacingStrategy,
  PacingInput,
  StravaData,
  CutoffManagement,
  CutoffInput,
  CrewLogistics,
  CrewInput,
  DropBagStrategy,
  DropBagInput,
  NutritionTimeline,
  NutritionInput,
  ContingencyProtocols,
  ContingencyInput,
  MentalStrategy,
  MentalInput,
  AIStepResponse,
} from "../schemas/guide-sections";

export {
  raceOverviewSchema,
  pacingStrategySchema,
  cutoffManagementSchema,
  crewLogisticsSchema,
  dropBagStrategySchema,
  dropBagStationSchema,
  dropBagItemSchema,
  nutritionTimelineSchema,
  nutritionEntrySchema,
  nutritionSummarySchema,
  contingencyProtocolsSchema,
  contingencyProtocolSchema,
  mentalStrategySchema,
  mantraSchema,
  toughSectionStrategySchema,
  aidStationSchema,
  elevationPointSchema,
  weatherPatternsSchema,
  toughSectionSchema,
  pacingSectionSchema,
  cutoffStationSchema,
  crewStationSchema,
} from "../schemas/guide-sections";
