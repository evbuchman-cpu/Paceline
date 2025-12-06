import { FileText, Bot, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrailMarkerDots } from "@/components/patterns"

const steps = [
  {
    number: 1,
    icon: FileText,
    title: "Tell Us About Your Race",
    description:
      "Fill out our 10-question form: race name, goal time, recent training paces, crew availability, biggest concerns. Takes 5 minutes.",
    time: "5 minutes",
  },
  {
    number: 2,
    icon: Bot,
    title: "We Build Your Plan",
    description:
      "Our system analyzes your fitness data, the course elevation profile, cutoff times, and weather forecast. Then generates your personalized race guide.",
    time: "Delivered in 24-48 hours",
  },
  {
    number: 3,
    icon: CheckCircle,
    title: "Execute With Confidence",
    description:
      "Download your PDF, print the crew cheat sheet and quick reference card. Study your plan. Show up on race day knowing exactly what to do at mile 62.",
    time: "Review in 30 minutes",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2C5F4D] mb-4 text-balance">
            From Purchase to Race-Ready in 48 Hours
          </h2>
        </div>

        <div className="relative">
          {/* Desktop: Horizontal Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2C5F4D] text-white font-sans font-bold text-2xl mb-6">
                    {step.number}
                  </div>
                  <div className="mb-4">
                    <step.icon className="w-12 h-12 text-[#C87350] mx-auto" />
                  </div>
                  <h3 className="font-sans font-medium text-xl text-[#2C5F4D] mb-3">{step.title}</h3>
                  <p className="font-serif text-[#4A5859] leading-relaxed mb-4">{step.description}</p>
                  <span className="inline-block px-3 py-1 bg-[#D4B896] text-[#2C5F4D] font-sans font-semibold text-sm rounded">
                    {step.time}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 w-8 h-8 text-[#C87350]" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile: Vertical Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2C5F4D] text-white font-sans font-bold text-2xl mb-4">
                    {step.number}
                  </div>
                  <div className="mb-4">
                    <step.icon className="w-12 h-12 text-[#C87350]" />
                  </div>
                  <h3 className="font-sans font-medium text-xl text-[#2C5F4D] mb-3">{step.title}</h3>
                  <p className="font-serif text-[#4A5859] leading-relaxed mb-4">{step.description}</p>
                  <span className="inline-block px-3 py-1 bg-[#D4B896] text-[#2C5F4D] font-sans font-semibold text-sm rounded">
                    {step.time}
                  </span>
                </div>
                {index < steps.length - 1 && <TrailMarkerDots />}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="bg-[#C87350] hover:bg-[#A85A3C] text-white font-semibold mb-4" asChild>
            <a href="/pricing">Get Your Race Plan → $99</a>
          </Button>
          <p className="font-serif text-[#4A5859]">30-day money-back guarantee. Instant delivery.</p>
        </div>
      </div>
    </section>
  )
}
