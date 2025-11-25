# Paceline Automated MVP - Development Tasks

**Project:** RaceWise (Paceline) - Ultramarathon Race Planning Platform
**Approach:** Automated MVP from Day 1 (Skip Manual Process)
**Timeline:** 4-8 weeks to launch
**Last Updated:** November 24, 2025

---

## 🎉 MAJOR MILESTONE: 95% COMPLETE!

**Current Status:** All core P0 features are DONE! Ready for E2E testing and pre-launch checklist.

**What's Working:**
- ✅ Full authentication system (Better Auth + Google OAuth)
- ✅ Payment processing (Polar.sh webhooks + purchase tracking)
- ✅ Questionnaire system (Essential + Custom tiers with auto-save)
- ✅ Strava integration (OAuth + 90-day fitness analysis)
- ✅ Complete 8-step AI cascade (Anthropic Claude)
- ✅ Guide validation & auto-correction
- ✅ PDF generation (Puppeteer)
- ✅ File storage (Cloudflare R2)
- ✅ Email automation (Resend: payment, delivery, failure)
- ✅ User dashboard with guide management

**What's Left:**
- ⏳ E2E Testing (P1) - Manual testing of full flow
- ⏳ Pre-Launch Checklist (P0) - Environment setup, Polar production mode, security checks
- ⏳ Beta Testing (P1) - Recruit 20 beta testers, collect feedback
- ⏳ Analytics Setup (P2) - PostHog events
- ⏳ Landing Page Copy (P2) - Add testimonials, sample guide

**Next Steps:**
1. **Test end-to-end flow** - Sign up → Pay → Fill questionnaire → Generate guide → Download PDF
2. **Complete pre-launch checklist** - Switch Polar to production, verify all env vars
3. **Launch to beta testers** - Get 20 beta users, collect feedback

---

## Why We're Going Straight to Automation

✅ **Infrastructure already built** (Neon, Better Auth, Polar.sh, Next.js)
✅ **No throwaway work** - build it once, use it forever
✅ **Faster to market** - 4-8 weeks vs 12 weeks
✅ **Same difficulty** - AI prompts are the hard part either way
✅ **Better validation** - working product > manual process

---

## Table of Contents

