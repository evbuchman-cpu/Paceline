import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// Better Auth Tables
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  checklistProgress: jsonb("checklistProgress"), // { [itemId: string]: boolean }
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Subscription table for Polar webhook data
export const subscription = pgTable("subscription", {
  id: text("id").primaryKey(),
  createdAt: timestamp("createdAt").notNull(),
  modifiedAt: timestamp("modifiedAt"),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull(),
  recurringInterval: text("recurringInterval").notNull(),
  status: text("status").notNull(),
  currentPeriodStart: timestamp("currentPeriodStart").notNull(),
  currentPeriodEnd: timestamp("currentPeriodEnd").notNull(),
  cancelAtPeriodEnd: boolean("cancelAtPeriodEnd").notNull().default(false),
  canceledAt: timestamp("canceledAt"),
  startedAt: timestamp("startedAt").notNull(),
  endsAt: timestamp("endsAt"),
  endedAt: timestamp("endedAt"),
  customerId: text("customerId").notNull(),
  productId: text("productId").notNull(),
  discountId: text("discountId"),
  checkoutId: text("checkoutId").notNull(),
  customerCancellationReason: text("customerCancellationReason"),
  customerCancellationComment: text("customerCancellationComment"),
  metadata: text("metadata"), // JSON string
  customFieldData: text("customFieldData"), // JSON string
  userId: text("userId").references(() => user.id),
});

// Paceline-specific Tables

// Purchases (one-time purchases or bundle credits)
export const purchase = pgTable("purchase", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  tier: text("tier").notNull(), // "essential" | "custom" | "ultra_bundle"
  amount: integer("amount").notNull(), // in cents
  polarSubscriptionId: text("polarSubscriptionId"), // if from Polar.sh
  polarOrderId: text("polarOrderId"), // if from Polar.sh order
  status: text("status").notNull().default("pending"), // "pending" | "completed" | "refunded"
  guidesRemaining: integer("guidesRemaining").default(1), // for Ultra Bundle
  archivedAt: timestamp("archivedAt"), // null = visible, set = hidden from dashboard
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Questionnaires (user responses)
export const questionnaire = pgTable("questionnaire", {
  id: text("id").primaryKey(),
  purchaseId: text("purchaseId")
    .notNull()
    .references(() => purchase.id, { onDelete: "cascade" }),
  // Essential fields (12)
  raceName: text("raceName").notNull(),
  raceWebsite: text("raceWebsite"),
  raceDate: timestamp("raceDate").notNull(),
  goalFinishTime: text("goalFinishTime").notNull(), // "HH:MM" format
  ultrasCompleted: text("ultrasCompleted").notNull(), // "0" | "1-3" | "4-10" | "10+"
  recentFlatPace: text("recentFlatPace"), // "MM:SS" per mile
  climbingStrength: text("climbingStrength"), // "strong" | "average" | "struggle"
  weeklyTrainingVolume: integer("weeklyTrainingVolume"), // miles
  crewSupport: text("crewSupport"), // "yes" | "partial" | "no"
  firstName: text("firstName"),
  email: text("email"),
  // Custom tier fields (+7)
  stravaAthleteId: text("stravaAthleteId"),
  stravaData: jsonb("stravaData"), // 90-day analysis JSON
  recentRaceResults: text("recentRaceResults"), // textarea, max 500 chars
  biggestClimbTrained: text("biggestClimbTrained"),
  giIssuesHistory: text("giIssuesHistory"), // yes/no + details
  blisterProneAreas: text("blisterProneAreas"),
  nutritionPreferences: jsonb("nutritionPreferences"), // { vegan, glutenFree, caffeineSensitive }
  biggestRaceFears: text("biggestRaceFears"), // textarea, max 300 chars
  // Status
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Guides (generated PDFs)
export const guide = pgTable("guide", {
  id: text("id").primaryKey(),
  purchaseId: text("purchaseId")
    .notNull()
    .references(() => purchase.id, { onDelete: "cascade" }),
  questionnaireId: text("questionnaireId")
    .notNull()
    .references(() => questionnaire.id, { onDelete: "cascade" }),
  pdfUrl: text("pdfUrl").notNull(), // Cloudflare R2 URL
  sections: jsonb("sections").notNull(), // 8 sections as JSON
  generationTime: integer("generationTime"), // milliseconds
  aiCost: integer("aiCost"), // cost in cents ($0.50-1.00)
  status: text("status").notNull().default("generating"), // "generating" | "completed" | "failed"
  error: text("error"), // error message if failed
  archivedAt: timestamp("archivedAt"), // null = active, set = archived
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Races (database of known races)
export const race = pgTable("race", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  distance: integer("distance"), // miles
  elevationGain: integer("elevationGain"), // feet
  location: text("location"), // city, state
  website: text("website"),
  courseProfile: jsonb("courseProfile"), // elevation data, GPX
  weatherPatterns: jsonb("weatherPatterns"), // historical weather
  aidStations: jsonb("aidStations"), // station locations, cutoffs
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Standalone user races (no guide required)
export const userRace = pgTable("userRace", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  raceName: text("raceName").notNull(),
  raceDate: timestamp("raceDate").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

// Leads (email capture for lead magnets)
export const lead = pgTable("lead", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("firstName"),
  source: text("source").notNull().default("checklist"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

// Pricing feedback (exit-intent popup responses)
export const pricingFeedback = pgTable("pricing_feedback", {
  id: uuid("id").primaryKey().defaultRandom(),
  selectedOption: text("selected_option").notNull(),
  customComment: text("custom_comment"),
  email: text("email"),
  page: text("page").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
