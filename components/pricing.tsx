"use client";
import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import posthog from "posthog-js"

export function Pricing() {
  const router = useRouter();

  const handleCheckout = (productId: string, slug: string) => {
    router.push(`/checkout?product=${encodeURIComponent(productId)}&slug=${encodeURIComponent(slug)}`);
  };

  const ESSENTIAL_TIER = process.env.NEXT_PUBLIC_ESSENTIAL_TIER?.trim();
  const ESSENTIAL_SLUG = process.env.NEXT_PUBLIC_ESSENTIAL_SLUG?.trim();
  const CUSTOM_TIER = process.env.NEXT_PUBLIC_CUSTOM_TIER?.trim();
  const CUSTOM_SLUG = process.env.NEXT_PUBLIC_CUSTOM_SLUG?.trim();
  const ULTRA_BUNDLE_TIER = process.env.NEXT_PUBLIC_ULTRA_BUNDLE_TIER?.trim();
  const ULTRA_BUNDLE_SLUG = process.env.NEXT_PUBLIC_ULTRA_BUNDLE_SLUG?.trim();

  if (!ESSENTIAL_TIER || !ESSENTIAL_SLUG || !CUSTOM_TIER || !CUSTOM_SLUG || !ULTRA_BUNDLE_TIER || !ULTRA_BUNDLE_SLUG) {
    console.error("Missing pricing tier environment variables");
    return null;
  }

  useEffect(() => {
    posthog.capture('training_pricing_viewed', { essential_price: 7, custom_price: 25 })
  }, [])

  return (
    <section id="pricing" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <div className="text-center mb-8">
          <p className="uppercase tracking-widest text-xs font-sans mb-3" style={{ color: "#C87350" }}>
            TRAINING PRICING — BETA
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ color: "#2C5F4D" }}>
            We&apos;re Still in Training. So Are Our Prices.
          </h2>
          <p className="font-serif italic text-base" style={{ color: "#4A5859" }}>
            Early supporters get access at our training-pace prices. When we hit the start line for real, prices go up.
          </p>
        </div>

        {/* Transparency callout */}
        <div
          className="max-w-2xl mx-auto mb-12 rounded-lg px-5 py-4"
          style={{
            backgroundColor: "#F5F1EA",
            borderLeft: "4px solid #2C5F4D",
            borderRadius: "8px",
          }}
        >
          <p className="font-serif text-sm" style={{ color: "#4A5859" }}>
            Full transparency: we&apos;re in training. We&apos;re a small team building something we couldn&apos;t find anywhere else. The product works — runners are using it to plan real races. But we&apos;re still figuring out the right price and what matters most to you. Early access pricing is our way of saying thank you for running with us before the start gun fires.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 max-w-2xl mx-auto">
          {/* Essential Plan */}
          <div className="order-2 md:order-1 p-8 md:p-6 bg-white border-2 border-stone-200 rounded-lg transition-all duration-300 hover:shadow-[0_8px_24px_rgba(44,95,77,0.20)] hover:-translate-y-[3px]">
            <p className="uppercase tracking-wide text-xs font-sans mb-2" style={{ color: "#4A5859" }}>
              FIRST ULTRA FUNDAMENTALS
            </p>
            <span
              className="inline-block rounded-full text-white text-xs px-3 py-1 mb-3 font-sans font-semibold"
              style={{ backgroundColor: "#C87350" }}
            >
              TRAINING PRICE — 75% OFF
            </span>

            <h3 className="font-sans font-semibold text-2xl mb-2" style={{ color: "#2C5F4D" }}>
              Essential
            </h3>

            <div className="mb-1">
              <span className="font-serif text-sm line-through" style={{ color: "#4A5859" }}>$29</span>
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-sans font-bold text-4xl" style={{ color: "#2C5F4D" }}>$7</span>
            </div>
            <p className="font-serif text-sm mb-6" style={{ color: "#4A5859" }}>per race guide</p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm" style={{ color: "#4A5859" }}>Section-by-section pacing strategy (flat terrain baseline)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm" style={{ color: "#4A5859" }}>Aid station cutoff tracker with buffer zones</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm" style={{ color: "#4A5859" }}>Crew timing sheet with predicted arrivals</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm" style={{ color: "#4A5859" }}>Drop bag checklist by station</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm" style={{ color: "#4A5859" }}>Race overview (elevation, weather, course notes)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm" style={{ color: "#4A5859" }}>Nutrition timeline template</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm" style={{ color: "#4A5859" }}>Mental strategy for tough miles</span>
              </li>
            </ul>

            <Button
              className="w-full border-2 border-[#4A5859] text-[#4A5859] bg-transparent hover:bg-[#4A5859] hover:text-white font-semibold transition-colors"
              variant="outline"
              onClick={() => {
                posthog.capture('training_pricing_cta_clicked', { tier: 'essential', beta_price: 7 })
                handleCheckout(ESSENTIAL_TIER!, ESSENTIAL_SLUG!)
              }}
            >
              Start Planning
            </Button>

            <p className="text-xs text-center mt-2" style={{ color: "#4A5859" }}>
              10-minute questionnaire · PDF delivered instantly
            </p>
          </div>

          {/* Custom Plan - Most Popular */}
          <div
            className="order-1 md:order-2 p-8 bg-white rounded-lg relative transition-all duration-300 hover:shadow-[0_12px_32px_rgba(200,115,80,0.25)] hover:-translate-y-[5px] md:scale-105"
            style={{ border: "2px solid #C87350" }}
          >
            <div className="absolute -top-3 right-4">
              <span
                className="inline-block px-2 py-1 text-white text-xs rounded font-sans font-semibold"
                style={{ backgroundColor: "#C87350" }}
              >
                MOST POPULAR
              </span>
            </div>

            <p className="uppercase tracking-wide text-xs font-sans mb-2" style={{ color: "#C87350" }}>
              STRAVA-POWERED RACE STRATEGY
            </p>
            <span
              className="inline-block rounded-full text-white text-xs px-3 py-1 mb-3 font-sans font-semibold"
              style={{ backgroundColor: "#C87350" }}
            >
              TRAINING PRICE — 75% OFF
            </span>

            <h3 className="font-sans font-semibold text-2xl mb-2" style={{ color: "#2C5F4D" }}>
              Custom
            </h3>

            <div className="mb-1">
              <span className="font-serif text-sm line-through" style={{ color: "#4A5859" }}>$99</span>
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-sans font-bold text-4xl" style={{ color: "#2C5F4D" }}>$25</span>
            </div>
            <p className="font-serif text-sm mb-6" style={{ color: "#4A5859" }}>per race guide</p>

            <p className="font-serif text-xs mb-3" style={{ color: "#4A5859", opacity: 0.7 }}>
              Everything in Essential, plus:
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm" style={{ color: "#4A5859" }}>
                  <strong className="font-semibold">Strava-powered pacing</strong> (elevation-adjusted from your actual fitness)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm" style={{ color: "#4A5859" }}>
                  <strong className="font-semibold">Cutoff buffer calculator</strong> (🟢🟡🔴 status at every aid station)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm" style={{ color: "#4A5859" }}>
                  <strong className="font-semibold">Personalized nutrition</strong> (vegan, GF, caffeine-sensitive options)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm" style={{ color: "#4A5859" }}>
                  <strong className="font-semibold">Weather-adjusted drop bag strategy</strong> (race-week forecast integration)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm" style={{ color: "#4A5859" }}>Crew logistics with minute-by-minute predicted arrivals</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm" style={{ color: "#4A5859" }}>Contingency protocols for GI issues, blisters, falling behind</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm" style={{ color: "#4A5859" }}>Mental strategy tailored to your race fears</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm" style={{ color: "#4A5859" }}>All Essential features included</span>
              </li>
            </ul>

            <Button
              className="w-full h-14 text-lg font-semibold text-white shadow-lg transition-colors"
              style={{ backgroundColor: "#C87350" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#a85e2a" }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#C87350" }}
              onClick={() => {
                posthog.capture('training_pricing_cta_clicked', { tier: 'custom', beta_price: 25 })
                handleCheckout(CUSTOM_TIER!, CUSTOM_SLUG!)
              }}
            >
              Build My Custom Plan
            </Button>

            <p className="text-xs text-center mt-2" style={{ color: "#4A5859" }}>
              Connect Strava in 1 click · Guide ready in 5 minutes
            </p>
          </div>

          {/* Ultra Bundle - Hidden for MVP but keeping code for future use */}
          <div className="hidden order-3 p-8 bg-white border-2 border-stone-200 rounded-lg relative transition-all duration-300 hover:shadow-[0_8px_24px_rgba(44,95,77,0.20)] hover:-translate-y-[3px]">
            <div className="absolute -top-3 right-4">
              <span className="inline-block px-3 py-1 bg-[#2C5F4D] text-white font-sans font-semibold text-sm rounded shadow-md">
                BEST VALUE
              </span>
            </div>

            <h3 className="font-sans font-semibold text-2xl text-[#2C5F4D] mb-2">5 Races. One Investment.</h3>
            <p className="font-serif text-sm text-[#4A5859] mb-4">For runners who don&apos;t do just one ultra</p>

            <div className="mb-4">
              <span className="font-sans font-bold text-4xl text-[#2C5F4D]">$497</span>
              <span className="font-serif text-[#4A5859]"> for 5 races</span>
            </div>

            <div className="mb-4 p-3 bg-[#2C5F4D]/5 rounded border border-[#2C5F4D]/20">
              <p className="font-sans font-semibold text-sm text-[#2C5F4D]">
                Save $130 vs buying 5 Custom plans separately
              </p>
            </div>

            <p className="font-serif text-sm text-[#4A5859] mb-6">
              Planning multiple races this year? Get 5 Custom-tier guides for less than the cost of 3. Every guide includes Strava integration, personalized pacing, and cutoff management—plus priority support when race day nerves kick in.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">
                  <strong className="font-semibold">5 Custom-tier race guides</strong> (save $130 vs buying individually)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">
                  <strong className="font-semibold">Plan updates</strong> (1 revision per race if training changes)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">
                  <strong className="font-semibold">Priority support</strong> (24-hour response, race week on-call)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">All Custom features for every race (Strava, cutoffs, nutrition, weather)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Post-race debrief reports (what worked, what to adjust)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">
                  <strong className="font-semibold">Referral bonus</strong> ($20/friend vs $10 on other tiers)
                </span>
              </li>
            </ul>

            <Button
              className="w-full h-14 bg-[#2C5F4D] hover:bg-[#1F4A3A] text-white font-semibold shadow-lg"
              onClick={() => handleCheckout(ULTRA_BUNDLE_TIER!, ULTRA_BUNDLE_SLUG!)}
            >
              Get 5 Races Planned
            </Button>

            <p className="text-xs text-[#4A5859]/60 text-center mt-2">
              Use credits anytime • No expiration
            </p>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-green-600">
              <Check className="w-4 h-4" />
              <span className="font-serif">Multi-race runners save 15+ hours per season</span>
            </div>
          </div>
        </div>

        {/* Beta disclaimer */}
        <p
          className="text-xs italic text-center max-w-lg mx-auto mt-6 mb-12"
          style={{ color: "#4A5859" }}
        >
          Prices will increase when we exit beta. Lock in your training rate now — your guide quality is the same whether you pay $25 or $99.
        </p>

        {/* Money-Back Guarantee */}
        <div className="mt-4 mb-12">
          <div className="max-w-3xl mx-auto p-6 bg-[#F5F1EA] rounded-lg border-2 border-[#2C5F4D] text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="text-3xl">✓</div>
              <h3 className="font-sans font-semibold text-xl text-[#2C5F4D]">
                30-Day Money-Back Guarantee
              </h3>
            </div>
            <p className="font-serif text-[#4A5859] leading-relaxed">
              Not satisfied? We&apos;ll refund you in full. No questions asked.
            </p>
          </div>
        </div>

        {/* Why Not DIY Section */}
        <div className="mt-16 max-w-4xl mx-auto p-8 bg-white border border-stone-200 rounded-lg">
          <h3 className="font-sans font-semibold text-2xl text-[#2C5F4D] mb-6 text-center">
            Why Not Just DIY Your Plan?
          </h3>

          <div className="space-y-4 font-serif text-[#4A5859]">
            <p>You could absolutely build your own race plan. Here&apos;s what that looks like:</p>

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
      </div>
    </section>
  )
}
