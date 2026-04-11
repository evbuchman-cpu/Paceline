"use client";

import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";

interface PricingFeedbackPopupProps {
  userHasPurchased: boolean;
}

const PRICE_OPTIONS = [
  "$10–15 — I'd try it at that price",
  "$20–30 — Fair for what it does",
  "$40–60 — If the plan is genuinely personalized",
  "$75–100 — Worth it if it helps me finish",
  "$100+ — Coach-level value, worth premium",
  "I wouldn't pay — here's why:",
] as const;

// Map price options to the matching beta product
const BUY_CTA: Record<string, { label: string; price: string; slug: string; productId: string } | null> = {
  "$10–15 — I'd try it at that price": {
    label: "Get Essential Plan",
    price: "$7",
    slug: process.env.NEXT_PUBLIC_ESSENTIAL_SLUG ?? "",
    productId: process.env.NEXT_PUBLIC_ESSENTIAL_TIER ?? "",
  },
  "$20–30 — Fair for what it does": {
    label: "Get Custom Plan",
    price: "$25",
    slug: process.env.NEXT_PUBLIC_CUSTOM_SLUG ?? "",
    productId: process.env.NEXT_PUBLIC_CUSTOM_TIER ?? "",
  },
  "$40–60 — If the plan is genuinely personalized": {
    label: "Get Custom Plan",
    price: "$25",
    slug: process.env.NEXT_PUBLIC_CUSTOM_SLUG ?? "",
    productId: process.env.NEXT_PUBLIC_CUSTOM_TIER ?? "",
  },
  "$75–100 — Worth it if it helps me finish": {
    label: "Get Custom Plan",
    price: "$25",
    slug: process.env.NEXT_PUBLIC_CUSTOM_SLUG ?? "",
    productId: process.env.NEXT_PUBLIC_CUSTOM_TIER ?? "",
  },
  "$100+ — Coach-level value, worth premium": {
    label: "Get Custom Plan",
    price: "$25",
    slug: process.env.NEXT_PUBLIC_CUSTOM_SLUG ?? "",
    productId: process.env.NEXT_PUBLIC_CUSTOM_TIER ?? "",
  },
  "I wouldn't pay — here's why:": null,
};

