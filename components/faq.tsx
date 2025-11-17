"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { TopographicPattern } from "@/components/patterns"

const faqs = [
  {
    question: "Is this just a generic template with my name on it?",
    answer:
      "No. Every Custom guide is built from YOUR Strava training data (recent paces, climbing ability, weekly volume) and THIS race's elevation profile, aid station locations, and cutoff times. The pacing strategy is calculated specifically for you—not a one-size-fits-all template.\n\nFor example: If you're strong on climbs, we adjust your uphill pacing differently than someone who struggles. If Wasatch's mile 45-52 section gains 3,200 feet, we calculate the exact pace you should hold based on your fitness.",
  },
  {
    question: "What if race conditions change (weather, course reroutes)?",
    answer:
      "Custom guides include built-in contingency plans for common scenarios:\n• Weather shifts (heat, cold, rain adjustments)\n• GI issues (step-by-step protocols)\n• Falling behind pace (recovery strategies)\n\nFor Custom tier: We check the weather forecast 3 days before your race and email you any critical adjustments if needed.\n\nFor Ultra Bundle: You get 3 version updates per race—so if conditions change or your fitness improves, request an updated guide.",
  },
  {
    question: "I've already spent $1,200 on this race. Is $99 more really necessary?",
    answer:
      "Think of it as insurance for your training investment.\n\nYou've put in 350+ hours training over 14 months. You've paid for entry ($400-500), travel ($300-500), lodging ($200-400). That's $1,200 and a year of early mornings.\n\n$99 is 12.5% of your race budget—but it protects 100% of your training. One DNF because you didn't know what to do at mile 70? You're redoing the entire training cycle. That's another year.\n\nPaceline users report 15% higher finish rates and 40% lower pre-race anxiety. What's that worth?",
  },
  {
    question: "I'm not very tech-savvy. Will I be able to use this?",
    answer:
      'Yes. The guide is a simple PDF you can print or view on your phone. No app to download, no login required.\n\nThe questionnaire takes 5-10 minutes to fill out (basic questions like "What\'s your goal finish time?" and "Do you have crew support?").\n\nOnce you purchase, we email you the PDF within 24-48 hours. That\'s it.\n\nIf you get stuck, email us—we respond within 24 hours (or faster for Custom/Ultra customers).',
  },
  {
    question: "Can I use this for races outside the US (like UTMB)?",
    answer:
      "Yes! We support major international ultras including:\n• UTMB (France)\n• Western States, Hardrock, Leadville (USA)\n• And 50+ other races worldwide\n\nIf your race isn't in our database, you can upload the official race guide PDF when you fill out the questionnaire. We'll extract the course data and build your personalized plan.",
  },
  {
    question: "What if I need to change my race or request updates?",
    answer:
      "Essential tier: No updates included (one-time delivery)\n\nCustom tier: Email us within 7 days of delivery for minor corrections (typos, wrong aid station data). Major revisions (fitness changed, different race) require purchasing a new guide.\n\nUltra Bundle: 3 version updates per race included. Request updates anytime before your race (fitness improved, weather forecast changed, race rerouted, etc.). We deliver updated guides within 48 hours.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes. 30-day money-back guarantee.\n\nIf you're not satisfied with your guide for any reason, email us within 30 days of purchase and we'll refund you—no questions asked.\n\nWe want you to feel confident in your race plan. If we didn't deliver that, we'll make it right or refund you.\n\nCurrent refund rate: <3% (most runners love their guides).",
  },
  {
    question: "Can my coach or crew access the guide?",
    answer:
      'Yes! The PDF is yours to share.\n\nCustom guides include:\n• A one-page "Crew Cheat Sheet" (printable, laminated-friendly)\n• A "Quick Reference Card" for race-day carry (printable, wallet-sized)\n\nEmail the full guide to your coach for feedback. Print the crew sheet for your support team. We encourage collaboration—it\'s your race, your plan, your team.',
  },
  {
    question: "What races do you support?",
    answer:
      "We have pre-built profiles for 10+ major ultras:\n• Western States 100, UTMB (Mont Blanc), Leadville 100, Hardrock 100, Wasatch Front 100, Angeles Crest 100, Vermont 100, Javelina Jundred, and more...\n\nDon't see your race? No problem. Upload the official race guide PDF in the questionnaire, and we'll build your personalized plan from that data.",
  },
  {
    question: "When should I buy my guide?",
    answer:
      "Optimal timing: 8-12 weeks before your race.\n\nWhy?\n• Gives you time to study the plan during taper\n• Crew has time to review their cheat sheet and ask questions\n• You can practice nutrition strategy on long training runs\n• Enough time to make gear adjustments based on recommendations\n\nThat said, we've delivered guides as late as 2 weeks pre-race for runners who procrastinated. Earlier is better, but we'll work with your timeline.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-20 bg-[#F5F1EA] overflow-hidden">
      <TopographicPattern />
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
