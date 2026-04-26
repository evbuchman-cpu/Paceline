import { getSubscriptionDetails } from "@/lib/subscription";
import PricingTable from "./_component/pricing-table";
import { PricingFeedbackPopup } from "@/components/pricing-feedback-popup";

export const dynamic = 'force-dynamic';

export default async function PricingPage() {
  const subscriptionDetails = await getSubscriptionDetails();
  const userHasPurchased =
    subscriptionDetails.hasSubscription &&
    subscriptionDetails.subscription?.status === "active";

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <PricingTable subscriptionDetails={subscriptionDetails} />
      <PricingFeedbackPopup userHasPurchased={userHasPurchased ?? false} />
    </div>
  );
}
