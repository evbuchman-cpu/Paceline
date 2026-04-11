import { NextRequest, NextResponse } from "next/server";
import { Polar } from "@polar-sh/sdk";

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: (process.env.POLAR_SERVER ?? "sandbox") as "production" | "sandbox",
});

// Slug → product ID mapping
// Env vars are trimmed to guard against accidental whitespace/newlines
const SLUG_TO_PRODUCT: Record<string, string> = {
  [process.env.NEXT_PUBLIC_ESSENTIAL_SLUG?.trim() ?? ""]:
    process.env.NEXT_PUBLIC_ESSENTIAL_TIER?.trim() ?? "",
  [process.env.NEXT_PUBLIC_CUSTOM_SLUG?.trim() ?? ""]:
    process.env.NEXT_PUBLIC_CUSTOM_TIER?.trim() ?? "",
  [process.env.NEXT_PUBLIC_ULTRA_BUNDLE_SLUG?.trim() ?? ""]:
    process.env.NEXT_PUBLIC_ULTRA_BUNDLE_TIER?.trim() ?? "",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const productId = SLUG_TO_PRODUCT[slug];

  if (!productId) {
    return NextResponse.json(
      { error: `Unknown product slug: "${slug}". Check NEXT_PUBLIC_*_SLUG env vars.` },
      { status: 404 }
    );
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!appUrl) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_APP_URL env var is not set" },
      { status: 500 }
    );
  }

  try {
    const checkout = await polar.checkouts.create({
      products: [productId],
      successUrl: `${appUrl}/success?checkout_id={CHECKOUT_ID}`,
    });

    // Return the URL as JSON so the client can redirect and handle errors gracefully
    return NextResponse.json({ url: checkout.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Polar checkout creation failed:", message, err);
    return NextResponse.json(
      { error: "Failed to create checkout session", detail: message },
      { status: 500 }
    );
  }
}
