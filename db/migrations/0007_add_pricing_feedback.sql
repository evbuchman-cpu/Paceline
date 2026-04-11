CREATE TABLE IF NOT EXISTS "pricing_feedback" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "selected_option" text NOT NULL,
  "custom_comment" text,
  "email" text,
  "page" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);
