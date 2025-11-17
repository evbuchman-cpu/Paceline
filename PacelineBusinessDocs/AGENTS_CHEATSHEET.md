# Paceline Agents Cheatsheet

**Quick Reference** | **Last Updated:** November 2025

---

## Your 10 Custom Agents

You have **10 specialized agents** in `.claude/sub-agents/AGENT_ARCHITECTURE.md` that work together to build Paceline. Here's how to use them:

---

## Development Agents (5)

### 1. 🏗️ Fullstack MVP Builder
**What they do:**
- Build questionnaire forms (Essential 12 fields, Custom 19 fields)
- Create dashboard pages (guides listing, profile)
- Implement API routes (questionnaire CRUD, guide retrieval)
- Integrate Better Auth for protected routes
- Connect Polar.sh checkout flow

**When to call:**
- "Build questionnaire form"
- "Create dashboard page"
- "Implement API route for..."
- "Add auto-save to form"
- "Build user profile page"

**Example:**
```
@Fullstack-MVP-Builder: Build questionnaire form with 12 Essential fields, auto-save, and Zod validation
```

---

### 2. 🗄️ Database Architect
**What they do:**
- Design Drizzle schemas (purchase, questionnaire, guide, race tables)
- Write and run migrations
- Create TypeScript types from schemas
- Design efficient queries with joins
- Implement database transactions

**When to call:**
- "Design schema for..."
- "Create migration for..."
- "How do I query...?"
- "Add new table for..."
- "Optimize this query"

**Example:**
```
@Database-Architect: Add purchase, questionnaire, guide, and race tables to db/schema.ts
```

---

### 3. 🎨 Landing Page Engineer
**What they do:**
- Build landing page (hero, how it works, testimonials)
- Create pricing page (3-tier comparison)
- Implement CTA buttons with Polar.sh checkout
- Optimize for mobile conversion
- Add analytics tracking (PostHog)

**When to call:**
- "Build landing page"
- "Create pricing page"
- "Optimize hero section"
- "Add testimonials"
- "Improve conversion"

**Example:**
```
@Landing-Page-Engineer: Build landing page with hero, how it works, and pricing preview
```

---

### 4. 🤖 AI Integration Specialist
**What they do:**
- Implement 8-step AI cascade for guide generation
- Design prompts for each section (pacing, crew, nutrition, etc.)
- Integrate OpenAI GPT-4
- Optimize for cost (<$1 per guide) and speed (<5 min)
- Future: Strava API integration

**When to call:**
- "Implement AI cascade"
- "Generate guide with OpenAI"
- "Write prompts for..."
- "Optimize AI cost"
- "Handle OpenAI errors"

**Example:**
```
@AI-Integration-Specialist: Implement OpenAI cascade for guide generation with all 8 sections
```

---

### 5. ✅ QA & Code Guardian
**What they do:**
- Review code for security, accessibility, performance
- Write test cases for critical paths
- Debug errors and provide fixes
- Ensure TypeScript strict mode (no `any`)
- Check mobile responsiveness

**When to call:**
- "Review this code"
- "Test this feature"
- "Is this secure?"
- "Check accessibility"
- "Debug this error"

**Example:**
```
@QA-Code-Guardian: Review questionnaire form for security and accessibility before production
```

---

## Product & Strategy Agents (3)

### 6. 📊 Product Strategist
**What they do:**
- Feature prioritization (what to build for MVP)
- User research and feedback analysis
- Ultrarunning domain expertise (validate pacing advice)
- Product roadmap planning
- Define success metrics

**When to call:**
- "Should we add this feature?"
- "What's priority for MVP?"
- "Is this pacing advice accurate?"
- "Does this match our target user?"
- "What's on the roadmap?"

**Example:**
```
@Product-Strategist: User feedback says pacing is too aggressive—should we adjust AI prompts?
```

---

### 7. ✍️ Content & Marketing Strategist
**What they do:**
- Write landing page copy (headline, subheadline, CTAs)
- Create email sequences (welcome, guide delivery, referral)
- Enforce brand voice (calm expert, tactically specific)
- Write testimonial templates
- SEO content

**When to call:**
- "Write landing page copy"
- "Create email sequence"
- "What should hero headline say?"
- "Brand voice for this section?"
- "SEO content for blog post"

**Example:**
```
@Content-Marketing-Strategist: Write landing page copy with headline, subheadline, and CTAs
```

---

### 8. 📈 Growth & Conversion Specialist
**What they do:**
- A/B test landing page and pricing
- Analyze conversion funnel
- Configure PostHog analytics
- SEO optimization
- Referral program design

**When to call:**
- "Set up A/B test"
- "Analyze conversion funnel"
- "Configure PostHog"
- "Improve conversion rate"
- "Track this metric"

**Example:**
```
@Growth-Conversion-Specialist: Analyze conversion funnel and recommend improvements
```

---

