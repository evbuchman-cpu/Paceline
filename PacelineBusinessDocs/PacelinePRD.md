# RACEWISE PRD - EXECUTIVE SUMMARY

**Version:** 2.0 | **Date:** November 15, 2025 | **Status:** Implementation Ready

## Product Vision

**One-Sentence Description:**  
RaceWise is an AI-powered ultramarathon race planning platform that transforms 30 hours of DIY planning into a 10-minute automated process, delivering personalized race-day execution guides.

## Target User: Alex Chen

- **Age:** 38, Software Engineer, $120K income
- **Race:** Wasatch Front 100 (14 weeks away)
- **Pain:** "I don't have 30 hours to plan. I barely made mile 62 cutoff last race."
- **Goal:** Finish with 3+ hour cutoff buffer, organized crew support

## Core Problem Solved

1. **Time Scarcity:** 30 hours → 10 minutes (90% reduction)
2. **Pre-Race Anxiety:** Overwhelming logistics → calm confidence
3. **Complexity:** 147 decisions → automated comprehensive plan
4. **Knowledge Gaps:** Trial/error learning → data-driven strategies

## Key Differentiators

- **Speed:** 10 min purchase + 5 min AI generation vs 30 hrs DIY
- **Personalization:** Strava fitness data → elevation-adjusted pacing
- **Comprehensiveness:** 8 sections (pacing, crew, nutrition, drop bags, cutoffs, weather, contingencies, mental)
- **Category Creation:** First race-day execution planner (not training/tracking)

## Success Metrics (6 Months)

| Metric | Target |
|--------|--------|
| Guides Sold | 500 |
| Revenue | $50,000 |
| Refund Rate | <5% |
| Satisfaction | 8+/10 |
| Finish Rate Impact | +15% |

## Strategic Positioning

**FOR:** Time-crunched ultramarathoners (35-42, $75K-$150K, analytical, mid-pack)  
**WHO:** Are anxious about cutoffs, overwhelmed by logistics, tired of 30+ hour planning  
**RACEWISE IS:** The first personalized race-day execution planner  
**THAT:** Delivers data-driven plans tailored to YOUR fitness and race  
**UNLIKE:** TrainingPeaks/Excel/Reddit (training ≠ execution)  
**RACEWISE:** 10-minute Strava-powered plans with crew logistics and cutoff buffers

## Pricing Tiers

- **Essential:** $29 (first-timers, basic planning)
- **Custom:** $99 ★ Most Popular (Strava integration, full personalization)
- **Ultra Bundle:** $299 (3 races, $100/race)

**ARPU:** $99 | **Gross Margin:** 94% | **LTV:CAC:** 10:1

## Tech Stack (Actual Starter Kit)

- **Framework:** Next.js 15 + TypeScript
- **Database:** Neon PostgreSQL + Drizzle ORM
- **Auth:** Better Auth v1.2.8 (Google OAuth)
- **Payments:** Polar.sh
- **AI:** OpenAI GPT-4 (8-step cascade)
- **PDF:** Puppeteer
- **Email:** Resend
- **Storage:** Cloudflare R2
- **Hosting:** Vercel

## 60-Day Roadmap (Automated MVP)

**Phase 1 (Weeks 1-4):** Automated MVP - Build core system, 50-100 guides
**Phase 2 (Weeks 5-8):** Polish & Launch - Beta testing, iteration, public launch
**Phase 3 (Months 3-6):** Scale to 500 guides, $50K revenue

## Next Steps (Start Here)

1. Add RaceWise tables to database schema (purchase, questionnaire, guide, race)
2. Build questionnaire forms (Essential 12 fields, Custom 19 + Strava OAuth)
3. Implement 8-step AI cascade for guide generation
4. Build PDF generation with Puppeteer + R2 storage
5. Launch dashboard + email automation + beta testing

---

**Files:** This PRD is split into focused sections for efficient review.  
**See:** 02_User_Requirements, 03_Technical_Architecture, 04_Implementation_Plan


# RACEWISE PRD - USER REQUIREMENTS

## Primary Persona: Alex Chen

**Profile:**
- Age 38, Software Engineer, Salt Lake City
- Income: $120K household, married + 2 kids
- Target: Wasatch Front 100 (100.2 mi, 26,882 ft gain)
- Experience: 5 yrs running, 3 ultras completed
- Training: 350+ hours, $1,200 race investment

**Pain Points (Ranked):**
1. **Time Scarcity (10/10):** "30 hours to plan—I don't have that time"
2. **Cutoff Anxiety (9/10):** "Barely made mile 62 with 8 min to spare last race"
3. **Complexity (8/10):** "Drop bag logistics making my head spin"
4. **Crew Stress (7/10):** "Need clear instructions for my crew"

