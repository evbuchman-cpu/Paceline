import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8 text-gray-700 dark:text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  1. Introduction
                </h2>
                <p className="leading-relaxed">
                  Welcome to Paceline (&quot;we,&quot; &quot;our,&quot; or
                  &quot;us&quot;). We are committed to protecting your personal
                  information and your right to privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your
                  information when you use our AI-powered race planning service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  2. Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Personal Information
                    </h3>
                    <p className="leading-relaxed">
                      When you register for an account, we collect:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>Name</li>
                      <li>Email address</li>
                      <li>
                        Google account information (when using Google Sign-In)
                      </li>
                      <li>Payment information (processed by Polar.sh)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Questionnaire Data
                    </h3>
                    <p className="leading-relaxed">
                      To generate your personalized race guide, we collect:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>Race information (name, date, distance, location)</li>
                      <li>
                        Fitness metrics (weekly mileage, recent race times,
                        climbing strength)
                      </li>
                      <li>Goal finish time and race history</li>
                      <li>
                        Health information (GI issues, blister-prone areas)
                      </li>
                      <li>
                        Nutrition preferences (vegan, gluten-free, caffeine
                        sensitivity)
                      </li>
                      <li>Crew support availability</li>
                      <li>Race-specific concerns and fears</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Strava Fitness Data (Custom Tier Only)
                    </h3>
                    <p className="leading-relaxed">
                      If you connect your Strava account (Custom tier), we
                      collect:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>90 days of activity data (runs, distance, elevation)</li>
                      <li>Training volume and intensity metrics</li>
                      <li>Heart rate data (if available)</li>
                      <li>Pace and performance trends</li>
                    </ul>
                    <p className="mt-2 text-sm">
                      We only access data necessary for generating your race
                      guide. You can revoke Strava access at any time.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Automatically Collected Information
                    </h3>
                    <p className="leading-relaxed">
                      We automatically collect certain information when you use
                      our service:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>IP address</li>
                      <li>Browser type and version</li>
                      <li>Device information</li>
                      <li>Usage data and analytics (via PostHog)</li>
                      <li>Guide generation metrics (time, success rate)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  3. How We Use Your Information
                </h2>
                <p className="leading-relaxed mb-3">
                  We use your information to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Provide and maintain our service</li>
                  <li>Create and manage your account</li>
                  <li>
                    Generate personalized AI-powered race-day execution guides
                  </li>
                  <li>
                    Analyze Strava fitness data to create elevation-adjusted
                    pacing strategies
                  </li>
                  <li>Send race guides via email delivery</li>
                  <li>Send you important updates and notifications</li>
                  <li>Process payments and manage purchases</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Monitor and analyze usage patterns and guide quality</li>
                  <li>Improve our AI models and develop new features</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  4. Data Sharing and Disclosure
                </h2>
                <p className="leading-relaxed mb-3">
                  We may share your information in the following situations:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>With your consent:</strong> We may share your
                    information for any purpose with your explicit consent
                  </li>
                  <li>
                    <strong>Service providers:</strong> We share data with
                    third-party vendors who assist in providing our services
                  </li>
                  <li>
                    <strong>Legal requirements:</strong> We may disclose
                    information if required by law or valid legal process
                  </li>
                  <li>
                    <strong>Business transfers:</strong> In connection with any
                    merger, sale, or acquisition
                  </li>
                  <li>
                    <strong>Protection of rights:</strong> To protect our
                    rights, privacy, safety, or property
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  5. Third-Party Services
                </h2>
                <p className="leading-relaxed">
                  We use the following third-party services that may collect or
                  process information:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                  <li>
                    <strong>Google Sign-In:</strong> For authentication services
                  </li>
                  <li>
                    <strong>Polar.sh:</strong> For payment processing and
                    subscription management
                  </li>
                  <li>
                    <strong>Strava API:</strong> For accessing your fitness data
                    (Custom tier only, with your explicit authorization)
                  </li>
                  <li>
                    <strong>Anthropic (Claude API):</strong> For AI-powered guide generation
                    (your questionnaire data is processed to create guides)
                  </li>
                  <li>
                    <strong>PostHog:</strong> For product analytics and session
                    replay
                  </li>
                  <li>
                    <strong>Cloudflare R2:</strong> For secure PDF storage and
                    delivery
                  </li>
                  <li>
                    <strong>Resend:</strong> For transactional email delivery
                  </li>
                  <li>
                    <strong>Neon PostgreSQL:</strong> For secure database
                    hosting
                  </li>
                </ul>
                <p className="mt-3 leading-relaxed">
                  These services have their own privacy policies governing the
                  use of your information. We carefully select service providers
                  that maintain strong data protection standards.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  6. Data Security
                </h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational security
                  measures to protect your personal information. However, no
                  method of transmission over the Internet or electronic storage
                  is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  7. Data Retention
                </h2>
                <p className="leading-relaxed">
                  We retain your personal information for as long as necessary
                  to provide our services and fulfill the purposes outlined in
                  this Privacy Policy. We will also retain and use your
                  information to comply with legal obligations, resolve
                  disputes, and enforce our agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  8. Your Rights
                </h2>
                <p className="leading-relaxed mb-3">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Access:</strong> Request access to your personal
                    information
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of
                    inaccurate information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal
                    information
                  </li>
                  <li>
                    <strong>Portability:</strong> Request a copy of your data in
                    a portable format
                  </li>
                  <li>
                    <strong>Objection:</strong> Object to certain processing of
                    your information
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  9. Children&aposs Privacy
                </h2>
                <p className="leading-relaxed">
                  Our service is not intended for children under 13 years of
                  age. We do not knowingly collect personal information from
                  children under 13. If you are a parent or guardian and believe
                  your child has provided us with personal information, please
                  contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  10. International Data Transfers
                </h2>
                <p className="leading-relaxed">
                  Your information may be transferred to and processed in
                  countries other than your country of residence. These
                  countries may have data protection laws that are different
                  from the laws of your country.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  11. Updates to This Policy
                </h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the &aposLast updated&apos date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  12. Contact Us
                </h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us at:
                </p>
                <div className="mt-3 space-y-1">
                  <p>Email: privacy@paceline.run</p>
                  <p>Support: support@paceline.run</p>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