## Support & Meta Agents (2)

### 9. 🎓 Teaching Mentor
**What they do:**
- Explain technical concepts (Next.js, TypeScript, Drizzle)
- Guide through Claude Code agent usage
- Provide learning resources
- Answer "why" questions
- Help when you're stuck

**When to call:**
- "I don't understand..."
- "What does this mean?"
- "How does X work?"
- "Explain this concept"
- "Why are we doing it this way?"

**Example:**
```
@Teaching-Mentor: Explain how Drizzle migrations work and why we use them
```

**✨ Always available** - invoke anytime you're confused!

---

### 10. 🎯 Project Orchestrator
**What they do:**
- Coordinate complex features (database + AI + frontend)
- Manage dependencies between agents
- Break down large tasks into subtasks
- Track progress and resolve conflicts

**When to call:**
- "Build complete feature end-to-end"
- "I need multiple agents to work together"
- "What's the plan for implementing..."
- "Break down this large feature"

**Example:**
```
@Project-Orchestrator: Build complete flow: questionnaire → AI guide → PDF delivery
```

---

## Built-In Claude Code Agents (Also Available)

In addition to your 10 custom agents, you also have these built-in agents:

### 🔍 Explore Agent
**What it does:** Fast exploration of codebase to find files, search code, answer questions

**When to use:**
- "Where are errors from the client handled?"
- "What is the codebase structure?"
- "Find all files related to authentication"

**Example:**
```
Use the Task tool with subagent_type=Explore
```

### 📝 Plan Agent
**What it does:** Fast exploration and planning for implementation steps

**When to use:**
- Planning implementation of a coding task
- Breaking down features into steps

**Example:**
```
Use the Task tool with subagent_type=Plan
```

### 🌐 General-Purpose Agent
**What it does:** Multi-step research, complex searches, autonomous task handling

**When to use:**
- Open-ended searches requiring multiple rounds
- Complex research tasks
- When you're not confident you'll find the right match quickly

**Example:**
```
Use the Task tool with subagent_type=general-purpose
```

---

## How to Invoke Agents

### Single-Agent Tasks
```
@Agent-Name: Your specific request here
```

### Multi-Agent Tasks
```
@Project-Orchestrator: Coordinate [Agent 1] + [Agent 2] + [Agent 3] to build X
```

### When Stuck
```
@Teaching-Mentor: Explain this concept or help me understand
```

---

## Agent Collaboration Patterns

### Pattern 1: Build New App Feature
```
1. @Product-Strategist: Confirm feature requirements
2. @Database-Architect: Create database schema
3. @Fullstack-MVP-Builder: Build forms and API routes
4. @QA-Code-Guardian: Review for security and accessibility
5. @Teaching-Mentor: Explain how it works
```

### Pattern 2: Generate AI Guide
```
1. @Product-Strategist: Validate 8-section structure
2. @Database-Architect: Create guide table with JSONB
3. @AI-Integration-Specialist: Build OpenAI cascade
4. @Fullstack-MVP-Builder: Create API route to trigger cascade
5. @QA-Code-Guardian: Test error handling
```

### Pattern 3: Launch Landing Page
```
1. @Product-Strategist: Confirm value prop and target user
2. @Content-Marketing-Strategist: Write copy
3. @Landing-Page-Engineer: Build page
4. @Growth-Conversion-Specialist: Set up analytics
5. @QA-Code-Guardian: Review mobile responsiveness
```

---

## Quick Decision Tree

**Need to build a form?** → Fullstack MVP Builder
**Need to design database?** → Database Architect
**Need to build marketing page?** → Landing Page Engineer
**Need AI guide generation?** → AI Integration Specialist
**Need code review?** → QA & Code Guardian
**Need feature prioritization?** → Product Strategist
**Need copy written?** → Content & Marketing Strategist
**Need analytics/A/B testing?** → Growth & Conversion Specialist
**Need to learn something?** → Teaching Mentor
**Need multiple agents coordinated?** → Project Orchestrator

---

## Your Current Phase: MVP Development

**Recommended First 5 Tasks:**

1. **Add Paceline database tables** → @Database-Architect
2. **Build Essential questionnaire form** → @Fullstack-MVP-Builder
3. **Implement 8-step AI cascade** → @AI-Integration-Specialist
4. **Build landing page** → @Landing-Page-Engineer + @Content-Marketing-Strategist
5. **Create dashboard for viewing guides** → @Fullstack-MVP-Builder

---

## Pro Tips

✅ **Invoke Teaching Mentor anytime** you're confused—that's what they're for!
✅ **Use Project Orchestrator** for features requiring 3+ agents
✅ **Always run QA & Code Guardian** before production deployment
✅ **Product Strategist first** before building new features
✅ **Be specific** in your requests—agents work best with clear instructions

---

**Full details:** See `.claude/sub-agents/AGENT_ARCHITECTURE.md` (1,239 lines)