**Goals:**
- Finish with 3+ hour cutoff buffer at every aid station
- Feel calm/confident at starting line
- Crew says "most organized support ever"

## Product Tiers & Features

### Essential - $29
- Basic pacing strategy (flat pace, no elevation adjustments)
- Standard nutrition timeline (generic guidelines)
- Generic crew logistics sheet
- Course overview (elevation, aid stations, cutoffs)
- Drop bag checklist

**Add-ons:** Gear ($10), Mental ($10), Hydration ($10), Nutrition ($10)

### Custom - $99 ★ Most Popular
**Everything in Essential PLUS:**
- All add-ons included ($40 value)
- Personalized pacing from Strava fitness data
- Elevation-adjusted pace recommendations
- Crew timing with predicted arrivals
- Cutoff buffer calculator (🟢🟡🔴 status)
- Personalized nutrition (vegan, gluten-free options)
- Drop bag strategy by station (weather-adjusted)
- Weather strategy + contingency protocols

### Ultra Bundle - $299
- 3 Custom guides ($100/race, save $198)
- Plan version updates (1 per race)
- Priority support (24hr response)
- Post-race debrief reports
- Referral credits ($20/friend vs $10)

## User Stories (Epic-Level)

**Epic 1: Purchase & Onboarding**
- User signs up (email/Google OAuth)
- Selects tier and completes Polar.sh checkout
- Receives welcome email with questionnaire link

**Epic 2: Questionnaire (Essential)**
- 12 fields: race selection, goal time, basic fitness
- Progress bar, auto-save every 30s
- Upload race docs (optional)
- Submit → "Guide generating..."

**Epic 3: Questionnaire (Custom)**
- Essential fields + 7 additional
- Strava OAuth (analyzes 90 days runs)
- Nutrition preferences, past experiences, fears
- Submit → AI cascade begins

**Epic 4: AI Guide Generation**
- 8-step cascade completes in <5 minutes
- Email: "Your [Race] Guide is Ready!"
- PDF available in dashboard for download

**Epic 5: Guide Usage**
- User reviews 8 sections
- Shares crew logistics sheet
- Packs drop bags using checklist
- Executes plan on race day

## Questionnaire Fields

**Essential (12 fields):**
1. Race name (dropdown or custom)
2. Race website (optional)
3. Upload race docs
4. Race date
5. Goal finish time (HH:MM)
6. Ultras completed (0, 1-3, 4-10, 10+)
7. Recent flat pace (MM:SS/mile)
8. Climbing strength (Strong/Average/Struggle)
9. Weekly training volume (miles)
10. Crew support (Yes/Partial/No)
11. Email (pre-filled)
12. First name (pre-filled)

**Custom Additional (7 fields):**
13. Connect Strava (OAuth)
14. Recent race results (textarea)
15. Biggest climb trained
16. GI issues history
17. Blister-prone areas
18. Nutrition preferences (checkboxes)
19. Biggest race fears (textarea)

## Anti-Personas (Do NOT Target)

1. **Ultra-Curious Dreamer:** Not registered, no immediate intent
2. **Elite Competitor:** Has coach, needs custom 1:1 service
3. **Minimalist Improviser:** "Planning is for the weak"
4. **Trail Marathoner:** 26.2 miles, no crew/drop bags needed

## Success Criteria (User Perspective)

**Pre-Race:** "I feel calm. I trust my plan. My crew knows what to do."  
**During Race:** "I'm executing my strategy. Cutoff buffers look good."  
**Post-Race:** "Finished with 4+ hour spare. Crew said it was smooth."  
**Long-Term:** "I'll use RaceWise for every future ultra."


# RACEWISE PRD - TECHNICAL ARCHITECTURE

## Tech Stack (Actual Starter Kit)

| Component | Technology | Why |
|-----------|-----------|-----|
| Framework | Next.js 15.3.1 | App Router, SSR, Vercel optimization |
| Language | TypeScript | Type safety, better DX |
| Styling | Tailwind CSS v4 + shadcn/ui | Utility-first, accessible components |
| Database | Neon PostgreSQL | Serverless, autoscaling, branching |
| ORM | Drizzle ORM | Type-safe, performant |
| Auth | Better Auth v1.2.8 | Modern, Polar.sh integration |
| Payments | Polar.sh | Developer-first subscriptions |
| AI | OpenAI GPT-4 | Structured outputs, function calling |
| PDF | Puppeteer | HTML → PDF conversion |
| Email | Resend | React templates, modern API |
| Storage | Cloudflare R2 | S3-compatible, zero egress fees |
| Hosting | Vercel | Zero-config Next.js deployment |
| Analytics | PostHog | Product analytics, session replay |

