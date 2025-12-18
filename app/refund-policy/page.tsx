import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            ← Back to home
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardContent className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              Refund Policy
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8 text-gray-700 dark:text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  1. Our Commitment to Satisfaction
                </h2>
                <p className="leading-relaxed">
                  At Paceline, we stand behind the quality of our AI-powered
                  race-day execution guides. We offer a 7-day refund window to
                  ensure you&apos;re completely satisfied with your purchase.
                  This policy explains when refunds are available and the
                  process for requesting one.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  2. 7-Day Refund Window
                </h2>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    You may request a full refund within 7 calendar days of your
                    purchase date, subject to the conditions outlined in this
                    policy.
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="font-medium text-amber-900 dark:text-amber-100">
                      Important: The 7-day window starts from your purchase date,
                      not from when you complete your questionnaire or receive
                      your guide.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  3. Eligibility for Refunds
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-green-700 dark:text-green-400">
                      ✓ You ARE Eligible for a Refund If:
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        Your refund request is made within 7 days of purchase
                      </li>
                      <li>
                        Your personalized race guide has NOT been fully generated
                        and delivered
                      </li>
                      <li>
                        You have NOT downloaded, exported, or accessed the
                        complete guide
                      </li>
                      <li>This is your first refund request with Paceline</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 text-red-700 dark:text-red-400">
                      ✗ You Are NOT Eligible for a Refund If:
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        More than 7 days have passed since your purchase date
                      </li>
                      <li>
                        Your AI-generated race guide has been fully generated and
                        delivered to you
                      </li>
                      <li>
                        You have downloaded, exported, or accessed the complete
                        PDF guide
                      </li>
                      <li>
                        You have already received a refund from Paceline in the
                        past (limit: one refund per customer)
                      </li>
                      <li>
                        You are requesting a refund due to failure to achieve
                        specific race performance outcomes
                      </li>
                      <li>
                        You did not follow the instructions or recommendations in
                        your guide
                      </li>
                      <li>You changed your mind after receiving the full guide</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  4. Pricing Tier Specifics
                </h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Essential Tier ($29)
                    </h3>
                    <p className="leading-relaxed">
                      Full refund available within 7 days if guide has not been
                      generated or accessed.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Custom Tier ($99)
                    </h3>
                    <p className="leading-relaxed">
                      Full refund available within 7 days if guide has not been
                      generated or accessed. This includes purchases where you
                      connected your Strava account but did not receive the final
                      guide.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  5. What We Do NOT Refund For
                </h2>
                <div className="space-y-3">
                  <p className="leading-relaxed font-medium">
                    We cannot issue refunds for the following situations:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Results Not Guaranteed:</strong> We do not
                      guarantee that you will finish your race, meet cutoff
                      times, or achieve specific performance goals. Race
                      performance depends on many factors beyond our control.
                    </li>
                    <li>
                      <strong>Change of Mind:</strong> After receiving and
                      accessing your complete guide, you cannot request a refund
                      simply because you changed your mind or decided not to use
                      it.
                    </li>
                    <li>
                      <strong>User Error:</strong> Providing incorrect
                      information in your questionnaire, failing to follow guide
                      recommendations, or misuse of the service.
                    </li>
                    <li>
                      <strong>Race Changes:</strong> If your race is canceled,
                      postponed, or if you can no longer participate for personal
                      reasons after receiving your guide.
                    </li>
                    <li>
                      <strong>Technical Issues on Your End:</strong> Inability to
                      download or view PDFs due to your device, browser, or
                      internet connection issues.
                    </li>
                    <li>
                      <strong>Multiple Accounts:</strong> Attempting to purchase
                      and refund multiple times using different accounts.
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  6. How to Request a Refund
                </h2>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    If you meet the eligibility criteria, follow these steps:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      <strong>Email us at:</strong> support@paceline.run
                    </li>
                    <li>
                      <strong>Include in your email:</strong>
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li>Your full name and email address used for purchase</li>
                        <li>Order/purchase confirmation number</li>
                        <li>Reason for requesting a refund</li>
                        <li>Confirmation that you have not accessed the guide</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Wait for response:</strong> We will review your
                      request within 2 business days
                    </li>
                    <li>
                      <strong>Refund processing:</strong> If approved, refunds
                      are processed within 5-7 business days to your original
                      payment method
                    </li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  7. Refund Processing Time
                </h2>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    Once your refund is approved:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      Refunds are processed within 5-7 business days to your
                      original payment method
                    </li>
                    <li>
                      Depending on your bank or payment processor, it may take an
                      additional 3-5 business days for the refund to appear in
                      your account
                    </li>
                    <li>
                      You will receive an email confirmation when the refund is
                      processed
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  8. Fraudulent Refund Requests
                </h2>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    We reserve the right to deny refund requests that we
                    reasonably believe to be fraudulent, abusive, or in violation
                    of this policy. This includes but is not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      Requesting a refund after downloading and accessing the
                      complete guide
                    </li>
                    <li>
                      Creating multiple accounts to exploit the refund policy
                    </li>
                    <li>
                      Requesting refunds for reasons not covered by this policy
                    </li>
                    <li>
                      Submitting false or misleading information in refund
                      requests
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-3">
                    Accounts found to be abusing the refund policy may be
                    suspended or terminated, and future purchases may be denied.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  9. Chargebacks
                </h2>
                <div className="space-y-3">
                  <p className="leading-relaxed font-medium">
                    IMPORTANT: Please contact us before filing a chargeback.
                  </p>
                  <p className="leading-relaxed">
                    If you dispute a charge with your bank or payment processor
                    (file a chargeback) instead of contacting us first:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Your account will be immediately suspended</li>
                    <li>
                      You may be permanently banned from using Paceline services
                    </li>
                    <li>
                      We will provide evidence of service delivery to your
                      payment processor
                    </li>
                    <li>
                      Frivolous chargebacks may result in legal action to recover
                      costs
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-3">
                    We encourage you to work with us directly to resolve any
                    payment disputes. Our support team is here to help at
                    support@paceline.run.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  10. Limitation of Liability
                </h2>
                <div className="space-y-3">
                  <p className="leading-relaxed uppercase font-medium">
                    IMPORTANT DISCLAIMER:
                  </p>
                  <p className="leading-relaxed">
                    Paceline provides AI-generated race-day execution guides as
                    recommendations only. We do not guarantee:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>That you will finish your race</li>
                    <li>That you will meet cutoff times</li>
                    <li>
                      That pacing strategies will work for your specific
                      physiology
                    </li>
                    <li>The accuracy of pace predictions or nutrition plans</li>
                    <li>
                      That weather forecasts or course conditions will match our
                      data
                    </li>
                    <li>Any specific race performance outcomes</li>
                  </ul>
                  <p className="leading-relaxed mt-3">
                    You are solely responsible for your race preparation, safety,
                    and decision-making. Always consult with medical
                    professionals, coaches, and race organizers before following
                    any recommendations.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  11. Force Majeure
                </h2>
                <p className="leading-relaxed">
                  We are not liable for failures or delays in service delivery
                  due to circumstances beyond our reasonable control, including
                  but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>
                    Third-party AI service outages or errors (e.g., Anthropic Claude API
                    downtime)
                  </li>
                  <li>Natural disasters or acts of God</li>
                  <li>Government actions or regulations</li>
                  <li>Internet service provider disruptions</li>
                  <li>Cyberattacks or security incidents</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  In such cases, we will make reasonable efforts to restore
                  service as quickly as possible. Refunds may be available on a
                  case-by-case basis at our discretion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  12. Changes to This Policy
                </h2>
                <p className="leading-relaxed">
                  We reserve the right to modify this Refund Policy at any time.
                  Changes will be posted on this page with an updated &quot;Last
                  updated&quot; date. Your continued use of Paceline after
                  changes are posted constitutes acceptance of the revised
                  policy. Refund requests will be evaluated under the policy in
                  effect at the time of purchase.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  13. Contact Information
                </h2>
                <p className="leading-relaxed">
                  If you have any questions about this Refund Policy or need to
                  request a refund, please contact us at:
                </p>
                <div className="mt-3 space-y-1">
                  <p>Email: support@paceline.run</p>
                  <p>Refund inquiries: refunds@paceline.run</p>
                </div>
                <p className="mt-3 text-sm">
                  We typically respond to refund requests within 2 business days.
                </p>
              </section>

              <section className="pt-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  By making a purchase on Paceline, you acknowledge that you have
                  read, understood, and agree to be bound by this Refund Policy.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
