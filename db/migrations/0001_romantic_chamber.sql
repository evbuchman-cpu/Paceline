CREATE TABLE "guide" (
	"id" text PRIMARY KEY NOT NULL,
	"purchaseId" text NOT NULL,
	"questionnaireId" text NOT NULL,
	"pdfUrl" text NOT NULL,
	"sections" jsonb NOT NULL,
	"generationTime" integer,
	"aiCost" integer,
	"status" text DEFAULT 'generating' NOT NULL,
	"error" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "purchase" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"tier" text NOT NULL,
	"amount" integer NOT NULL,
	"polarSubscriptionId" text,
	"polarOrderId" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"guidesRemaining" integer DEFAULT 1,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questionnaire" (
	"id" text PRIMARY KEY NOT NULL,
	"purchaseId" text NOT NULL,
	"raceName" text NOT NULL,
	"raceWebsite" text,
	"raceDate" timestamp NOT NULL,
	"goalFinishTime" text NOT NULL,
	"ultrasCompleted" text NOT NULL,
	"recentFlatPace" text,
	"climbingStrength" text,
	"weeklyTrainingVolume" integer,
	"crewSupport" text,
	"firstName" text,
	"email" text,
	"stravaAthleteId" text,
	"stravaData" jsonb,
	"recentRaceResults" text,
	"biggestClimbTrained" text,
	"giIssuesHistory" text,
	"blisterProneAreas" text,
	"nutritionPreferences" jsonb,
	"biggestRaceFears" text,
	"completedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "race" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"distance" integer,
	"elevationGain" integer,
	"location" text,
	"website" text,
	"courseProfile" jsonb,
	"weatherPatterns" jsonb,
	"aidStations" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "race_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "guide" ADD CONSTRAINT "guide_purchaseId_purchase_id_fk" FOREIGN KEY ("purchaseId") REFERENCES "public"."purchase"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guide" ADD CONSTRAINT "guide_questionnaireId_questionnaire_id_fk" FOREIGN KEY ("questionnaireId") REFERENCES "public"."questionnaire"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questionnaire" ADD CONSTRAINT "questionnaire_purchaseId_purchase_id_fk" FOREIGN KEY ("purchaseId") REFERENCES "public"."purchase"("id") ON DELETE cascade ON UPDATE no action;