## Database Schema (Key Tables)

```typescript
// users - managed by Better Auth
id, email, name, image, createdAt, updatedAt

// purchases
id, userId, tier, amount, polarSubscriptionId, status, createdAt

// questionnaires  
id, purchaseId, raceName, raceDate, goalFinishTime, 
stravaAthleteId, stravaData (jsonb), nutritionPreferences (jsonb),
recentRaceResults, biggestRaceFears, completedAt, createdAt

// guides
id, purchaseId, questionnaireId, pdfUrl, sections (jsonb),
generationTime, aiCost, createdAt

// races (database of courses)
id, name, distance, elevationGain, location, website,
courseProfile (jsonb), weatherPatterns (jsonb), createdAt

// subscriptions (Ultra Bundle tracking)
id, userId, polarSubscriptionId, status, guidesRemaining, createdAt
```

## 8-Step AI Agent Cascade

**Total Time:** <5 minutes | **Cost:** ~$0.50-1.00 per guide

```typescript
// Step 1: Race Overview (45s)
Input: Race name, course data
Output: Description, elevation profile, aid stations, weather
Model: GPT-4 Turbo with JSON mode

// Step 2: Pacing Strategy (60s)  
Input: Strava data, race elevation, goal time
Output: Section-by-section pace with elevation adjustments
Model: GPT-4 Turbo with structured output

// Step 3: Cutoff Management (30s)
Input: Pacing strategy, race cutoffs
Output: Buffer calculator with 🟢🟡🔴 status indicators

// Step 4: Crew Logistics (45s)
Input: Pacing strategy, aid station accessibility
Output: Predicted arrival times, crew instructions

// Step 5: Drop Bag Strategy (30s)
Input: Race profile, preferences, weather
Output: Station-specific packing lists

// Step 6: Nutrition Timeline (30s)
Input: Preferences, race duration, aid offerings
Output: Personalized fueling plan

// Step 7: Contingency Protocols (45s)
Input: User issues (GI, blisters), race difficulty
Output: Protocols for common race problems

// Step 8: Mental Strategy (30s)
Input: User fears, race tough sections
Output: Mantras, motivation tactics
```

## API Endpoints

### Authentication (Better Auth)
```
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/session
POST   /api/auth/logout
GET    /api/auth/google
```

### Payments (Polar.sh)
```
POST   /api/webhooks/polar
  Events: subscription.created, subscription.active, 
          subscription.canceled, order.created
```

### Questionnaire
```
POST   /api/questionnaire       # Submit questionnaire
GET    /api/questionnaire/[id]  # Retrieve by ID
PUT    /api/questionnaire/[id]  # Update (auto-save)
GET    /api/strava/authorize    # Strava OAuth
POST   /api/strava/analyze      # Analyze fitness data
```

### Guide Generation
```
POST   /api/generate-guide      # Trigger AI cascade
  Request: { questionnaireId: uuid }
  Response: { guideId, pdfUrl, generationTime }

GET    /api/guides              # List user's guides
GET    /api/guides/[id]         # Get specific guide
GET    /api/guides/[id]/download # Download PDF
```

## OpenAI Integration

```typescript
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Example: Step 2 Pacing Strategy
async function generatePacingStrategy(questionnaire, overview) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{
      role: "system",
      content: "You are an expert ultramarathon pacing strategist..."
    }, {
      role: "user",
      content: `Generate pacing for ${questionnaire.raceName}
        
        Strava Data:
        - Flat pace: ${stravaData.avgFlatPace}
        - Climb pace: ${stravaData.avgClimbPace}
        
        Race: ${overview.distance}, ${overview.elevationGain}ft
        Goal: ${questionnaire.goalFinishTime} hours`
    }],
    response_format: { type: "json_object" },
    temperature: 0.5,
  });
  
  return JSON.parse(response.choices[0].message.content);
}
```

## PDF Generation (Puppeteer)

```typescript
import puppeteer from 'puppeteer';

export async function generatePDF(guideData, questionnaire) {
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
  
  // Upload to R2
  const fileName = `guides/${questionnaire.id}-${Date.now()}.pdf`;
  const pdfUrl = await uploadToR2(pdfBuffer, fileName);
  
  return pdfUrl;
}
```

## Cloudflare R2 Storage

