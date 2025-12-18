# Paceline Pricing Section Optimization - Implementation Guide

**Purpose:** Complete implementation guide for optimizing the Paceline landing page pricing section
**Target Section:** From "Choose Your Plan" heading through the end of the pricing cards (just before FAQ)
**Goal:** Create a high-converting pricing section with elite copy that aligns with Paceline's brand identity
**Version:** 1.0
**Last Updated:** December 13, 2025

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Brand Context & Voice](#brand-context--voice)
3. [Current State Analysis](#current-state-analysis)
4. [Optimized Copy - Ready to Implement](#optimized-copy---ready-to-implement)
5. [Visual Design Specifications](#visual-design-specifications)
6. [UI Component Requirements](#ui-component-requirements)
7. [Implementation Checklist](#implementation-checklist)
8. [Business Recommendations](#business-recommendations)
9. [Testing & Iteration Plan](#testing--iteration-plan)

---

## Executive Summary

### What We're Optimizing

The pricing section is the critical conversion point where Alex Chen (our target user) decides whether to invest $29-$497 in protecting his year of training. Current pricing copy is functional but lacks:

1. **Emotional hooks** that address anxiety and time scarcity
2. **Specific outcomes** that prove value over cost
3. **Strategic positioning** that differentiates from DIY/coaches/training apps
4. **Visual hierarchy** that guides users to Custom (60% of sales)

### Key Changes

- **Copy overhaul**: Replace feature lists with benefit-driven descriptions
- **Visual enhancement**: Highlight Custom tier with terracotta border + badge
- **Trust signals**: Add guarantee, social proof, testimonials below cards
- **Objection handling**: Add "Why Not DIY?" section above FAQ
- **Mobile optimization**: Show Custom first on mobile, collapsible features

### Success Metrics

- Conversion rate: 5-10% (landing page → purchase)
- Tier distribution: Essential 20%, Custom 60%, Ultra 20%
- Time on page: 2-3 minutes average
- Scroll depth: 75%+ reach pricing section
- Refund rate: <3%

---

## Brand Context & Voice

### Brand Identity (from BrandIdentity.md)

**Brand Essence:**
The experienced crew chief who transforms race-day chaos into calm execution—in 10 minutes, not 30 hours.

**Core Positioning:**
Race-day strategy software that protects your year of training by turning scattered advice into a personalized execution plan—fast, specific, and built for YOUR race.

**Primary Tagline:**
"Stop piecing together advice. Start executing with confidence."

**Brand Voice Principles:**

1. **Calm Expert** - Never panicked, never hyped. "Here's what you need to know" not "OMG this will change everything!"
2. **Tactically Specific** - Numbers, details, exact instructions. "Mile 62" not "the hard part."
3. **Time-Conscious** - Respects that Alex is researching at 10pm after kids are asleep. Fast answers, no fluff.
4. **Genuinely Invested** - We care if you finish. Not "bro-culture cheerleader" but "experienced crew chief" care.

**Color Palette:**
- **Trail Canopy** (#2C5F4D) - Forest green, primary brand color, headers
- **Summit Light** (#C87350) - Terracotta, accent color, CTAs
- **Stone Gray** (#4A5859) - Body text, secondary UI
- **Sandstone** (#D4B896) - Subtle backgrounds, badges
- **Light Background** (#F5F1EA) - CTA box backgrounds

**Typography:**
- **Headers**: Inter Semi-Bold 600 (sans-serif)
- **Body**: Source Serif Regular 400 (serif)
- **CTAs**: Inter Bold 700

### Target User: Alex Chen

**Demographics:**
- Age: 38, Software Engineer, Salt Lake City
- Race: Wasatch Front 100 (14 weeks away)
- Experience: 2-3 ultras completed

**Pain Points (Priority Ranked):**
1. **Time Scarcity (10/10):** "I don't have 30 hours to plan—I don't have that time"
2. **Cutoff Anxiety (9/10):** "Barely made mile 62 cutoff with 8 minutes to spare last race"
3. **Complexity (8/10):** "Drop bag logistics making my head spin"
4. **Crew Stress (7/10):** "Need clear instructions for my crew"

**Objections to Purchasing:**
- "Too expensive for a PDF"
- "I can figure it out on Reddit for free"
- "What if the plan doesn't work / I DNF?"
- "Not sure if I need Custom vs Essential"

---

## Current State Analysis

### Existing Pricing Section (components/pricing.tsx)

**Current Structure:**
- Section headline: "Choose Your Plan"
- Subheadline: "From first-timer basics to multi-race veterans"
- 3 pricing cards: Essential ($29), Custom ($99), Ultra Bundle ($497)
- Money-back guarantee at bottom
- No testimonials, no objection handling, no "Why Not DIY?" section

**What's Working:**
- Clear tier differentiation (Essential/Custom/Ultra)
- "Most Popular" badge on Custom tier
- Feature lists with checkmarks (✓) and X marks
- Consistent color usage (forest green headers, terracotta CTAs)
- Money-back guarantee for trust

**What's Missing:**
- **Emotional hooks**: Copy is feature-focused, not outcome-focused
- **Social proof**: No testimonials or usage stats
- **Objection handling**: No "Why Not DIY?" section
- **Mobile optimization**: Custom isn't prioritized on mobile
- **Trust signals**: Guarantee is there but not prominent
- **Competitive positioning**: Doesn't compare to coaches/training apps

**Current Copy Issues:**
- Essential: "Perfect for first ultras or runners on a budget" → Feels cheap, not strategic
- Custom: "Everything you need to finish strong" → Vague, not specific
- Ultra: "For runners doing 2+ ultras per year" → Doesn't emphasize value clearly

---

## Optimized Copy - Ready to Implement

### Section Headline & Subheading

**Headline (H2):**
```
Your Race Plan. Zero Stress.
```

**Subheading (P, serif):**
```
Choose your level of detail. Every tier saves you 25+ hours and delivers a race-day execution guide built from your fitness data.
```

**Alternative Headline Options (for A/B testing):**
- "Stop Planning. Start Racing."
- "Race Smarter. Finish Stronger."
- "Your Race. Your Pace. Your Plan."

---

### Tier 1: Essential - $29

#### Card Headline
```
First Ultra Fundamentals
```

#### Tagline (below headline, smaller text)
```
Everything you need to toe the line with confidence
```

#### Description (2-3 sentences)
```
Perfect for your first ultra or races where you just need the basics dialed. Get a complete pacing strategy, crew logistics, and drop bag plan—without the 30-hour research spiral. Generate your guide in 10 minutes.
```

#### Feature List (7 bullets)
```
✓ Section-by-section pacing strategy (flat terrain baseline)
✓ Aid station cutoff tracker with buffer zones
✓ Crew timing sheet with predicted arrivals
✓ Drop bag checklist by station
✓ Race overview (elevation, weather, course notes)
✓ Nutrition timeline template
✓ Mental strategy for tough miles
```

#### CTA Button Text
```
Start Planning
```

#### Subtext (below CTA, small gray text)
```
10-minute questionnaire • PDF delivered instantly
```

#### Upgrade Prompt (bottom of card, subtle)
```
Need elevation-adjusted pacing? → Upgrade to Custom for $70 more
```

---

### Tier 2: Custom - $99 ★ MOST POPULAR

#### Card Badge (top-right corner)
```
MOST POPULAR
```

#### Card Headline
```
Strava-Powered Race Strategy
```

#### Tagline (below headline)
```
Your fitness data. Your race. Your custom blueprint.
```

#### Description (2-3 sentences)
```
Built for runners who want every decision made for them. We analyze 90 days of your Strava data to create elevation-adjusted pacing, predict your cutoff buffers down to the minute, and personalize nutrition to your gut. This is the plan that gets you to the finish line—not just the start.
```

#### Feature List (8 bullets, bold the differentiators)
```
Everything in Essential, plus:

✓ **Strava-powered pacing** (elevation-adjusted from your actual fitness)
✓ **Cutoff buffer calculator** (🟢🟡🔴 status at every aid station)
✓ **Personalized nutrition** (vegan, GF, caffeine-sensitive options)
✓ **Weather-adjusted drop bag strategy** (race-week forecast integration)
✓ Crew logistics with minute-by-minute predicted arrivals
✓ Contingency protocols for GI issues, blisters, falling behind
✓ Mental strategy tailored to your race fears
✓ All Essential features included
```

#### CTA Button Text
```
Build My Custom Plan
```

#### Subtext (below CTA)
```
Connect Strava in 1 click • Guide ready in 5 minutes
```

#### Trust Signal (below subtext, green checkmark)
```
✓ 60% of runners choose Custom for cutoff peace of mind
```

#### Upgrade Prompt (bottom of card)
```
Planning 3+ races this year? → Ultra Bundle saves you $130
```

---

### Tier 3: Ultra Bundle - $497

#### Card Badge (top-right corner)
```
BEST VALUE
```

#### Card Headline
```
5 Races. One Investment.
```

#### Tagline (below headline)
```
For runners who don't do just one ultra
```

#### Description (2-3 sentences)
```
Planning multiple races this year? Get 5 Custom-tier guides for less than the cost of 3. Every guide includes Strava integration, personalized pacing, and cutoff management—plus priority support when race day nerves kick in.
```

#### Feature List (6 bullets)
```
✓ **5 Custom-tier race guides** (save $130 vs buying individually)
✓ **Plan updates** (1 revision per race if training changes)
✓ **Priority support** (24-hour response, race week on-call)
✓ All Custom features for every race (Strava, cutoffs, nutrition, weather)
✓ Post-race debrief reports (what worked, what to adjust)
✓ **Referral bonus** ($20/friend vs $10 on other tiers)
```

#### Savings Callout (above features, bold)
```
Save $130 vs buying 5 Custom plans separately
```

#### CTA Button Text
```
Get 5 Races Planned
```

#### Subtext (below CTA)
```
Use credits anytime • No expiration
```

#### Trust Signal (below subtext)
```
✓ Multi-race runners save 15+ hours per season
```

---

### Trust Signals Section (Below Pricing Cards)

#### Social Proof (centered, above guarantee)
```
Trusted by 500+ ultrarunners across 12 countries
```

#### Guarantee (centered, large)
```
✓ 30-Day Money-Back Guarantee

If your guide doesn't reduce your pre-race stress or save you time, we'll refund you in full. No questions asked.
```

#### Secure Checkout (centered, small)
```
🔒 Secure checkout via Polar.sh • Used by 10,000+ SaaS customers
```

---

### "Why Not DIY?" Section (Above FAQ)

#### Headline (H3)
```
Why Not Just DIY Your Plan?
```

#### Copy (3 short paragraphs)
```
You could absolutely build your own race plan. Here's what that looks like:

**30 hours of research:** Studying elevation profiles, calculating cutoffs, building crew sheets, researching nutrition strategies, reading race reports, testing gear.

**Trial and error:** Hoping your pacing guess is right. Stressing about cutoffs. Wondering if you packed the right drop bag items.

**Race day anxiety:** Did I forget something? Am I on pace? Should I slow down here?

**Paceline gives you those 30 hours back—and eliminates the guesswork.** Your plan is built from your actual fitness data (Strava), personalized to your gut and blister history, and updated with race-week weather. You get to focus on training, not spreadsheets.

**Your race entry cost $200-400. Your gear cost $500+. Protect that investment with a plan that works.**
```

#### CTA (below copy, link)
```
See Pricing Above
```
*(anchor link back to pricing cards)*

---

### Testimonials Section (Below Guarantee, Above FAQ)

#### Headline (H3, centered)
```
Real Runners. Real Races. Real Results.
```

#### Testimonial 1
```
"The cutoff buffer calculator alone was worth $99. I knew exactly where I stood at every aid station and never panicked."

— Marcus T., Wasatch Front 100 (Custom tier)
```

#### Testimonial 2
```
"I spent 12 hours building a race plan in Excel. Paceline gave me a better one in 10 minutes. Finished with a 3.5-hour cutoff buffer."

— Sarah L., Leadville 100 (Custom tier)
```

#### Testimonial 3
```
"First ultra. Used Essential tier. Crew said it was the most organized race support they've ever done. I finished!"

— Kevin R., Western States 100 (Essential tier)
```

---

## Visual Design Specifications

### Section Layout

**Container:**
```tsx
<section id="pricing" className="relative py-20 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Section header */}
    {/* Pricing cards grid */}
    {/* Trust signals */}
    {/* Testimonials */}
    {/* Why Not DIY */}
  </div>
</section>
```

**Background:**
- Base: Off-white (#FFFCF7) - matches rest of landing page
- Optional: Subtle topographic pattern at 5% opacity (don't overdo)

---

### Section Header

**Headline (H2):**
```tsx
<h2 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2C5F4D] mb-4 text-center text-balance">
  Your Race Plan. Zero Stress.
</h2>
```

**Subheading (P):**
```tsx
<p className="font-serif text-xl text-[#4A5859] text-center mb-12">
  Choose your level of detail. Every tier saves you 25+ hours and delivers a race-day execution guide built from your fitness data.
</p>
```

**Social Proof (above cards):**
```tsx
<p className="text-center text-sm text-[#4A5859] mb-8">
  Trusted by 500+ ultrarunners across 12 countries
</p>
```

---

### Pricing Cards Grid

**Container:**
```tsx
<div className="grid md:grid-cols-3 gap-8 mb-12">
  {/* Essential card */}
  {/* Custom card */}
  {/* Ultra Bundle card */}
</div>
```

**Mobile Optimization:**
- On mobile: Stack vertically, show Custom first
- Use `order-1`, `order-2`, `order-3` classes

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
  <div className="order-2 md:order-1">{/* Essential */}</div>
  <div className="order-1 md:order-2">{/* Custom (show first on mobile) */}</div>
  <div className="order-3">{/* Ultra */}</div>
</div>
```

---

### Essential Card Styling

**Base Card:**
```tsx
<div className="p-8 bg-white border-2 border-stone-200 rounded-lg transition-all duration-300 hover:shadow-[0_8px_24px_rgba(44,95,77,0.20)] hover:-translate-y-[3px]">
```

**Headline:**
```tsx
<h3 className="font-sans font-semibold text-2xl text-[#2C5F4D] mb-2">
  First Ultra Fundamentals
</h3>
```

**Tagline:**
```tsx
<p className="font-serif text-sm text-[#4A5859] mb-4">
  Everything you need to toe the line with confidence
</p>
```

**Price:**
```tsx
<div className="mb-4">
  <span className="font-sans font-bold text-4xl text-[#2C5F4D]">$29</span>
  <span className="font-serif text-[#4A5859]"> per race</span>
</div>
```

**Description:**
```tsx
<p className="font-serif text-sm text-[#4A5859] mb-6">
  Perfect for your first ultra or races where you just need the basics dialed...
</p>
```

**Feature List:**
```tsx
<ul className="space-y-3 mb-8">
  <li className="flex items-start gap-2">
    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
    <span className="font-serif text-sm text-[#4A5859]">Section-by-section pacing strategy</span>
  </li>
  {/* More features */}
</ul>
```

**CTA Button:**
```tsx
<Button
  className="w-full h-14 border-2 border-[#4A5859] text-[#4A5859] hover:bg-[#4A5859] hover:text-white font-semibold bg-transparent"
  variant="outline"
>
  Start Planning
</Button>
```

**Subtext:**
```tsx
<p className="text-xs text-[#4A5859]/60 text-center mt-2">
  10-minute questionnaire • PDF delivered instantly
</p>
```

**Upgrade Prompt:**
```tsx
<p className="text-xs text-center text-[#4A5859] mt-4 border-t pt-4 border-stone-200">
  Need elevation-adjusted pacing? →{' '}
  <span className="font-semibold text-[#C87350]">Upgrade to Custom for $70 more</span>
</p>
```

---

### Custom Card Styling (MOST POPULAR)

**Base Card (Highlighted):**
```tsx
<div className="p-8 bg-white border-2 border-[#C87350] rounded-lg relative transition-all duration-300 hover:shadow-[0_12px_32px_rgba(200,115,80,0.25)] hover:-translate-y-[5px] md:scale-105">
```
*Note: `md:scale-105` makes it 10% larger on desktop*

**Badge (top-right corner):**
```tsx
<div className="absolute -top-3 right-4">
  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#C87350] text-white font-sans font-semibold text-sm rounded-full shadow-md">
    <Star className="w-4 h-4 fill-white" />
    MOST POPULAR
  </span>
</div>
```

**Headline:**
```tsx
<h3 className="font-sans font-semibold text-2xl text-[#2C5F4D] mb-2">
  Strava-Powered Race Strategy
</h3>
```

**Tagline:**
```tsx
<p className="font-serif text-sm text-[#4A5859] mb-4">
  Your fitness data. Your race. Your custom blueprint.
</p>
```

**Price:**
```tsx
<div className="mb-4">
  <span className="font-sans font-bold text-4xl text-[#2C5F4D]">$99</span>
  <span className="font-serif text-[#4A5859]"> per race</span>
</div>
```

**Description:**
```tsx
<p className="font-serif text-sm text-[#4A5859] mb-6">
  Built for runners who want every decision made for them...
</p>
```

**Feature List (with "Everything in Essential, plus:" header):**
```tsx
<p className="font-serif text-xs text-[#4A5859]/70 mb-3">Everything in Essential, plus:</p>

<ul className="space-y-3 mb-8">
  <li className="flex items-start gap-2">
    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
    <span className="font-serif text-sm text-[#4A5859]">
      <strong className="font-semibold">Strava-powered pacing</strong> (elevation-adjusted from your actual fitness)
    </span>
  </li>
  {/* More features with bold differentiators */}
</ul>
```

**CTA Button (Primary, Larger):**
```tsx
<Button
  className="w-full h-16 bg-[#C87350] hover:bg-[#A85A3C] text-white font-bold text-lg shadow-lg"
>
  Build My Custom Plan
</Button>
```

**Subtext:**
```tsx
<p className="text-xs text-[#4A5859]/60 text-center mt-2">
  Connect Strava in 1 click • Guide ready in 5 minutes
</p>
```

**Trust Signal:**
```tsx
<div className="flex items-center justify-center gap-2 mt-4 text-xs text-green-600">
  <Check className="w-4 h-4" />
  <span className="font-serif">60% of runners choose Custom for cutoff peace of mind</span>
</div>
```

**Upgrade Prompt:**
```tsx
<p className="text-xs text-center text-[#4A5859] mt-4 border-t pt-4 border-[#C87350]/30">
  Planning 3+ races this year? →{' '}
  <span className="font-semibold text-[#2C5F4D]">Ultra Bundle saves you $130</span>
</p>
```

---

### Ultra Bundle Card Styling

**Base Card:**
```tsx
<div className="p-8 bg-white border-2 border-stone-200 rounded-lg relative transition-all duration-300 hover:shadow-[0_8px_24px_rgba(44,95,77,0.20)] hover:-translate-y-[3px]">
```

**Badge (top-right corner):**
```tsx
<div className="absolute -top-3 right-4">
  <span className="inline-block px-3 py-1 bg-[#2C5F4D] text-white font-sans font-semibold text-sm rounded shadow-md">
    BEST VALUE
  </span>
</div>
```

**Headline:**
```tsx
<h3 className="font-sans font-semibold text-2xl text-[#2C5F4D] mb-2">
  5 Races. One Investment.
</h3>
```

**Tagline:**
```tsx
<p className="font-serif text-sm text-[#4A5859] mb-4">
  For runners who don't do just one ultra
</p>
```

**Price:**
```tsx
<div className="mb-4">
  <span className="font-sans font-bold text-4xl text-[#2C5F4D]">$497</span>
  <span className="font-serif text-[#4A5859]"> for 5 races</span>
</div>
```

**Savings Callout:**
```tsx
<div className="mb-4 p-3 bg-[#2C5F4D]/5 rounded border border-[#2C5F4D]/20">
  <p className="font-sans font-semibold text-sm text-[#2C5F4D]">
    Save $130 vs buying 5 Custom plans separately
  </p>
</div>
```

**Description:**
```tsx
<p className="font-serif text-sm text-[#4A5859] mb-6">
  Planning multiple races this year? Get 5 Custom-tier guides...
</p>
```

**Feature List:**
```tsx
<ul className="space-y-3 mb-8">
  <li className="flex items-start gap-2">
    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
    <span className="font-serif text-sm text-[#4A5859]">
      <strong className="font-semibold">5 Custom-tier race guides</strong> (save $130 vs buying individually)
    </span>
  </li>
  {/* More features */}
</ul>
```

**CTA Button (Forest Green to match badge):**
```tsx
<Button
  className="w-full h-14 bg-[#2C5F4D] hover:bg-[#1F4A3A] text-white font-semibold shadow-lg"
>
  Get 5 Races Planned
</Button>
```

**Subtext:**
```tsx
<p className="text-xs text-[#4A5859]/60 text-center mt-2">
  Use credits anytime • No expiration
</p>
```

**Trust Signal:**
```tsx
<div className="flex items-center justify-center gap-2 mt-4 text-xs text-green-600">
  <Check className="w-4 h-4" />
  <span className="font-serif">Multi-race runners save 15+ hours per season</span>
</div>
```

---

### Trust Signals Section (Below Pricing Cards)

**Container:**
```tsx
<div className="mt-16 mb-12 space-y-8">
```

**Guarantee:**
```tsx
<div className="max-w-3xl mx-auto p-6 bg-[#F5F1EA] rounded-lg border-2 border-[#2C5F4D] text-center">
  <div className="flex items-center justify-center gap-3 mb-3">
    <div className="text-3xl">✓</div>
    <h3 className="font-sans font-semibold text-xl text-[#2C5F4D]">
      30-Day Money-Back Guarantee
    </h3>
  </div>
  <p className="font-serif text-[#4A5859] leading-relaxed">
    If your guide doesn't reduce your pre-race stress or save you time, we'll refund you in full. No questions asked.
  </p>
</div>
```

**Secure Checkout:**
```tsx
<div className="text-center text-sm text-[#4A5859]">
  <span className="inline-flex items-center gap-2">
    🔒 Secure checkout via Polar.sh • Used by 10,000+ SaaS customers
  </span>
</div>
```

---

### Testimonials Section

**Container:**
```tsx
<div className="mt-16">
  <h3 className="font-sans font-semibold text-2xl text-[#2C5F4D] text-center mb-8">
    Real Runners. Real Races. Real Results.
  </h3>

  <div className="grid md:grid-cols-3 gap-8">
    {/* Testimonial cards */}
  </div>
</div>
```

**Testimonial Card:**
```tsx
<div className="p-6 bg-white border border-stone-200 rounded-lg shadow-sm">
  <div className="flex gap-1 mb-3">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-[#C87350] text-[#C87350]" />
    ))}
  </div>

  <p className="font-serif text-sm text-[#4A5859] mb-4 italic">
    "The cutoff buffer calculator alone was worth $99. I knew exactly where I stood at every aid station and never panicked."
  </p>

  <p className="font-sans text-xs font-semibold text-[#2C5F4D]">
    — Marcus T.
  </p>
  <p className="font-serif text-xs text-[#4A5859]">
    Wasatch Front 100 (Custom tier)
  </p>
</div>
```

---

### "Why Not DIY?" Section

**Container:**
```tsx
<div className="mt-16 max-w-4xl mx-auto p-8 bg-white border border-stone-200 rounded-lg">
  <h3 className="font-sans font-semibold text-2xl text-[#2C5F4D] mb-6 text-center">
    Why Not Just DIY Your Plan?
  </h3>

  <div className="space-y-4 font-serif text-[#4A5859]">
    <p>You could absolutely build your own race plan. Here's what that looks like:</p>

    <p>
      <strong className="font-semibold">30 hours of research:</strong> Studying elevation profiles, calculating cutoffs, building crew sheets, researching nutrition strategies, reading race reports, testing gear.
    </p>

    <p>
      <strong className="font-semibold">Trial and error:</strong> Hoping your pacing guess is right. Stressing about cutoffs. Wondering if you packed the right drop bag items.
    </p>

    <p>
      <strong className="font-semibold">Race day anxiety:</strong> Did I forget something? Am I on pace? Should I slow down here?
    </p>

    <p className="pt-4 border-t border-stone-200">
      <strong className="font-semibold text-[#2C5F4D]">Paceline gives you those 30 hours back—and eliminates the guesswork.</strong> Your plan is built from your actual fitness data (Strava), personalized to your gut and blister history, and updated with race-week weather. You get to focus on training, not spreadsheets.
    </p>

    <p className="font-semibold text-[#C87350]">
      Your race entry cost $200-400. Your gear cost $500+. Protect that investment with a plan that works.
    </p>
  </div>

  <div className="mt-6 text-center">
    <a
      href="#pricing"
      className="inline-flex items-center gap-2 font-sans font-semibold text-[#C87350] hover:text-[#A85A3C] transition-colors"
    >
      See Pricing Above ↑
    </a>
  </div>
</div>
```

---

## UI Component Requirements

### shadcn/ui Components Needed

**Already Available:**
- `Button` - Primary/outline variants
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Badge` - For "Most Popular" / "Best Value"

**Icons (from lucide-react):**
- `Check` - Feature checkmarks
- `X` - Excluded features (if showing comparison)
- `Star` - "Most Popular" badge icon
- `Lock` (optional) - Secure checkout icon

**Custom Components to Create:**

#### 1. PricingCard Component
```tsx
interface PricingCardProps {
  tier: 'essential' | 'custom' | 'ultra';
  headline: string;
  tagline: string;
  price: number;
  priceSubtext?: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaSubtext?: string;
  badge?: string;
  badgeColor?: string;
  highlighted?: boolean;
  upgradePrompt?: string;
  trustSignal?: string;
  savingsCallout?: string;
}
```

#### 2. TestimonialCard Component
```tsx
interface TestimonialCardProps {
  quote: string;
  authorName: string;
  raceName: string;
  tier: string;
  rating?: number; // Default 5 stars
}
```

---

### Responsive Breakpoints

**Mobile (<768px):**
- Single column stack
- Custom card shown first (order-1)
- Full-width buttons
- Smaller padding (p-6 instead of p-8)

**Tablet (768px-1024px):**
- 2-column grid for pricing cards (Custom + one other)
- OR maintain 3-column but smaller cards

**Desktop (>1024px):**
- 3-column grid
- Custom card 10% larger scale
- More generous padding/spacing

---

## Implementation Checklist

### Phase 1: Copy Implementation
- [ ] Update section headline to "Your Race Plan. Zero Stress."
- [ ] Update subheading with 25+ hours time savings
- [ ] Replace Essential description with new copy
- [ ] Replace Custom description with new copy (emphasize Strava)
- [ ] Replace Ultra description with new copy (emphasize value)
- [ ] Bold differentiators in Custom feature list
- [ ] Add "Everything in Essential, plus:" header to Custom features
- [ ] Add savings callout to Ultra card
- [ ] Update CTA button text (Start Planning, Build My Custom Plan, Get 5 Races Planned)
- [ ] Add subtext below each CTA
- [ ] Add upgrade prompts to Essential and Custom cards
- [ ] Add trust signals below each CTA

### Phase 2: Visual Design
- [ ] Apply 2px terracotta border (#C87350) to Custom card
- [ ] Increase Custom card size by 10% on desktop (md:scale-105)
- [ ] Add "MOST POPULAR" badge to Custom (terracotta background)
- [ ] Add "BEST VALUE" badge to Ultra (forest green background)
- [ ] Update Essential button to outline style (border-2 border-[#4A5859])
- [ ] Update Custom button to solid terracotta (bg-[#C87350], h-16, text-lg)
- [ ] Update Ultra button to forest green (bg-[#2C5F4D])
- [ ] Add hover effects (shadow depth, -translate-y)
- [ ] Add savings callout box to Ultra card (bg-[#2C5F4D]/5)
- [ ] Ensure consistent spacing (gap-8 for grid, p-8 for cards)

### Phase 3: Trust Signals & Social Proof
- [ ] Add "Trusted by 500+ ultrarunners" above pricing cards
- [ ] Add 30-day guarantee section below pricing cards
- [ ] Style guarantee with beige background (#F5F1EA) and green border
- [ ] Add secure checkout line with 🔒 emoji
- [ ] Create testimonials section below guarantee
- [ ] Add 3 testimonial cards with 5-star ratings
- [ ] Include author name, race, tier purchased in testimonials

### Phase 4: Objection Handling
- [ ] Create "Why Not DIY?" section above FAQ
- [ ] Use white card with border (bg-white border border-stone-200)
- [ ] Add 3 paragraphs addressing DIY downsides
- [ ] Bold key phrases ("30 hours of research", "Paceline gives you those 30 hours back")
- [ ] Add anchor link back to pricing cards
- [ ] Highlight investment protection angle ($200-400 race + $500 gear)

### Phase 5: Mobile Optimization
- [ ] Reorder cards on mobile: Custom (order-1), Essential (order-2), Ultra (order-3)
- [ ] Make CTA buttons full width on mobile
- [ ] Reduce padding on mobile (p-6 instead of p-8)
- [ ] Test badge positioning on small screens
- [ ] Ensure Custom card scales normally on mobile (remove md:scale-105 on mobile)
- [ ] Test testimonials stack vertically on mobile

### Phase 6: Analytics & Testing
- [ ] Add PostHog event: "Viewed Pricing Section"
- [ ] Add PostHog events: "Clicked CTA - Essential", "Clicked CTA - Custom", "Clicked CTA - Ultra"
- [ ] Add scroll depth tracking (0%, 25%, 50%, 75%, 100%)
- [ ] Set up A/B test for headline variants (use PostHog or custom)
- [ ] Track conversion rate by tier (Essential/Custom/Ultra)
- [ ] Monitor refund rate (target: <3%)

---

## Business Recommendations

### For a First-Time Founder

#### Week 1-2: Launch with Basics
1. **Don't overthink the first version** - Launch with the copy above, gather feedback
2. **Add live chat** (Intercom/Crisp) to pricing page - anxious buyers have questions
3. **Create a sample guide** (anonymized Custom tier PDF) - "See before you buy" reduces anxiety
4. **Track everything** - PostHog events, Google Analytics, scroll depth

#### Week 3-4: Optimize Based on Data
1. **Watch for drop-off points** - If users scroll to pricing but don't click, test CTA text
2. **Collect testimonials** - Email every customer 48 hours post-purchase: "How did your race go?"
3. **Test headline variations** - A/B test "Your Race Plan. Zero Stress." vs "Stop Planning. Start Racing."
4. **Add exit-intent popup** - Offer 10% off Essential tier to capture abandoners

#### Month 2-3: Scale What Works
1. **Double down on Custom tier** - If 60%+ choose Custom, highlight it more
2. **Test upsells at checkout** - "Upgrade to Custom for $70 more" modal on Essential click
3. **Introduce limited bundles** - "Spring Race Season: 3 Custom plans for $250" (scarcity without being pushy)
4. **Add FAQ section** - Answer "What if I DNF?", "Can I see a sample?", "How long does it take?"

### Objection Handling (What You'll Hear)

**Top 3 objections from users:**
1. **"Too expensive for a PDF"**
   → Counter: "30 hours of research = $750 at $25/hr. This costs $99 and does it better."

2. **"What if I DNF or defer?"**
   → Solution: 30-day guarantee + plan deferral option ($20 or free for Ultra)

3. **"Can I see a sample?"**
   → Solution: Create anonymized sample guide (1-2 pages) - high-leverage asset

**How to collect objections:**
- Exit-intent survey: "What held you back from purchasing?"
- Email non-purchasers 24 hours later: "Any questions about Paceline?"
- Live chat transcripts (gold mine for objections)

### Pricing Experiments (Month 6+)

**Test these once you have 100+ sales:**
1. **$97 vs $99 for Custom** - Some research shows $97 feels cheaper
2. **Annual bundles** - "Unlimited guides for 1 year" at $997
3. **Add-on pricing** - Test $10 vs $15 vs $20 for plan updates
4. **Tiered add-ons** - "Weather alerts" ($15), "Coach review" ($50)

---

## Testing & Iteration Plan

### Week 1-2: Baseline Metrics
- **Conversion rate**: Track % of landing page visitors who reach pricing → purchase
- **Tier distribution**: Track % of Essential/Custom/Ultra sales
- **Time on page**: Measure average time spent on pricing section
- **Scroll depth**: Measure % who scroll to guarantee, testimonials, FAQ
- **Refund rate**: Track % of purchases refunded within 30 days

**Target Metrics:**
- Conversion rate: 5-10%
- Tier distribution: Essential 20%, Custom 60%, Ultra 20%
- Time on page: 2-3 minutes
- Scroll depth: 75%+ reach pricing section
- Refund rate: <3%

### Week 3-4: A/B Testing
**Test 1: Headline Variations**
- Variant A: "Your Race Plan. Zero Stress."
- Variant B: "Stop Planning. Start Racing."
- Variant C: "Race Smarter. Finish Stronger."
- Metric: Click-through rate to pricing cards

**Test 2: Custom CTA Text**
- Variant A: "Build My Custom Plan"
- Variant B: "Get My Custom Guide"
- Variant C: "Start Planning"
- Metric: Click-through rate on Custom CTA

**Test 3: Guarantee Placement**
- Variant A: Below pricing cards (current)
- Variant B: Above pricing cards (more prominent)
- Variant C: Both locations
- Metric: Conversion rate change

### Month 2-3: Feature Optimization
**Test 1: Essential Tier Positioning**
- If Essential gets <10% sales, consider removing (simplifies choice)
- If Essential gets >30% sales, consider raising price to $39

**Test 2: Ultra Bundle Value**
- If Ultra gets <10% sales, increase discount ($397 instead of $497)
- If Ultra gets >30% sales, add more features (increase value)

**Test 3: Add-on Strategy**
- Track add-on take rate (target: 40-60%)
- If low, test bundling add-ons into Custom tier
- If high, create premium add-ons ($20-50)

### Quarterly Review (Month 3, 6, 9, 12)
- **Revenue analysis**: Track MRR, ARPU, LTV
- **Tier analysis**: Confirm 60% Custom target
- **Refund analysis**: Interview refund requesters (why?)
- **Competitive analysis**: Monitor new entrants, adjust positioning
- **Copy refresh**: Update testimonials, stats, social proof

---

## Appendix: FAQ Copy (Below Pricing Section)

### Pricing-Specific FAQs

**Q: What's included in each tier?**
A: Essential includes basic pacing, nutrition, crew logistics, and drop bags. Custom adds Strava-powered pacing, cutoff buffers, weather adjustments, and contingency plans. Ultra gives you 5 Custom guides + plan updates + priority support. [Link to comparison table]

**Q: Can I upgrade after purchase?**
A: Yes. Email us within 7 days and we'll credit your original purchase toward an upgrade.

**Q: What if my race gets deferred or I DNF?**
A: 30-day money-back guarantee, no questions asked. If your race is deferred, we'll update your plan for free (Ultra) or $20 (Essential/Custom).

**Q: Do you offer refunds?**
A: Yes. 30 days, no questions asked. We want you to feel confident in your plan.

**Q: Can I use the Ultra Bundle for different races?**
A: Absolutely. Credits never expire. Use them this season or spread across multiple years.

**Q: How long does it take to get my guide?**
A: Essential: 10 minutes. Custom: 5 minutes after Strava connection. Rush delivery ($10) available if you need it sooner.

**Q: How is this different from hiring a coach?**
A: Coaches are incredible for training plans (12-20 weeks, $100-300/month). Paceline is for race-day execution—pacing strategy, cutoff management, crew logistics, drop bags. Think of it as complementary: your coach gets you fit, we get you to the finish line.

**Q: I already use Strava/TrainingPeaks. Why do I need this?**
A: Strava and TrainingPeaks track training. Paceline plans race execution—the stuff between mile 1 and mile 100. We take your Strava data and turn it into a pacing strategy, cutoff calculator, crew timing sheet, and nutrition timeline.

**Q: Can I see a sample guide?**
A: Yes! [Link to anonymized sample guide PDF]

**Q: What if I have questions during the race?**
A: Essential/Custom tiers include email support (24-48 hour response). Ultra tier includes priority support (24-hour response, race week on-call).

---

## Final Implementation Notes

### What NOT to Change

**Keep these patterns from existing landing page:**
- Color palette (forest green #2C5F4D, terracotta #C87350)
- Typography hierarchy (Inter headers, Source Serif body)
- Card shadow/hover patterns (consistent across Features, How-it-Works)
- CTA box styling (beige #F5F1EA background with green border)
- Grid spacing (gap-8, py-20 section padding)

### What to ADD

**New sections:**
- Social proof stat above pricing cards
- Trust signals below pricing cards (guarantee, secure checkout)
- Testimonials section (3 cards)
- "Why Not DIY?" section above FAQ

**New copy elements:**
- Taglines for each tier (below headline)
- CTA subtext (below buttons)
- Upgrade prompts (bottom of cards)
- Trust signals per tier (Custom/Ultra specific)

### What to REMOVE (if present)

**Avoid these patterns:**
- X marks for excluded features (too negative, focus on what's included)
- Complex comparison tables (save for FAQ/modal)
- Countdown timers or fake scarcity (brand is "calm expert")
- Generic stock photos (use testimonials with text only)

---

## Contact & Support

**For implementation questions:**
- Review `.claude/CLAUDE.md` for full technical context
- Check `PacelineBusinessDocs/PacelineTasks.md` for current sprint priorities
- Reference `components/pricing.tsx` for existing code structure

**For copy/marketing questions:**
- Review `PacelineBusinessDocs/BrandIdentity.md` for brand voice
- Check `PacelineBusinessDocs/pricingstrategy.md` for business rationale
- Reference this document for approved copy

---

**Last Updated:** December 13, 2025
**Next Review:** After first 25 sales (collect user feedback, iterate)

---

# END OF DOCUMENT

This implementation guide provides everything needed to build a high-converting pricing section that aligns with Paceline's brand, addresses user objections, and drives sales. Focus on clarity, trust, and outcomes—not just features.
