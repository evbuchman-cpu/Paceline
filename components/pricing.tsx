import { Check, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TopographicPattern } from "@/components/patterns"

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 bg-white overflow-hidden">
      <TopographicPattern />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2C5F4D] mb-4 text-balance">
            Choose Your Plan
          </h2>
          <p className="font-serif text-xl text-[#4A5859]">From first-timer basics to multi-race veterans</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Essential Plan */}
          <div className="p-8 bg-white border-2 border-stone-200 rounded-lg">
            <h3 className="font-sans font-semibold text-2xl text-[#2C5F4D] mb-2">Essential</h3>
            <div className="mb-4">
              <span className="font-sans font-bold text-4xl text-[#2C5F4D]">$29</span>
              <span className="font-serif text-[#4A5859]"> per race</span>
            </div>
            <p className="font-serif text-sm text-[#4A5859] mb-6">Perfect for first ultras or runners on a budget</p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Basic pacing chart</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Standard nutrition timeline</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Generic crew logistics sheet</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Course overview</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Drop bag checklist</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-5 h-5 text-stone-300 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-stone-400">Personalized pacing</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-5 h-5 text-stone-300 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-stone-400">Cutoff buffer calculator</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-5 h-5 text-stone-300 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-stone-400">Weather-adjusted strategy</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-5 h-5 text-stone-300 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-stone-400">Contingency plans</span>
              </li>
            </ul>

            <Button
              className="w-full border-2 border-[#4A5859] text-[#4A5859] hover:bg-[#4A5859] hover:text-white font-semibold bg-transparent"
              variant="outline"
            >
              Get Essential
            </Button>
          </div>

          {/* Custom Plan - Most Popular */}
          <div className="p-8 bg-[#2C5F4D] bg-opacity-5 border-2 border-[#2C5F4D] rounded-lg relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#C87350] text-white font-sans font-semibold text-sm rounded-full">
                <Star className="w-4 h-4 fill-white" />
                Most Popular
              </span>
            </div>

            <h3 className="font-sans font-semibold text-2xl text-[#2C5F4D] mb-2">Custom</h3>
            <div className="mb-4">
              <span className="font-sans font-bold text-4xl text-[#2C5F4D]">$99</span>
              <span className="font-serif text-[#4A5859]"> per race</span>
            </div>
            <p className="font-serif text-sm text-[#4A5859] mb-6">Everything you need to finish strong</p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Everything in Essential</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Personalized pacing (elevation-adjusted)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Cutoff buffer calculator (🟢🟡🔴)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Weather-adjusted strategy</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Contingency plans (GI, blisters, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Crew timing predictions</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">All Essential add-ons included ($40 value)</span>
              </li>
            </ul>

            <Button className="w-full h-14 bg-[#C87350] hover:bg-[#A85A3C] text-white font-semibold text-lg shadow-lg">
              Get Custom → $99
            </Button>
          </div>

          {/* Ultra Bundle */}
          <div className="p-8 bg-white border-2 border-stone-200 rounded-lg relative">
            <div className="absolute -top-3 right-4">
              <span className="inline-block px-3 py-1 bg-[#D4B896] text-[#2C5F4D] font-sans font-semibold text-sm rounded">
                Best Value
              </span>
            </div>

            <h3 className="font-sans font-semibold text-2xl text-[#2C5F4D] mb-2">Ultra Bundle</h3>
            <div className="mb-4">
              <span className="font-sans font-bold text-4xl text-[#2C5F4D]">$497</span>
              <span className="font-serif text-[#4A5859]"> for 5 races</span>
            </div>
            <p className="font-serif text-sm text-[#4A5859] mb-6">For runners doing 2+ ultras per year</p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">5× Custom race guides</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">All add-ons for all races</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">3 version updates per race (15 total)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Priority email support (24-hour response)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Bonus: Ultimate Ultramarathon Playbook PDF</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-serif text-sm text-[#4A5859]">Valid for 12 months</span>
              </li>
            </ul>

            <div className="mb-6 p-3 bg-[#D4B896] bg-opacity-30 rounded">
              <p className="font-serif text-sm text-[#4A5859]">
                <span className="line-through">Regular price: $1,145</span>
              </p>
              <p className="font-sans font-semibold text-[#2C5F4D]">You save: $648 (57% off)</p>
              <p className="font-serif text-sm text-[#4A5859]">Just $99 per guide</p>
            </div>

            <Button
              className="w-full border-2 border-[#4A5859] text-[#4A5859] hover:bg-[#4A5859] hover:text-white font-semibold bg-transparent"
              variant="outline"
            >
              Get Ultra Bundle
            </Button>
          </div>
        </div>

        {/* Money-Back Guarantee */}
        <div className="flex items-center justify-center gap-3 p-6 bg-[#F5F1EA] rounded-lg border border-[#D4B896]">
          <div className="text-3xl">🛡️</div>
          <p className="font-serif text-[#4A5859] leading-relaxed max-w-3xl">
            <span className="font-semibold">30-Day Money-Back Guarantee.</span> If your guide doesn&apos;t reduce your
            anxiety or you&apos;re not satisfied, we&apos;ll refund you—no questions asked.
          </p>
        </div>
      </div>
    </section>
  )
}