```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export async function uploadToR2(buffer, fileName) {
  await r2Client.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: 'application/pdf',
  }));
  
  return `https://${process.env.R2_PUBLIC_DOMAIN}/${fileName}`;
}
```

## Performance Requirements

| Metric | Target |
|--------|--------|
| Landing page load | <3s |
| AI guide generation | <5 min |
| PDF generation | <30s |
| Database queries | <100ms |
| API response time | <500ms |
| Uptime | 99.5% |

## Security

- Better Auth: Database-backed sessions, bcrypt hashing
- Strava OAuth: Tokens encrypted in database
- Payments: Polar.sh (PCI DSS compliant, no card storage)
- API: Rate limiting, CORS, webhook signature verification
- HTTPS: Enforced by Vercel (automatic SSL)

## Scalability Plan

**Current (0-1K guides/month):**
- Vercel free tier
- Neon free tier (3GB storage)
- OpenAI pay-as-you-go ($500/month)

**6-Month (1K-10K guides/month):**
- Neon Pro ($19/month + usage)
- Optimize OpenAI prompts (reduce tokens 20-30%)
- PDF caching (reuse common sections)

**12-Month (10K+ guides/month):**
- OpenAI batch API (50% cost reduction)
- Template system (pre-generate sections)
- CDN caching (Cloudflare Workers KV)


# RACEWISE PRD - IMPLEMENTATION PLAN

## 60-Day Roadmap Overview (Automated MVP)

**Phase 1 (Weeks 1-4):** Automated MVP - Build core system
**Phase 2 (Weeks 5-8):** Polish & Launch - Beta testing, iteration, public launch
**Phase 3 (Months 3-6):** Scale & Optimize - 500 guides, $50K revenue

---

## Phase 1: Automated MVP (Weeks 1-4)

**Goal:** Build fully automated guide generation system, launch to beta users

### ✅ Already Completed
- [x] Next.js 15 + TypeScript setup
- [x] Tailwind CSS v4 + shadcn/ui
- [x] Neon PostgreSQL + Drizzle ORM
- [x] Better Auth (Google OAuth)
- [x] Polar.sh payment integration
- [x] Landing page exists
- [x] Pricing page exists
- [x] Auth pages (sign-in, sign-up)

### Week 1: Database & Forms Foundation
- [ ] Add RaceWise tables to `db/schema.ts` (purchase, questionnaire, guide, race)
- [ ] Generate and push Drizzle migrations to Neon
- [ ] Build Essential questionnaire form (12 fields)
- [ ] Build Custom questionnaire form (19 fields)
- [ ] Implement form validation with Zod
- [ ] Add auto-save functionality (every 30s)
- [ ] Create API routes: POST /api/questionnaire, PUT /api/questionnaire/[id]

### Week 2: Strava + AI Cascade Start
- [ ] Strava OAuth integration (authorize, callback, analyze routes)
- [ ] Analyze 90 days of Strava data (fitness metrics)
- [ ] OpenAI API integration setup
- [ ] Implement Steps 1-4 of AI cascade:
  - Step 1: Race Overview (45s)
  - Step 2: Pacing Strategy (60s)
  - Step 3: Cutoff Management (30s)
  - Step 4: Crew Logistics (45s)

### Week 3: AI Cascade Complete + PDF
- [ ] Implement Steps 5-8 of AI cascade:
  - Step 5: Drop Bag Strategy (30s)
  - Step 6: Nutrition Timeline (30s)
  - Step 7: Contingency Protocols (45s)
  - Step 8: Mental Strategy (30s)
- [ ] Add error handling and retry logic
- [ ] Build Puppeteer PDF generation
- [ ] Design PDF template (8 sections, branding, TOC)
- [ ] Set up Cloudflare R2 storage
- [ ] Create PDF upload function

### Week 4: Dashboard, Email & Integration
- [ ] Build user dashboard (guides listing, download)
- [ ] Create API routes: GET /api/guides, GET /api/guides/[id]/download
- [ ] Set up Resend email automation
- [ ] Email templates: welcome, payment confirmation, guide delivery, guide failed
- [ ] Implement Polar.sh webhook handler (order.created, subscription.created)
- [ ] Connect full flow: payment → questionnaire → AI cascade → PDF → email
- [ ] E2E testing (Essential, Custom, Ultra Bundle)

**Success Criteria:**
- Complete purchase → guide flow works end-to-end
- Guide generation <5 minutes
- AI cost <$1 per guide
- Zero critical bugs

**Budget:** $500 (OpenAI credits, testing)

---

## Phase 2: Polish & Launch (Weeks 5-8)

**Goal:** Beta testing, iteration, public launch

### Week 5-6: Beta Testing & Iteration
- [ ] Recruit 20 beta testers (Reddit r/ultrarunning, friends, Strava clubs)
- [ ] Create beta discount code (50% off or free)
- [ ] Monitor guide generation (time, cost, quality)
- [ ] Collect detailed feedback via Typeform survey
- [ ] Fix critical bugs and UX issues
- [ ] Refine AI prompts based on user feedback
- [ ] Optimize PDF layout and branding
- [ ] Add analytics tracking (PostHog events)

### Week 7: Polish & Optimization
- [ ] Improve landing page copy (headline, CTAs)
- [ ] Add testimonials from beta users (3+ quotes)
- [ ] Build sample guide preview (downloadable PDF)
- [ ] Optimize for mobile (questionnaire, dashboard)
- [ ] Add FAQ section to pricing page
- [ ] Set up error monitoring (Sentry or similar)
- [ ] Create support email templates
- [ ] Seed race database (20 popular races)

### Week 8: Public Launch
- [ ] Final QA testing (all flows, all tiers)
- [ ] Launch announcement (Reddit, Facebook groups)
- [ ] Product Hunt launch (optional)
- [ ] Email marketing (if list exists)
- [ ] Monitor conversion funnel
- [ ] Track key metrics (satisfaction, refund rate, generation time)
- [ ] Goal: 25-50 guides sold in Week 8

**Success Criteria:**
- 50-100 automated guides generated
- <5 min avg generation time
- <5% refund rate
- Zero failed generations
- 8+/10 satisfaction score
- 5+ testimonials collected

**Budget:** $1,500 (OpenAI, ads, testing credits)

---

## Phase 3: Scale & Optimize (Months 3-6)

**Goal:** Scale to 500 guides, optimize funnel, expand features

### Month 4: Feature Expansion
- [ ] Weather integration (live forecast 7 days before race)
- [ ] Plan version updates (request guide revision)
- [ ] Ultra Bundle management (3-guide credit tracking)
- [ ] Referral program ($10 credit per friend)
- [ ] Race database expansion (50+ races)

### Month 5: Marketing Optimization
- [ ] A/B test landing page (3 headline variations)
- [ ] Launch Facebook Ads (test audiences)
- [ ] Launch Google Ads (race-specific keywords)
- [ ] SEO blog content (3 articles/month)
- [ ] Partnership outreach (race directors, coaches)

### Month 6: Scale & Validate
- [ ] Scale to 500 total guides (cumulative)
- [ ] Admin dashboard (order management, analytics)
- [ ] Post-race survey automation
- [ ] Collect 20+ testimonials
- [ ] Validate 15% finish rate improvement

**Success Criteria:**
- 500 guides sold (cumulative)
- $50K revenue
- <5% refund rate
- 15% repeat purchase rate
- 20+ testimonials

**Budget:** $10,000+ (infrastructure, marketing, team)

---

## Resource Allocation

**Solo Founder Time (40 hrs/week):**
- Phase 1: 80% development, 20% planning/testing
- Phase 2: 50% polish/optimization, 50% marketing/launch
- Phase 3: 40% product, 40% marketing, 20% support

**AI Development Tools:**
- Claude Code (primary, terminal-based)
- Cursor (complex refactoring)
- ChatGPT/Claude (strategic advice)

**Contractors (Future):**
- Phase 2: VA for support ($15-20/hr, 10 hrs/week)
- Phase 3: Designer ($500-1K one-time)
- Phase 3: SEO writer ($200-500/article)

---

## Risk Mitigation

### Technical Risks
| Risk | Mitigation |
|------|-----------|
| AI generation failures | Retry logic, fallback prompts, manual QA |
| PDF rendering bugs | Test across viewers, HTML fallback |
| Strava API limits | Cache data, batch processing |
| Database scaling | Neon autoscaling, read replicas |

### Business Risks
| Risk | Mitigation |
|------|-----------|
| Low conversion (<2%) | A/B testing, user interviews, improve messaging |
| High refunds (>10%) | Quality assurance, proactive support |
| Competitors launch | Move fast, build moat (race DB, Strava) |
| Seasonal demand | Market winter races, expand to marathons |

---

## Decision Points & Pivot Triggers

**After Week 4 (Automated MVP Built):**
- ✅ **GO:** System works end-to-end, <5 min generation → Beta launch
- ❌ **NO-GO:** Critical bugs or >10 min generation → Fix before launch

**After Week 8 (Public Launch):**
- ✅ **GO:** 25+ guides sold, <5% refund, 8+/10 satisfaction → Scale marketing
- ❌ **NO-GO:** <10 guides or >10% refund → Improve quality/messaging

**After Month 6 (Scale):**
- ✅ **GO:** 200+ guides, $20K+ revenue, 4:1 LTV:CAC → Scale ads
- ❌ **NO-GO:** <100 guides or <2:1 LTV:CAC → Pivot B2B/subscription

---

## Next Immediate Steps (Start Here)

1. **Today:** Add RaceWise database tables to `db/schema.ts`
2. **This Week:** Build questionnaire forms (Essential + Custom)
3. **Next Week:** Implement 8-step AI cascade + PDF generation
4. **Week 3-4:** Build dashboard, emails, webhook handler
5. **Week 5:** Launch to 20 beta testers

**First Milestone:** Complete end-to-end flow working by Week 4


# RACEWISE PRD - PRICING & GO-TO-MARKET

## Pricing Tiers (Final)

| Tier | Price | Target | Conv % |
|------|-------|--------|--------|
| Essential | $29 | First-timers, price-sensitive | 20% |
| Custom ★ | $99 | Alex Chen (analytical, anxious) | 60% |
| Ultra Bundle | $299 | Multi-race planners (3/year) | 20% |

**ARPU:** $99 weighted average  
**Gross Margin:** 94% ($99 - $6 COGS)  
**LTV:CAC:** 10:1 ($247 LTV / $25 CAC)

## Unit Economics

**COGS per Guide ($6.07):**
- OpenAI API: $0.75
- Polar.sh fees: $5.25 (5% + $0.30)
- Neon database: $0.05
- R2 storage: $0.02
- Resend email: $0.004

**Customer Acquisition:**
- Organic (Reddit, referrals): $0-10
- Paid ads: $25-50
- Blended CAC: $25

**Lifetime Value:**
- Avg 2.5 guides over 3 years = $247.50
- Repeat rate: 15%
- LTV:CAC = 10:1 (healthy)

## Revenue Projections

**Year 1:**
| Quarter | Guides | Revenue | Cumulative |
|---------|--------|---------|------------|
| Q1 (Months 1-3) | 50 | $4,950 | $4,950 |
| Q2 (Months 4-6) | 150 | $14,850 | $19,800 |
| Q3 (Months 7-9) | 300 | $29,700 | $49,500 |
| Q4 (Months 10-12) | 500 | $49,500 | $99,000 |
| **Total** | **1,000** | **$99,000** | |

**Year 2:** 3,000 guides × $99 = $297,000  
**Year 3:** $1.2M+ (subscriptions + B2B partnerships)

---

## Go-to-Market Strategy

### Target Segments (Priority Order)

**1. Anxious Mid-Pack Finishers (60% focus)**
- Demographics: 35-42, $75K-$150K, college-educated
- Psychographics: Analytical, time-crunched, burned by DIY
- Channels: Reddit r/ultrarunning, Facebook groups, Strava clubs
- Message: "Stop piecing together advice. 10 min to protect your training."

**2. First-Time Ultra Runners (25% focus)**
- Demographics: 28-38, marathon background, first 50K/50M
- Psychographics: Excited but overwhelmed, budget-conscious
- Channels: Trail blogs, YouTube, Instagram influencers
- Message: "Your first ultra doesn't have to be chaotic. $29 Essential guide."

**3. Performance Optimizers (15% focus)**
- Demographics: 40-50, experienced, age-group competitive
- Psychographics: Data-driven, willing to pay premium
- Channels: Ultra podcasts, race expos, Strava athletes
- Message: "Every advantage matters. Advanced weather + nutrition tactics."

---

## Marketing Channels

### 1. Content Marketing (SEO + Organic)
**Timeline:** Month 3-6  
**Budget:** $500-1K/month

**Tactics:**
- Blog: "How to Pace Wasatch 100," "Drop Bag Strategy"
- Race-specific landing pages (SEO for race names)
- YouTube: Race reports featuring RaceWise users
- Podcast appearances: Ten Junk Miles, Trail Runner Nation

### 2. Community Engagement (Reddit + Facebook)
**Timeline:** Month 1-12 (ongoing)  
**Budget:** $0 (organic)

**Tactics:**
- Reddit r/ultrarunning: Weekly race reports with RaceWise
- Facebook groups: Trail Sisters, Wasatch 100 Finishers
- Strava clubs: Post guides, club discounts (10% off)
- AMA: "I built AI software to plan ultras—AMA"

### 3. Paid Advertising
**Timeline:** Month 4-6  
**Budget:** $1K-2K/month

**Facebook Ads:**
- Interests: Ultrarunning, Trail Running, Strava, Garmin
- Creative: "30 hrs planning → 10 min. See how."
- Retargeting: Pixel visitors with testimonials

**Google Ads:**
- Keywords: "ultramarathon pacing," "Wasatch 100 planning"
- Landing pages: Race-specific (Wasatch, Western States)

### 4. Influencer & Partnerships
**Timeline:** Month 6-12  
**Budget:** $500-1K/month

**Tactics:**
- Micro-influencers: 5-10 creators (10K-50K followers)
- Offer: Free guide + $50 commission per sale
- Coaches: White-label (50% revenue share)
- Race directors: Integration into registration (20% commission)

### 5. Referral Program
**Timeline:** Month 2-12  
**Budget:** $0 (credits only)

**Tactics:**
- Earn $10 credit per friend (Custom/Ultra: $20)
- Unique referral code post-purchase
- One-click social sharing
- Leaderboard: Top referrers featured

---

## Launch Calendar (90 Days)

**Month 1: Soft Launch**
- Week 1: Landing page, pricing, manual SOP
- Week 2: Email 50 friends, 5 Facebook groups
- Week 3: Reddit beta tester post
- Week 4: Deliver 5 guides, iterate

**Month 2: Public Launch**
- Week 5: 3 SEO blog posts
- Week 6: Product Hunt launch
- Week 7: Reddit AMA
- Week 8: 20 guides sold, 5 testimonials

**Month 3: Paid Marketing**
- Week 9: Facebook ads (3 creatives)
- Week 10: Google ads (10 keywords)
- Week 11: 2 influencer partnerships
- Week 12: 50 guides sold, prep automation

---

## Competitive Positioning

**vs TrainingPeaks/Strava:**  
"They get you fit. We get you finished."

**vs Excel/DIY:**  
"Your spreadsheet took 12 hours. We give you a plan in 10 minutes."

**vs Individual Coaches:**  
"Coaches get you ready. We get you organized."

**vs Generic Calculators:**  
"Calculators give you one number. We give you a complete execution plan."

**Category Creation:**  
"Race-Day Execution Planning" (not training, not tracking)

---

## Brand Messaging

**Tagline:** "Stop piecing together advice. Start executing with confidence."

**Hero Headline:**  
"Get a personalized race-day plan in 10 minutes—built for YOUR fitness and YOUR race."

**Value Props:**
1. Time: "10 min vs 30 hrs = 29 hrs 50 min back"
2. Anxiety: "From overwhelmed to confident"
3. Finish Rate: "+15% vs DIY planning"
4. Crew: "'Most organized support ever'"

**Social Proof:**
- "500+ ultrarunners finished with confidence"
- "Average satisfaction: 9.2/10"
- "87% report anxiety reduction"

**Voice:**
- Calm, confident, specific (not hyped)
- "At mile 62, here's exactly what to do..."
- Data-forward but human-centered


# RACEWISE PRD - SUCCESS METRICS & ANALYTICS

## Primary KPIs (Product-Market Fit)

| Metric | Baseline | 3-Month | 6-Month | 12-Month |
|--------|----------|---------|---------|----------|
| Guides Sold | 0 | 50 | 500 | 5,000 |
| Revenue | $0 | $4,500 | $50,000 | $500,000 |
| Refund Rate | N/A | <5% | <5% | <3% |
| Satisfaction | N/A | 8+/10 | 8+/10 | 9+/10 |
| Finish Rate Impact | N/A | +10% | +15% | +15% |

## Secondary Metrics (Growth)

| Metric | 3-Month | 6-Month | 12-Month |
|--------|---------|---------|----------|
| Email Signups | 100 | 1,000 | 10,000 |
| Lead→Paid Conv | 20% | 25% | 30% |
| Repeat Purchase | 5% | 10% | 15% |
| Referral Rate | 10% | 20% | 25% |
| Testimonials | 5 | 20 | 100 |

## Technical Performance

| Metric | Target | Tool |
|--------|--------|------|
| Landing Load | <3s | Vercel Analytics |
| Guide Generation | <5 min | Custom logs |
| API Response | <500ms | PostHog traces |
| Uptime | 99.5% | Vercel status |
| Payment Success | >98% | Polar.sh |

---

## Analytics Implementation (PostHog)

### Event Tracking

**Landing Page:**
```typescript
posthog.capture('landing_page_viewed', { 
  source: utm_source 
});
posthog.capture('pricing_tier_clicked', { 
  tier: 'custom' 
});
posthog.capture('sample_guide_downloaded');
```

**Purchase Funnel:**
```typescript
posthog.capture('checkout_initiated', { 
  tier, amount 
});
posthog.capture('payment_completed', { 
  tier, amount, polarId 
});
posthog.capture('questionnaire_started', { 
  tier 
});
posthog.capture('questionnaire_completed', { 
  tier, time_spent 
});
```

**Guide Generation:**
```typescript
posthog.capture('guide_generation_started', { 
  race_name 
});
posthog.capture('guide_generation_completed', { 
  race_name, generation_time 
});
posthog.capture('guide_downloaded', { 
  race_name, file_size 
});
```

**Engagement:**
```typescript
posthog.capture('crew_sheet_shared', { 
  race_name 
});
posthog.capture('repeat_purchase', { 
  previous_races 
});
posthog.capture('referral_link_shared');
```

### Funnel Analysis

```
Landing → Pricing → Checkout → Payment → Questionnaire → Guide
↓ 100%  ↓ 40%     ↓ 15%     ↓ 90%    ↓ 85%          ↓ 95%