1. [Current Status](#current-status)
2. [Week 1: Database & Forms](#week-1-database--forms-15-20-hrs)
3. [Week 2: Strava & AI Cascade Start](#week-2-strava--ai-cascade-start-20-25-hrs)
4. [Week 3: AI Cascade Complete + PDF](#week-3-ai-cascade-complete--pdf-20-25-hrs)
5. [Week 4: Dashboard & Integration](#week-4-dashboard--integration-15-20-hrs)
6. [Week 5-6: Beta Testing](#week-5-6-beta-testing--iteration)
7. [Week 7-8: Polish & Launch](#week-7-8-polish--launch)
8. [Phase 3: Scale (Months 3-6)](#phase-3-scale--optimize-months-3-6)

---

## Current Status

### ✅ Already Completed (~95% of MVP!)

| Component | Status | Location | Notes |
|-----------|--------|----------|-------|
| **Next.js 15** | ✅ Done | Root | App Router configured |
| **TypeScript** | ✅ Done | `tsconfig.json` | Strict mode enabled |
| **Tailwind CSS v4** | ✅ Done | `tailwind.config.ts` | Utility-first styling |
| **shadcn/ui** | ✅ Done | `components/ui/` | Accessible components |
| **Neon PostgreSQL** | ✅ Done | `db/drizzle.ts` | Serverless database |
| **Drizzle ORM** | ✅ Done | `db/schema.ts` | Type-safe queries |
| **Better Auth** | ✅ Done | `lib/auth.ts` | Google OAuth configured |
| **Polar.sh** | ✅ Done | `lib/auth.ts` | Payment integration |
| **Auth Pages** | ✅ Done | `app/sign-in/`, `app/sign-up/` | Login/signup flows |
| **Landing Page** | ✅ Done | `app/page.tsx` | May need copy updates |
| **Pricing Page** | ✅ Done | `app/pricing/page.tsx` | 3 tiers configured |
| **Database Tables** | ✅ Done | `db/schema.ts` | purchase, questionnaire, guide, race |
| **Questionnaire Forms** | ✅ Done | `components/questionnaire/` | Essential + Custom forms |
| **Questionnaire API** | ✅ Done | `app/api/questionnaire/` | Full CRUD operations |
| **Strava OAuth** | ✅ Done | `app/api/strava/` | authorize, callback, analyze |
| **Strava Client** | ✅ Done | `lib/strava-client.ts` | 90-day fitness analysis |
| **AI Cascade (8 steps)** | ✅ Done | `lib/ai-cascade/` | All 8 sections with Anthropic |
| **Guide Schemas** | ✅ Done | `lib/schemas/guide-sections.ts` | Zod validation for all sections |
| **PDF Generation** | ✅ Done | `lib/pdf-generator.ts` | Puppeteer HTML→PDF |
| **Cloudflare R2** | ✅ Done | `lib/r2-storage.ts` | PDF storage & delivery |
| **Generate Guide API** | ✅ Done | `app/api/generate-guide/route.ts` | Full 8-step cascade + validation |
| **Guide Validator** | ✅ Done | `lib/guide-validator.ts` | Auto-correction system |
| **Email Automation** | ✅ Done | `lib/email-sender.ts`, `emails/` | Resend integration + templates |
| **Polar Webhooks** | ✅ Done | `app/api/webhooks/polar/` | subscription events + purchase creation |
| **Dashboard Layout** | ✅ Done | `app/dashboard/layout.tsx` | Auth-protected with sidebar nav |
| **Guides List Page** | ✅ Done | `app/dashboard/guides/page.tsx` | List, download, status tracking |

### ⏳ TODO: Core Features (~5% remaining - Almost Ready to Launch! 🚀)

**Priority Levels:**
- **P0** = Blocker (must complete to launch)
- **P1** = Critical (needed before public launch)
- **P2** = Important (can launch without, add soon after)
- **P3** = Nice to have (post-launch optimization)

| Feature | Priority | Status | Week | Agent |
|---------|----------|--------|------|-------|
| **Database Tables** | P0 | ✅ Done | Week 1 | Database Architect |
| **Questionnaire Forms** | P0 | ✅ Done | Week 1 | Fullstack MVP Builder |
| **Strava OAuth** | P0 | ✅ Done | Week 2 | Fullstack MVP Builder |
| **AI Cascade (Steps 1-4)** | P0 | ✅ Done | Week 2 | AI Integration Specialist |
| **AI Cascade (Steps 5-8)** | P0 | ✅ Done | Week 3 | AI Integration Specialist |
| **PDF Generation** | P0 | ✅ Done | Week 3 | Fullstack MVP Builder |
| **Cloudflare R2** | P0 | ✅ Done | Week 3 | Fullstack MVP Builder |
| **Generate Guide API** | P0 | ✅ Done | Week 3 | Fullstack MVP Builder |
| **Guide Validator** | P0 | ✅ Done | Week 3 | AI Integration Specialist |
| **User Dashboard** | P0 | ✅ Done | Week 4 | Fullstack MVP Builder |
| **Email Automation** | P0 | ✅ Done | Week 4 | Fullstack MVP Builder |
| **Polar Webhooks** | P0 | ✅ Done | Week 4 | Fullstack MVP Builder |
| **E2E Testing** | P1 | ⏳ Not Started | Week 4 | QA & Code Guardian |
| **Pre-Launch Checklist** | P0 | ⏳ Not Started | Week 4 | QA & Code Guardian |
| **Beta Launch** | P1 | ⏳ Not Started | Week 5-6 | Growth & Conversion |
| **Analytics Setup** | P2 | ⏳ Not Started | Week 6 | Growth & Conversion |
| **Landing Page Copy** | P2 | ⏳ Not Started | Week 7 | Content & Marketing |

---

## Week 1: Database & Forms (15-20 hrs) ✅ COMPLETED

**Goal:** Set up data layer and build questionnaire forms

### Task 1.1: Add RaceWise Database Tables (P0) ✅ DONE
**Agent:** @Database-Architect
**Time:** 3-4 hours
**Priority:** BLOCKER - Do this first!

**What to build:**
- [ ] Add `purchase` table to `db/schema.ts`
  ```typescript
  export const purchase = pgTable("purchase", {
    id: text("id").primaryKey().default(crypto.randomUUID()),
    userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
    tier: text("tier").notNull(), // "essential" | "custom" | "ultra_bundle"
    amount: integer("amount").notNull(), // cents
    polarSubscriptionId: text("polarSubscriptionId"),
    polarOrderId: text("polarOrderId"),
    status: text("status").notNull().default("pending"),
    guidesRemaining: integer("guidesRemaining").default(1),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  });
  ```

- [ ] Add `questionnaire` table with Essential + Custom fields
  ```typescript
  export const questionnaire = pgTable("questionnaire", {
    id: text("id").primaryKey().default(crypto.randomUUID()),
    purchaseId: text("purchaseId").notNull().references(() => purchase.id, { onDelete: "cascade" }),
    // Essential fields (12)
    raceName: text("raceName").notNull(),
    raceWebsite: text("raceWebsite"),
    raceDate: timestamp("raceDate").notNull(),
    goalFinishTime: text("goalFinishTime").notNull(), // "HH:MM"
    ultrasCompleted: text("ultrasCompleted").notNull(),
    recentFlatPace: text("recentFlatPace"),
    climbingStrength: text("climbingStrength").notNull(),
    weeklyTrainingVolume: integer("weeklyTrainingVolume"),
    crewSupport: text("crewSupport").notNull(),
    firstName: text("firstName"),
    email: text("email"),
    // Custom tier fields (+7)
    stravaAthleteId: text("stravaAthleteId"),
    stravaData: jsonb("stravaData"), // 90-day analysis
    recentRaceResults: text("recentRaceResults"),
    biggestClimbTrained: text("biggestClimbTrained"),
    giIssuesHistory: text("giIssuesHistory"),
    blisterProneAreas: text("blisterProneAreas"),
    nutritionPreferences: jsonb("nutritionPreferences"),
    biggestRaceFears: text("biggestRaceFears"),
    completedAt: timestamp("completedAt"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  });
  ```

- [ ] Add `guide` table with JSONB for 8 sections
  ```typescript
  export const guide = pgTable("guide", {
    id: text("id").primaryKey().default(crypto.randomUUID()),
    purchaseId: text("purchaseId").notNull().references(() => purchase.id),
    questionnaireId: text("questionnaireId").notNull().references(() => questionnaire.id),
    pdfUrl: text("pdfUrl").notNull(),
    sections: jsonb("sections").notNull(), // 8 sections
    generationTime: integer("generationTime"), // milliseconds
    aiCost: integer("aiCost"), // cents
    status: text("status").notNull().default("generating"),
    error: text("error"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  });
  ```

- [ ] Add `race` table (optional for MVP, useful for seeding data)
  ```typescript
  export const race = pgTable("race", {
    id: text("id").primaryKey().default(crypto.randomUUID()),
    name: text("name").notNull().unique(),
    distance: integer("distance"), // miles
    elevationGain: integer("elevationGain"), // feet
    location: text("location"),
    website: text("website"),
    courseProfile: jsonb("courseProfile"),
    weatherPatterns: jsonb("weatherPatterns"),
    aidStations: jsonb("aidStations"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  });
  ```

- [ ] Generate Drizzle migration: `npx drizzle-kit generate`
- [ ] Push migration to Neon: `npx drizzle-kit push`
- [ ] Verify tables exist: `npx drizzle-kit studio`

**Files to modify:**
- `db/schema.ts`
- `db/migrations/` (auto-generated)

**Success criteria:**
- All 4 tables created in Neon
- TypeScript types exported
- No migration errors

---

### Task 1.2: Build Essential Questionnaire Form (P0) ✅ DONE
**Agent:** @Fullstack-MVP-Builder
**Time:** 6-8 hours
**Priority:** BLOCKER

**What to build:**
- [ ] Create page `app/dashboard/questionnaire/page.tsx`
- [ ] Create form component `components/questionnaire/EssentialForm.tsx`
- [ ] Add Zod validation schema `lib/schemas/questionnaire.ts`
  ```typescript
  export const essentialQuestionnaireSchema = z.object({
    raceName: z.string().min(1, "Race name is required"),
    raceWebsite: z.string().url().optional().or(z.literal("")),
    raceDate: z.date(),
    goalFinishTime: z.string().regex(/^\d{1,2}:\d{2}$/, "Format: HH:MM"),
    ultrasCompleted: z.enum(["0", "1-3", "4-10", "10+"]),
    recentFlatPace: z.string().regex(/^\d{1,2}:\d{2}$/).optional().or(z.literal("")),
    climbingStrength: z.enum(["strong", "average", "struggle"]),
    weeklyTrainingVolume: z.number().min(0).optional(),
    crewSupport: z.enum(["yes", "partial", "no"]),
    firstName: z.string().min(1),
    email: z.string().email(),
  });
  ```

- [ ] Implement auto-save (PUT `/api/questionnaire/[id]` every 30s)
- [ ] Add progress indicator (step X of 12)
- [ ] Mobile-responsive layout
- [ ] Create API route `app/api/questionnaire/route.ts` (POST - create)
- [ ] Create API route `app/api/questionnaire/[id]/route.ts` (GET, PUT - retrieve, update)

**Form fields:**
1. Race name (text, required)
2. Race website (URL, optional)
3. Race date (date picker, required)
4. Goal finish time (HH:MM, required)
5. Ultras completed (dropdown, required)
6. Recent flat pace (MM:SS per mile, optional)
7. Climbing strength (dropdown, required)
8. Weekly training volume (number, optional)
9. Crew support (dropdown, required)
10. First name (text, required, pre-filled from auth)
11. Email (email, required, pre-filled from auth)
12. Additional notes (textarea, optional)

**Files to create:**
- `app/dashboard/questionnaire/page.tsx`
- `components/questionnaire/EssentialForm.tsx`
- `lib/schemas/questionnaire.ts`
- `app/api/questionnaire/route.ts`
- `app/api/questionnaire/[id]/route.ts`

**Success criteria:**
- Form validates correctly
- Auto-save works every 30s
- Data persists in database
- Mobile-friendly

---

### Task 1.3: Build Custom Questionnaire Form (P0) ✅ DONE
**Agent:** @Fullstack-MVP-Builder
**Time:** 4-5 hours
**Priority:** BLOCKER

**What to build:**
- [ ] Extend `EssentialForm` or create `CustomForm.tsx`
- [ ] Add 7 additional Custom tier fields
- [ ] Add Strava OAuth button (handled in Week 2)
- [ ] Show/hide Custom fields based on purchase tier
- [ ] Update Zod schema for Custom fields

**Additional Custom fields:**
13. Connect Strava (button, OAuth flow)
14. Recent race results (textarea, 500 chars max, optional)
15. Biggest climb trained (text, optional)
16. GI issues history (radio + conditional textarea)
17. Blister-prone areas (checkboxes: toes, heels, arches, etc.)
18. Nutrition preferences (checkboxes: vegan, gluten-free, caffeine-sensitive)
19. Biggest race fears (textarea, 300 chars max, optional)

**Files to modify/create:**
- `components/questionnaire/CustomForm.tsx` (or extend Essential)
- `lib/schemas/questionnaire.ts` (add customQuestionnaireSchema)

**Success criteria:**
- All 19 fields render correctly
- Conditional logic works (tier-based)
- Validation passes

---

## Week 2: Strava & AI Cascade Start (20-25 hrs) ✅ COMPLETED

**Goal:** Integrate Strava OAuth and build first 4 AI cascade steps

### Task 2.1: Strava OAuth Integration (P0) ✅ DONE
**Agent:** @Fullstack-MVP-Builder
**Time:** 4-5 hours
**Priority:** BLOCKER

**Setup:**
- [ ] Create Strava app at https://www.strava.com/settings/api
- [ ] Add env variables to `.env.local`:
  ```
  STRAVA_CLIENT_ID=your_client_id
  STRAVA_CLIENT_SECRET=your_client_secret
  STRAVA_REDIRECT_URI=http://localhost:3000/api/strava/callback
  ```

**What to build:**
- [ ] Create `app/api/strava/authorize/route.ts` (initiates OAuth)
  ```typescript
  export async function GET(req: Request) {
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&redirect_uri=${process.env.STRAVA_REDIRECT_URI}&response_type=code&scope=activity:read_all`;
    return Response.redirect(authUrl);
  }
  ```

- [ ] Create `app/api/strava/callback/route.ts` (handles OAuth callback)
  - Exchange code for access token
  - Store token in `account` table (Better Auth pattern)
  - Store `athleteId` in questionnaire

- [ ] Create `app/api/strava/analyze/route.ts` (POST - analyze fitness)
  - Fetch 90 days of activities
  - Calculate metrics: avg flat pace, avg climb pace, weekly volume, elevation tolerance
  - Store as JSONB in `questionnaire.stravaData`

- [ ] Create `lib/strava-client.ts` (Strava API wrapper)
- [ ] Create `components/questionnaire/StravaConnect.tsx` (OAuth button)

**Files to create:**
- `app/api/strava/authorize/route.ts`
- `app/api/strava/callback/route.ts`
- `app/api/strava/analyze/route.ts`
- `lib/strava-client.ts`
- `components/questionnaire/StravaConnect.tsx`

**Success criteria:**
- OAuth flow works end-to-end
- 90 days of activities fetched
- Fitness metrics calculated correctly
- Data stored in questionnaire.stravaData

---

### Task 2.2: Anthropic Setup & AI Cascade Steps 1-4 (P0) ✅ DONE
**Agent:** @AI-Integration-Specialist
**Time:** 12-15 hours
**Priority:** BLOCKER
**Note:** Implemented with Anthropic Claude instead of OpenAI

**Setup:**
- [ ] Install OpenAI SDK: `npm install openai`
- [ ] Add env variable: `OPENAI_API_KEY=your_key`
- [ ] Create `lib/openai-client.ts`:
  ```typescript
  import OpenAI from "openai";

  export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  ```

**What to build:**

**Step 1: Race Overview (45s target)**
- [ ] Create `lib/ai-cascade/step1-race-overview.ts`
- [ ] Input: raceName, raceWebsite (optional), raceDate
- [ ] Prompt: "You are an expert ultramarathon race analyst..."
- [ ] Output schema:
  ```typescript
  {
    description: string;
    distance: number; // miles
    elevationGain: number; // feet
    elevationProfile: Array<{ mile: number; elevation: number }>;
    aidStations: Array<{ name: string; mile: number; cutoff: string }>;
    weatherPatterns: { avgTemp: number; precipitation: string };
    toughSections: Array<{ miles: string; difficulty: string; notes: string }>;
  }
  ```
- [ ] Use GPT-4 Turbo with `response_format: { type: "json_object" }`

**Step 2: Pacing Strategy (60s target)**
- [ ] Create `lib/ai-cascade/step2-pacing.ts`
- [ ] Input: raceOverview, stravaData (Custom tier), goalFinishTime, climbingStrength
- [ ] Prompt: Include elevation-adjusted pacing formulas
- [ ] Output schema:
  ```typescript
  {
    sections: Array<{
      miles: string; // "0-10", "10-23.5"
      elevationGain: number;
      targetPace: string; // "12:30/mi"
      targetTime: string; // "2:05"
      notes: string;
    }>;
    totalEstimated: string; // "28:45"
    cutoffBuffer: string; // "+3:15"
  }
  ```

**Step 3: Cutoff Management (30s target)**
- [ ] Create `lib/ai-cascade/step3-cutoffs.ts`
- [ ] Input: pacingStrategy, aidStations (from Step 1)
- [ ] Calculate buffer at each aid station
- [ ] Output schema:
  ```typescript
  {
    stations: Array<{
      name: string;
      mile: number;
      cutoff: string; // "14:30"
      predictedArrival: string; // "12:45"
      buffer: string; // "+1:45"
      status: "🟢" | "🟡" | "🔴"; // 🟢 3+ hrs, 🟡 1-3 hrs, 🔴 <1 hr
    }>;
  }
  ```

**Step 4: Crew Logistics (45s target)**
- [ ] Create `lib/ai-cascade/step4-crew.ts`
- [ ] Input: pacingStrategy, crewSupport, aidStations
- [ ] Skip if crewSupport === "no"
- [ ] Output schema:
  ```typescript
  {
    crewStations: Array<{
      name: string;
      mile: number;
      predictedArrival: string;
      instructions: string; // specific gear, nutrition, moral support
    }>;
    crewTimingSheet: string; // markdown table for crew
  }
  ```

**Common patterns for all steps:**
- [ ] Error handling with try-catch
- [ ] Retry logic (3 attempts with exponential backoff)
- [ ] Fallback prompts if JSON parsing fails
- [ ] Log generation time and token usage

**Files to create:**
- `lib/openai-client.ts`
- `lib/ai-cascade/step1-race-overview.ts`
- `lib/ai-cascade/step2-pacing.ts`
- `lib/ai-cascade/step3-cutoffs.ts`
- `lib/ai-cascade/step4-crew.ts`
- `lib/schemas/guide-sections.ts` (TypeScript types)

**Success criteria:**
- Each step completes in target time
- JSON output validates against schema
- Retry logic works for failures
- Cost per step <$0.25

---

## Week 3: AI Cascade Complete + PDF (20-25 hrs) ✅ COMPLETED

**Goal:** Finish AI cascade (Steps 5-8) and build PDF generation

### Task 3.1: AI Cascade Steps 5-8 (P0) ✅ DONE
**Agent:** @AI-Integration-Specialist
**Time:** 10-12 hours
**Priority:** BLOCKER

**Step 5: Drop Bag Strategy (30s target)**
- [ ] Create `lib/ai-cascade/step5-drop-bags.ts`
- [ ] Input: raceOverview (weather, stations), nutritionPreferences
- [ ] Output: Station-by-station packing lists
  ```typescript
  {
    stations: Array<{
      name: string;
      mile: number;
      packingList: Array<{ item: string; quantity: string; notes: string }>;
      weatherAdjustments: string;
    }>;
  }
  ```

**Step 6: Nutrition Timeline (30s target)**
- [ ] Create `lib/ai-cascade/step6-nutrition.ts`
- [ ] Input: pacingStrategy, nutritionPreferences, giIssuesHistory
- [ ] Target: 200-300 cal/hr, electrolyte replacement
  ```typescript
  {
    timeline: Array<{
      mile: string;
      time: string;
      calories: number;
      electrolytes: string;
      foods: Array<string>;
      notes: string;
    }>;
    aidStationNutrition: Array<{ station: string; available: Array<string> }>;
  }
  ```

**Step 7: Contingency Protocols (45s target)**
- [ ] Create `lib/ai-cascade/step7-contingencies.ts`
- [ ] Input: giIssuesHistory, blisterProneAreas, biggestRaceFears
  ```typescript
  {
    protocols: Array<{
      scenario: string; // "GI distress", "Blisters", "Falling behind"
      prevention: string;
      earlyWarning: string;
      action: string;
    }>;
  }
  ```

**Step 8: Mental Strategy (30s target)**
- [ ] Create `lib/ai-cascade/step8-mental.ts`
- [ ] Input: biggestRaceFears, toughSections (from Step 1)
  ```typescript
  {
    mantras: Array<string>;
    toughSections: Array<{
      location: string; // "Mile 62-75"
      challenge: string;
      strategy: string;
    }>;
    motivationTactics: string;
  }
  ```

**Integration:**
- [ ] Create `app/api/generate-guide/route.ts` (orchestrates all 8 steps)
  ```typescript
  export async function POST(req: Request) {
    const { questionnaireId } = await req.json();

    // Fetch questionnaire
    const questionnaire = await db.query.questionnaire.findFirst(...);

    // Run 8-step cascade sequentially
    const step1 = await generateRaceOverview(questionnaire);
    const step2 = await generatePacing(questionnaire, step1);
    const step3 = await generateCutoffs(step2, step1.aidStations);
    const step4 = await generateCrew(step2, questionnaire.crewSupport);
    const step5 = await generateDropBags(step1, questionnaire);
    const step6 = await generateNutrition(step2, questionnaire);
    const step7 = await generateContingencies(questionnaire);
    const step8 = await generateMental(questionnaire, step1.toughSections);

    // Store in guide.sections as JSONB
    const guide = await db.insert(guideTable).values({
      sections: { step1, step2, step3, step4, step5, step6, step7, step8 },
      status: "generating", // PDF generation next
    });

    // Trigger PDF generation
    const pdfUrl = await generatePDF(guide);

    return Response.json({ guideId: guide.id, pdfUrl });
  }
  ```

**Files to create:**
- `lib/ai-cascade/step5-drop-bags.ts`
- `lib/ai-cascade/step6-nutrition.ts`
- `lib/ai-cascade/step7-contingencies.ts`
- `lib/ai-cascade/step8-mental.ts`
- `app/api/generate-guide/route.ts`

**Success criteria:**
- Total cascade time <5 minutes
- Total cost <$1 per guide
- All 8 sections generate successfully
- Sections stored in database as JSONB

---

### Task 3.2: PDF Generation with Puppeteer (P0) ✅ DONE
**Agent:** @Fullstack-MVP-Builder
**Time:** 6-8 hours
**Priority:** BLOCKER

**Setup:**
- [ ] Install Puppeteer: `npm install puppeteer`

**What to build:**
- [ ] Create `lib/pdf-generator.ts`
  ```typescript
  import puppeteer from 'puppeteer';

  export async function generatePDF(guideData: any, questionnaire: any) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const html = generateGuideHTML(guideData, questionnaire);
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' }
    });

    await browser.close();
    return pdfBuffer;
  }
  ```

- [ ] Create HTML template `lib/templates/guide-template.tsx`
  - Cover page (race name, user name, date)
  - Table of contents
  - 8 sections with formatting
  - Page numbers, headers, footers
  - RaceWise branding

- [ ] Create section templates:
  - `lib/templates/sections/race-overview.tsx`
  - `lib/templates/sections/pacing.tsx`
  - `lib/templates/sections/cutoffs.tsx`
  - `lib/templates/sections/crew.tsx`
  - `lib/templates/sections/drop-bags.tsx`
  - `lib/templates/sections/nutrition.tsx`
  - `lib/templates/sections/contingencies.tsx`
  - `lib/templates/sections/mental.tsx`

**Files to create:**
- `lib/pdf-generator.ts`
- `lib/templates/guide-template.tsx`
- `lib/templates/sections/*.tsx` (8 files)

**Success criteria:**
- PDF generates in <30 seconds
- All 8 sections render correctly
- PDF is <5MB
- Branding looks professional

---

### Task 3.2.5: Guide Validation & Consistency Checker (P0) ✅ DONE
**Agent:** @AI-Integration-Specialist
**Time:** 4-6 hours
**Priority:** BLOCKER

**Why this matters:**
AI-generated content can have mathematical errors and inconsistencies. Before generating the PDF, we MUST validate the data to ensure accuracy. This protects users and our reputation.

**What to build:**
- [x] Create `lib/guide-validator.ts`
  ```typescript
  export interface ValidationResult {
    isValid: boolean;
    errors: Array<{ section: string; field: string; message: string }>;
    warnings: Array<{ section: string; field: string; message: string }>;
  }

  export function validateGuideData(guideData: GuideData): ValidationResult {
    const errors: ValidationResult['errors'] = [];
    const warnings: ValidationResult['warnings'] = [];

    // Run all validations
    validateCutoffBuffers(guideData, errors);
    validateNutritionTotals(guideData, errors, warnings);
    validateTimeConsistency(guideData, errors);
    validateCrossSection(guideData, errors);

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
  ```

**Validations to implement:**

1. **Cutoff Buffer Calculations**
   - [x] For each station: `bufferMinutes = cutoffTime - predictedArrival`
   - [x] Status matches buffer: red (<60 min), yellow (60-180 min), green (>180 min)
   - [x] Flag if any arrival > cutoff (impossible)

2. **Nutrition Totals**
   - [x] Sum of timeline calories = summary.totalCalories
   - [x] Calories/hour within bounds (150-300 cal/hr)
   - [x] Fluids/hour within bounds (12-24 oz/hr)
   - [x] Sodium/hour within bounds (100-400 mg/hr)

3. **Time Consistency**
   - [x] All cumulative times are sequential (each > previous)
   - [x] Race time matches sum of section times
   - [x] AM/PM indicators are correct based on race start + elapsed time

4. **Cross-Section Consistency**
   - [x] Aid station names match across: raceOverview, cutoffManagement, crewLogistics, dropBagStrategy
   - [x] Aid station mileages match across all sections
   - [x] Tough sections in raceOverview match toughSections in mentalStrategy
   - [x] Crew stations reference only crew-accessible aid stations

5. **Pacing Consistency**
   - [x] Section distances sum to total distance
   - [x] Elevation gains/losses are reasonable for terrain
   - [x] Target paces are realistic for elevation

**Integration:**
- [x] Call `validateGuideData()` after AI cascade completes
- [x] If `isValid === false`: Log errors, notify admin, DO NOT generate PDF
- [x] If warnings exist: Log warnings, proceed with PDF but flag for review
- [x] Store validation results in `guide.validationResults` (JSONB)

**Files to create:**
- `lib/guide-validator.ts`
- `lib/validation/cutoff-validator.ts`
- `lib/validation/nutrition-validator.ts`
- `lib/validation/time-validator.ts`
- `lib/validation/consistency-validator.ts`

**Success criteria:**
- All numerical calculations are validated
- Cross-section data is consistent
- Invalid guides are blocked from generation
- Warnings are logged for review
- No false positives (valid guides pass)

---

### Task 3.3: Cloudflare R2 Storage (P0) ✅ DONE
**Agent:** @Fullstack-MVP-Builder
**Time:** 2-3 hours
**Priority:** BLOCKER

**Setup:**
- [ ] Create Cloudflare R2 bucket at https://dash.cloudflare.com
- [ ] Get credentials (account ID, access key, secret key)
- [ ] Install AWS SDK: `npm install @aws-sdk/client-s3`
- [ ] Add env variables:
  ```
  CLOUDFLARE_ACCOUNT_ID=your_account_id
  R2_ACCESS_KEY_ID=your_access_key
  R2_SECRET_ACCESS_KEY=your_secret_key
  R2_BUCKET_NAME=paceline-guides
  R2_PUBLIC_DOMAIN=guides.paceline.com
  ```

**What to build:**
- [ ] Create `lib/r2-storage.ts`
  ```typescript
  import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

  const r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });

  export async function uploadToR2(buffer: Buffer, fileName: string) {
    await r2Client.send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: 'application/pdf',
    }));

    return `https://${process.env.R2_PUBLIC_DOMAIN}/${fileName}`;
  }
  ```

- [ ] Update `app/api/generate-guide/route.ts` to:
  1. Generate PDF buffer
  2. Upload to R2
  3. Store URL in `guide.pdfUrl`
  4. Update `guide.status = "completed"`

**Files to create:**
- `lib/r2-storage.ts`

**Success criteria:**
- PDF uploads successfully to R2
- Public URL is accessible
- URL stored in database

---

## Week 4: Dashboard & Integration (15-20 hrs) ✅ MOSTLY COMPLETED

**Goal:** Build user dashboard, email automation, and connect the full flow

### Task 4.1: User Dashboard (P0) ✅ DONE
**Agent:** @Fullstack-MVP-Builder
**Time:** 6-8 hours
**Priority:** BLOCKER

**What was built:**
- [x] Dashboard layout `app/dashboard/layout.tsx` with sidebar navigation
- [x] Guides page `app/dashboard/guides/page.tsx` with card-based listing
- [x] Status tracking (generating, completed, failed)
- [x] Download buttons for completed guides (direct R2 URL links)
- [x] Auth protection via Better Auth
- [x] Mobile-responsive design

**Files created:**
- `app/dashboard/layout.tsx`
- `app/dashboard/guides/page.tsx`
- `app/dashboard/_components/sidebar.tsx`
- `app/dashboard/_components/navbar.tsx`

**Success criteria:**
- ✅ Dashboard shows all user's guides
- ✅ Download button works (direct R2 URL)
- ✅ Mobile-responsive
- ✅ Auth protection works

---

### Task 4.2: Email Automation with Resend (P0) ✅ DONE
**Agent:** @Fullstack-MVP-Builder
**Time:** 4-5 hours
**Priority:** BLOCKER

**What was built:**
- [x] Resend client configured in `lib/resend-client.ts`
- [x] Email sender helper in `lib/email-sender.ts` with functions:
  - `sendPaymentConfirmationEmail()` - Triggered after Polar webhook
  - `sendGuideDeliveryEmail()` - Triggered after guide generation
  - `sendGuideFailedEmail()` - Triggered on generation failure
- [x] Email templates created:
  - `emails/payment-confirmation.tsx` - After payment
  - `emails/guide-delivery.tsx` - Guide ready (with download link)
  - `emails/guide-failed.tsx` - Generation failed

**Files created:**
- `lib/resend-client.ts`
- `lib/email-sender.ts`
- `emails/payment-confirmation.tsx`
- `emails/guide-delivery.tsx`
- `emails/guide-failed.tsx`

**Email triggers implemented:**
- ✅ Payment → confirmation email (in `app/api/webhooks/polar/route.ts`)
- ✅ Guide completed → delivery email (in `app/api/generate-guide/route.ts`)
- ✅ Guide failed → failed email (in `app/api/generate-guide/route.ts` error handler)

**Success criteria:**
- ✅ Emails send successfully via Resend API
- ✅ Templates use React Email components
- ✅ PDF download links work correctly

---

### Task 4.3: Polar.sh Webhook Handler (P0) ✅ DONE
**Agent:** @Fullstack-MVP-Builder
**Time:** 3-4 hours
**Priority:** BLOCKER

**What was built:**
- [x] Comprehensive webhook handler in `app/api/webhooks/polar/route.ts`
- [x] Handles subscription events:
  - `subscription.created` - Creates purchase record with tier mapping
  - `subscription.active` - Updates purchase status
  - `subscription.canceled` - Updates status
  - `subscription.updated` - Updates purchase records
- [x] Purchase creation with tier mapping (Essential/Custom/Ultra Bundle)
- [x] Automatic payment confirmation emails via `sendPaymentConfirmationEmail()`
- [x] Ultra Bundle credit tracking (guidesRemaining: 5 for ultra_bundle)
- [x] Upserts to subscription table for tracking

**Files created:**
- `app/api/webhooks/polar/route.ts`

**Events handled:**
- ✅ `subscription.created` - Creates purchase + sends email
- ✅ `subscription.active` - Updates purchase status
- ✅ `subscription.updated` - Updates records
- ✅ `subscription.canceled` - Updates status
- ✅ `subscription.revoked` - Updates status
- ✅ `subscription.uncanceled` - Updates status

**Success criteria:**
- ✅ Webhook receives and processes events
- ✅ Purchase records created with correct tier
- ✅ Payment confirmation emails sent
- ✅ Ultra Bundle credits tracked (guidesRemaining)

---

### Task 4.4: E2E Testing (P1)
**Agent:** @QA-Code-Guardian
**Time:** 6-8 hours
**Priority:** CRITICAL

**Test scenarios:**
1. **Essential Tier Flow**
   - Sign up → Pay $29 → Fill questionnaire (12 fields) → Guide generates → Download PDF
   - Verify: Generation <5 min, PDF has 8 sections, email sent

2. **Custom Tier Flow**
   - Sign up → Pay $99 → Connect Strava → Fill questionnaire (19 fields) → Guide generates → Download
   - Verify: Strava data analyzed, pacing personalized, generation <5 min

3. **Ultra Bundle Flow**
   - Sign up → Pay $497 → Create guide #1 → guidesRemaining = 4 → Repeat
   - Verify: Credits decrement correctly

4. **Error Handling**
   - OpenAI API failure → Retry works → Fallback prompt
   - PDF generation failure → Email sent → Status = failed
   - Strava OAuth failure → Graceful degradation

5. **Mobile Testing**
   - Test on iPhone SE, iPad
   - Verify forms, dashboard, download work

6. **Security**
   - No API keys exposed in frontend
   - Auth redirects work
   - CSRF protection

**Create test checklist:**
- [ ] Document all test cases
- [ ] Test each flow manually
- [ ] Fix critical bugs
- [ ] Verify performance (<5 min, <2s load)

**Success criteria:**
- All happy paths work end-to-end
- Error cases handled gracefully
- Mobile works
- No security issues

---

## Week 5-6: Beta Testing & Iteration

**Goal:** Launch to 20 beta testers, collect feedback, iterate

### Task 5.1: Recruit Beta Testers (P1)
**Agent:** @Growth-Conversion-Specialist
**Time:** 2-3 hours

**Where to find testers:**
- [ ] Reddit r/ultrarunning (post: "I built AI tool for race planning, need beta testers")
- [ ] Facebook ultra groups (Trail Sisters, Wasatch 100, local clubs)
- [ ] Strava clubs (post in running clubs)
- [ ] Personal network (friends who run ultras)
- [ ] Email list (if exists)

**Criteria:**
- Registered for ultra in next 3-6 months
- Willing to provide detailed feedback
- Comfortable with early-stage product

**Beta offer:**
- [ ] Create discount code: 50% off or free
- [ ] Send personalized invite emails
- [ ] Goal: 20 beta testers

---

### Task 5.2: Monitor & Support (P1)
**Agent:** @Teaching-Mentor
**Time:** 10-15 hours over 2 weeks

**What to monitor:**
- [ ] Guide generation times (track in database)
- [ ] AI costs per guide (track in database)
- [ ] Guide quality (manually review 5-10 samples)
- [ ] User feedback via Typeform survey
- [ ] Support requests via email

**Support checklist:**
- [ ] Respond to questions within 24 hours
- [ ] Fix critical bugs immediately
- [ ] Document common issues
- [ ] Collect testimonials from satisfied users

---

### Task 5.3: Iterate Based on Feedback (P1)
**Agent:** @Project-Orchestrator
**Time:** 10-15 hours

**Common iterations:**
- [ ] Refine AI prompts (if advice is too generic)
- [ ] Adjust PDF layout (if hard to read)
- [ ] Fix UX issues (confusing forms, unclear CTAs)
- [ ] Optimize generation time (if >5 min)
- [ ] Add missing features (if multiple users request)

**Success criteria:**
- 15+ beta guides generated
- <5% request refunds
- 8+/10 satisfaction
- 3+ testimonials collected

---

## Week 7-8: Polish & Launch

**Goal:** Polish product, launch publicly, hit 25-50 sales

### Task 7.1: Landing Page Optimization (P2)
**Agent:** @Content-Marketing-Strategist + @Landing-Page-Engineer
**Time:** 4-6 hours

**Updates:**
- [ ] Update hero headline (test: "10 minutes to a race-day plan you can trust")
- [ ] Add testimonials from beta users (3+ quotes)
- [ ] Add sample guide preview (download link)
- [ ] Update pricing page (clearer tier comparison)
- [ ] Add FAQ section (10 common questions)
- [ ] Mobile optimization

---

### Task 7.2: Analytics & Monitoring (P2)
**Agent:** @Growth-Conversion-Specialist
**Time:** 3-4 hours

**Setup:**
- [ ] Configure PostHog events
  - Landing page viewed
  - Pricing tier clicked
  - Checkout initiated
  - Payment completed
  - Questionnaire started
  - Questionnaire completed
  - Guide generated
  - Guide downloaded

- [ ] Create dashboard for key metrics
  - Conversion funnel (landing → payment)
  - Guide generation stats (time, cost, success rate)
  - User satisfaction (survey results)

- [ ] Set up error monitoring (Sentry or similar)

---

### Task 7.3: Public Launch (P1)
**Agent:** @Growth-Conversion-Specialist
**Time:** 5-10 hours

**Launch channels:**
- [ ] Reddit r/ultrarunning (launch post with testimonials)
- [ ] Facebook ultra groups (5-10 groups)
- [ ] Product Hunt (optional, if targeting tech audience)
- [ ] Hacker News Show HN (if appropriate)
- [ ] Email list (if exists)

**Launch content:**
- [ ] Announcement post (Reddit, Facebook)
- [ ] Sample guide PDF
- [ ] Testimonials
- [ ] Special launch pricing (optional: 20% off first week)

**Success criteria:**
- 25-50 guides sold in Week 8
- <5% refund rate
- 8+/10 satisfaction
- 5+ testimonials

---

## Phase 3: Scale & Optimize (Months 3-6)

**Goal:** Scale to 500 guides, $50K revenue

### Month 3-4: Feature Expansion (P2-P3)

**Weather Integration (P2)**
- [ ] Integrate weather API (OpenWeatherMap or NOAA)
- [ ] Fetch 7-day forecast before race
- [ ] Update drop bag strategy dynamically
- [ ] Send weather alert email if extreme conditions
- Agent: @AI-Integration-Specialist

**Plan Version Updates (P2)**
- [ ] Allow users to request guide revision
- [ ] Track version history in database
- [ ] Ultra Bundle: 1 free revision per guide
- [ ] Essential/Custom: $15 for revision
- Agent: @Fullstack-MVP-Builder

**Ultra Bundle Management (P2)**
- [ ] Track remaining guide credits (`guidesRemaining`)
- [ ] Show credits in dashboard
- [ ] Allow users to generate new guide if credits > 0
- [ ] Decrement credits after generation
- Agent: @Fullstack-MVP-Builder

**Referral Program (P2)**
- [ ] Create referral code system
- [ ] $10 credit for referrer, $10 discount for friend
- [ ] Ultra Bundle: $20 per referral
- [ ] Track referrals in database
- [ ] Show referral stats in dashboard
- Agent: @Fullstack-MVP-Builder + @Growth-Conversion-Specialist

**Tier-Based Guide Differentiation (P2)**
- [ ] Update AI cascade prompts to generate different content depth per tier
  - **Essential tier**: Generic advice, flat pacing (no Strava), basic checklists, simplified protocols
  - **Custom tier**: Strava-personalized pacing, elevation-adjusted strategies, detailed protocols, personalized mantras
- [ ] Files to update: `lib/ai-cascade/step*.ts` (all 8 steps)
- [ ] Add `tier` parameter to all AI cascade functions
- [ ] Adjust prompts to output appropriate detail level based on tier
- [ ] Test both tiers generate correctly with appropriate content depth
- [ ] Optional: Add tier-aware conditional rendering to PDF templates
  ```typescript
  // Example: In cutoffs section
  ${questionnaire.tier === 'custom' ? `
    <div class="status-badge ${getStatusClass(station.status)}">
      ${station.statusEmoji} ${station.bufferFormatted}
    </div>
  ` : `
    <span>${station.bufferFormatted}</span>
  `}
  ```
- Agent: @AI-Integration-Specialist

---

### Month 5-6: Marketing & Scale (P3)

**Race Database Expansion (P3)**
- [ ] Seed 50+ popular races in database
- [ ] Scrape race websites for course data
- [ ] Auto-populate questionnaire if race selected
- [ ] Agent: @AI-Integration-Specialist

**Admin Dashboard (P3)**
- [ ] Build admin panel at `/admin`
- [ ] View all orders, guides, users
- [ ] Manually trigger guide generation
- [ ] Refund orders
- [ ] View analytics
- [ ] Agent: @Fullstack-MVP-Builder

**A/B Testing (P3)**
- [ ] Test landing page headlines (3 variants)
- [ ] Test pricing table layouts
- [ ] Test CTA button copy
- [ ] Agent: @Growth-Conversion-Specialist

**SEO Content (P3)**
- [ ] Create blog at `/blog`
- [ ] Write 10+ race planning articles
- [ ] Optimize for keywords ("ultramarathon pacing", "Wasatch 100 plan")
- [ ] Agent: @Content-Marketing-Strategist

---

## Success Metrics Summary

### Phase 1 (Week 4) - Automated MVP Built
- ✅ System works end-to-end
- ✅ Guide generation <5 minutes
- ✅ AI cost <$1 per guide
- ✅ Zero critical bugs

### Phase 2 (Week 8) - Public Launch
- ✅ 50-100 automated guides generated
- ✅ 25-50 guides sold in Week 8
- ✅ <5% refund rate
- ✅ 8+/10 satisfaction
- ✅ 5+ testimonials

### Phase 3 (Month 6) - Scale
- ✅ 500 guides sold (cumulative)
- ✅ $50K revenue
- ✅ <5% refund rate
- ✅ 15% repeat purchase rate
- ✅ 20+ testimonials
- ✅ 15% finish rate improvement validated

---

## 🚨 PRE-LAUNCH CHECKLIST (CRITICAL - DO NOT SKIP!)

**Complete these tasks BEFORE launching to production:**

### Environment & Credentials
- [ ] **Switch Polar.sh from sandbox to production**
  - [ ] Create production products in https://polar.sh (not sandbox.polar.sh)
  - [ ] Get production product IDs and slugs for all 3 tiers
  - [ ] Create production access token with full permissions
  - [ ] Update `.env.local` → `.env.production` with production credentials:
    ```bash
    # Change from sandbox to production
    POLAR_ACCESS_TOKEN=polar_oat_PRODUCTION_TOKEN_HERE
    NEXT_PUBLIC_ESSENTIAL_TIER=production_product_id
    NEXT_PUBLIC_ESSENTIAL_SLUG=Paceline-Essential
    NEXT_PUBLIC_CUSTOM_TIER=production_product_id
    NEXT_PUBLIC_CUSTOM_SLUG=Paceline-Custom
    NEXT_PUBLIC_ULTRA_BUNDLE_TIER=production_product_id
    NEXT_PUBLIC_ULTRA_BUNDLE_SLUG=Paceline-Ultra-Bundle
    ```
  - [ ] Verify `lib/auth.ts` uses production mode (already configured to auto-detect)
  - [ ] Test checkout with REAL credit card (small amount)
  - [ ] Verify webhooks work in production

- [ ] **Update all environment variables for production**
  - [ ] `DATABASE_URL` - Production Neon database (not dev)
  - [ ] `NEXT_PUBLIC_APP_URL` - Production domain (not localhost)
  - [ ] `OPENAI_API_KEY` - Production key with billing enabled
  - [ ] `R2_PUBLIC_DOMAIN` - Production CDN domain
  - [ ] `RESEND_API_KEY` - Production email domain verified
  - [ ] `GOOGLE_CLIENT_ID/SECRET` - Add production domain to OAuth allowed origins

- [ ] **Security checks**
  - [ ] Remove all console.log statements
  - [ ] No API keys exposed in frontend code
  - [ ] All sensitive data in `.env` (not `.env.local`)
  - [ ] Add `.env` to `.gitignore`
  - [ ] Enable CORS only for production domain
  - [ ] Add rate limiting to API routes

### Product & Pricing Verification
- [ ] **Verify Polar.sh products are published**
  - [ ] Essential ($29) - Status: Published
  - [ ] Custom ($99) - Status: Published
  - [ ] Ultra Bundle ($497) - Status: Published
  - [ ] All products have correct prices
  - [ ] Checkout links work
  - [ ] Success URL points to production domain

- [ ] **Test payment flow end-to-end**
  - [ ] Test Essential tier purchase with real card
  - [ ] Test Custom tier purchase with real card
  - [ ] Test Ultra Bundle purchase with real card
  - [ ] Verify webhooks trigger correctly
  - [ ] Verify emails are sent
  - [ ] Verify database records are created

### Deployment
- [ ] **Vercel production deployment**
  - [ ] Push to `main` branch
  - [ ] Verify build succeeds
  - [ ] Add production environment variables in Vercel dashboard
  - [ ] Test production URL works
  - [ ] Verify custom domain (if configured)

- [ ] **Database migration to production**
  - [ ] Run migrations on production Neon database
  - [ ] Verify all tables exist
  - [ ] Test database connection from production

### Monitoring & Support
- [ ] **Set up error monitoring**
  - [ ] Configure Sentry or similar
  - [ ] Test error notifications work
  - [ ] Add alerting for critical errors

- [ ] **Analytics configured**
  - [ ] PostHog tracking events work
  - [ ] Conversion funnel tracking works
  - [ ] Payment tracking works

- [ ] **Customer support ready**
  - [ ] Support email configured (support@paceline.com)
  - [ ] Auto-responder set up
  - [ ] FAQ page completed
  - [ ] Refund policy documented

### Legal & Compliance
- [ ] **Terms of Service** - Published and linked
- [ ] **Privacy Policy** - Published and linked
- [ ] **Refund Policy** - Published and linked (30-day money-back guarantee)
- [ ] **Cookie notice** - If using analytics

---

## Quick Start: Next 3 Actions

**Today (P0 - BLOCKER):**
1. **@QA-Code-Guardian**: Complete Pre-Launch Checklist (lines 1271-1365)
   - Switch Polar.sh from sandbox to production mode
   - Update all environment variables for production
   - Verify security (no exposed API keys, CORS configured)
   - Test production payment flow with real card

**This Week (P1 - CRITICAL):**
2. **@QA-Code-Guardian**: E2E Testing (Task 4.4)
   - Test Essential tier: Sign up → Pay → Questionnaire (12 fields) → Generate guide → Download PDF
   - Test Custom tier: Sign up → Pay → Strava OAuth → Questionnaire (19 fields) → Generate guide → Download
   - Verify guide generation <5 minutes, cost <$1, all 8 sections present
   - Test error scenarios: API failures, validation errors, PDF generation issues

**Next Week (P1):**
3. **@Growth-Conversion-Specialist**: Launch Beta Testing (Week 5-6)
   - Recruit 20 beta testers from Reddit r/ultrarunning, Facebook groups, Strava
   - Create 50% off discount code in Polar.sh
   - Monitor guide generation quality and collect feedback
   - Goal: 15+ guides generated, <5% refunds, 8+/10 satisfaction, 3+ testimonials

---

## Using the `.claude/tasks/` Folder

As you work through these tasks, track your progress:

**Create task files:**
```
.claude/tasks/01-database-tables.md
.claude/tasks/02-questionnaire-forms.md
.claude/tasks/03-ai-cascade-steps-1-4.md
```

**Track progress:**
```markdown
# Task: Add Database Tables

**Status:** In Progress
**Agent:** Database Architect
**Started:** Nov 16, 2025

## Checklist
- [x] Add purchase table
- [x] Add questionnaire table
- [ ] Add guide table
- [ ] Run migration

## Blockers
- None
```

**When complete:**
```
mv .claude/tasks/01-database-tables.md .claude/decisions/
```

---

**Ready to build? Start with Task 1.1!** 🚀
