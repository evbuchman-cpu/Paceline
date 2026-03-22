# Paceline Landing Page - A/B Testing Backlog

## Purpose
This document captures potential A/B tests for post-MVP optimization. These are **NOT critical for launch**—your current landing page is strong (7-8/10). Use this when you're ready to iterate based on real user data.

---

## When to Start A/B Testing

**Wait until you have**:
- 100+ visitors per week (minimum for statistical significance)
- 10+ conversions per week (to measure impact)
- 2-4 weeks of baseline data (to understand current performance)

**Don't test before MVP launch**. Ship, learn, iterate.

---

## Testing Framework

### How to Prioritize Tests
1. **PIE Score** (Potential × Importance × Ease)
   - Potential: How much lift could this drive? (1-10)
   - Importance: How many users see this element? (1-10)
   - Ease: How easy to implement? (1-10)
   - Score = (P + I + E) / 3

2. **Run one test at a time** (avoid confounding variables)
3. **Minimum 2 weeks per test** (account for weekly traffic patterns)
4. **95% statistical significance required** before declaring winner

---

## Test Backlog (Ordered by PIE Score)

### Test 1: Hero Headline - Value Prop Clarity
**PIE Score**: 8.7 (Potential: 9, Importance: 10, Ease: 7)

**Current (Control)**:
```
"8 Sections. Zero Guesswork.
One Goal: The Finish Line."
```

**Variant A**: Brand tagline + time savings
```
"Stop piecing together advice.
Start executing with confidence.

Get your personalized race plan in 10 minutes—not 30 hours."
```

**Variant B**: Direct pain point addressing
```
"30 Hours of Research → 10 Minutes.
Your Complete Race Plan. Built for YOUR Race."
```

**Hypothesis**: Variant A or B will increase clarity of value prop and boost CTA clicks by 10-15%

**Metrics to track**:
- Hero CTA click rate
- Scroll depth (% who scroll past hero)
- Time on page
- Bounce rate

**Why test this**: Hero is first impression—small lifts here compound through funnel

**Implementation effort**: Low (copy change only)

---

### Test 2: Pricing - Investment Framing
**PIE Score**: 8.3 (Potential: 8, Importance: 10, Ease: 7)

**Current (Control)**: No investment framing (just price + features)

**Variant A**: Add investment anchor above pricing table
```
"You've invested $1,200 in race costs and 350+ hours training.
$99 is 8% of your race budget—to protect 100% of your training."
```

**Variant B**: Add ROI comparison
```
"$99 = Less than a new pair of trail shoes.
Protects 14 months of training and $1,200 in race costs."
```

**Hypothesis**: Investment framing will reduce "is this worth it?" friction and increase Custom tier purchases by 10-20%

**Metrics to track**:
- Pricing section view rate (scroll depth)
- Add to cart rate (Essential vs Custom)
- Checkout completion rate
- Avg order value

**Why test this**: Pricing is THE conversion moment—addressing objections here is critical

**Implementation effort**: Low (add copy above pricing table)

---

### Test 3: Problem/Solution - AI Language
**PIE Score**: 6.7 (Potential: 5, Importance: 9, Ease: 6)

**Current (Control)**:
```
"AI-powered race plan personalized to YOUR fitness.
Built in 10 minutes, not 30 hours."
```

**Variant A**: Data-driven language
```
"Personalized race plan built from YOUR Strava data.
Generated in 10 minutes, not 30 hours."
```

**Variant B**: Remove tech language entirely
```
"Personalized race plan built for YOUR fitness and THIS race.
Generated in 10 minutes, not 30 hours."
```

**Hypothesis**: Variant A will increase trust and reduce skepticism (especially among analytical runners)

**Metrics to track**:
- Time on Problem/Solution section
- Scroll depth past this section
- CTA click rate from this section

**Why test this**: "AI" can trigger skepticism in analytical personas

**Implementation effort**: Low (copy change only)

---

### Test 4: Social Proof - Testimonial Depth
**PIE Score**: 6.3 (Potential: 6, Importance: 7, Ease: 6)

**Current (Control)**: Results-focused testimonials

**Variant A**: Add "before Paceline" context
```
"At my first ultra, I barely made the mile-62 cutoff with 8 minutes to spare.
I swore I'd never cut it that close again.

This time with Paceline, I had 2+ hours of buffer at every station.
The contingency plans saved me when my stomach shut down at mile 50."

— Sarah, Angeles Crest 100K, First-time 100K finisher
```