Target Conversion: 5-10% (landing → payment)
```

### Cohort Analysis

- First-time vs experienced runners (Essential vs Custom)
- Strava users vs non-Strava (Custom tier adoption)
- Race distances (50K vs 100M complexity)

---

## User Feedback Collection

### Post-Purchase Survey (Day 7)

1. How satisfied? (1-10 scale)
2. Did you feel prepared? (Yes/Somewhat/No)
3. Most helpful section? (Pacing, Crew, Nutrition, etc.)
4. What would you improve? (open text)

### Post-Race Survey (Day 7 after race)

1. Did you finish? (Yes/No)
2. How closely followed guide? (Very/Somewhat/Not much)
3. Cutoff buffer status? (🟢🟡🔴)
4. Would use RaceWise again? (Yes/Maybe/No)
5. Share your race story? (optional testimonial)

### NPS (Net Promoter Score)

"How likely to recommend RaceWise to a fellow ultrarunner?" (0-10)

- **Promoters (9-10):** Ask for referral, testimonial
- **Passives (7-8):** Ask what would make it 10
- **Detractors (0-6):** Urgent follow-up, refund offer

---

## Success Validation Criteria

### Phase 1 Success (Weeks 1-4)
- [ ] 3-5 manual guides sold
- [ ] <5% refund rate
- [ ] 8+/10 satisfaction
- [ ] <2hr fulfillment per guide
- [ ] 3+ testimonials

### Phase 2 Success (Weeks 5-12)
- [ ] 100 automated guides
- [ ] <5 min generation time
- [ ] <5% refund rate
- [ ] Zero failed generations
- [ ] Strava OAuth working

### Phase 3 Success (Months 4-6)
- [ ] 500 guides sold (cumulative)
- [ ] $50K revenue
- [ ] <5% refund rate
- [ ] 15% repeat purchase
- [ ] 20+ testimonials
- [ ] 10% landing conversion
- [ ] 15% finish rate improvement validated

---

## Monthly Review Template

**MONTH [X] REVIEW**

**Quantitative:**
- Guides sold: ___ (Essential: ___, Custom: ___, Ultra: ___)
- Revenue: $___
- Refund rate: ___%
- Satisfaction: ___/10
- Fulfillment time: ___ hours
- Email list: ___
- Lead→Paid: ___%

**Qualitative:**
- What worked well?
- What didn't work?
- Customer feedback themes?
- Biggest friction points?

**Next Month Focus:**
- Primary goal: [e.g., "Reach 15 guides sold"]
- Secondary goal: [e.g., "Launch Essential tier"]
- Key initiatives: [3-5 bullets]

**Pivot Triggers:**
- Refund rate >10% (quality issue)
- Fulfillment >3 hrs (efficiency problem)
- <5 sales (demand validation failure)

---

## Dashboard KPIs (Weekly Monitoring)

**Revenue Dashboard:**
- Total revenue (MTD, QTD, YTD)
- Revenue by tier (Essential, Custom, Ultra)
- ARPU (average revenue per user)
- MRR trend (if subscriptions added)

**Conversion Funnel:**
- Landing page views
- Pricing page visits
- Checkout initiated
- Payment completed
- Questionnaire completed
- Guide delivered
- Conversion rates at each step

**Quality Metrics:**
- Average satisfaction score
- Refund rate (%)
- NPS score
- Generation time (avg, p50, p95)
- Failed generations (count, %)

**Growth Metrics:**
- New users (weekly)
- Repeat customers (%)
- Referrals generated
- Email list growth
- Social media reach
