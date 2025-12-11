# Paceline MCP Implementation Plan

## Phase 2: Cost Optimization (Months 3-6)

### Week 1: MCP Infrastructure Setup

**Goal:** Install MCP SDK and create first tool server

**Tasks:**
1. Install dependencies
```bash
npm install @modelcontextprotocol/sdk
npm install @anthropic-ai/sdk@latest
```

2. Create MCP server directory structure
```
lib/mcp/
├── server.ts              # Main MCP server
├── tools/
│   ├── strava.ts         # Strava fitness tools
│   ├── race.ts           # Race database tools
│   ├── weather.ts        # Weather forecast tools
│   └── database.ts       # Database query tools
└── types.ts              # Shared types
```

3. Create basic MCP server (`lib/mcp/server.ts`)
```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "paceline-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_athlete_fitness_summary",
      description: "Get summarized fitness metrics from Strava data",
      inputSchema: {
        type: "object",
        properties: {
          athleteId: { type: "string" },
          days: { type: "number", default: 90 }
        },
        required: ["athleteId"]
      }
    }
    // Add more tools...
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "get_athlete_fitness_summary":
      return await getAthleteFitnessSummary(args);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

4. Test MCP server
```bash
node lib/mcp/server.ts
```

**Success Criteria:**
- ✅ MCP server runs without errors
- ✅ Tool list returns correctly
- ✅ Can call test tool and get response

---

### Week 2: Build Core MCP Tools

**Goal:** Create 5 token-efficient tools

#### Tool 1: `get_athlete_fitness_summary`
```typescript
// lib/mcp/tools/strava.ts
import { db } from "@/db/drizzle";
import { questionnaire } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAthleteFitnessSummary(args: {
  athleteId: string;
  days: number;
}) {
  // Fetch stored Strava data
  const q = await db.query.questionnaire.findFirst({
    where: eq(questionnaire.stravaAthleteId, args.athleteId)
  });

  if (!q?.stravaData) {
    return { error: "No Strava data found" };
  }

  const data = q.stravaData as any;

  // Return ONLY summarized metrics (50 tokens vs 5,000)
  return {
    weeklyMileage: data.weeklyMileageAvg,      // 65 miles
    longestRun: data.longestRun,               // 28 miles
    totalElevationGain: data.totalElevation,   // 45,000 ft
    avgVertPerMile: data.avgVertPerMile,       // 85 ft/mile
    maxClimb: data.maxClimb,                   // 3,200 ft
    climbingGrade: data.climbingGrade,         // "average" | "strong" | "weak"
    estimatedFTP: data.estimatedFTP,           // 250W
    estimatedVO2Max: data.estimatedVO2Max,     // 52
    consistencyScore: data.consistencyScore    // 0.85 (0-1 scale)
  };
}
```

**Token Savings:** 5,000 tokens → 50 tokens (99% reduction)

#### Tool 2: `get_race_elevation_summary`
```typescript
// lib/mcp/tools/race.ts
export async function getRaceElevationSummary(args: {
  raceId: string;
}) {
  const race = await db.query.race.findFirst({
    where: eq(raceTable.id, args.raceId)
  });

  const profile = race?.courseProfile as any;

  // Return summarized segments (not full GPX data)
  return {
    totalDistance: race.distance,
    totalElevationGain: race.elevationGain,
    segments: profile.segments.map((seg: any) => ({
      miles: `${seg.startMile}-${seg.endMile}`,
      gain: seg.elevationGain,
      loss: seg.elevationLoss,
      difficulty: seg.difficulty // "easy" | "moderate" | "hard"
    })),
    maxGrade: profile.maxGrade,
    avgGrade: profile.avgGrade
  };
}
```

**Token Savings:** 1,000 tokens → 200 tokens (80% reduction)

#### Tool 3: `get_weather_summary`
```typescript
// lib/mcp/tools/weather.ts
export async function getWeatherSummary(args: {
  location: string;
  raceDate: string;
}) {
  // Fetch from weather API
  const forecast = await fetchWeatherAPI({
    location: args.location,
    date: args.raceDate
  });

  // Return only essential info
  return {
    temperature: {
      high: forecast.tempHigh,
      low: forecast.tempLow,
      start: forecast.tempAtRaceStart
    },
    precipitation: {
      chance: forecast.precipChance,
      amount: forecast.precipAmount
    },
    wind: {
      speed: forecast.windSpeed,
      direction: forecast.windDirection
    },
    conditions: forecast.conditions, // "sunny" | "cloudy" | "rain" | "snow"
    heatRisk: forecast.heatIndex > 85 ? "high" : "low",
    alerts: forecast.alerts // Array of weather alerts
  };
}
```

**Token Savings:** 500 tokens → 50 tokens (90% reduction)

#### Tool 4: `get_nutrition_preferences`
```typescript
// lib/mcp/tools/database.ts
export async function getNutritionPreferences(args: {
  questionnaireId: string;
}) {
  const q = await db.query.questionnaire.findFirst({
    where: eq(questionnaire.id, args.questionnaireId)
  });

  return {
    dietaryRestrictions: q?.nutritionPreferences as any,
    giIssuesHistory: q?.giIssuesHistory,
    preferredFuels: q?.preferredFuels,
    caffeineTolerance: q?.caffeineTolerance
  };
}
```

**Token Savings:** 300 tokens → 30 tokens (90% reduction)

#### Tool 5: `calculate_cutoff_buffers`
```typescript
// lib/mcp/tools/race.ts
export async function calculateCutoffBuffers(args: {
  raceId: string;
  predictedPaces: Array<{ segment: string, pace: string }>;
}) {
  const race = await db.query.race.findFirst({
    where: eq(raceTable.id, args.raceId)
  });

  const aidStations = race?.aidStations as any;

  // Calculate buffers for each aid station
  return aidStations.map((station: any) => {
    const predictedArrival = calculateArrivalTime(
      args.predictedPaces,
      station.mile
    );

    const buffer = station.cutoff - predictedArrival; // in minutes

    return {
      station: station.name,
      mile: station.mile,
      cutoff: station.cutoff,
      predictedArrival: predictedArrival,
      buffer: buffer,
      status: buffer > 180 ? "green" : buffer > 60 ? "yellow" : "red"
    };
  });
}
```

**Success Criteria:**
- ✅ All 5 tools return structured data
- ✅ Token reduction verified (log before/after)
- ✅ Tools tested with real questionnaire data

---

### Week 3: Refactor AI Cascade to Use MCP

**Goal:** Update 8-step cascade to use MCP tools

**Before (Direct API):**
```typescript
// app/api/generate-guide/route.ts
export async function POST(req: Request) {
  const { questionnaireId } = await req.json();

  // Fetch ALL data upfront
  const questionnaire = await db.query.questionnaire.findFirst({ ... });
  const race = await db.query.race.findFirst({ ... });
  const stravaData = questionnaire.stravaData; // 5,000 tokens!

  // Step 2: Generate pacing
  const pacingPrompt = `
    Generate pacing strategy.

    Strava Data: ${JSON.stringify(stravaData, null, 2)} // 5,000 tokens
    Race Profile: ${JSON.stringify(race.courseProfile)} // 1,000 tokens
    Weather: ${JSON.stringify(weather)} // 500 tokens

    Create pacing plan...
  `;

  const pacing = await anthropic.messages.create({
    model: "claude-sonnet-4.5",
    messages: [{ role: "user", content: pacingPrompt }]
  });
}
```

**After (MCP):**
```typescript
// app/api/generate-guide/route.ts
import { createMCPClient } from "@/lib/mcp/client";

