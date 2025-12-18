import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function TermsOfService() {
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
              Terms of Service
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8 text-gray-700 dark:text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  1. Acceptance of Terms
                </h2>
                <p className="leading-relaxed">
                  By accessing and using Paceline (&quot;Service&quot;), you
                  accept and agree to be bound by the terms and provisions of
                  this agreement. If you do not agree to abide by the above,
                  please do not use this Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  2. Description of Service
                </h2>
                <p className="leading-relaxed">
                  Paceline provides AI-powered race-day execution guides for
                  ultramarathon runners. Our Service includes personalized
                  pacing strategies, crew logistics, nutrition timelines, drop
                  bag strategies, cutoff management, and contingency protocols
                  delivered as comprehensive PDF guides. Guides are generated
                  using artificial intelligence based on your questionnaire
                  responses and, for premium tiers, Strava fitness data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  3. User Accounts
                </h2>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    To use certain features of the Service, you must register
                    for an account. When you register for an account, you agree
                    to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Provide accurate, current, and complete information</li>
                    <li>
                      Maintain and update your information to keep it accurate
                      and complete
                    </li>
                    <li>Maintain the security of your account credentials</li>
                    <li>
                      Accept responsibility for all activities that occur under
                      your account
                    </li>
                    <li>
                      Notify us immediately of any unauthorized use of your
                      account
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  4. Purchases and Payment
                </h2>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    Our Service is offered through one-time purchases for
                    individual race guides or multi-guide bundles. By making a
                    purchase, you agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      Pay all applicable fees as described in our pricing tiers
                      (Essential or Custom)
                    </li>
                    <li>
                      Provide current, complete, and accurate billing
                      information
                    </li>
                    <li>
                      Complete the required questionnaire within 90 days of
                      purchase to receive your guide
                    </li>
                    <li>
                      Be responsible for all charges incurred under your account
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-3">
                    Purchases are subject to our Refund Policy. We reserve the
                    right to modify pricing for future purchases with notice
                    posted on our website.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  5. User Responsibilities and Conduct
                </h2>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    You agree to use the Service only for lawful purposes and in
                    accordance with these Terms. You agree not to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      Use the Service in any way that violates any applicable
                      laws or regulations
                    </li>
                    <li>
                      Provide false, misleading, or fraudulent information in
                      your questionnaire
                    </li>
                    <li>
                      Impersonate any person or entity or misrepresent your
                      affiliation
                    </li>
                    <li>
                      Attempt to gain unauthorized access to any portion of the
                      Service
                    </li>
                    <li>
                      Interfere with or disrupt the Service, servers, or AI
                      generation systems
                    </li>
                    <li>
                      Redistribute, resell, or share generated guides with
                      others for commercial purposes
                    </li>
                    <li>
                      Reverse engineer or attempt to extract our AI prompts or
                      algorithms
                    </li>
                    <li>
                      Use the Service to generate guides for others without
                      purchasing appropriate licenses
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-3">
                    You acknowledge that race guides are for personal use only
                    and that you are solely responsible for your safety and
                    race-day decisions.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  6. Intellectual Property Rights
                </h2>
                <div className="space-y-3">
                  <h3 className="text-lg font-medium mb-2">
                    Our Intellectual Property
                  </h3>
                  <p className="leading-relaxed">
                    The Service and its original content, features, AI models,
                    prompts, algorithms, and functionality are owned by Paceline
                    and are protected by international copyright, trademark,
                    trade secret, and other intellectual property laws.
                  </p>

                  <h3 className="text-lg font-medium mb-2 mt-4">
                    AI-Generated Content
                  </h3>
                  <p className="leading-relaxed">
                    Race guides generated by our Service are created using
                    artificial intelligence based on your inputs. You receive a
                    personal, non-transferable license to use the generated
                    guide for your own race preparation. You may not
                    redistribute, resell, or share guides commercially without
                    our written permission.
                  </p>

                  <h3 className="text-lg font-medium mb-2 mt-4">
                    Your Questionnaire Data
                  </h3>
                  <p className="leading-relaxed">
                    You retain ownership of the information you provide in
                    questionnaires. By using our Service, you grant us a
                    worldwide, non-exclusive, royalty-free license to use your
                    data solely for generating your personalized guide and
                    improving our Service.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  7. Privacy
                </h2>
                <p className="leading-relaxed">
                  Your use of our Service is also governed by our Privacy
                  Policy. Please review our Privacy Policy, which also governs
                  the Site and informs users of our data collection practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  8. Disclaimers
                </h2>
                <div className="space-y-3">
                  <p className="leading-relaxed uppercase font-medium">
                    The Service is provided on an &quot;AS IS&quot; and &quot;AS
                    AVAILABLE&quot; basis without warranties of any kind, either
                    express or implied, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Warranties of merchantability</li>
                    <li>Fitness for a particular purpose</li>
                    <li>Non-infringement</li>
                    <li>
                      That the Service will be uninterrupted or error-free
                    </li>
                    <li>That defects will be corrected</li>
                    <li>
                      That the Service is free of viruses or harmful components
                    </li>
                    <li>
                      That AI-generated content will be accurate, complete, or
                      suitable for your specific race
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-4 font-medium">
                    IMPORTANT: Race guides are AI-generated recommendations based
                    on limited data. We do not guarantee:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>That you will finish your race</li>
                    <li>That you will meet cutoff times</li>
                    <li>
                      That strategies will work for your specific physiology
                    </li>
                    <li>The accuracy of pace predictions or nutrition plans</li>
                    <li>
                      That weather forecasts or course conditions will match our
                      data
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-3">
                    You are solely responsible for your race preparation, safety,
                    and decision-making. Always consult with medical
                    professionals, coaches, and race organizers before following
                    any training or race-day recommendations.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  9. Limitation of Liability
                </h2>
                <p className="leading-relaxed uppercase font-medium">
                  To the maximum extent permitted by law, Paceline shall not be
                  liable for any indirect, incidental, special, consequential, or
                  punitive damages, or any loss of profits or revenues, whether
                  incurred directly or indirectly, or any loss of data, use,
                  goodwill, or other intangible losses resulting from:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-3">
                  <li>Your use or inability to use the Service</li>
                  <li>Any unauthorized access to or use of our servers</li>
                  <li>
                    Any interruption or cessation of transmission to or from the
                    Service
                  </li>
                  <li>
                    Any bugs, viruses, or similar harmful code transmitted
                    through the Service
                  </li>
                  <li>Any errors or omissions in AI-generated content</li>
                  <li>
                    Injuries, accidents, or health issues arising from following
                    race guide recommendations
                  </li>
                  <li>
                    Failure to finish races or meet cutoff times based on our
                    pacing strategies
                  </li>
                  <li>
                    Adverse reactions to nutrition or hydration recommendations
                  </li>
                  <li>Third-party AI service downtime or errors (Anthropic Claude API, etc.)</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE AMOUNT
                  YOU PAID FOR THE SERVICE IN THE PRECEDING 12 MONTHS.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  10. Indemnification
                </h2>
                <p className="leading-relaxed">
                  You agree to defend, indemnify, and hold harmless Paceline and
                  its affiliates, officers, directors, employees, and agents from
                  and against any claims, liabilities, damages, judgments,
                  awards, losses, costs, expenses, or fees arising out of or
                  relating to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Your violation of these Terms</li>
                  <li>Your use of the Service or generated guides</li>
                  <li>Any injuries or damages sustained during race events</li>
                  <li>Your breach of any third-party rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  11. Termination
                </h2>
                <p className="leading-relaxed">
                  We may terminate or suspend your account and bar access to the
                  Service immediately, without prior notice or liability, under
                  our sole discretion, for any reason whatsoever, including
                  without limitation if you breach the Terms. Upon termination,
                  your right to use the Service will cease immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  12. Governing Law
                </h2>
                <p className="leading-relaxed">
                  These Terms shall be governed and construed in accordance with
                  the laws of the State of Delaware, United States, without
                  regard to its conflict of law provisions. Our failure to
                  enforce any right or provision of these Terms will not be
                  considered a waiver of those rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  13. Force Majeure
                </h2>
                <p className="leading-relaxed">
                  We shall not be liable for any failure or delay in performance
                  of the Service due to circumstances beyond our reasonable
                  control, including but not limited to: third-party AI service
                  outages (Anthropic Claude API), natural disasters, acts of government,
                  internet service disruptions, or other force majeure events.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  14. Changes to Terms
                </h2>
                <p className="leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material, we
                  will provide at least 30 days notice prior to any new terms
                  taking effect. What constitutes a material change will be
                  determined at our sole discretion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  15. Contact Information
                </h2>
                <p className="leading-relaxed">
                  If you have any questions about these Terms, please contact us
                  at:
                </p>
                <div className="mt-3 space-y-1">
                  <p>Email: legal@paceline.run</p>
                  <p>Support: support@paceline.run</p>
                </div>
              </section>

              <section className="pt-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  By using Paceline, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms of Service.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
