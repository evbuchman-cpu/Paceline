"use client";
import { Check, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function Pricing() {
  const router = useRouter();

  const handleCheckout = async (productId: string, slug: string) => {
    try {
      const session = await authClient.getSession();

      if (!session.data?.user) {
        router.push("/sign-in");
        return;
      }

      await authClient.checkout({
        products: [productId],
        slug: slug,
      });
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Oops, something went wrong");
    }
  };

  const ESSENTIAL_TIER = process.env.NEXT_PUBLIC_ESSENTIAL_TIER;
  const ESSENTIAL_SLUG = process.env.NEXT_PUBLIC_ESSENTIAL_SLUG;
  const CUSTOM_TIER = process.env.NEXT_PUBLIC_CUSTOM_TIER;
  const CUSTOM_SLUG = process.env.NEXT_PUBLIC_CUSTOM_SLUG;
  const ULTRA_BUNDLE_TIER = process.env.NEXT_PUBLIC_ULTRA_BUNDLE_TIER;
  const ULTRA_BUNDLE_SLUG = process.env.NEXT_PUBLIC_ULTRA_BUNDLE_SLUG;

  if (!ESSENTIAL_TIER || !ESSENTIAL_SLUG || !CUSTOM_TIER || !CUSTOM_SLUG || !ULTRA_BUNDLE_TIER || !ULTRA_BUNDLE_SLUG) {
    console.error("Missing pricing tier environment variables");
    return null;
  }

  return (
    <section id="pricing" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2C5F4D] mb-4 text-balance">
            Your Race Plan. Zero Stress.
          </h2>
          <p className="font-serif text-xl text-[#4A5859]">
            Choose your level of detail. Every tier saves you 25+ hours of race planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {/* Essential Plan */}
          <div className="order-2 md:order-1 p-8 md:p-6 bg-white border-2 border-stone-200 rounded-lg transition-all duration-300 hover:shadow-[0_8px_24px_rgba(44,95,77,0.20)] hover:-translate-y-[3px]">
            <h3 className="font-sans font-semibold text-2xl text-[#2C5F4D] mb-2">First Ultra Fundamentals</h3>
            <p className="font-serif text-sm text-[#4A5859] mb-4">Everything you need to toe the line with confidence</p>

            <div className="mb-4">
              <span className="font-sans font-bold text-4xl text-[#2C5F4D]">$29</span>
              <span className="font-serif text-[#4A5859]"> per race</span>
            </div>

            <p className="font-serif text-sm text-[#4A5859] mb-6">
              Perfect for your first ultra or races where you just need the basics dialed. Get a complete pacing strategy, crew logistics, and drop bag plan—without the 30-hour research spiral. Generate your guide in 10 minutes.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Section-by-section pacing strategy (flat terrain baseline)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Aid station cutoff tracker with buffer zones</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Crew timing sheet with predicted arrivals</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Drop bag checklist by station</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Race overview (elevation, weather, course notes)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Nutrition timeline template</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Mental strategy for tough miles</span>
              </li>
            </ul>

            <Button
              className="w-full h-14 border-2 border-[#2C5F4D] text-[#2C5F4D] hover:bg-[#2C5F4D] hover:text-white font-semibold bg-transparent"
              variant="outline"
              onClick={() => handleCheckout(ESSENTIAL_TIER!, ESSENTIAL_SLUG!)}
            >
              Start Planning
            </Button>

            <p className="text-xs text-[#4A5859]/60 text-center mt-2">
              10-minute questionnaire • PDF delivered instantly
            </p>

            <p className="text-xs text-center text-[#4A5859] mt-4 pt-4 border-t border-stone-200">
              Need elevation-adjusted pacing? →{' '}
              <span className="font-semibold text-[#C87350]">Upgrade to Custom for $70 more</span>
            </p>
          </div>

          {/* Custom Plan - Most Popular */}
          <div className="order-1 md:order-2 p-8 bg-white border-2 border-[#C87350] rounded-lg relative transition-all duration-300 hover:shadow-[0_12px_32px_rgba(200,115,80,0.25)] hover:-translate-y-[5px] md:scale-105">
            <div className="absolute -top-3 right-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#C87350] text-white font-sans font-semibold text-sm rounded-full shadow-md">
                <Star className="w-4 h-4 fill-white" />
                MOST POPULAR
              </span>
            </div>

            <h3 className="font-sans font-semibold text-2xl text-[#2C5F4D] mb-2">Strava-Powered Race Strategy</h3>
            <p className="font-serif text-sm text-[#4A5859] mb-4">Your fitness data. Your race. Your custom blueprint.</p>

            <div className="mb-4">
              <span className="font-sans font-bold text-4xl text-[#2C5F4D]">$99</span>
              <span className="font-serif text-[#4A5859]"> per race</span>
            </div>

            <p className="font-serif text-sm text-[#4A5859] mb-6">
              Built for runners who want every decision made for them. We analyze 90 days of your Strava data to create elevation-adjusted pacing, predict your cutoff buffers down to the minute, and personalize nutrition to your gut. This is the plan that gets you to the finish line—not just the start.
            </p>

            <p className="font-serif text-xs text-[#4A5859]/70 mb-3">Everything in Essential, plus:</p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">
                  <strong className="font-semibold">Strava-powered pacing</strong> (elevation-adjusted from your actual fitness)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">
                  <strong className="font-semibold">Cutoff buffer calculator</strong> (🟢🟡🔴 status at every aid station)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">
                  <strong className="font-semibold">Personalized nutrition</strong> (vegan, GF, caffeine-sensitive options)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">
                  <strong className="font-semibold">Weather-adjusted drop bag strategy</strong> (race-week forecast integration)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Crew logistics with minute-by-minute predicted arrivals</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Contingency protocols for GI issues, blisters, falling behind</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Mental strategy tailored to your race fears</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">All Essential features included</span>
              </li>
            </ul>

            <Button
              className="w-full h-16 bg-[#C87350] hover:bg-[#A85A3C] text-white font-bold text-lg shadow-lg"
              onClick={() => handleCheckout(CUSTOM_TIER!, CUSTOM_SLUG!)}
            >
              Build My Custom Plan
            </Button>

            <p className="text-xs text-[#4A5859]/60 text-center mt-2">
              Connect Strava in 1 click • Guide ready in 5 minutes
            </p>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-green-600">
              <Check className="w-4 h-4" />
              <span className="font-serif">60% of runners choose Custom for cutoff peace of mind</span>
            </div>
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

        {/* Money-Back Guarantee */}
        <div className="mt-16 mb-12">
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