export async function POST(req: Request) {
  const { questionnaireId } = await req.json();

  // Fetch minimal data
  const questionnaire = await db.query.questionnaire.findFirst({ ... });

  const mcpClient = await createMCPClient();

  // Step 2: Generate pacing (Claude calls tools as needed)
  const pacing = await anthropic.messages.create({
    model: "claude-sonnet-4.5",
    tools: mcpClient.tools, // All MCP tools available
    messages: [{
      role: "user",
      content: `
        Generate pacing strategy for ${questionnaire.raceName}.

        Use these tools to get data:
        - get_athlete_fitness_summary (athleteId: ${questionnaire.stravaAthleteId})
        - get_race_elevation_summary (raceId: ${questionnaire.raceId})
        - get_weather_summary (location, date)

        Create detailed pacing plan with elevation-adjusted paces.
      `
    }],
    // Handle tool calls
    tool_choice: { type: "auto" }
  });

  // Claude automatically calls tools and uses responses
  // Total tokens: ~1,000 vs ~7,000 (85% reduction)
}
```

**Success Criteria:**
- ✅ All 8 steps use MCP tools
- ✅ Token usage reduced by 70%+ (log metrics)
- ✅ Guide quality maintained (compare outputs)
- ✅ Generation time similar or faster

---

### Week 4: Testing & Optimization

**Tasks:**

1. **A/B Test: Direct vs MCP**
```typescript
// Generate 20 guides with old method
// Generate 20 guides with MCP
// Compare:
// - Token usage
// - Cost per guide
// - Generation time
// - Output quality (manual review)
```

2. **Load Testing**
```bash
# Test 100 concurrent generations
npm run load-test:mcp
```

3. **Monitoring Setup**
```typescript
// Log every MCP tool call
export async function logMCPCall(tool: string, duration: number, tokens: number) {
  await db.insert(mcpLogTable).values({
    tool: tool,
    duration: duration,
    tokensUsed: tokens,
    timestamp: new Date()
  });
}
```

4. **Optimize Slow Tools**
```typescript
// If get_race_elevation_summary is slow:
// - Add database index
// - Cache race data in Redis
// - Pre-compute elevation summaries
```

**Success Criteria:**
- ✅ Cost reduced by 70%+ ($0.168 → $0.050 per guide)
- ✅ Generation time <5 minutes (no regression)
- ✅ Zero failed generations
- ✅ Quality matches or exceeds direct method

---

## Phase 3: Dynamic Features (Months 6-12)

### Week 1: Build Monitoring Tools

**Goal:** Enable Claude to check upcoming races and update guides

#### Tool 6: `get_upcoming_races`
```typescript
export async function getUpcomingRaces(args: {
  daysAhead: number; // Default 7
}) {
  const targetDate = addDays(new Date(), args.daysAhead);

  const guides = await db.query.guide.findMany({
    where: and(
      eq(guide.status, "completed"),
      gte(questionnaire.raceDate, new Date()),
      lte(questionnaire.raceDate, targetDate)
    ),
    with: {
      questionnaire: true,
      purchase: { with: { user: true } }
    }
  });

  return guides.map(g => ({
    guideId: g.id,
    raceName: g.questionnaire.raceName,
    raceDate: g.questionnaire.raceDate,
    location: g.questionnaire.raceLocation,
    athleteId: g.questionnaire.stravaAthleteId,
    userEmail: g.purchase.user.email,
    tier: g.purchase.tier
  }));
}
```

#### Tool 7: `get_current_strava_fitness`
```typescript
export async function getCurrentStravaFitness(args: {
  athleteId: string;
  baselineFitness: any; // From original plan
}) {
  // Fetch latest Strava data (last 7 days)
  const recentActivities = await fetchStravaActivities({
    athleteId: args.athleteId,
    days: 7
  });

  // Compare to baseline
  const currentWeeklyMiles = calculateWeeklyMiles(recentActivities);
  const baselineWeeklyMiles = args.baselineFitness.weeklyMileage;

  const fitnessChange = (currentWeeklyMiles - baselineWeeklyMiles) / baselineWeeklyMiles;

  return {
    currentWeeklyMiles: currentWeeklyMiles,
    baselineWeeklyMiles: baselineWeeklyMiles,
    percentChange: fitnessChange * 100,
    significant: Math.abs(fitnessChange) > 0.10, // 10% threshold
    trend: fitnessChange > 0.05 ? "improving" : fitnessChange < -0.05 ? "declining" : "stable"
  };
}
```

#### Tool 8: `update_guide_section`
```typescript
export async function updateGuideSection(args: {
  guideId: string;
  section: "pacing" | "nutrition" | "gear" | "crew" | "cutoffs";
  newContent: any;
  reason: string;
}) {
  // Update guide in database
  const guide = await db.query.guide.findFirst({
    where: eq(guideTable.id, args.guideId)
  });

  const updatedSections = {
    ...guide.sections,
    [args.section]: newContent
  };

  await db.update(guideTable)
    .set({
      sections: updatedSections,
      updatedAt: new Date()
    })
    .where(eq(guideTable.id, args.guideId));

  // Log update
  await db.insert(guideUpdateLogTable).values({
    guideId: args.guideId,
    section: args.section,
    reason: args.reason,
    timestamp: new Date()
  });

  // Regenerate PDF with updated content
  const newPdfUrl = await generatePDF(updatedSections, guide.questionnaire);

  await db.update(guideTable)
    .set({ pdfUrl: newPdfUrl })
    .where(eq(guideTable.id, args.guideId));

  return {
    success: true,
    newPdfUrl: newPdfUrl
  };
}
```

#### Tool 9: `send_update_notification`
```typescript
export async function sendUpdateNotification(args: {
  userEmail: string;
  raceName: string;
  updatedSections: string[];
  reason: string;
  guideUrl: string;
}) {
  await sendEmail({
    to: args.userEmail,
    subject: `Updated Plan: ${args.raceName}`,
    html: `
      <h2>Your race plan has been updated</h2>
      <p>We've updated your plan for ${args.raceName} based on:</p>
      <ul><li>${args.reason}</li></ul>

      <p>Updated sections:</p>
      <ul>
        ${args.updatedSections.map(s => `<li>${s}</li>`).join('')}
      </ul>

      <a href="${args.guideUrl}">Download Updated Plan</a>
    `
  });

  return { success: true };
}
```

---

### Week 2: Build Daily Monitoring Agent

**Goal:** Create agent that runs daily to check/update guides

```typescript
// cron/daily-guide-monitor.ts
import { createMCPClient } from "@/lib/mcp/client";
import { anthropic } from "@/lib/anthropic-client";

