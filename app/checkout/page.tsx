"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

/**
 * /checkout?product=PRODUCT_ID&slug=SLUG
 *
 * This page is the "middle step" between clicking a buy button and Polar's
 * payment page. It exists so we can send unauthenticated users to sign-in
 * and then bring them straight back here to complete checkout automatically —
 * without making them click the buy button a second time.
 */
function CheckoutInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const product = searchParams.get("product")?.trim();
  const slug = searchParams.get("slug")?.trim();
  const triggered = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (triggered.current) return;
    triggered.current = true;

    async function run() {
      if (!product || !slug) {
        router.replace("/#pricing");
        return;
      }

      try {
        // Go straight to our direct Polar checkout endpoint (supports guest checkout).
        window.location.href = `/api/checkout/${encodeURIComponent(slug)}`;
      } catch (err) {
        console.error("Checkout error:", err);
        setError("Something went wrong starting checkout. Please try again.");
      }
    }

    run();
  }, [product, slug, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <p className="text-[#4A5859] font-serif mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="font-sans font-semibold text-[#C87350] hover:text-[#A85A3C] underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-[#2C5F4D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#4A5859] font-serif">Taking you to checkout…</p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutInner />
    </Suspense>
  );
}
