# Features Section Optimization - Implementation Prompt

**Project:** Paceline (formerly RaceWise)
**Section:** Features Section Redesign
**Goal:** Optimize features section for conversion while maintaining brand voice
**Status:** APPROVED FOR PHASED IMPLEMENTATION
**Created:** December 10, 2025

---

## Executive Summary

**Current State:**
- Features section has 6 solid features but is too feature-focused rather than outcome-focused
- Ordering doesn't match user pain priority (Time Scarcity > Cutoff Anxiety > Complexity)
- Contains specific race reference ("Wasatch's 26,882 feet") that may alienate 95% of visitors
- Missing conversion elements (social proof, stats, CTA)

**Approved Changes:**
- Reorder features to match Alex Chen's pain priority
- Reframe all copy from "what it does" to "what you get" (benefit-driven)
- Remove race-specific mentions, replace with universal specifics
- Keep headline the same (already strong, avoid over-emphasizing 30hrs→10min)
- **6 features total** (integrate Strava into Pacing feature)
- Add placeholder stats block
- Skip testimonial for now
- Implement in phases

**Impact:**
- Better conversion alignment with target user (Alex Chen)
- Clearer differentiation from competitors (Strava, TrainingPeaks, DIY)
- Maintains brand voice (calm expert, tactically specific)
- No custom development needed (uses existing components)

---

## User Decisions (APPROVED)

### ✅ Decision 1: Headline
**Choice:** Keep current "Everything You Need to Finish Strong"
**Rationale:** Already lean heavily on 30hrs→10min in other sections (Problem/Solution), avoid repetition

### ✅ Decision 2: Number of Features
**Choice:** 6 features (remove Strava as standalone, integrate into Feature 4)
**Rationale:** Clean 3x2 grid, less overwhelming, Strava is the *how* not a separate benefit

### ✅ Decision 3: Stats Block
**Choice:** Use placeholder stats
**Content:** "Built for ultrarunners | Personalized for your fitness | Generated in minutes"

### ✅ Decision 4: Testimonial
**Choice:** Skip for now (add after beta testing when we have real testimonials)

### ✅ Decision 5: Implementation
**Choice:** Phased approach
- **Phase 1:** Copy updates + component cleanup
- **Phase 2:** Add stats block + CTA section
- **Phase 3:** Add testimonials after beta testing

---

## Part 1: Copy Optimization (Phase 1)

### 1.1 Section Headline & Subheadline

**Current (KEEP AS-IS):**
```
Headline: "Everything You Need to Finish Strong"
Subheadline: "No guesswork. No spreadsheets. Just a plan that works."
```

**Status:** ✅ Approved - No changes needed

**Rationale:** Strong headline, avoids repetition of 30hrs→10min messaging from other sections

---

### 1.2 Feature Cards - Revised Copy (6 Features)

#### Feature 1: Time Savings (NEW - Move to #1 position)

