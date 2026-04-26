"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

/**
 * /checkout?product=PRODUCT_ID&slug=SLUG
 *
 * Sends the user straight to Polar checkout — no sign-in required.
 * We hit our own /api/checkout/[slug] route which creates the Polar
 * checkout session server-side and returns the hosted checkout URL.
 */
function CheckoutInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug")?.trim();
  const triggered = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (triggered.current) return;
    triggered.current = true;

    async function run() {
      if (!slug) {
        router.replace("/#pricing");
        return;
      }

      try {
        const res = await fetch(`/api/checkout/${encodeURIComponent(slug)}`);
        const data = await res.json();

        if (!res.ok) {
          const msg = data.detail
            ? `${data.error}: ${data.detail}`
            : (data.error ?? "Something went wrong starting checkout.");
          setError(msg);
          return;
        }

        // Redirect to Polar's hosted checkout page
        window.location.href = data.url;
      } catch (err) {
        console.error("Checkout error:", err);
        setError("Something went wrong starting checkout. Please try again.");
      }
    }

    run();
  }, [slug, router]);

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
