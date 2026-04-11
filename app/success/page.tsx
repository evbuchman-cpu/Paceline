"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SuccessPage() {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    authClient.getSession().then((res) => {
      setIsSignedIn(!!res.data?.user);
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#F5F1EA" }}>
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: "#2C5F4D" }}>
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Headline */}
        <h1 className="font-sans font-bold text-3xl mb-3" style={{ color: "#2C5F4D" }}>
          You&apos;re race-ready.
        </h1>
        <p className="font-serif text-lg mb-8" style={{ color: "#4A5859" }}>
          Payment confirmed. Your personalized race guide will be in your inbox within 24 hours.
        </p>

        {/* Sign-in prompt for guests */}
        {isSignedIn === false && (
          <div className="rounded-xl border-2 p-5 mb-6 text-left" style={{ borderColor: "#C87350", backgroundColor: "#fff" }}>
            <p className="font-sans font-semibold text-base mb-1" style={{ color: "#C87350" }}>
              Create an account to access your guide
            </p>
            <p className="font-serif text-sm mb-4" style={{ color: "#4A5859" }}>
              Sign in with the same email you used at checkout to view your guide, track delivery, and manage your plan.
            </p>
            <button
              onClick={() => router.push("/sign-in")}
              className="w-full rounded-lg px-5 py-3 font-sans font-semibold text-white transition-colors"
              style={{ backgroundColor: "#C87350" }}
            >
              Sign In to Access Your Guide →
            </button>
          </div>
        )}

        {/* Dashboard button for signed-in users */}
        {isSignedIn === true && (
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full rounded-lg px-5 py-3 font-sans font-semibold text-white mb-6 transition-colors"
            style={{ backgroundColor: "#2C5F4D" }}
          >
            Go to My Dashboard →
          </button>
        )}

        {/* What happens next */}
        <div className="rounded-xl p-5 text-left space-y-3" style={{ backgroundColor: "#fff", border: "1px solid #D4B896" }}>
          <p className="font-sans font-semibold text-sm uppercase tracking-wide" style={{ color: "#2C5F4D" }}>
            What happens next
          </p>
          {[
            "Check your email — confirmation receipt on the way",
            "Your guide is being built (delivered within 24 hours)",
            "Review your pacing splits, crew sheet & cutoff tracker",
            "Race with confidence — you know your plan",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5" style={{ backgroundColor: "#2C5F4D" }}>
                {i + 1}
              </span>
              <span className="font-serif text-sm" style={{ color: "#4A5859" }}>{step}</span>
            </div>
          ))}
        </div>

        <p className="font-serif text-xs mt-6" style={{ color: "#4A5859" }}>
          Questions? Email us at{" "}
          <a href="mailto:hello@paceline.run" className="underline" style={{ color: "#C87350" }}>
            hello@paceline.run
          </a>
        </p>
      </div>
    </div>
  );
}
