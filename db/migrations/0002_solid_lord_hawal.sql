CREATE TABLE "lead" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"firstName" text,
	"source" text DEFAULT 'checklist' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "lead_email_unique" UNIQUE("email")
);
