# RACEWISE PRD - QUICK REFERENCE CARD

**Use this for rapid lookup during development**

---

## 🎯 Core Product

**What:** AI-powered ultramarathon race planning (30 hrs → 10 min)  
**Who:** Alex Chen (38, engineer, anxious about cutoffs, time-crunched)  
**Price:** Essential $29 | Custom $99 ★ | Ultra $299  
**Goal:** 500 guides, $50K revenue, 15% finish rate ↑ (6 months)

---

## 💻 Tech Stack (From Starter Kit)

```bash
# Core
Next.js 15 + TypeScript + Tailwind CSS v4
Neon PostgreSQL + Drizzle ORM
Better Auth v1.2.8 (Google OAuth)

# Services
Polar.sh (payments)
OpenAI GPT-4 (AI cascade)
Puppeteer (PDF generation)
Resend (email)
Cloudflare R2 (storage)
Vercel (hosting)
PostHog (analytics)
```

---

## 📋 Questionnaire Fields

**Essential (12 fields):**
race name, race website, upload docs, race date, goal time, ultras completed, flat pace, climbing strength, weekly volume, crew support, email, name

**Custom (+7 fields):**
Strava connect, race results, biggest climb, GI history, blister areas, nutrition prefs, race fears

---

## 🤖 8-Step AI Cascade

1. Race Overview (45s) - elevation, aid stations, weather
2. Pacing Strategy (60s) - elevation-adjusted from Strava
3. Cutoff Management (30s) - 🟢🟡🔴 buffer calculator
4. Crew Logistics (45s) - predicted arrival times
5. Drop Bags (30s) - station-specific packing lists
6. Nutrition (30s) - personalized fueling plan
7. Contingencies (45s) - GI, blisters, falling behind
8. Mental Strategy (30s) - mantras, tough sections

**Total:** <5 min | **Cost:** ~$0.50-1.00/guide

---

## 🗄️ Database Schema (Key Tables)

```typescript
users: id, email, name, image
purchases: id, userId, tier, amount, status
questionnaires: id, purchaseId, raceName, stravaData(jsonb)
guides: id, purchaseId, pdfUrl, sections(jsonb)
races: id, name, distance, courseProfile(jsonb)
subscriptions: id, userId, guidesRemaining
```

---

## 🚀 API Endpoints

```
POST   /api/auth/signup
POST   /api/webhooks/polar
POST   /api/questionnaire
POST   /api/strava/authorize
POST   /api/generate-guide
GET    /api/guides
```

---

## 📅 90-Day Milestones

**Week 1-4:** Manual MVP (30-50 guides, validate)  
**Week 5-12:** AI automation (100 guides, <5 min)  
**Month 4-6:** Scale (500 guides, $50K revenue)

---

## 💰 Unit Economics

- **COGS:** $6.07 (OpenAI $0.75 + Polar $5.25 + hosting $0.07)
- **Gross Margin:** 94%
- **CAC:** $25 (blended organic + paid)
- **LTV:** $247 (2.5 guides over 3 years)
- **LTV:CAC:** 10:1

---

## 📊 Success Metrics (6 Months)

✅ 500 guides sold  
✅ $50,000 revenue  
✅ <5% refund rate  
✅ 8+/10 satisfaction  
✅ <5 min generation time  
✅ 15% finish rate improvement

---

## 🎨 Brand Quick Ref

**Tagline:** "Stop piecing together advice. Start executing with confidence."

**Colors:**
- Primary: Trail Canopy #2C5F4D (forest green)
- Accent: Summit Light #C87350 (rust orange)
- Text: Stone Gray #4A5859

**Voice:** Calm expert, tactically specific, data-forward but human

**Positioning:** "TrainingPeaks gets you fit. RaceWise gets you finished."

---

## ⚡ Immediate Next Steps

1. [ ] Neon database setup + Drizzle migrations
2. [ ] Better Auth config (Google OAuth)
3. [ ] Polar.sh products (3 tiers: $29, $99, $299)
4. [ ] Landing page (Next.js + Tailwind)
5. [ ] Questionnaire forms (12 Essential, 19 Custom)
6. [ ] Manual fulfillment SOP (Claude prompts)
7. [ ] Soft launch to 5 beta testers

---

**Full PRD:** See 01-06 numbered files for complete specifications  
**Total Docs:** 35,000+ words across 6 focused sections
