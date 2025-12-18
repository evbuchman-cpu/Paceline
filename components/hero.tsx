"use client"

import { Button } from "@/components/ui/button"
import { Star, ArrowRight } from "lucide-react"
import Image from "next/image"

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
      className="relative pt-16 pb-12 md:pt-24 md:pb-20 px-4 sm:px-6 lg:px-8 min-h-[90vh] flex items-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="space-y-5">
              {/*
                Hero headline sizing - optimized for visual impact
                - text-[26px] sm:text-[32px] lg:text-[38px] xl:text-[44px] - Mobile-friendly sizing
                - whitespace-nowrap - Keeps each sentence on one line for dramatic effect
                - font-bold - Brand requirement (700 weight)
              */}
              <h1 className="font-sans text-[26px] sm:text-[32px] lg:text-[38px] xl:text-[44px] font-bold text-foreground leading-[1.2]">
                <span className="block whitespace-nowrap">8 Sections. Zero Guesswork.</span>
                <span className="block whitespace-nowrap text-[#2C5F4D]">One Goal: The Finish Line.</span>
              </h1>
              <div className="font-serif text-sm sm:text-base lg:text-base text-[#4A5859] leading-[1.6] space-y-2">
                <p className="whitespace-nowrap">
                  Personalized ultramarathon race guides built for <span className="font-semibold text-[#C87350]">Your fitness</span>, <span className="font-semibold text-[#C87350]">Your crew</span>, <span className="font-semibold text-[#C87350]">Your race</span>.
                </p>
                <p className="whitespace-nowrap">
                  Strava-powered pacing. Nutrition timelines. Crew logistics. Delivered in 24 hours.
                </p>
                <p className="whitespace-nowrap">
                  You spend 10 minutes answering questions. We handle the rest.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("pricing")}
                className="bg-[#C87350] hover:bg-[#A85A3C] text-white text-lg font-bold px-10 py-7 shadow-xl"
                data-testid="button-hero-primary-cta"
              >
                Build Your Race Plan
              </Button>
            </div>

            <div className="flex items-center gap-3">
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

          <div className="relative w-full max-w-md mx-auto lg:max-w-lg rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/paceline-hero-finish-line.png"
              alt="Ultrarunner crossing finish line with arms raised in victory"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
