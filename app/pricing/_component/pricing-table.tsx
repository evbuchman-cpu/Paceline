"use client";

import { Check, Star } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SubscriptionDetails = {
  id: string;
  productId: string;
  status: string;
  amount: number;
  currency: string;
  recurringInterval: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt: Date | null;
  organizationId: string | null;
};

type SubscriptionDetailsResult = {
  hasSubscription: boolean;
  subscription?: SubscriptionDetails;
  error?: string;
  errorType?: "CANCELED" | "EXPIRED" | "GENERAL";
};

interface PricingTableProps {
  subscriptionDetails: SubscriptionDetailsResult;
}

export default function PricingTable({ subscriptionDetails }: PricingTableProps) {
  const router = useRouter();

  const handleCheckout = async (productId: string, slug: string) => {
    try {
      const session = await authClient.getSession();
      if (!session.data?.user) {
        router.push("/sign-in");
        return;
      }
      await authClient.checkout({ products: [productId], slug });
    } catch {
      toast.error("Oops, something went wrong");
    }
  };

  const handleManageSubscription = async () => {
    try {
      await authClient.customer.portal();
    } catch {
      toast.error("Failed to open subscription management");
    }
  };

  const ESSENTIAL_TIER = process.env.NEXT_PUBLIC_ESSENTIAL_TIER!;
  const ESSENTIAL_SLUG = process.env.NEXT_PUBLIC_ESSENTIAL_SLUG!;
  const CUSTOM_TIER = process.env.NEXT_PUBLIC_CUSTOM_TIER!;
  const CUSTOM_SLUG = process.env.NEXT_PUBLIC_CUSTOM_SLUG!;

  const isCurrentPlan = (tierProductId: string) =>
    subscriptionDetails.hasSubscription &&
    subscriptionDetails.subscription?.productId === tierProductId &&
    subscriptionDetails.subscription?.status === "active";

  return (
    <section className="w-full min-h-screen" style={{ backgroundColor: "#F5F1EA" }}>
      {/* Header */}
      <div className="text-center pt-16 pb-12 px-4">
        <h1
          className="font-semibold text-3xl sm:text-4xl lg:text-5xl mb-4"
          style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}
        >
          Your Race Plan. Zero Stress.
        </h1>
        <p
          className="text-xl max-w-xl mx-auto"
          style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}
        >
          Choose your level of detail. Every tier saves you 25+ hours of race planning.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 pb-16">

        {/* Essential */}
        <div
          className="order-2 md:order-1 p-8 bg-white border-2 border-stone-200 rounded-xl transition-all duration-300 hover:shadow-[0_8px_24px_rgba(44,95,77,0.20)] hover:-translate-y-[3px] relative"
        >
          {isCurrentPlan(ESSENTIAL_TIER) && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 font-semibold text-sm rounded-full" style={{ fontFamily: "Inter, sans-serif" }}>
                Current Plan
              </span>
            </div>
          )}
          <h3 className="font-semibold text-2xl mb-2" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>
            First Ultra Fundamentals
          </h3>
          <p className="text-sm mb-4" style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}>
            Everything you need to toe the line with confidence
          </p>
          <div className="mb-4">
            <span className="font-bold text-4xl" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>$29</span>
            <span style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}> per race</span>
          </div>
          <p className="text-sm mb-6" style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}>
            Perfect for your first ultra or races where you just need the basics dialed. Get a complete pacing strategy, crew logistics, and drop bag plan — without the 30-hour research spiral.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Section-by-section pacing strategy (flat terrain baseline)",
              "Aid station cutoff tracker with buffer zones",
              "Crew timing sheet with predicted arrivals",
              "Drop bag checklist by station",
              "Race overview (elevation, weather, course notes)",
              "Nutrition timeline template",
              "Mental strategy for tough miles",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm" style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}>{item}</span>
              </li>
            ))}
          </ul>
          {isCurrentPlan(ESSENTIAL_TIER) ? (
            <button
              onClick={handleManageSubscription}
              className="w-full h-14 border-2 rounded-lg font-semibold transition-colors"
              style={{ borderColor: "#2C5F4D", color: "#2C5F4D", backgroundColor: "transparent", fontFamily: "Inter, sans-serif" }}
            >
              Manage Purchase
            </button>
          ) : (
            <button
              onClick={() => handleCheckout(ESSENTIAL_TIER, ESSENTIAL_SLUG)}
              className="w-full h-14 border-2 rounded-lg font-semibold transition-colors hover:bg-[#2C5F4D] hover:text-white"
              style={{ borderColor: "#2C5F4D", color: "#2C5F4D", backgroundColor: "transparent", fontFamily: "Inter, sans-serif" }}
            >
              Start Planning
            </button>
          )}
          <p className="text-xs text-center mt-2" style={{ color: "#4A5859", opacity: 0.6, fontFamily: "Inter, sans-serif" }}>
            10-minute questionnaire • PDF delivered instantly
          </p>
          <p className="text-xs text-center mt-4 pt-4 border-t border-stone-200" style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}>
            Need elevation-adjusted pacing? →{" "}
            <span className="font-semibold" style={{ color: "#C87350" }}>Upgrade to Custom for $70 more</span>
          </p>
        </div>

        {/* Custom — Most Popular */}
        <div
          className="order-1 md:order-2 p-8 bg-white border-2 rounded-xl relative transition-all duration-300 hover:shadow-[0_12px_32px_rgba(200,115,80,0.25)] hover:-translate-y-[5px] md:scale-105"
          style={{ borderColor: "#C87350" }}
        >
          <div className="absolute -top-3 right-4">
            <span
              className="inline-flex items-center gap-1 px-3 py-1 text-white font-semibold text-sm rounded-full shadow-md"
              style={{ backgroundColor: "#C87350", fontFamily: "Inter, sans-serif" }}
            >
              <Star className="w-4 h-4 fill-white" />
              MOST POPULAR
            </span>
          </div>
          {isCurrentPlan(CUSTOM_TIER) && (
            <div className="absolute -top-3 left-4">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 font-semibold text-sm rounded-full" style={{ fontFamily: "Inter, sans-serif" }}>
                Current Plan
              </span>
            </div>
          )}
          <h3 className="font-semibold text-2xl mb-2" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>
            Strava-Powered Race Strategy
          </h3>
          <p className="text-sm mb-4" style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}>
            Your fitness data. Your race. Your custom blueprint.
          </p>
          <div className="mb-4">
            <span className="font-bold text-4xl" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>$99</span>
            <span style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}> per race</span>
          </div>
          <p className="text-sm mb-6" style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}>
            Built for runners who want every decision made for them. We analyze 90 days of your Strava data to create elevation-adjusted pacing, predict your cutoff buffers down to the minute, and personalize nutrition to your gut.
          </p>
          <p className="text-xs mb-3" style={{ color: "#4A5859", opacity: 0.7, fontFamily: "Source Serif 4, serif" }}>
            Everything in Essential, plus:
          </p>
          <ul className="space-y-3 mb-8">
            {[
              { bold: "Strava-powered pacing", rest: " (elevation-adjusted from your actual fitness)" },
              { bold: "Cutoff buffer calculator", rest: " (🟢🟡🔴 status at every aid station)" },
              { bold: "Personalized nutrition", rest: " (vegan, GF, caffeine-sensitive options)" },
              { bold: "Weather-adjusted drop bag strategy", rest: " (race-week forecast integration)" },
              { bold: null, rest: "Crew logistics with minute-by-minute predicted arrivals" },
              { bold: null, rest: "Contingency protocols for GI issues, blisters, falling behind" },
              { bold: null, rest: "Mental strategy tailored to your race fears" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm" style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}>
                  {item.bold && <strong className="font-semibold">{item.bold}</strong>}
                  {item.rest}
                </span>
              </li>
            ))}
          </ul>
          {isCurrentPlan(CUSTOM_TIER) ? (
            <button
              onClick={handleManageSubscription}
              className="w-full h-16 rounded-lg font-bold text-lg shadow-lg text-white transition-colors"
              style={{ backgroundColor: "#C87350", fontFamily: "Inter, sans-serif" }}
            >
              Manage Purchase
            </button>
          ) : (
            <button
              onClick={() => handleCheckout(CUSTOM_TIER, CUSTOM_SLUG)}
              className="w-full h-16 rounded-lg font-bold text-lg shadow-lg text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#C87350", fontFamily: "Inter, sans-serif" }}
            >
              Build My Custom Plan
            </button>
          )}
          <p className="text-xs text-center mt-2" style={{ color: "#4A5859", opacity: 0.6, fontFamily: "Inter, sans-serif" }}>
            Connect Strava in 1 click • Guide ready in 5 minutes
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-green-600">
            <Check className="w-4 h-4" />
            <span style={{ fontFamily: "Source Serif 4, serif" }}>60% of runners choose Custom for cutoff peace of mind</span>
          </div>
        </div>
      </div>

      {/* Money-Back Guarantee */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div
          className="p-6 rounded-xl border-2 text-center"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#2C5F4D" }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-3xl">✓</span>
            <h3 className="font-semibold text-xl" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>
              30-Day Money-Back Guarantee
            </h3>
          </div>
          <p style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}>
            Not satisfied? We&apos;ll refund you in full. No questions asked.
          </p>
        </div>
      </div>

      {/* Why Not DIY */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <div className="p-8 bg-white border border-stone-200 rounded-xl">
          <h3
            className="font-semibold text-2xl mb-6 text-center"
            style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}
          >
            Why Not Just DIY Your Plan?
          </h3>
          <div className="space-y-4" style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}>
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
              <strong className="font-semibold" style={{ color: "#2C5F4D" }}>Paceline gives you those 30 hours back — and eliminates the guesswork.</strong>{" "}
              Your plan is built from your actual fitness data, personalized to your gut and blister history, and updated with race-week weather. You get to focus on training, not spreadsheets.
            </p>
            <p className="font-semibold" style={{ color: "#C87350" }}>
              Your race entry cost $200–400. Your gear cost $500+. Protect that investment with a plan that works.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