export async function runDailyMonitoring() {
  const mcpClient = await createMCPClient();

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4.5",
    max_tokens: 8000,
    tools: mcpClient.tools,
    messages: [{
      role: "user",
      content: `
You are an intelligent race plan monitoring system.

Your job: Check all upcoming races (next 7 days) and update plans if needed.

For each upcoming race:
1. Use get_upcoming_races to get all races in next 7 days
2. For each race:
   a. Use get_weather_summary to check latest forecast
   b. Use get_current_strava_fitness to check athlete's recent training

3. Determine if updates are needed:
   - Weather changes: If forecast changed significantly (temp swing >10°F, new rain/snow)
     → Update gear list and pacing (heat/rain adjustments)
   - Fitness changes: If athlete's volume changed >10% from plan assumptions
     → Update pacing plan and cutoff buffers

4. If updates needed:
   - Use update_guide_section to modify relevant sections
   - Use send_update_notification to email athlete

5. Only update if changes are material (don't spam users)

Return summary of actions taken.
      `
    }]
  });

  // Log results
  console.log("Daily monitoring complete:", response.content);

  return response;
}

// Run via Vercel Cron
export async function GET() {
  await runDailyMonitoring();
  return Response.json({ success: true });
}
```

**Setup Vercel Cron:**
```json
// vercel.json
{
  "crons": [{
    "path": "/api/cron/daily-monitor",
    "schedule": "0 6 * * *"  // 6am daily
  }]
}
```

---

### Week 3: Testing Dynamic Updates

**Test Scenarios:**

1. **Weather Change Test**
```typescript
// Scenario: Race forecast changes from 65°F sunny → 85°F sunny
// Expected: Agent updates gear list (less clothing, more electrolytes)
//           Agent updates pacing (slower pace for heat)
//           Agent emails user
```

2. **Fitness Change Test**
```typescript
// Scenario: Athlete's weekly mileage drops from 65 → 45 miles (injury?)
// Expected: Agent updates pacing (more conservative)
//           Agent updates cutoff buffers (tighter margins)
//           Agent emails user with concern
```

3. **No Change Test**
```typescript
// Scenario: Weather/fitness unchanged
// Expected: Agent checks but makes no updates
//           No email sent
```

**Success Criteria:**
- ✅ Agent correctly identifies changes
- ✅ Updates are relevant and helpful
- ✅ Email notifications clear and actionable
- ✅ No false positives (unnecessary updates)

---

### Week 4: Launch Dynamic Monitoring

**Tasks:**

1. **Beta Test with 20 Users**
   - Select users with races in 7-14 days
   - Enable monitoring
   - Collect feedback on updates

2. **Marketing:**
   - Add "Living Plans™" to pricing page
   - Highlight dynamic updates as key differentiator
   - Create demo video showing update in action

3. **Monitor Metrics:**
   - How many guides updated per week?
   - What's the average update reason? (weather 60%, fitness 30%, other 10%)
   - User satisfaction with updates? (target 9+/10)

**Success Criteria:**
- ✅ 20+ successful dynamic updates
- ✅ 9+/10 user satisfaction
- ✅ Zero spam complaints
- ✅ "Living Plans" featured in marketing

---

## Cost-Benefit Analysis

### Phase 2 (Cost Optimization) ROI

**Investment:**
- 4 weeks development time
- Estimated cost: $5,000 (if outsourced) or $0 (if you build)

**Returns (at 1,000 guides/month):**
- Token cost savings: $144/guide × 1,000 = $144/month
- Annual savings: $1,728
- Payback period: 3.5 months

**Break-even:** 35 guides

### Phase 3 (Dynamic Monitoring) ROI

**Investment:**
- 4 weeks development time
- Estimated cost: $5,000
- Ongoing costs: ~$50/month (daily Claude API calls)

**Returns (harder to quantify):**
- Reduced refund rate: 5% → 3% (saves $20/refund × 20 refunds = $400/month)
- Increased perceived value: Enables price increase ($99 → $129)
- Marketing differentiation: "Only platform with living plans"

**Intangible benefits:**
- ✅ Massive competitive moat
- ✅ User delight (unexpected updates)
- ✅ Reduced anxiety (plan stays current)

---

## Tools Summary

| Tool | Purpose | Token Savings | Phase |
|------|---------|---------------|-------|
| get_athlete_fitness_summary | Summarize Strava data | 5,000 → 50 | Phase 2 |
| get_race_elevation_summary | Summarize course profile | 1,000 → 200 | Phase 2 |
| get_weather_summary | Current/forecast weather | 500 → 50 | Phase 2 |
| get_nutrition_preferences | User dietary restrictions | 300 → 30 | Phase 2 |
| calculate_cutoff_buffers | Aid station cutoffs | N/A (new) | Phase 2 |
| get_upcoming_races | Races in next N days | N/A (new) | Phase 3 |
| get_current_strava_fitness | Recent training trends | N/A (new) | Phase 3 |
| update_guide_section | Modify guide sections | N/A (new) | Phase 3 |
| send_update_notification | Email user about changes | N/A (new) | Phase 3 |

**Total Token Reduction:** 56,000 → 8,000 tokens per guide (85% savings)

---

## Alternative: Hybrid Approach

If you want benefits NOW without full MCP commitment:

### Quick Win: Tool-Like Prompts (No MCP)

```typescript
// Instead of MCP tools, use structured prompts
const fitnessPrompt = `
Analyze this Strava data and return ONLY these metrics in JSON:
{
  "weeklyMileage": number,
  "longestRun": number,
  "climbingGrade": "strong" | "average" | "weak",
  "estimatedVO2Max": number
}

Data: ${JSON.stringify(stravaData)}
`;