**Variant B**: Add 4th testimonial (first-time 100-miler)

**Hypothesis**: Variant A will increase emotional resonance and boost trust

**Metrics to track**:
- Scroll depth to testimonials section
- Time spent on testimonials section
- Conversion rate (visitors who view testimonials vs don't)

**Why test this**: Before/after narratives are more compelling than results-only

**Implementation effort**: Medium (need to collect expanded testimonials)

---

### Test 5: CTA Button Copy
**PIE Score**: 6.0 (Potential: 5, Importance: 8, Ease: 5)

**Current (Control)**: "Build Your Race Plan"

**Variant A**: Benefit-driven
```
"Get Your Personalized Plan"
```

**Variant B**: Urgency-driven
```
"Build My Plan in 10 Minutes"
```

**Variant C**: Action-oriented
```
"Start Planning Now"
```

**Hypothesis**: Variant A or B will increase CTA clicks by 5-10%

**Metrics to track**:
- CTA click rate (hero, problem/solution, features, how it works, pricing)
- Heatmap data (where users click)

**Why test this**: CTA copy affects multiple sections

**Implementation effort**: Low (copy change only)

---

### Test 6: Competitive Positioning Copy
**PIE Score**: 5.7 (Potential: 6, Importance: 6, Ease: 5)

**Current (Control)**: No explicit competitive positioning on landing page

**Variant A**: Add to Problem/Solution section
```
"TrainingPeaks gets you to the start line fit.
Paceline gets you to the finish—with pacing, crew logistics, and cutoff management."
```

**Variant B**: Add competitive FAQ
```
Q: "Why Paceline instead of TrainingPeaks or a coach?"
A: "TrainingPeaks builds your fitness. Coaches dial in your training.
Paceline plans your race execution—pacing, crew, drop bags, cutoffs.
Different jobs. Same goal: finish strong."
```

**Hypothesis**: Variant A or B will increase clarity for users familiar with TrainingPeaks/Strava

**Metrics to track**:
- FAQ expansion rate (which questions get clicked)
- Conversion rate (users who view FAQ vs don't)

**Why test this**: 85% of target market uses Strava/TrainingPeaks—need to position as complement

**Implementation effort**: Low (copy addition)

---

### Test 7: Hero Image
**PIE Score**: 5.3 (Potential: 6, Importance: 7, Ease: 3)

**Current (Control)**: Finish line celebration photo

**Variant A**: Mid-race determination (mile 60-80, gritty-authentic)

**Variant B**: Crew coordination scene (aid station, runner + crew)

**Hypothesis**: Variant A will align better with brand identity (calm expert, tactical) and increase scroll depth

**Metrics to track**:
- Scroll depth past hero
- Time on page
- Bounce rate
- Heatmap data (where users look)

**Why test this**: Visual identity should match brand positioning (mid-race > finish line)

**Implementation effort**: High (need new photography or illustration)

---

### Test 8: Features Section - Mini-Testimonials
**PIE Score**: 4.7 (Potential: 5, Importance: 6, Ease: 3)

**Current (Control)**: Feature descriptions only

**Variant A**: Add 1-2 sentence proof per feature
```
Feature: "When Things Go Wrong (And They Will)"
Description: "Exact action plans for blisters, GI issues, falling behind—tailored to what derails you most."

+ Proof: "My stomach shut down at mile 50. The contingency plan told me exactly what to eat,
how to adjust pacing, and when to rally. Finished strong." — Sarah M.
```

**Hypothesis**: Variant A will increase feature credibility and boost conversion

**Metrics to track**:
- Time on features section
- Scroll depth past features
- CTA click rate from features section

**Why test this**: Proof per feature validates claims

**Implementation effort**: Medium (need to collect feature-specific testimonials)

---

### Test 9: Essential Tier Copy
**PIE Score**: 4.3 (Potential: 4, Importance: 6, Ease: 3)

**Current (Control)**: "First Ultra Fundamentals"

**Variant A**: Remove beginner stigma
```
"Essential Race Plan"
(Same features, different positioning)
```

**Variant B**: Positioning for experienced runners
```
"Essential Race Plan — For straightforward courses or when you just need the basics dialed"
```

**Hypothesis**: Variant A or B will increase Essential tier purchases (especially from experienced runners)

**Metrics to track**:
- Essential tier add-to-cart rate
- Essential vs Custom tier ratio
- Time spent on Essential tier card

**Why test this**: Current copy may discourage experienced runners from considering Essential

**Implementation effort**: Low (copy change only)

---

### Test 10: How It Works - Strava Clarity
**PIE Score**: 4.0 (Potential: 3, Importance: 6, Ease: 3)

**Current (Control)**: "No Strava? No problem—we only need what you know."

**Variant A**: Clarify tier requirement
```
"No Strava? No problem—Essential tier ($29) works without it.
Custom tier ($99) uses Strava for max personalization."
```

**Variant B**: Emphasize Strava value
```
"Connect Strava in 1 click for personalized pacing.
Or manually enter your fitness data—your choice."
```

**Hypothesis**: Variant A will reduce confusion about Strava requirement

**Metrics to track**:
- How It Works section engagement
- FAQ clicks (Strava-related questions)
- Drop-off rate at questionnaire (if Strava confusion causes abandonment)

**Why test this**: Current copy conflicts with Custom tier requirement

**Implementation effort**: Low (copy change only)

---

## Test Prioritization Matrix

| Test # | Element | PIE Score | Effort | Priority | Status |
|--------|---------|-----------|--------|----------|--------|
| 1 | Hero Headline | 8.7 | Low | 🔴 HIGH | Backlog |
| 2 | Pricing Investment Framing | 8.3 | Low | 🔴 HIGH | Backlog |
| 3 | AI Language | 6.7 | Low | 🟡 MEDIUM | Backlog |
| 4 | Testimonial Depth | 6.3 | Medium | 🟡 MEDIUM | Backlog |
| 5 | CTA Button Copy | 6.0 | Low | 🟡 MEDIUM | Backlog |
| 6 | Competitive Positioning | 5.7 | Low | 🟡 MEDIUM | Backlog |
| 7 | Hero Image | 5.3 | High | 🟢 LOW | Backlog |
| 8 | Features Mini-Testimonials | 4.7 | Medium | 🟢 LOW | Backlog |
| 9 | Essential Tier Copy | 4.3 | Low | 🟢 LOW | Backlog |
| 10 | How It Works Strava | 4.0 | Low | 🟢 LOW | Backlog |

---

## Testing Tools

**Free/Low-Cost**:
- **Google Optimize** (free, integrates with GA4)
- **VWO** (free trial, then $99/mo for small sites)
- **Splitbee** (simple, affordable)

**Analytics**:
- **Google Analytics 4** (free, event tracking)
- **Hotjar** (heatmaps, session recordings)
- **Microsoft Clarity** (free heatmaps)

**Statistical Significance Calculators**:
- https://www.abtestguide.com/calc/
- https://vwo.com/ab-split-test-significance-calculator/

---

## Post-Test Process

After each test:

1. **Document results**:
   - Winning variant
   - Lift % (conversion rate improvement)
   - Statistical significance
   - Key learnings

2. **Implement winner** (if significant lift)

3. **Share learnings** (internal doc or team meeting)

4. **Archive test data** (for future reference)

5. **Move to next test**

---

## Sample Test Documentation Template

```markdown
## Test #X: [Element Name]

**Date**: [Start] - [End]
**Traffic split**: 50/50
**Sample size**: [Visitors per variant]

**Control**: [Current copy/design]
**Variant A**: [Test copy/design]

**Hypothesis**: [What you expect to happen and why]

**Results**:
- Control conversion rate: X%
- Variant A conversion rate: Y%
- Lift: +Z%
- Statistical significance: [Yes/No, p-value]

**Winner**: [Control / Variant A]

**Learnings**:
- [Key insight 1]
- [Key insight 2]

**Next steps**:
- [ ] Implement winner
- [ ] Document in design system
- [ ] Share with team
```

---

## Final Notes

- **Your current landing page is strong**. Don't let this backlog distract you from launching.
- **Ship MVP first**, gather real user data, then iterate.
- **Not all tests will be winners**. That's okay—learning what doesn't work is valuable.
- **Focus on high PIE score tests first** when you're ready to optimize.
- **Trust your instincts**. You know your brand and users better than anyone.

Good luck with launch! 🚀
