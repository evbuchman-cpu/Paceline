import { NextRequest, NextResponse } from "next/server";
import { Polar } from "@polar-sh/sdk";

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: (process.env.POLAR_SERVER ?? "sandbox") as "production" | "sandbox",
});

// Slug → product ID mapping (same as lib/auth.ts)
const SLUG_TO_PRODUCT: Record<string, string> = {
  [process.env.NEXT_PUBLIC_ESSENTIAL_SLUG ?? ""]: process.env.NEXT_PUBLIC_ESSENTIAL_TIER ?? "",
  [process.env.NEXT_PUBLIC_CUSTOM_SLUG ?? ""]: process.env.NEXT_PUBLIC_CUSTOM_TIER ?? "",
  [process.env.NEXT_PUBLIC_ULTRA_BUNDLE_SLUG ?? ""]: process.env.NEXT_PUBLIC_ULTRA_BUNDLE_TIER ?? "",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const productId = SLUG_TO_PRODUCT[slug];

  if (!productId) {
    return NextResponse.json({ error: "Unknown product slug" }, { status: 404 });
  }

  try {
    const checkout = await polar.checkouts.create({
      products: [productId],
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/success?checkout_id={CHECKOUT_ID}`,
    });

    return NextResponse.redirect(checkout.url);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Polar checkout creation failed:", message, err);
    return NextResponse.json(
      { error: "Failed to create checkout session", detail: message },
      { status: 500 }
    );
  }
}
