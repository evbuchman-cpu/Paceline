"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What's the difference between Essential ($29) and Custom ($99)?",
    answer:
      "Essential ($29) gives you the fundamentals: section-by-section pacing strategy (flat terrain baseline), crew timing sheet, drop bag checklist, cutoff tracker, and nutrition timeline. Perfect for your first ultra or straightforward courses.\n\nCustom ($99) is built for runners who want zero guesswork. We analyze 90 days of YOUR Strava data to create elevation-adjusted pacing specific to your fitness. You get cutoff buffer predictions (🟢🟡🔴 status at every aid station), personalized nutrition based on your dietary needs, drop bag strategy tailored to the course, and contingency protocols for GI issues, blisters, and falling behind pace.\n\n60% of runners choose Custom for the Strava integration and cutoff peace of mind.",
  },
  {
    question: "How does Strava integration work?",
    answer:
      "When you fill out the Custom tier questionnaire, you'll click \"Connect Strava\" (1-click OAuth, takes 5 seconds). We automatically analyze your last 90 days of runs—looking at your recent paces, climbing ability, training volume, and effort distribution. Then we map that to your target race's course profile, elevation, and aid stations to create a minute-by-minute pacing strategy tailored to YOUR actual fitness, not a generic formula.\n\nFor example: If Wasatch's mile 45-52 section gains 3,200 feet, we calculate your exact target pace. Strong climber? You might hold 14:30/mile. Struggle with vert? We'll recommend 16:45/mile to keep your cutoff buffer safe.\n\nNo Strava? No problem. You can manually enter your recent race results and training paces in the questionnaire.",
  },
  {
    question: "Is this just a generic template with my name on it?",
    answer:
      "No. Every Custom guide is built from YOUR Strava training data (recent paces, climbing ability, weekly volume) and THIS race's elevation profile, aid station locations, and cutoff times. The pacing strategy is calculated specifically for you—not a one-size-fits-all template.\n\nIf you're strong on climbs, we adjust your uphill pacing differently than someone who struggles. If Wasatch's mile 45-52 section gains 3,200 feet, we calculate the exact pace you should hold based on your fitness. Essential tier uses proven baseline strategies that work for most runners, but Custom tier is where true personalization happens.",
  },
  {
    question: "How accurate are your cutoff predictions?",
    answer:
      "Very accurate when you use Custom tier with Strava integration. We analyze your actual fitness from 90 days of Strava data, map it to the exact course profile (every climb, descent, flat section), calculate your predicted arrival time at each aid station, and compare that to race cutoffs to show your buffer: 🟢 3+ hours, 🟡 1-3 hours, 🔴 <1 hour.\n\nEssential tier gives you cutoff tracking with your goal pace. Custom tier predicts down to the minute based on YOUR fitness data. That's the difference between guessing and knowing.",
  },
  {
    question: "Can I see a sample guide before I buy?",
    answer:
      "Every guide includes 8 comprehensive sections: Race Overview (course profile, elevation, aid stations), Pacing Strategy (section-by-section targets, Strava-adjusted for Custom tier), Cutoff Management (buffer calculator with 🟢🟡🔴 status), Crew Logistics (predicted arrival times, crew instructions), Drop Bag Strategy (station-specific packing lists), Nutrition Timeline (personalized fueling plan, calorie/electrolyte targets), Contingency Protocols (GI issues, blisters, falling behind), and Mental Strategy (mantras, tough section tactics).\n\nCustom tier also includes a one-page Crew Cheat Sheet (printable, laminated-friendly) and Quick Reference Card for race-day carry (wallet-sized).\n\nEmail us at hello@paceline.run to request a redacted sample.",
  },
  {
    question: "I've already spent $1,200 on this race. Is $99 more really necessary?",
    answer:
      "Think of it as insurance for your training investment. You've put in 350+ hours training over 14 months. You've paid for entry ($400-500), travel ($300-500), lodging ($200-400). That's $1,200 and a year of early mornings.\n\n$99 is 8% of your race budget—but it protects 100% of your training. One DNF because you didn't know what to do at mile 70? You're redoing the entire training cycle. That's another year.\n\nPaceline users report 15% higher finish rates and 40% lower pre-race anxiety. What's that worth?",
  },
  {
    question: "What if race conditions change (weather, course reroutes)?",
    answer:
      "Your guide includes built-in contingency plans for common scenarios: weather shifts (heat, cold, rain adjustments), GI issues (step-by-step protocols), and falling behind pace (recovery strategies).\n\nIf you need revisions after receiving your guide, email us within 7 days of delivery. We'll handle minor corrections (typos, wrong aid station data) at no charge. Major changes (switching to a different race, significant fitness changes after the guide is generated) require purchasing a new guide.",
  },
  {
    question: "Do I need crew to use this?",
    answer:
      "No! Both tiers work whether you have crew or not. Essential tier includes crew timing sheets if you have support, but the pacing and nutrition strategies work solo too. Custom tier optimizes crew logistics if you have them (predicted arrival times, station-by-station instructions). Running solo? We adjust the drop bag strategy and self-sufficiency protocols accordingly.\n\nJust indicate your crew situation in the questionnaire (Yes/Partial/No crew support) and we'll tailor the plan to your setup.",
  },
  {
    question: "I'm not tech-savvy. Will I be able to use this?",
    answer:
      "Yes. Zero tech skills needed. You'll fill out a 5-10 minute questionnaire with basic questions like \"goal finish time\" and \"crew support?\". We'll email you a PDF within 24-48 hours that you can print or view on your phone. No app download required. If you get stuck, email us—we respond within 24 hours (faster for Custom tier customers).",
  },
  {
    question: "What if I don't use Strava?",
    answer:
      "Essential tier ($29) doesn't require Strava at all—it uses proven baseline pacing strategies. Custom tier ($99) Strava integration is optional. You can manually enter your recent race results (times, distances, conditions), typical training paces (flat, hills), weekly mileage, and biggest climb trained.\n\nWe'll use that data to personalize your plan. Strava just makes it faster and more accurate because we can see 90 days of actual performance data instead of you estimating.",
  },
  {
    question: "Can I use this for races outside the US (like UTMB)?",
    answer:
      "Yes! You can build a guide for any ultramarathon worldwide. When you fill out the questionnaire, enter your race name and upload the official race guide PDF (if available). We'll extract the course data—elevation profile, aid station locations, cutoffs, terrain details—and build your personalized plan.\n\nWorks for UTMB (France), Western States (USA), Hardrock (USA), and any other ultra with publicly available course information.",
  },
  {
    question: "What if I need to change my race or request updates?",
    answer:
      "Essential tier: No updates included (one-time delivery). Custom tier: Email us within 7 days of delivery for minor corrections (typos, wrong aid station data, small adjustments) at no charge.\n\nMajor revisions like switching to a different race or significant fitness changes after the guide is generated require purchasing a new guide.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes. 30-day money-back guarantee. If you're not satisfied with your guide for any reason, email us within 30 days of purchase and we'll refund you—no questions asked. We want you to feel confident in your race plan. If we didn't deliver that, we'll make it right or refund you.\n\nCurrent refund rate: <3% (most runners love their guides).",
  },
  {
    question: "Can my coach or crew access the guide?",
    answer:
      "Yes! The PDF is yours to share. Custom guides include a one-page Crew Cheat Sheet (printable, laminated-friendly) and a Quick Reference Card for race-day carry (wallet-sized). Email the full guide to your coach for feedback. Print the crew sheet for your support team. We encourage collaboration—it's your race, your plan, your team.",
  },
  {
    question: "What races do you support?",
    answer:
      "Any ultramarathon worldwide. When you fill out the questionnaire, you'll enter your race name and upload the official race guide PDF (if available). We extract the course data—elevation profile, aid station locations, cutoffs, terrain details—and build your personalized plan.\n\nThis works for major races like Western States, UTMB, Leadville, Hardrock, Wasatch Front, and smaller regional ultras alike.",
  },
  {
    question: "When should I buy my guide?",
    answer:
      "Optimal timing: 8-12 weeks before your race. This gives you time to study the plan during taper, lets your crew review their cheat sheet and ask questions, allows you to practice the nutrition strategy on long training runs, and provides enough time to make gear adjustments based on recommendations.\n\nThat said, we've delivered guides as late as 2 weeks pre-race for runners who procrastinated. Earlier is better (more time to internalize the strategy), but we'll work with your timeline.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2C5F4D] mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="font-serif text-xl text-[#4A5859]">Everything you need to know before you buy</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-stone-200 overflow-hidden">
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-sans font-semibold text-lg text-[#2C5F4D] pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#4A5859] shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="font-serif text-[#4A5859] leading-relaxed whitespace-pre-line">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
