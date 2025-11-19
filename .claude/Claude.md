# Paceline - Claude Code Agent Instructions

⚠️ **IMPORTANT: This project is called "Paceline" (previously RaceWise). Always use "Paceline" in all code, variables, comments, and agent prompts. Never use "RaceWise" in new code.**

**Version:** 2.0 | **Last Updated:** November 2025
**Purpose:** Complete context for Claude Code agent to build, maintain, and extend Paceline

---

## 🚨 CRITICAL: Task Tracking

**ALWAYS check `/PacelineBusinessDocs/PacelineTasks.md` for current sprint tasks and priorities.**

This file (CLAUDE.md) provides:
- Strategic context and vision
- Technical architecture and patterns
- Coding principles and best practices

`PacelineTasks.md` provides:
- **Week-by-week task breakdown** (current source of truth)
- **Priority levels** (P0/P1/P2/P3)
- **Detailed implementation checklists**
- **Agent assignments** for each task

When starting work, **always**:
1. Read the relevant section in this file for context
2. Check `PacelineTasks.md` for the specific task details
3. Follow the coding principles below

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Product Context](#2-product-context)
3. [Technical Architecture](#3-technical-architecture)
4. [Development Workflow](#4-development-workflow)
5. [Claude's Role as Co-Founder](#5-claudes-role-as-co-founder)
6. [Coding Principles](#6-coding-principles)
7. [Success Metrics](#7-success-metrics)
8. [Key Resources](#8-key-resources)

---

## 1. Project Overview

### Vision
RaceWise transforms **30 hours of scattered ultramarathon race planning into a 10-minute automated process**. We deliver personalized race-day execution guides that reduce pre-race anxiety and increase finish rates by 15%.

### Target User: Alex Chen
- **Age:** 38, Software Engineer, Salt Lake City
- **Race:** Wasatch Front 100 (14 weeks away)
- **Pain Points:**
  1. **Time Scarcity (10/10):** "I don't have 30 hours to plan—I don't have that time"
  2. **Cutoff Anxiety (9/10):** "Barely made mile 62 cutoff with 8 minutes to spare last race"
  3. **Complexity (8/10):** "Drop bag logistics making my head spin"
  4. **Crew Stress (7/10):** "Need clear instructions for my crew"
- **Goal:** Finish with 3+ hour cutoff buffer, organized crew support

### Core Problem Solved
1. **Time Scarcity:** 30 hours → 10 minutes (90% reduction)
2. **Pre-Race Anxiety:** Overwhelming logistics → calm confidence
3. **Complexity:** 147 decisions → automated comprehensive plan
4. **Knowledge Gaps:** Trial/error learning → data-driven strategies

### Value Proposition
- **Speed:** 10 min purchase + 5 min AI generation vs 30 hrs DIY
- **Personalization:** Strava fitness data → elevation-adjusted pacing
- **Comprehensiveness:** 8 sections (pacing, crew, nutrition, drop bags, cutoffs, weather, contingencies, mental)
- **Category Creation:** First race-day execution planner (not training/tracking)

---

## 2. Product Context

### Pricing Tiers

#### Essential - $29 (20% of customers)
**Target:** First-timers, price-sensitive runners

**Features:**
- Basic pacing strategy (flat pace, no elevation adjustments)
- Standard nutrition timeline (generic guidelines)
- Generic crew logistics sheet
- Course overview (elevation, aid stations, cutoffs)
- Drop bag checklist

**Questionnaire:** 12 fields (race name, date, goal time, basic fitness metrics)

#### Custom - $99 ★ Most Popular (60% of customers)
**Target:** Alex Chen (analytical, anxious, mid-pack finishers)

**Everything in Essential PLUS:**
- All add-ons included ($40 value)
- Personalized pacing from Strava fitness data (90-day analysis)
- Elevation-adjusted pace recommendations
- Crew timing with predicted arrival times
- Cutoff buffer calculator (🟢🟡🔴 status indicators)
- Personalized nutrition (vegan, gluten-free, caffeine-sensitive options)
- Drop bag strategy by station (weather-adjusted)
- Weather strategy + contingency protocols

**Questionnaire:** 19 fields (Essential + Strava OAuth, race results, GI issues, blister-prone areas, nutrition preferences, biggest fears)

#### Ultra Bundle - $299 (20% of customers)
**Target:** Multi-race planners (3 races/year)

**Features:**
- 3 Custom guides ($100/race, save $198)
- Plan version updates (1 per race)
- Priority support (24hr response)
- Post-race debrief reports
- Referral credits ($20/friend vs $10)

### 8-Section Guide Output

Every guide includes these 8 sections:

1. **Race Overview** - Course description, elevation profile, aid stations, historical weather patterns
2. **Pacing Strategy** - Section-by-section pacing with elevation adjustments (Strava-powered for Custom tier)
3. **Cutoff Management** - Buffer calculator with 🟢🟡🔴 status indicators per aid station
4. **Crew Logistics** - Predicted arrival times, crew instructions per station, crew timing sheet
5. **Drop Bag Strategy** - Station-specific packing lists, weather adjustments, gear recommendations
6. **Nutrition Timeline** - Personalized fueling plan, calorie/electrolyte targets, aid station nutrition
7. **Contingency Protocols** - GI issues, blisters, falling behind, heat protocols, equipment failures
8. **Mental Strategy** - Mantras, tough section tactics, motivation strategies, race-day mindset

---

## 3. Technical Architecture

### Tech Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Framework** | Next.js | 15.3.1 | App Router, SSR, Vercel optimization |
| **Language** | TypeScript | 5.x | Type safety, better DX |
| **Styling** | Tailwind CSS | v4 | Utility-first styling |
| **UI Components** | shadcn/ui | Latest | Accessible React components |
| **Database** | Neon PostgreSQL | Serverless | Serverless, autoscaling, branching |
| **ORM** | Drizzle ORM | 0.43.1 | Type-safe, performant queries |
| **Auth** | Better Auth | 1.2.8 | Modern auth with Polar.sh integration |
| **Payments** | Polar.sh | 0.32.16 | Developer-first subscriptions |
| **AI** | OpenAI GPT-4 | Turbo | Structured outputs, function calling |
| **PDF** | Puppeteer | Latest | HTML → PDF conversion |
| **Storage** | Cloudflare R2 | Latest | S3-compatible, zero egress fees |
| **Email** | Resend | Latest | React templates, modern API |
| **Analytics** | PostHog | Latest | Product analytics, session replay |
| **Hosting** | Vercel | Latest | Zero-config Next.js deployment |

### Project Structure

```
/Users/elisebuchman/Desktop/Paceline/Paceline.Code/
├── app/
│   ├── (auth)/              # Auth pages (if grouped)
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...all]/    # Better Auth catch-all route
│   │   │       └── route.ts
│   │   ├── chat/            # Chat API (if exists)
│   │   ├── subscription/    # Subscription management
│   │   ├── questionnaire/   # TODO: Questionnaire CRUD
│   │   ├── strava/          # TODO: Strava OAuth & analyze
│   │   ├── generate-guide/  # TODO: AI cascade trigger
│   │   ├── guides/          # TODO: Guide listing & download
│   │   └── webhooks/
│   │       └── polar/       # TODO: Polar.sh webhook handler
│   ├── dashboard/
│   │   ├── _components/     # Dashboard-specific components
│   │   ├── guides/          # TODO: Guide listing & download
│   │   ├── questionnaire/   # TODO: Questionnaire forms
│   │   └── layout.tsx       # Protected dashboard layout
│   ├── pricing/
│   │   └── page.tsx         # Pricing page
│   ├── sign-in/
│   │   └── page.tsx         # Sign in page
│   ├── sign-up/
│   │   └── page.tsx         # Sign up page
│   ├── success/
│   │   └── page.tsx         # Payment success redirect
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── homepage/            # Landing page components
│   └── logos/               # Tech stack logos
├── db/
│   ├── drizzle.ts           # Database connection
│   ├── schema.ts            # Drizzle schema definitions
│   └── migrations/          # Drizzle migration files
├── lib/
│   ├── auth.ts              # Better Auth configuration
│   ├── auth-client.ts       # Client-side auth helpers
│   ├── subscription.ts      # Polar.sh subscription helpers
│   └── utils.ts             # Utility functions
├── docs/
│   ├── PacelinePRD.md       # Full PRD (35,000+ words)
│   └── PRD_QUICK_REFERENCE.md # Quick lookup guide
├── .cursorrules             # Cursor AI rules (project context)
└── .claude/
    └── Claude.md            # This file (Claude Code agent context)
```

### Database Schema

**Current Schema (`db/schema.ts`):**

The current schema includes Better Auth tables and Polar.sh subscription tracking:

```12:85:db/schema.ts
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
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
```

**TODO: Add RaceWise-specific tables to `db/schema.ts`:**

```typescript
// Purchases (one-time purchases or bundle credits)
export const purchase = pgTable("purchase", {
  id: text("id").primaryKey().default(crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  tier: text("tier").notNull(), // "essential" | "custom" | "ultra_bundle"
  amount: integer("amount").notNull(), // in cents
  polarSubscriptionId: text("polarSubscriptionId"), // if from Polar.sh
  polarOrderId: text("polarOrderId"), // if from Polar.sh order
  status: text("status").notNull().default("pending"), // "pending" | "completed" | "refunded"
  guidesRemaining: integer("guidesRemaining").default(1), // for Ultra Bundle
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Questionnaires (user responses)
export const questionnaire = pgTable("questionnaire", {
  id: text("id").primaryKey().default(crypto.randomUUID()),
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
  id: text("id").primaryKey().default(crypto.randomUUID()),
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
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Races (database of known races)
export const race = pgTable("race", {
  id: text("id").primaryKey().default(crypto.randomUUID()),
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
```

### Database Connection

**File:** `db/drizzle.ts`

```1:7:db/drizzle.ts
import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';

config({ path: ".env" }); // or .env.local

export const db = drizzle(process.env.DATABASE_URL!);
```

**Usage Pattern:**
- Always use `import { db } from "@/db/drizzle"` for queries
- Use Drizzle ORM exclusively (no raw SQL)
- Use transactions for multi-table operations
- Store JSON data in `jsonb` columns (Strava data, guide sections)

### Authentication

**File:** `lib/auth.ts`

Better Auth is configured with:
- Google OAuth provider
- Polar.sh integration (webhooks, checkout, portal)
- Drizzle adapter for database-backed sessions
- Next.js cookies plugin

**Key Files:**
- `lib/auth.ts` - Server-side auth configuration
- `lib/auth-client.ts` - Client-side auth helpers
- `app/api/auth/[...all]/route.ts` - Better Auth catch-all route

**Auth Flow:**
1. User signs up/logs in via `/sign-up` or `/sign-in`
2. Better Auth creates user in database (`user` table)
3. Session stored in `session` table (database-backed)
4. Polar.sh customer created on signup (via `createCustomerOnSignUp: true`)

### API Routes (Current & TODO)

**Implemented:**
- ✅ `POST /api/auth/signup` - Better Auth handles this
- ✅ `POST /api/auth/login` - Better Auth handles this
- ✅ `GET /api/auth/session` - Better Auth handles this
- ✅ `GET /api/auth/google` - Better Auth OAuth flow
- ✅ `POST /api/subscription` - Subscription management (if exists)

**TODO - Implement:**
- ⏳ `POST /api/questionnaire` - Submit questionnaire
- ⏳ `GET /api/questionnaire/[id]` - Retrieve questionnaire by ID
- ⏳ `PUT /api/questionnaire/[id]` - Update questionnaire (auto-save)
- ⏳ `GET /api/strava/authorize` - Initiate Strava OAuth
- ⏳ `GET /api/strava/callback` - Strava OAuth callback
- ⏳ `POST /api/strava/analyze` - Analyze 90 days of Strava data
- ⏳ `POST /api/generate-guide` - Trigger 8-step AI cascade
- ⏳ `GET /api/guides` - List user's guides
- ⏳ `GET /api/guides/[id]` - Get specific guide
- ⏳ `GET /api/guides/[id]/download` - Download PDF
- ⏳ `POST /api/webhooks/polar` - Handle Polar.sh webhooks (order.created, etc.)

### 8-Step AI Agent Cascade

**Implementation Location:** `app/api/generate-guide/route.ts` (TODO)

**Architecture:**
- Sequential cascade (each step uses previous step's output)
- Total time: <5 minutes
- Cost: ~$0.50-1.00 per guide
- Error handling: Retry logic, fallback prompts

**Step 1: Race Overview (45s)**
```typescript
// Input: raceName, questionnaire.raceWebsite, questionnaire.raceDate
// Output: { description, elevationProfile, aidStations, weatherPatterns }
// Model: GPT-4 Turbo with JSON mode
```

**Step 2: Pacing Strategy (60s)**
```typescript
// Input: raceOverview, questionnaire.stravaData, questionnaire.goalFinishTime
// Output: { sections: [{ miles, elevationGain, targetPace, notes }] }
// Model: GPT-4 Turbo with structured output
```

**Step 3: Cutoff Management (30s)**
```typescript
// Input: pacingStrategy, raceOverview.aidStations
// Output: { stations: [{ name, cutoff, predictedArrival, buffer, status }] }
// Status: 🟢 (3+ hrs) | 🟡 (1-3 hrs) | 🔴 (<1 hr)
```

**Step 4: Crew Logistics (45s)**
```typescript
// Input: pacingStrategy, questionnaire.crewSupport
// Output: { stations: [{ name, predictedArrival, crewInstructions }] }
```

**Step 5: Drop Bag Strategy (30s)**
```typescript
// Input: raceOverview, questionnaire preferences, weather
// Output: { stations: [{ name, packingList }] }
```

**Step 6: Nutrition Timeline (30s)**
```typescript
// Input: pacingStrategy, questionnaire.nutritionPreferences
// Output: { timeline: [{ time, calories, electrolytes, foods }] }
```

**Step 7: Contingency Protocols (45s)**
```typescript
// Input: questionnaire.giIssuesHistory, questionnaire.blisterProneAreas
// Output: { protocols: [{ scenario, action }] }
```

**Step 8: Mental Strategy (30s)**
```typescript
// Input: questionnaire.biggestRaceFears, raceOverview.toughSections
// Output: { mantras, toughSections: [{ location, strategy }] }
```

**Implementation Example (Step 1):**
```typescript
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateRaceOverview(raceName: string, raceWebsite?: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{
      role: "system",
      content: "You are an expert ultramarathon race analyst. Generate comprehensive race overviews based on race names and websites."
    }, {
      role: "user",
      content: `Analyze this race and provide a detailed overview:
        Race: ${raceName}
        Website: ${raceWebsite || "Not provided"}
        
        Include: course description, elevation profile, aid stations with cutoffs, historical weather patterns.`
    }],
    response_format: { type: "json_object" },
    temperature: 0.5,
  });
  
  return JSON.parse(response.choices[0].message.content);
}
```

### PDF Generation (Puppeteer)

**Implementation Location:** `lib/pdf-generator.ts` (TODO)

```typescript
import puppeteer from 'puppeteer';

export async function generatePDF(guideData: GuideData, questionnaire: Questionnaire) {
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
  
  // Upload to Cloudflare R2
  const fileName = `guides/${questionnaire.id}-${Date.now()}.pdf`;
  const pdfUrl = await uploadToR2(pdfBuffer, fileName);
  
  return pdfUrl;
}
```

### Cloudflare R2 Storage

**Implementation Location:** `lib/r2-storage.ts` (TODO)

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

export async function uploadToR2(buffer: Buffer, fileName: string): Promise<string> {
  await r2Client.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: fileName,
    Body: buffer,
    ContentType: 'application/pdf',
  }));
  
  return `https://${process.env.R2_PUBLIC_DOMAIN}/${fileName}`;
}
```

---

## 4. Development Workflow

### Development Strategy: Automated MVP from Day 1

**⚠️ CRITICAL DECISION: We are skipping the manual MVP phase and going straight to automation.**

**Why:**
- ✅ Infrastructure already built (30% complete)
- ✅ No throwaway work - build once, use forever
- ✅ Faster to market (4-8 weeks vs 12 weeks)
- ✅ Same difficulty - AI prompts are hard either way
- ✅ Better validation - working product > manual process

### 8-Week Roadmap to Launch

**See `/PacelineBusinessDocs/PacelineTasks.md` for detailed week-by-week tasks.**

#### Phase 1: Core MVP Build (Weeks 1-4)
**Goal:** Build fully automated guide generation system

**Current Status:** 30% complete (infrastructure done)
- ✅ Next.js 15, TypeScript, Tailwind, shadcn/ui
- ✅ Neon PostgreSQL + Drizzle ORM
- ✅ Better Auth + Google OAuth
- ✅ Polar.sh payment integration
- ✅ Landing page, pricing page, auth pages

**Week 1 - Database & Forms:**
- Add Paceline tables (purchase, questionnaire, guide, race)
- Build Essential + Custom questionnaire forms
- Implement auto-save functionality

**Week 2 - Strava & AI Start:**
- Strava OAuth integration
- AI Cascade Steps 1-4 (Race Overview, Pacing, Cutoffs, Crew)
- OpenAI client setup

**Week 3 - AI Complete + PDF:**
- AI Cascade Steps 5-8 (Drop Bags, Nutrition, Contingencies, Mental)
- PDF generation with Puppeteer
- Cloudflare R2 storage setup

**Week 4 - Integration & Testing:**
- User dashboard (guide listing, download)
- Email automation (Resend templates)
- Polar.sh webhook handler
- E2E testing

**Success Criteria:**
- System works end-to-end
- Guide generation <5 minutes
- AI cost <$1 per guide
- Zero critical bugs

#### Phase 2: Beta Testing & Launch (Weeks 5-8)
**Goal:** Launch to beta testers, iterate, public launch

**Week 5-6 - Beta Testing:**
- Recruit 20 beta testers (Reddit, Facebook, Strava)
- Monitor guide generation (time, cost, quality)
- Collect feedback and testimonials
- Fix critical bugs

**Week 7-8 - Polish & Launch:**
- Landing page optimization (testimonials, sample guide)
- Analytics setup (PostHog events)
- Public launch (Reddit, Facebook, Product Hunt)
- Target: 25-50 sales in Week 8

**Success Criteria:**
- 50-100 automated guides generated
- 25-50 guides sold in Week 8
- <5% refund rate
- 8+/10 satisfaction
- 5+ testimonials

#### Phase 3: Scale & Optimize (Months 3-6)
**Goal:** Scale to 500 guides, $50K revenue

**Features to Add:**
- Weather integration (live forecast 7 days before race)
- Plan version updates (guide revision system)
- Ultra Bundle management (3-guide credit tracking)
- Referral program ($10-20 credits)
- Race database expansion (50+ races)
- Admin dashboard (order/analytics management)
- A/B testing (landing page, pricing)
- SEO content (blog posts)

**Success Criteria:**
- 500 guides sold (cumulative)
- $50K revenue
- <5% refund rate
- 15% repeat purchase rate
- 20+ testimonials
- 15% finish rate improvement (validated)

### How to Work with Claude on Features

**Before Starting:**
1. **Read the PRD:** Check `/docs/PacelinePRD.md` for relevant specifications
2. **Check Existing Code:** Search codebase for similar patterns
3. **Verify Tech Stack:** Ensure you're using the right tools (Neon, Better Auth, Drizzle, etc.)
4. **Review Database Schema:** Check `db/schema.ts` for existing tables

**When Building:**
1. **Start with Schema:** If new tables needed, update `db/schema.ts` first
2. **Run Migrations:** Generate and push Drizzle migrations
3. **Build API Routes:** Follow RESTful conventions, use Zod for validation
4. **Create Components:** Use shadcn/ui components, follow existing patterns
5. **Test Locally:** Verify with `npm run dev` before committing

**Example Feature Request:**
```
"Add questionnaire form for Essential tier"

Claude should:
1. Check PRD Section 2 for Essential questionnaire fields (12 fields)
2. Review existing form patterns in codebase
3. Create Zod schema for validation
4. Build form component with auto-save
5. Create API route (POST /api/questionnaire)
6. Test with sample data
```

### Testing Approach

**Manual Testing:**
- Test purchase flow (Polar.sh checkout)
- Test questionnaire submission
- Test guide generation (verify 8 sections)
- Test PDF download
- Test email delivery

**Automated Testing (Future):**
- Unit tests for utility functions (`lib/utils.ts`)
- Integration tests for API routes
- E2E tests with Playwright (purchase → guide delivery)

**Validation:**
- Use Zod schemas for all API inputs
- Validate questionnaire completeness before generation
- Check OpenAI API responses before saving
- Verify PDF generation success before storing URL

---

## 5. Claude's Role as Co-Founder

### Technical Advisor

**Next.js 15 Expertise:**
- App Router best practices (Server Components, Server Actions)
- Route handlers (`app/api/` directory)
- Middleware for auth protection
- Performance optimization (caching, streaming)

**TypeScript Excellence:**
- Strict type safety (no `any` types)
- Proper type inference
- Generic types for reusability
- Type-safe database queries (Drizzle)

**Drizzle ORM Mastery:**
- Schema definitions with proper types
- Query building (select, insert, update, delete)
- Transactions for multi-table operations
- Migrations (`drizzle-kit`)

### AI/ML Expert

**GPT-4 Integration:**
- Prompt engineering for 8-step cascade
- Structured outputs (JSON mode)
- Function calling for complex workflows
- Cost optimization (token management)
- Error handling and retries

**Implementation Guidance:**
- Design efficient cascade (sequential vs parallel)
- Cache race data to reduce API calls
- Optimize prompt length to reduce costs
- Handle rate limits and API errors

### Business Strategist

**Pricing Strategy:**
- Understand unit economics ($6.07 COGS, $99 ARPU, 94% margin)
- Optimize conversion rates (Essential → Custom upgrade)
- Design referral program for viral growth

**Product Positioning:**
- Maintain brand voice (calm expert, tactically specific)
- Ensure messaging resonates with Alex Chen persona
- Balance feature complexity with ease of use

### Ultramarathon Domain Expert

**Race Planning Knowledge:**
- Understand pacing strategies (elevation-adjusted)
- Know cutoff management (🟢🟡🔴 buffers)
- Design crew logistics (predicted arrival times)
- Create nutrition timelines (calories, electrolytes)
- Develop contingency protocols (GI issues, blisters)

**Content Quality:**
- Ensure AI-generated guides are tactically specific
- Avoid generic advice ("believe in yourself")
- Provide exact instructions ("at mile 62, slow pace by 30s/mile")

---

## 6. Coding Principles

### TypeScript Standards

**Strict Type Safety:**
```typescript
// ✅ Good
interface Questionnaire {
  raceName: string;
  raceDate: Date;
  goalFinishTime: string;
}

// ❌ Bad
function processQuestionnaire(data: any) {
  // ...
}
```

**Use Type Inference:**
```typescript
// ✅ Good - TypeScript infers type
const questionnaire = await db.select().from(questionnaireTable);

// ❌ Bad - Unnecessary type annotation
const questionnaire: any[] = await db.select().from(questionnaireTable);
```

### Next.js 15 Patterns

**Server Components by Default:**
```typescript
// ✅ Good - Server Component (default)
export default async function GuidePage({ params }: { params: { id: string } }) {
  const guide = await db.select().from(guideTable).where(eq(guideTable.id, params.id));
  return <GuideView guide={guide} />;
}

// Only use 'use client' when needed (forms, interactivity)
'use client';
export function QuestionnaireForm() {
  // ...
}
```

**Route Handlers:**
```typescript
// ✅ Good - Proper HTTP methods and status codes
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validated = questionnaireSchema.parse(data);
    // ...
    return Response.json({ id: questionnaire.id }, { status: 201 });
  } catch (error) {
    return Response.json({ error: 'Invalid data' }, { status: 400 });
  }
}
```

### Database Patterns

**Always Use Drizzle:**
```typescript
// ✅ Good - Type-safe Drizzle query
const questionnaire = await db
  .select()
  .from(questionnaireTable)
  .where(eq(questionnaireTable.id, id))
  .limit(1);

// ❌ Bad - Raw SQL
const questionnaire = await db.execute(sql`SELECT * FROM questionnaire WHERE id = ${id}`);
```

**Transactions for Multi-Table Operations:**
```typescript
// ✅ Good - Transaction ensures atomicity
await db.transaction(async (tx) => {
  const purchase = await tx.insert(purchaseTable).values(data).returning();
  const questionnaire = await tx.insert(questionnaireTable).values({
    purchaseId: purchase[0].id,
    // ...
  }).returning();
});
```

**JSONB for Complex Data:**
```typescript
// ✅ Good - Store structured data in jsonb
await db.insert(guideTable).values({
  sections: {
    pacing: { /* ... */ },
    nutrition: { /* ... */ },
    // ...
  }
});
```

### Error Handling

**Always Use Try-Catch:**
```typescript
// ✅ Good
export async function POST(req: Request) {
  try {
    const data = await req.json();
    // ...
  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**User-Friendly Error Messages:**
```typescript
// ✅ Good
if (!questionnaire) {
  return Response.json(
    { error: 'Questionnaire not found' },
    { status: 404 }
  );
}

// ❌ Bad
if (!questionnaire) {
  throw new Error('Questionnaire not found');
}
```

### Validation

**Zod Schemas for All Inputs:**
```typescript
// ✅ Good
import { z } from 'zod';

const questionnaireSchema = z.object({
  raceName: z.string().min(1),
  raceDate: z.date(),
  goalFinishTime: z.string().regex(/^\d{2}:\d{2}$/),
  // ...
});

export async function POST(req: Request) {
  const body = await req.json();
  const validated = questionnaireSchema.parse(body); // Throws if invalid
  // ...
}
```

### Styling

**Tailwind Only (No Custom CSS):**
```typescript
// ✅ Good
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold">Race Overview</h2>
</div>

// ❌ Bad - Custom CSS
<div className="race-overview">
  <h2>Race Overview</h2>
</div>
```

**Use shadcn/ui Components:**
```typescript
// ✅ Good - Use existing components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

<Button variant="default">Submit</Button>
<Input type="text" placeholder="Race name" />
```

---

## 7. Success Metrics

### Phase 1 Success (Weeks 1-4) - Core MVP Built
- ✅ System works end-to-end
- ✅ Guide generation <5 minutes
- ✅ AI cost <$1 per guide
- ✅ Zero critical bugs
- ✅ All 8 sections generate correctly
- ✅ Strava OAuth working for Custom tier

### Phase 2 Success (Weeks 5-8) - Beta Testing & Public Launch
- ✅ 50-100 automated guides generated
- ✅ 25-50 guides sold in Week 8
- ✅ <5% refund rate
- ✅ 8+/10 satisfaction score
- ✅ 5+ testimonials collected
- ✅ Zero failed generations

### Phase 3 Success (Months 3-6) - Scale & Optimize
- ✅ 500 guides sold (cumulative)
- ✅ $50K revenue
- ✅ <5% refund rate
- ✅ 15% repeat purchase rate
- ✅ 20+ testimonials
- ✅ 15% finish rate improvement (validated via surveys)

### Key Metrics to Monitor

**Revenue Metrics:**
- Total revenue (MTD, QTD, YTD)
- Revenue by tier (Essential $29, Custom $99, Ultra $299)
- ARPU (Average Revenue Per User) - Target: $99
- Gross margin - Target: 94%

**Conversion Metrics:**
- Landing page → Pricing: Target 40%
- Pricing → Checkout: Target 15%
- Checkout → Payment: Target 90%
- Payment → Questionnaire: Target 85%
- Questionnaire → Guide: Target 95%

**Quality Metrics:**
- Satisfaction score - Target: 8+/10
- Refund rate - Target: <5%
- Generation time - Target: <5 min
- Failed generation rate - Target: 0%

**Growth Metrics:**
- New users (weekly)
- Repeat purchase rate - Target: 15%
- Referral rate - Target: 20%
- Email list growth

---

## 8. Key Resources

### Documentation Files

**PRD:**
- `/docs/PacelinePRD.md` - Complete PRD (35,000+ words, 6 sections)
- `/docs/PRD_QUICK_REFERENCE.md` - Quick lookup guide

**Task Management:**
- `/PacelineBusinessDocs/PacelineTasks.md` - **Current sprint tasks** (week-by-week breakdown, priorities, checklists)

**Project Context:**
- `/.cursorrules` - Cursor AI rules (project context for Cursor IDE)
- `/.claude/CLAUDE.md` - This file (Claude Code agent context for strategic/technical guidance)

### Codebase Files

**Database:**
- `db/schema.ts` - Drizzle schema definitions
- `db/drizzle.ts` - Database connection
- `db/migrations/` - Migration files

**Authentication:**
- `lib/auth.ts` - Better Auth server configuration
- `lib/auth-client.ts` - Client-side auth helpers
- `app/api/auth/[...all]/route.ts` - Better Auth catch-all route

**Components:**
- `components/ui/` - shadcn/ui components
- `components/homepage/` - Landing page components
- `app/dashboard/_components/` - Dashboard-specific components

**Utilities:**
- `lib/utils.ts` - Helper functions
- `lib/subscription.ts` - Polar.sh helpers

### External Documentation

**Next.js 15:**
- [App Router Documentation](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

**Drizzle ORM:**
- [Documentation](https://orm.drizzle.team/docs/overview)
- [PostgreSQL Guide](https://orm.drizzle.team/docs/get-started-postgresql)
- [Query Builder](https://orm.drizzle.team/docs/select)

**Better Auth:**
- [Documentation](https://www.better-auth.com/docs)
- [Polar.sh Integration](https://www.better-auth.com/docs/plugins/polar-sh)

**Polar.sh:**
- [API Documentation](https://docs.polar.sh/)
- [Webhooks Guide](https://docs.polar.sh/api-reference/webhooks)

**OpenAI:**
- [API Reference](https://platform.openai.com/docs/api-reference)
- [Chat Completions](https://platform.openai.com/docs/guides/text-generation)
- [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)

**Puppeteer:**
- [Documentation](https://pptr.dev/)
- [PDF Generation](https://pptr.dev/api/puppeteer.page.pdf)

**Cloudflare R2:**
- [Documentation](https://developers.cloudflare.com/r2/)
- [AWS S3 Compatibility](https://developers.cloudflare.com/r2/api/s3/)

### Domain Knowledge Sources

**Ultramarathon Race Planning:**
- Race websites (Wasatch Front 100, Western States 100, etc.)
- Elevation profiles (Strava, AllTrails, race websites)
- Historical weather data (NOAA, Weather Underground)
- Aid station cutoffs (race websites, race manuals)

**Pacing Strategies:**
- Elevation-adjusted pacing formulas
- Strava data analysis (90-day rolling average)
- Cutoff buffer calculations

**Nutrition & Hydration:**
- Calorie targets (200-300/hr)
- Electrolyte replacement (sodium, potassium, magnesium)
- GI issue prevention strategies

**Crew Logistics:**
- Aid station accessibility
- Predicted arrival times (based on pacing)
- Crew instruction templates

---

## Quick Reference Checklist

Before starting any feature:

- [ ] **Check `/PacelineBusinessDocs/PacelineTasks.md`** for current task details and priority
- [ ] Read relevant PRD section in `/docs/PacelinePRD.md` for product context
- [ ] Check existing codebase for similar patterns
- [ ] Verify tech stack (Neon, Better Auth, Drizzle, Polar.sh)
- [ ] Review database schema (`db/schema.ts`)
- [ ] Check API route patterns (`app/api/`)
- [ ] Ensure TypeScript strict mode (no `any` types)
- [ ] Use Zod for validation
- [ ] Follow Next.js 15 App Router patterns
- [ ] Use Tailwind CSS only (no custom CSS)
- [ ] Test locally before committing

Common pitfalls to avoid:

- ❌ Don't use Supabase (we use Neon)
- ❌ Don't use NextAuth (we use Better Auth)
- ❌ Don't use Stripe (we use Polar.sh)
- ❌ Don't write custom CSS (use Tailwind only)
- ❌ Don't use `any` type (use proper TypeScript types)
- ❌ Don't bypass Drizzle ORM (no raw SQL queries)
- ❌ Don't ignore error handling (always try-catch)

---

## Document Hierarchy

1. **`/PacelineBusinessDocs/PacelineTasks.md`** - Current sprint tasks (ALWAYS CHECK FIRST)
2. **`/.claude/CLAUDE.md`** (this file) - Strategic context, technical architecture, coding principles
3. **`/docs/PacelinePRD.md`** - Complete product specification
4. **`/.cursorrules`** - Cursor IDE-specific context

**This file provides strategic and technical context for Claude Code agent development.**

**Last Updated:** November 2025
**Version:** 2.0

