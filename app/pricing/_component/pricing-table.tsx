"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function PricingTable({
  subscriptionDetails,
}: PricingTableProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        setIsAuthenticated(!!session.data?.user);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleCheckout = async (productId: string, slug: string) => {
    if (isAuthenticated === false) {
      router.push("/sign-in");
      return;
    }

    try {
      await authClient.checkout({
        products: [productId],
        slug: slug,
      });
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Oops, something went wrong");
    }
  };

  const handleManageSubscription = async () => {
    try {
      await authClient.customer.portal();
    } catch (error) {
      console.error("Failed to open customer portal:", error);
      toast.error("Failed to open subscription management");
    }
  };

  const ESSENTIAL_TIER = process.env.NEXT_PUBLIC_ESSENTIAL_TIER;
  const ESSENTIAL_SLUG = process.env.NEXT_PUBLIC_ESSENTIAL_SLUG;
  const CUSTOM_TIER = process.env.NEXT_PUBLIC_CUSTOM_TIER;
  const CUSTOM_SLUG = process.env.NEXT_PUBLIC_CUSTOM_SLUG;
  const ULTRA_BUNDLE_TIER = process.env.NEXT_PUBLIC_ULTRA_BUNDLE_TIER;
  const ULTRA_BUNDLE_SLUG = process.env.NEXT_PUBLIC_ULTRA_BUNDLE_SLUG;

  if (!ESSENTIAL_TIER || !ESSENTIAL_SLUG || !CUSTOM_TIER || !CUSTOM_SLUG || !ULTRA_BUNDLE_TIER || !ULTRA_BUNDLE_SLUG) {
    throw new Error("Missing required environment variables for pricing tiers");
  }

  const isCurrentPlan = (tierProductId: string) => {
    return (
      subscriptionDetails.hasSubscription &&
      subscriptionDetails.subscription?.productId === tierProductId &&
      subscriptionDetails.subscription?.status === "active"
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="flex flex-col items-center justify-center px-4 py-16 w-full">
      <div className="text-center mb-12 max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight mb-4">
          Get Your Personalized Race Plan in 10 Minutes
        </h1>
        <p className="text-xl text-muted-foreground">
          Stop piecing together advice from Reddit. Get a data-driven race execution plan built for YOUR fitness and THIS course.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full mb-12">
        {/* Essential Tier */}
        <Card className="relative h-fit">
          {isCurrentPlan(ESSENTIAL_TIER) && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Current Plan
              </Badge>
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-2xl">Essential</CardTitle>
            <CardDescription>Your first ultra deserves a solid plan</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$29</span>
              <span className="text-muted-foreground">/race</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Basic pacing strategy (flat pace chart)</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Standard nutrition timeline</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Generic crew logistics sheet</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Course overview with elevation profile</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Drop bag checklist</span>
            </div>
          </CardContent>
          <CardFooter>
            {isCurrentPlan(ESSENTIAL_TIER) ? (
              <div className="w-full space-y-2">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleManageSubscription}
                >
                  Manage Purchase
                </Button>
                {subscriptionDetails.subscription && (
                  <p className="text-sm text-muted-foreground text-center">
                    Purchased {formatDate(subscriptionDetails.subscription.currentPeriodStart)}
                  </p>
                )}
              </div>
            ) : (
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleCheckout(ESSENTIAL_TIER, ESSENTIAL_SLUG)}
              >
                {isAuthenticated === false
                  ? "Sign In to Get Started"
                  : "Get Essential"}
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Custom Tier - Most Popular */}
        <Card className="relative h-fit border-2 border-primary shadow-lg">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-primary text-primary-foreground">
              ★ Most Popular
            </Badge>
          </div>
          {isCurrentPlan(CUSTOM_TIER) && (
            <div className="absolute -top-3 right-4">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Current Plan
              </Badge>
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-2xl">Custom</CardTitle>
            <CardDescription>Protect your year of training</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$99</span>
              <span className="text-muted-foreground">/race</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="font-medium">Everything in Essential, PLUS:</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>All Essential add-ons included ($40 value)</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Personalized pacing from YOUR Strava data</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Elevation-adjusted pace recommendations</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Crew timing with predicted arrivals</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Cutoff buffer calculator (🟢🟡🔴 status)</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Weather-adjusted strategy</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Contingency plans (GI, blisters, heat/cold)</span>
            </div>
          </CardContent>
          <CardFooter>
            {isCurrentPlan(CUSTOM_TIER) ? (
              <div className="w-full space-y-2">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleManageSubscription}
                >
                  Manage Purchase
                </Button>
                {subscriptionDetails.subscription && (
                  <p className="text-sm text-muted-foreground text-center">
                    Purchased {formatDate(subscriptionDetails.subscription.currentPeriodStart)}
                  </p>
                )}
              </div>
            ) : (
              <Button
                className="w-full"
                onClick={() => handleCheckout(CUSTOM_TIER, CUSTOM_SLUG)}
              >
                {isAuthenticated === false
                  ? "Sign In to Get Started"
                  : "Get Custom"}
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Ultra Bundle Tier */}
        <Card className="relative h-fit">
          {isCurrentPlan(ULTRA_BUNDLE_TIER) && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Current Plan
              </Badge>
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-2xl">Ultra Bundle</CardTitle>
            <CardDescription>Planning multiple races this year?</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$497</span>
              <span className="text-muted-foreground"> for 5 races</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Just $99/race - Save $148 vs buying separately
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="font-medium">5× Custom Race Guides</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>All Essential & Custom add-ons (×5 races)</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>3 version updates per race (15 total)</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Bonus: Ultimate Ultramarathon Playbook PDF</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Valid for 12 months from purchase</span>
            </div>
          </CardContent>
          <CardFooter>
            {isCurrentPlan(ULTRA_BUNDLE_TIER) ? (
              <div className="w-full space-y-2">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleManageSubscription}
                >
                  Manage Purchase
                </Button>
                {subscriptionDetails.subscription && (
                  <p className="text-sm text-muted-foreground text-center">
                    Purchased {formatDate(subscriptionDetails.subscription.currentPeriodStart)}
                  </p>
                )}
              </div>
            ) : (
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleCheckout(ULTRA_BUNDLE_TIER, ULTRA_BUNDLE_SLUG)}
              >
                {isAuthenticated === false
                  ? "Sign In to Get Started"
                  : "Get Ultra Bundle"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 text-center max-w-2xl">
        <p className="text-muted-foreground mb-4">
          <strong>All plans include:</strong> 10-minute delivery • Money-back guarantee • Secure payment • Instant PDF download
        </p>
        <p className="text-sm text-muted-foreground">
          Questions? <span className="text-primary cursor-pointer hover:underline">Contact us</span>
        </p>
      </div>
    </section>
  );
}
