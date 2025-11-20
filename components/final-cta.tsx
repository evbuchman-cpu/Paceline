"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Lock, Check } from "lucide-react"

export function FinalCTA() {
  const [selectedTier, setSelectedTier] = useState("custom")

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Emotional Hook */}
          <div className="space-y-6">
            <h2 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2C5F4D] text-balance">
              Don&apos;t F*** Up a Year of Training
            </h2>

            <p className="font-serif text-lg leading-relaxed text-[#4A5859]">
              You&apos;ve invested 350 hours and $1,200 into this race. Don&apos;t leave your strategy to scattered Reddit posts
              and guesswork.
            </p>

            <div className="space-y-4 font-serif text-[#4A5859] leading-relaxed">
              <p>
                Alex Chen barely made the mile-62 cutoff at Angeles Crest with 8 minutes to spare. The anxiety from mile
                50-62 was worse than the physical pain.
              </p>
              <p>
                At his next ultra (Wasatch Front 100), he used Paceline. Finished in 28:42 with a 3.5-hour cutoff
                buffer. His crew said it was &quot;the most organized ultra support we&apos;ve ever done.&quot;
              </p>
              <p className="font-semibold text-[#2C5F4D]">
                What&apos;s the difference? 10 minutes to buy a guide vs. 30 hours of DIY planning.
              </p>
            </div>
          </div>

          {/* Right: CTA Form */}
          <div className="bg-[#F5F1EA] p-8 rounded-lg border-2 border-[#D4B896] shadow-xl">
            <h3 className="font-sans font-medium text-2xl text-[#2C5F4D] mb-6">Get Your Personalized Race Plan</h3>

            <form className="space-y-4">
              <div>
                <label className="block font-sans text-sm font-medium text-[#4A5859] mb-2">
                  Which race are you running?
                </label>
                <select className="w-full px-4 py-3 border border-stone-300 rounded-lg font-serif text-[#4A5859] focus:outline-none focus:ring-2 focus:ring-[#2C5F4D]">
                  <option>Western States 100</option>
                  <option>UTMB (Mont Blanc)</option>
                  <option>Wasatch Front 100</option>
                  <option>Hardrock 100</option>
                  <option>Leadville 100</option>
                  <option>Angeles Crest 100</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-[#4A5859] mb-2">Your email</label>
                <input
                  type="email"
                  placeholder="runner@email.com"
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg font-serif text-[#4A5859] focus:outline-none focus:ring-2 focus:ring-[#2C5F4D]"
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-[#4A5859] mb-3">Choose your tier</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border-2 border-stone-300 rounded-lg cursor-pointer hover:bg-white transition-colors">
                    <input
                      type="radio"
                      name="tier"
                      value="essential"
                      checked={selectedTier === "essential"}
                      onChange={(e) => setSelectedTier(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="font-sans text-[#4A5859]">
                      Essential - <span className="font-semibold">$29</span>
                    </span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border-2 border-[#2C5F4D] bg-[#2C5F4D] bg-opacity-5 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="tier"
                      value="custom"
                      checked={selectedTier === "custom"}
                      onChange={(e) => setSelectedTier(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="font-sans text-[#2C5F4D]">
                      Custom (Recommended) - <span className="font-semibold">$99</span>
                    </span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border-2 border-stone-300 rounded-lg cursor-pointer hover:bg-white transition-colors">
                    <input
                      type="radio"
                      name="tier"
                      value="bundle"
                      checked={selectedTier === "bundle"}
                      onChange={(e) => setSelectedTier(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="font-sans text-[#4A5859]">
                      Ultra Bundle - <span className="font-semibold">$497</span>
                    </span>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 bg-[#C87350] hover:bg-[#A85A3C] text-white font-semibold text-lg shadow-lg"
              >
                Get My Guide → ${selectedTier === "essential" ? "29" : selectedTier === "custom" ? "99" : "497"}
              </Button>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-serif text-sm text-[#4A5859]">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Delivered in 24-48 hours</span>
                </div>
                <div className="flex items-center gap-2 font-serif text-sm text-[#4A5859]">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2 font-serif text-sm text-[#4A5859]">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Instant email confirmation</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-4 border-t border-stone-300">
                <Lock className="w-4 h-4 text-[#4A5859]" />
                <span className="font-serif text-xs text-[#4A5859]">Secure checkout via Stripe</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