const fitness = await anthropic.messages.create({
  model: "claude-sonnet-4.5",
  messages: [{ role: "user", content: fitnessPrompt }]
});

// Extract JSON from response
const metrics = JSON.parse(fitness.content[0].text);
```

**Pros:**
- ✅ Some token savings (Claude outputs less)
- ✅ No MCP infrastructure needed
- ✅ Can implement in 1 day

**Cons:**
- ❌ Still includes full Strava data in input (5,000 tokens)
- ❌ Parsing errors possible (JSON extraction)
- ❌ Not reusable (each step repeats data)

---

## Final Recommendation: 3-Phase Approach

### Phase 1 (NOW - Week 8): Skip MCP
- Focus on shipping MVP
- Accept $0.168/guide cost (trivial at 50 guides = $8.40)
- Optimize prompts for quality, not cost

### Phase 2 (Month 3-6): Add MCP for Cost Optimization
- When you hit 500+ guides/month
- Implement 5 core tools (fitness, elevation, weather, nutrition, cutoffs)
- Reduce cost 85% ($0.168 → $0.024)

### Phase 3 (Month 6-12): Add MCP for Dynamic Monitoring
- When you have 1,000+ active guides
- Implement monitoring tools (upcoming races, Strava trends, guide updates)
- Launch "Living Plans™" as premium feature
- Massive competitive differentiation

**This phased approach balances:**
- ✅ Speed to market (no MCP delay for MVP)
- ✅ Cost optimization (when it matters)
- ✅ Innovation (dynamic features when you have scale)

Would you like me to start implementing Phase 2 or 3 now? Or should we focus on shipping the MVP first?