export function PricingFeedbackPopup({ userHasPurchased }: PricingFeedbackPopupProps) {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [customComment, setCustomComment] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const mobileTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());

  const shouldShow = (): boolean => {
    if (userHasPurchased) return false;
    if (sessionStorage.getItem("paceline_feedback_shown")) return false;
    if (localStorage.getItem("paceline_feedback_submitted")) return false;
    return true;
  };

  const showPopup = () => {
    if (!shouldShow()) return;
    sessionStorage.setItem("paceline_feedback_shown", "1");
    setVisible(true);
    posthog.capture("pricing_feedback_popup_shown");
  };

  const closePopup = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (userHasPurchased) return;

    // Desktop: mouse leaves top of viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10) {
        showPopup();
      }
    };

    // Mobile: fire after 30s of no interaction
    const resetTimer = () => {
      lastInteractionRef.current = Date.now();
    };

    const startMobileTimer = () => {
      if (mobileTimerRef.current) clearTimeout(mobileTimerRef.current);
      mobileTimerRef.current = setTimeout(() => {
        const isMobile = window.innerWidth < 640;
        if (isMobile) showPopup();
      }, 30000);
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("touchstart", resetTimer);
    document.addEventListener("touchmove", resetTimer);
    startMobileTimer();

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("touchstart", resetTimer);
      document.removeEventListener("touchmove", resetTimer);
      if (mobileTimerRef.current) clearTimeout(mobileTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userHasPurchased]);

  const handleSubmit = async () => {
    if (!selectedOption || submitting) return;
    setSubmitting(true);
    try {
      await fetch("/api/pricing-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedOption,
          customComment: customComment || undefined,
          email: email || undefined,
          page: "pricing",
        }),
      });
      localStorage.setItem("paceline_feedback_submitted", "1");
      posthog.capture("pricing_feedback_submitted", {
        selected_option: selectedOption,
        has_email: !!email,
      });
      setSubmitted(true);
      setTimeout(() => setVisible(false), 2500);
    } catch {
      // Silently fail — feedback is non-critical
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    posthog.capture("pricing_feedback_skipped");
    closePopup();
  };

  const handleBuyNow = (cta: NonNullable<typeof BUY_CTA[string]>) => {
    posthog.capture("pricing_feedback_popup_buy_clicked", {
      selected_option: selectedOption,
      product: cta.label,
      price: cta.price,
    });
    // Submit feedback silently in the background before navigating
    fetch("/api/pricing-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selectedOption,
        customComment: customComment || undefined,
        email: email || undefined,
        page: "pricing",
      }),
    }).catch(() => {});
    localStorage.setItem("paceline_feedback_submitted", "1");
    window.location.href = `/api/checkout/${encodeURIComponent(cta.slug)}`;
  };

  if (!visible) return null;

  const showFreeTextArea = selectedOption === "I wouldn't pay — here's why:";
  const activeCta = selectedOption ? BUY_CTA[selectedOption] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closePopup();
      }}
    >
      {/* Card */}
      <div
        className="w-full max-w-lg sm:rounded-2xl rounded-t-2xl overflow-hidden"
        style={{ backgroundColor: "#F5F1EA" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative top bar */}
        <div className="h-2 rounded-t-2xl" style={{ backgroundColor: "#2C5F4D" }} />

        {submitted ? (
          /* Success state */
          <div className="p-10 text-center">
            <div className="text-5xl">🏃</div>
            <h3 className="font-serif text-xl mt-4" style={{ color: "#2C5F4D" }}>
              Thank you — this genuinely helps.
            </h3>
            <p className="text-sm mt-2" style={{ color: "#4A5859" }}>
              Now go run.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-6 pt-6 pb-2">
              <h3 className="font-serif text-xl" style={{ color: "#2C5F4D" }}>
                Still on the fence? So are we. 👋
              </h3>
              <p className="text-sm mt-2" style={{ color: "#4A5859" }}>
                We&apos;re in training — still figuring out our race-day pricing. What would you actually pay for a personalized race-day plan? Be brutally honest. This directly shapes what we charge.
              </p>
            </div>

            {/* Options */}
            <div className="px-6 pt-2 pb-0 space-y-2">
              {PRICE_OPTIONS.map((option) => (
                <div key={option}>
                  <button
                    type="button"
                    onClick={() => setSelectedOption(option)}
                    className="w-full text-left px-4 py-2.5 rounded-full border text-sm transition-colors"
                    style={
                      selectedOption === option
                        ? {
                            backgroundColor: "#2C5F4D",
                            color: "#ffffff",
                            borderColor: "#2C5F4D",
                          }
                        : {
                            backgroundColor: "#ffffff",
                            color: "#4A5859",
                            borderColor: "#D4B896",
                          }
                    }
                  >
                    {option}
                  </button>
                  {option === "I wouldn't pay — here's why:" && showFreeTextArea && (
                    <textarea
                      rows={3}
                      value={customComment}
                      onChange={(e) => setCustomComment(e.target.value)}
                      placeholder="Tell us honestly..."
                      className="mt-2 w-full rounded-lg px-3 py-2 text-sm"
                      style={{
                        border: "1px solid #D4B896",
                        backgroundColor: "#ffffff",
                        color: "#4A5859",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Instant buy CTA — appears when a paying option is selected */}
            {activeCta && (
              <div className="px-6 pt-4">
                <div className="rounded-xl p-4" style={{ backgroundColor: "#fff", border: "2px solid #C87350" }}>
                  <p className="font-sans font-semibold text-sm mb-1" style={{ color: "#2C5F4D" }}>
                    Beta pricing is live right now
                  </p>
                  <p className="font-serif text-xs mb-3" style={{ color: "#4A5859" }}>
                    Lock in {activeCta.label} at {activeCta.price} before the price goes up.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleBuyNow(activeCta)}
                    className="w-full rounded-lg px-5 py-2.5 font-sans font-semibold text-white text-sm transition-colors"
                    style={{ backgroundColor: "#C87350" }}
                  >
                    {activeCta.label} — {activeCta.price} →
                  </button>
                </div>
              </div>
            )}

            {/* Optional email */}
            <div className="px-6 pt-4 pb-0">
              <label
                className="block text-xs uppercase tracking-wide mb-1 font-sans"
                style={{ color: "#4A5859" }}
              >
                NOTIFY ME WHEN PRICING IS FINALIZED (OPTIONAL)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-lg px-3 py-2 text-sm"
                style={{
                  border: "1px solid #D4B896",
                  backgroundColor: "#ffffff",
                  color: "#4A5859",
                }}
              />
            </div>

            {/* Actions */}
            <div className="px-6 pt-4 pb-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!selectedOption || submitting}
                className="w-full rounded-lg px-6 py-3 font-semibold text-white transition-colors"
                style={{
                  backgroundColor: "#C87350",
                  opacity: !selectedOption || submitting ? 0.5 : 1,
                  cursor: !selectedOption || submitting ? "not-allowed" : "pointer",
                }}
              >
                Send My Answer →
              </button>
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs underline block text-center mt-3 cursor-pointer w-full"
                style={{ color: "#4A5859" }}
              >
                Skip — just browsing
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
