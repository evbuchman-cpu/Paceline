CREATE TABLE "userRace" (
  "id" text PRIMARY KEY NOT NULL,
  "userId" text NOT NULL,
  "raceName" text NOT NULL,
  "raceDate" timestamp NOT NULL,
  "createdAt" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "userRace_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
);