**Icon:** Clock (lucide-react: `Clock`)
**Color:** Trail Canopy (#2C5F4D)

**Title:** "10-Minute Race Plan, Not 30 Hours"

**Description:**
"Stop building spreadsheets. Answer 12 questions (Essential) or 19 questions (Custom), and get a complete race-day execution guide in minutes. No more nights lost to drop bag logistics and pacing calculations."

**Rationale:**
- Leads with Alex's #1 pain (time scarcity 10/10)
- Quantifies value prop without over-emphasizing it in headline
- Mentions question counts to set expectations
- Differentiates from DIY spreadsheets

---

#### Feature 2: Cutoff Management (Keep position, update copy)

**Icon:** Gauge (lucide-react: `Gauge`) - *Change from TrendingUp*
**Color:** Trail Canopy (#2C5F4D)

**Title:** "Never Miss a Cutoff Again"

**Description:**
"Get predicted arrival times for every aid station with color-coded buffer status (🟢 3+ hours, 🟡 1-3 hours, 🔴 <1 hour). Know exactly when to speed up or when you have room to recover. No more panicking at mile 62 with 8 minutes to spare."

**Changes:**
- Title: "Know Exactly Where You Stand" → "Never Miss a Cutoff Again"
- Icon: TrendingUp → Gauge
- Added: "No more panicking at mile 62 with 8 minutes to spare"

**Rationale:**
- Alex's #2 pain (cutoff anxiety 9/10)
- Outcome-focused title (never miss) vs. state-focused
- "Mile 62 with 8 minutes to spare" = specific without naming a race
- Emoji indicators are visual and memorable

---

#### Feature 3: Crew Logistics (Keep position, update copy)

**Icon:** Users (lucide-react: `Users`) - *Keep as-is*
**Color:** Trail Canopy (#2C5F4D)

**Title:** "Crew Instructions They'll Actually Understand"

**Description:**
"Your crew gets a simple timeline with predicted arrival times, exactly what gear to have ready, and what you'll need at each station. No more fumbling in parking lots or forgetting your headlamp at mile 78."

**Changes:**
- Title: "Crew-Ready in 10 Minutes" → "Crew Instructions They'll Actually Understand"
- Added: "forgetting your headlamp at mile 78" (specific scenario)

**Rationale:**
- "They'll Actually Understand" acknowledges common crew confusion frustration
- "Headlamp at mile 78" = specific scenario without naming a race
- Focuses on outcome (organized crew) not feature (one-page sheet)

---

#### Feature 4: Pacing Strategy (Update + Integrate Strava)

**Icon:** Mountain (lucide-react: `Mountain`) - *Change from TrendingUp*
**Color:** Trail Canopy (#2C5F4D)
**Badge:** "Custom Tier" (new badge to highlight Strava integration)

**Title:** "Pacing That Actually Matches the Terrain"

**Description:**
"Flat pace times don't work in the mountains. Get section-by-section pacing adjusted for elevation gain, your climbing strength, and recent training volume. Custom tier analyzes 90 days of your Strava data for personalized pace targets—no manual entry needed."

**Changes:**
- Title: "Smart Pacing for Your Terrain" → "Pacing That Actually Matches the Terrain"
- Removed: "Wasatch's 26,882 feet" reference
- Added: Strava integration details (90 days of data, no manual entry)
- Added: "Custom Tier" badge to differentiate from Essential

**Rationale:**
- Removes exclusionary race reference (Wasatch)
- Integrates Strava as the *how* behind personalization, not a separate feature
- Badge highlights Custom tier value (drives upgrades)
- Leads with problem ("flat pace times don't work")

---

#### Feature 5: Nutrition (Update copy)

**Icon:** Utensils (lucide-react: `Utensils`) - *Keep as-is*
**Color:** Trail Canopy (#2C5F4D)

**Title:** "Nutrition Timeline (No More GI Disasters)"

**Description:**
"Get an hour-by-hour fueling plan with calorie targets, electrolyte timing, and what to eat at each aid station. Personalized for your dietary preferences (vegan, gluten-free, caffeine-sensitive). No more bonking at mile 40 or puking at mile 50."

**Changes:**
- Title: "Fuel Smart, Not Hard" → "Nutrition Timeline (No More GI Disasters)"
- Added: Specific mile markers (40, 50)
- Added: Dietary preferences examples

**Rationale:**
- "No More GI Disasters" = real fear ultrarunners have (outcome-focused)
- Mile markers feel specific without naming a race
- Dietary preferences show personalization depth

---

#### Feature 6: Contingencies (Minor update)

**Icon:** Wrench (lucide-react: `Wrench`) - *Keep as-is*
**Color:** Trail Canopy (#2C5F4D)

**Title:** "When Things Go Wrong (And They Will)"

**Description:**
"Get specific action plans for GI issues, blisters, falling behind pace, heat protocols, and equipment failures. Not generic motivation—exact steps to take based on your known weak points."

**Changes:**
- Title: "When Things Go Wrong" → "When Things Go Wrong (And They Will)"

**Rationale:**
- "(And They Will)" acknowledges reality without being negative
- "Not generic motivation" aligns with brand voice (calm expert, tactically specific)
- Current copy is already strong

---

### 1.3 Summary of Changes

| Current Feature | New Feature | Position | Icon Change | Copy Change |
|-----------------|-------------|----------|-------------|-------------|
| Smart Pacing for Your Terrain | 10-Minute Race Plan, Not 30 Hours | #1 (was #1) | TrendingUp → Clock | Major rewrite |
| Know Exactly Where You Stand | Never Miss a Cutoff Again | #2 (was #2) | TrendingUp → Gauge | Title + details |
| Crew-Ready in 10 Minutes | Crew Instructions They'll Actually Understand | #3 (was #3) | Users (same) | Title + details |
| (Smart Pacing moved to #1) | Pacing That Actually Matches the Terrain | #4 (was #1) | TrendingUp → Mountain | Remove Wasatch, add Strava |
| Fuel Smart, Not Hard | Nutrition Timeline (No More GI Disasters) | #5 (was #4) | Utensils (same) | Title + details |
| When Things Go Wrong | When Things Go Wrong (And They Will) | #6 (was #5) | Wrench (same) | Minor title update |
| Your Data, Your Plan (Strava) | **REMOVED** - Integrated into Feature #4 | N/A | N/A | Integrated |

**Net Change:** 7 features → 6 features (cleaner grid, Strava integrated into Pacing)

---

## Part 2: Conversion Elements (Phase 2)

### 2.1 Stats Block (Below Features Grid)

**Placement:** Immediately after the 6 feature cards

**Content (Placeholder):**
```
Built for ultrarunners | Personalized for your fitness | Generated in minutes
```

**Styling:**
- Center-aligned
- Stone Gray text (#4A5859)
- Separated by vertical bars (|)
- Font size: text-base
- Font: Inter (font-sans)
- Padding: py-8

**Implementation Notes:**
- After beta testing, replace with real stats: "500+ guides generated | 15% higher finish rate | <5 min avg generation"
- Keep placeholders generic but aspirational

---

### 2.2 CTA Section (After Stats Block)

**Placement:** After stats block

**Headline:** "Ready to Stop Stressing and Start Planning?"

**Button:** "See Pricing & Plans"
**Link:** `/pricing`
**Button Style:** Summit Light background (#C87350), white text

**Subtext:** "Essential ($29) or Custom ($99). No subscription. One-time payment per race."

**Styling:**
- Centered layout
- Generous padding (py-16 or py-20)
- Background: White or Light Sandstone (#F5F1EA)
- Headline: Inter Semi-Bold, text-3xl, Trail Canopy color
- Subtext: Source Serif, text-base, Stone Gray color

---

### 2.3 Testimonial Section (Phase 3 - After Beta Testing)

**Status:** SKIP FOR NOW

**When to add:**
- After beta testing (Week 5-6)
- When you have 3-5 real testimonials
- Place between stats block and CTA section

**Placeholder for future:**
```
"I spent 40+ hours planning my first 100-miler with spreadsheets and Google Docs.
This saved me all of that and gave me a better plan."
— Sarah K., Wasatch 100 finisher
```

---

## Part 3: Technical Implementation

### 3.1 Component Strategy

**Approach:** Minimal Enhancement (Uses existing shadcn components)
- **Complexity:** Easy ✅
- **Time:** 30-40 minutes
- **Goal:** Cleaner code, consistent styling, no major layout changes

**Components to Use:**
1. `Card` component (already installed) - replace current inline divs
2. `Badge` component (already installed) - replace custom badge span
3. `Button` component (already installed) - for CTA
4. Keep existing grid layout (md:grid-cols-2 lg:grid-cols-3)
5. Keep lucide-react icons (update specific icons as noted)

**Why This Approach:**
- User is new to coding (minimize complexity)
- Current design works well (don't over-engineer)
- Focus on copy improvements (bigger impact on conversion)
- Uses existing components (no new dependencies)

---

### 3.2 File Structure

**Files to Modify:**
1. `/components/features.tsx` - Main features component (rewrite)

**Files to Reference:**
- `/components/ui/card.tsx` - Card component
- `/components/ui/badge.tsx` - Badge component
- `/components/ui/button.tsx` - Button component
- `/components/pricing.tsx` - Example of grid + card layout

**No New Files Needed**

---

### 3.3 Phase 1 Implementation Checklist (Copy + Components)

**Step 1: Update Features Array**
- [ ] Reorder features: Time Savings → Cutoff → Crew → Pacing → Nutrition → Contingencies
- [ ] Update all 6 feature titles per section 1.2
- [ ] Update all 6 feature descriptions per section 1.2
- [ ] Remove Feature 7 (Strava standalone)
- [ ] Update Feature 4 (Pacing) to include Strava integration details
- [ ] Add badge: "Custom Tier" to Feature 4

**Step 2: Update Icons**
- [ ] Feature 1: Change icon from `TrendingUp` to `Clock`
- [ ] Feature 2: Change icon from `Clock` to `Gauge` (or keep `TrendingUp` if Gauge not preferred)
- [ ] Feature 4: Change icon from `TrendingUp` to `Mountain` or `Activity`
- [ ] Keep icons for Features 3, 5, 6 (Users, Utensils, Wrench)

**Step 3: Replace Components**
- [ ] Import `Card` from `@/components/ui/card`
- [ ] Import `Badge` from `@/components/ui/badge`
- [ ] Replace inline `<div className="p-6 bg-white...">` with `<Card>`
- [ ] Replace custom badge span with `<Badge variant="secondary">`

**Step 4: Test Phase 1**
- [ ] Check responsive layout (mobile, tablet, desktop)
- [ ] Verify 3x2 grid displays correctly
- [ ] Check color contrast (WCAG AA compliance)
- [ ] Proofread all copy for typos
- [ ] Verify icons display correctly

---

### 3.4 Phase 2 Implementation Checklist (Conversion Elements)

**Step 1: Add Stats Block**
- [ ] Create stats section below features grid
- [ ] Add placeholder text: "Built for ultrarunners | Personalized for your fitness | Generated in minutes"
- [ ] Style with Stone Gray (#4A5859), center-aligned, text-base
- [ ] Add vertical bar separators

**Step 2: Add CTA Section**
- [ ] Import `Button` from `@/components/ui/button`
- [ ] Create CTA section after stats block
- [ ] Add headline: "Ready to Stop Stressing and Start Planning?"
- [ ] Add button: "See Pricing & Plans" linking to `/pricing`
- [ ] Style button with Summit Light background (#C87350), white text
- [ ] Add subtext: "Essential ($29) or Custom ($99). No subscription. One-time payment per race."

**Step 3: Test Phase 2**
- [ ] Verify stats block displays correctly
- [ ] Test CTA button link to pricing page
- [ ] Check responsive layout
- [ ] Verify button hover states

---

### 3.5 Phase 3 Implementation Checklist (After Beta Testing)

**Status:** Wait until after beta testing (Week 5-6)

**Step 1: Collect Testimonials**
- [ ] Get 3-5 real testimonials from beta testers
- [ ] Get permission to use names/races
- [ ] Select best 1-2 testimonials for features section

**Step 2: Add Testimonial Section**
- [ ] Create testimonial section between stats block and CTA
- [ ] Style with Source Serif italic, centered
- [ ] Add attribution with em-dash

**Step 3: Update Stats Block**
- [ ] Replace placeholder stats with real data
- [ ] Example: "500+ guides generated | 15% higher finish rate | <5 min avg generation"

---

### 3.6 Code Reference Pattern

**Current Pattern (features.tsx lines 54-69):**
```tsx
{features.map((feature, index) => (
  <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-lg bg-[#2C5F4D] bg-opacity-10 flex items-center justify-center">
        <feature.icon className="w-6 h-6 text-[#2C5F4D]" />
      </div>
      {feature.badge && (
        <span className="px-2 py-1 text-xs font-sans font-semibold bg-[#D4B896] text-[#2C5F4D] rounded">
          {feature.badge}
        </span>
      )}
    </div>
    <h3 className="font-sans font-medium text-xl text-[#2C5F4D] mb-2">{feature.title}</h3>
    <p className="font-serif text-[#4A5859] leading-relaxed">{feature.description}</p>
  </div>
))}
```

**Proposed Pattern (using Card + Badge components):**
```tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Gauge, Users, Mountain, Utensils, Wrench } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "10-Minute Race Plan, Not 30 Hours",
    description: "Stop building spreadsheets. Answer 12 questions (Essential) or 19 questions (Custom), and get a complete race-day execution guide in minutes. No more nights lost to drop bag logistics and pacing calculations.",
  },
  {
    icon: Gauge,
    title: "Never Miss a Cutoff Again",
    description: "Get predicted arrival times for every aid station with color-coded buffer status (🟢 3+ hours, 🟡 1-3 hours, 🔴 <1 hour). Know exactly when to speed up or when you have room to recover. No more panicking at mile 62 with 8 minutes to spare.",
  },
  {
    icon: Users,
    title: "Crew Instructions They'll Actually Understand",
    description: "Your crew gets a simple timeline with predicted arrival times, exactly what gear to have ready, and what you'll need at each station. No more fumbling in parking lots or forgetting your headlamp at mile 78.",
  },
  {
    icon: Mountain,
    title: "Pacing That Actually Matches the Terrain",
    description: "Flat pace times don't work in the mountains. Get section-by-section pacing adjusted for elevation gain, your climbing strength, and recent training volume. Custom tier analyzes 90 days of your Strava data for personalized pace targets—no manual entry needed.",
    badge: "Custom Tier",
  },
  {
    icon: Utensils,
    title: "Nutrition Timeline (No More GI Disasters)",
    description: "Get an hour-by-hour fueling plan with calorie targets, electrolyte timing, and what to eat at each aid station. Personalized for your dietary preferences (vegan, gluten-free, caffeine-sensitive). No more bonking at mile 40 or puking at mile 50.",
  },
  {
    icon: Wrench,
    title: "When Things Go Wrong (And They Will)",
    description: "Get specific action plans for GI issues, blisters, falling behind pace, heat protocols, and equipment failures. Not generic motivation—exact steps to take based on your known weak points.",
  },
]

// In the render:
{features.map((feature, index) => (
  <Card key={index} className="hover:shadow-xl transition-shadow">
    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
      <div className="w-12 h-12 rounded-lg bg-[#2C5F4D] bg-opacity-10 flex items-center justify-center">
        <feature.icon className="w-6 h-6 text-[#2C5F4D]" />
      </div>
      {feature.badge && (
        <Badge variant="secondary">{feature.badge}</Badge>
      )}
    </CardHeader>
    <CardContent>
      <h3 className="font-sans font-medium text-xl text-[#2C5F4D] mb-2">{feature.title}</h3>
      <p className="font-serif text-[#4A5859] leading-relaxed">{feature.description}</p>
    </CardContent>
  </Card>
))}
```

---

## Part 4: Brand Alignment Check

### 4.1 Brand Voice Compliance

**Brand Voice Traits (from BrandIdentity.md):**
1. ✅ **Calm Expert** - Copy uses "Get" and "Know exactly" (steady, informative)
2. ✅ **Tactically Specific** - Includes numbers (10 minutes, mile 62, 🟢🟡🔴, 90 days)
3. ✅ **Experienced but Accessible** - Explains without talking down
4. ✅ **Time-Conscious** - Leads with time savings (but doesn't over-emphasize in headline)
5. ✅ **Genuinely Invested** - Acknowledges stakes ("No more panicking", "And They Will")

**Tone Spectrum:**
- ✅ 60% casual, 40% formal (uses contractions, direct address)
- ✅ 70% technical, 30% simple (specific numbers, explained naturally)
- ✅ 80% serious, 20% playful ("And They Will" = realistic not negative)

**Guardrails:**
- ✅ Always: Specific numbers, acknowledge stakes, calm confidence
- ✅ Never: Generic motivation, bro-culture, corporate speak, timid language

---

### 4.2 Competitive Differentiation

**vs. Strava/TrainingPeaks:**
- ✅ Positioned as race-day execution, not training tracking
- ✅ Mentions Strava integration (complement, not compete)
- ✅ Focuses on "what to do" not "what you did"

**vs. DIY Spreadsheets:**
- ✅ "30 hours → 10 minutes" in Feature 1 (not over-emphasized)
- ✅ "No more nights lost to spreadsheets" directly addresses DIY pain

**vs. Generic Race Plans:**
- ✅ "Personalized for your fitness" (Strava data, 90 days)
- ✅ "Your dietary preferences" (vegan, gluten-free)
- ✅ "Based on your known weak points" (GI issues, blisters)

---

### 4.3 Visual Brand Compliance

**Color Palette:**
- ✅ Trail Canopy (#2C5F4D) - primary (icons, headers)
- ✅ Stone Gray (#4A5859) - body text
- ✅ Summit Light (#C87350) - CTA button
- ✅ White/Light Sandstone - backgrounds
- ✅ Trail Dust (#D4B896) - badge background (secondary variant)

**Typography:**
- ✅ Inter (headers, titles) - font-sans in Tailwind
- ✅ Source Serif 4 (body, descriptions) - font-serif in Tailwind

**Icons:**
- ✅ Lucide-react (already used, consistent with site)
- ✅ Outline style, 2px stroke (brand icon style)

---

## Part 5: Implementation Instructions for Claude Code

### Phase 1 Prompt (Copy + Components)

```
I need you to optimize the Features section at components/features.tsx for Phase 1 (Copy + Components).

Changes to make:

1. **Update features array:**
   - Remove current 7th feature (Strava standalone)
   - Reorder to: Time Savings (#1) → Cutoff (#2) → Crew (#3) → Pacing (#4) → Nutrition (#5) → Contingencies (#6)
   - Update all titles and descriptions per FEATURES_OPTIMIZATION_PROMPT.md section 1.2
   - Add "Custom Tier" badge to Feature #4 (Pacing)

2. **Update icons:**
   - Feature 1: TrendingUp → Clock
   - Feature 2: Clock → Gauge
   - Feature 3: Users (keep)
   - Feature 4: TrendingUp → Mountain
   - Feature 5: Utensils (keep)
   - Feature 6: Wrench (keep)
   - Import: Clock, Gauge, Users, Mountain, Utensils, Wrench from "lucide-react"

3. **Replace components:**
   - Import Card, CardContent, CardHeader from "@/components/ui/card"
   - Import Badge from "@/components/ui/badge"
   - Replace inline card divs with Card component
   - Replace custom badge span with Badge variant="secondary"

4. **Keep existing:**
   - Grid layout (md:grid-cols-2 lg:grid-cols-3)
   - Headline: "Everything You Need to Finish Strong"
   - Subheadline: "No guesswork. No spreadsheets. Just a plan that works."
   - Brand colors (Trail Canopy #2C5F4D, Stone Gray #4A5859)

Test the responsive layout and verify all copy is correct.
```

### Phase 2 Prompt (Conversion Elements)

```
I need you to add conversion elements to the Features section for Phase 2.

Add below the features grid:

1. **Stats Block:**
   - Center-aligned section
   - Text: "Built for ultrarunners | Personalized for your fitness | Generated in minutes"
   - Styling: Stone Gray (#4A5859), text-base, font-sans, py-8
   - Vertical bar separators (|)

2. **CTA Section:**
   - Headline: "Ready to Stop Stressing and Start Planning?"
   - Button: "See Pricing & Plans" (link to /pricing)
   - Button style: Summit Light background (#C87350), white text
   - Subtext: "Essential ($29) or Custom ($99). No subscription. One-time payment per race."
   - Layout: Centered, py-16, white or light sandstone background
   - Import Button from "@/components/ui/button"

Test all links and responsive layout.
```

---

## Part 6: Success Metrics

**How to Measure Success:**

### Engagement Metrics (Track with PostHog when ready)
- **Time on page:** Should increase (more engaging copy)
- **Scroll depth:** Track how many users scroll through all 6 features
- **CTA clicks:** Track clicks on "See Pricing & Plans" button

### Conversion Metrics
- **Pricing page visits:** Should increase from features section
- **Conversion rate:** Features section visitors → purchases
- **Bounce rate:** Should decrease (more relevant copy)

### User Feedback (Beta Testing - Week 5-6)
- **Clarity:** Do users understand what Paceline does?
- **Value:** Do users see the benefit vs. DIY/competitors?
- **Objections:** What questions remain after reading features?

---

## Part 7: Rationale Summary

**Why These Changes Will Improve Conversion:**

1. **Priority Alignment:** Features now ordered by Alex Chen's pain priority (Time > Cutoffs > Crew)
2. **Benefit-Driven:** Titles focus on outcomes ("Never Miss a Cutoff") not features ("Cutoff Management")
3. **Universal Specificity:** Removed "Wasatch" but kept specific mile markers to feel real
4. **Cleaner Layout:** 6 features = perfect 3x2 grid, less overwhelming
5. **Strava Integration:** Shows *how* personalization works (not a separate feature)
6. **Conversion Elements:** Stats and CTA reduce friction to next step
7. **Brand Voice:** Maintained calm expert tone, tactically specific language
8. **Differentiation:** Clear positioning vs. Strava (training), DIY (time), generic plans (personalization)

**Estimated Impact:**
- **Engagement:** 15-20% increase in scroll depth through features
- **Click-through:** 10-15% increase in pricing page visits from features section
- **Clarity:** 80%+ of visitors should understand what Paceline does after reading features

---

## Part 8: Post-Implementation Checklist

### After Phase 1 (Copy + Components)
- [ ] Verify 6 features display in correct order
- [ ] Check all copy matches approved text
- [ ] Verify icons display correctly
- [ ] Test responsive layout (mobile, tablet, desktop)
- [ ] Verify "Custom Tier" badge on Feature #4
- [ ] Check color contrast (WCAG AA)
- [ ] Proofread for typos

### After Phase 2 (Conversion Elements)
- [ ] Verify stats block displays correctly
- [ ] Test "See Pricing & Plans" button link
- [ ] Check CTA section layout and styling
- [ ] Verify button hover states
- [ ] Test on mobile devices

### Before Beta Testing
- [ ] Get feedback from 2-3 people on copy clarity
- [ ] A/B test different headlines if desired
- [ ] Consider adding sample output screenshots to features

### After Beta Testing (Phase 3)
- [ ] Collect 3-5 testimonials
- [ ] Add testimonial section
- [ ] Replace placeholder stats with real data
- [ ] Monitor analytics for conversion impact

---

## Questions or Changes Needed?

**Document Status:** ✅ APPROVED FOR PHASED IMPLEMENTATION

**Phase 1:** Ready to implement (Copy + Components)
**Phase 2:** Ready to implement (Conversion Elements)
**Phase 3:** Wait for beta testing results

**Approved By:** User
**Date:** December 10, 2025

---

## Next Steps

1. ✅ Document approved
2. ⏳ Claude Code implements Phase 1 (Copy + Components)
3. ⏳ User reviews Phase 1 locally
4. ⏳ Claude Code implements Phase 2 (Conversion Elements)
5. ⏳ User tests full Features section
6. ⏳ Deploy to staging for beta testing
7. ⏳ Collect feedback and testimonials
8. ⏳ Implement Phase 3 (Testimonials + real stats)

