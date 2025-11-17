"use client"

import { Button } from "@/components/ui/button"
import { Star, ArrowRight } from "lucide-react"
import { TopographicPattern } from "@/components/patterns"

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-16 pb-8 md:pt-20 md:pb-12 px-4 sm:px-6 lg:px-8 min-h-screen overflow-hidden"
    >
      <TopographicPattern />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-4xl lg:text-5xl xl:text-5xl font-semibold text-foreground leading-tight">
                Stop piecing together
                <br />
                <span className="text-[#2C5F4D]">fragmented race plans</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-serif leading-relaxed">
                Personalized ultramarathon race guides with nutrition timing, pacing splits, and
                terrain-specific strategies—so you can focus on the miles, not the spreadsheets.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("pricing")}
                className="bg-[#C87350] hover:bg-[#A85A3C] text-white text-base font-semibold"
                data-testid="button-hero-primary-cta"
              >
                Build Your Race Plan
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("email-capture")}
                className="text-base font-medium"
                data-testid="button-hero-secondary-cta"
              >
                Get Free Guide
              </Button>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C87350] text-[#C87350]" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Trusted by <span className="font-semibold text-foreground">100+ ultrarunners</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-[350px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
            <img
              src="/gritty-ultrarunner-mid-race-struggle-determination.jpg"
              alt="Ultrarunner executing race strategy during ultramarathon"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
