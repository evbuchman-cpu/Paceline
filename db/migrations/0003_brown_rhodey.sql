CREATE TABLE "pricing_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"selected_option" text NOT NULL,
	"custom_comment" text,
	"email" text,
	"page" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userRace" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"raceName" text NOT NULL,
	"raceDate" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "guide" ADD COLUMN "archivedAt" timestamp;--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "sequenceStep" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "convertedAt" timestamp;--> statement-breakpoint
ALTER TABLE "purchase" ADD COLUMN "archivedAt" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "checklistProgress" jsonb;--> statement-breakpoint
ALTER TABLE "userRace" ADD CONSTRAINT "userRace_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;