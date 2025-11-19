import { z } from "zod";

/**
 * Essential Questionnaire Schema (12 fields)
 * For Essential tier ($29) and base fields for Custom tier ($99)
 */
export const essentialQuestionnaireSchema = z.object({
  purchaseId: z.string().min(1, "Purchase ID is required"),
  raceName: z.string().min(1, "Race name is required"),
  raceWebsite: z.string().optional().refine(
    (val) => !val || val === "" || z.string().url().safeParse(val).success,
    { message: "Must be a valid URL" }
  ),
  raceDate: z.coerce.date({
    required_error: "Race date is required",
    invalid_type_error: "Invalid date format",
  }),
  goalFinishTime: z.string().regex(/^\d{1,2}:\d{2}$/, "Format: HH:MM (e.g., 24:00)"),
  ultrasCompleted: z.enum(["0", "1-3", "4-10", "10+"], {
    required_error: "Please select how many ultras you've completed",
  }),
  recentFlatPace: z
    .string()
    .regex(/^\d{1,2}:\d{2}$/, "Format: MM:SS (e.g., 09:30)")
    .optional()
    .or(z.literal("")),
  climbingStrength: z.enum(["strong", "average", "struggle"], {
    required_error: "Please select your climbing strength",
  }),
  weeklyTrainingVolume: z.coerce
    .number()
    .min(0, "Must be 0 or greater")
    .optional(),
  crewSupport: z.enum(["yes", "partial", "no"], {
    required_error: "Please select your crew support status",
  }),
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Must be a valid email address"),
});

/**
 * Custom Questionnaire Schema (Essential + 7 additional fields)
 * For Custom tier ($99) - includes all Essential fields plus personalization
 */
export const customQuestionnaireSchema = essentialQuestionnaireSchema.extend({
  stravaAthleteId: z.string().optional(),
  stravaData: z.any().optional(), // JSONB data from Strava analysis
  recentRaceResults: z
    .string()
    .max(500, "Please keep to 500 characters or less")
    .optional()
    .or(z.literal("")),
  biggestClimbTrained: z.string().optional().or(z.literal("")),
  giIssuesHistory: z.string().optional().or(z.literal("")),
  blisterProneAreas: z.string().optional().or(z.literal("")),
  nutritionPreferences: z
    .object({
      vegan: z.boolean().optional(),
      glutenFree: z.boolean().optional(),
      caffeineSensitive: z.boolean().optional(),
    })
    .optional(),
  biggestRaceFears: z
    .string()
    .max(300, "Please keep to 300 characters or less")
    .optional()
    .or(z.literal("")),
});

/**
 * Update schema (allows partial updates for auto-save)
 */
export const updateQuestionnaireSchema = essentialQuestionnaireSchema.partial().extend({
  id: z.string().min(1, "Questionnaire ID is required"),
});

export const updateCustomQuestionnaireSchema = customQuestionnaireSchema.partial().extend({
  id: z.string().min(1, "Questionnaire ID is required"),
});

/**
 * Type exports for TypeScript
 */
export type EssentialQuestionnaire = z.infer<typeof essentialQuestionnaireSchema>;
export type CustomQuestionnaire = z.infer<typeof customQuestionnaireSchema>;
export type UpdateQuestionnaire = z.infer<typeof updateQuestionnaireSchema>;
export type UpdateCustomQuestionnaire = z.infer<typeof updateCustomQuestionnaireSchema>;
