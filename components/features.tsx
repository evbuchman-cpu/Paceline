import { Clock, Gauge, Users, Mountain, Utensils, Wrench } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  {
    icon: Clock,
    title: "10-Minute Race Plan, Not 30 Hours",
    description:
      "Stop building spreadsheets. Answer 12 questions (Essential) or 19 questions (Custom), and get a complete race-day execution guide in minutes. No more nights lost to drop bag logistics and pacing calculations.",
  },
  {
    icon: Gauge,
    title: "Never Miss a Cutoff Again",
    description:
      "Get predicted arrival times for every aid station with color-coded buffer status (🟢 3+ hours, 🟡 1-3 hours, 🔴 <1 hour). Know exactly when to speed up or when you have room to recover. No more panicking at mile 62 with 8 minutes to spare.",
  },
  {
    icon: Users,
    title: "Crew Instructions They'll Actually Understand",
    description:
      "Your crew gets a simple timeline with predicted arrival times, exactly what gear to have ready, and what you'll need at each station. No more fumbling in parking lots or forgetting your headlamp at mile 78.",
  },
  {
    icon: Mountain,
    title: "Pacing That Actually Matches the Terrain",
    description:
      "Flat pace times don't work in the mountains. Get section-by-section pacing adjusted for elevation gain, your climbing strength, and recent training volume. Custom tier analyzes 90 days of your Strava data for personalized pace targets—no manual entry needed.",
    badge: "Custom Tier",
  },
  {
    icon: Utensils,
    title: "Nutrition Timeline (No More GI Disasters)",
    description:
      "Get an hour-by-hour fueling plan with calorie targets, electrolyte timing, and what to eat at each aid station. Personalized for your dietary preferences (vegan, gluten-free, caffeine-sensitive). No more bonking at mile 40 or puking at mile 50.",
  },
  {
    icon: Wrench,
    title: "When Things Go Wrong (And They Will)",
    description:
      "Get specific action plans for GI issues, blisters, falling behind pace, heat protocols, and equipment failures. Not generic motivation—exact steps to take based on your known weak points.",
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2C5F4D] mb-4 text-balance">
            Everything You Need to Finish Strong
          </h2>
          <p className="font-serif text-xl text-[#4A5859]">No guesswork. No spreadsheets. Just a plan that works.</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow border-0 bg-white shadow-md">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="w-12 h-12 rounded-lg bg-[#2C5F4D] bg-opacity-10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-[#2C5F4D]" />
                </div>
                {feature.badge && (
                  <Badge variant="secondary" className="bg-[#D4B896] text-[#2C5F4D] border-0">
                    {feature.badge}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="pt-2">
                <h3 className="font-sans font-medium text-xl text-[#2C5F4D] mb-2">{feature.title}</h3>
                <p className="font-serif text-[#4A5859] leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Block */}
        <div className="py-8 text-center">
          <p className="font-sans text-base text-[#4A5859]">
            Built for ultrarunners <span className="mx-2">|</span> Personalized for your fitness <span className="mx-2">|</span> Generated in minutes
          </p>
        </div>

        {/* CTA Section */}
        <div className="py-16 text-center bg-[#F5F1EA] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-lg">
          <h3 className="font-sans font-semibold text-3xl text-[#2C5F4D] mb-6">
            Ready to Stop Stressing and Start Planning?
          </h3>
          <Link href="/pricing">
            <Button
              size="lg"
              className="bg-[#C87350] hover:bg-[#C87350]/90 text-white font-sans font-medium mb-4"
            >
              See Pricing & Plans
            </Button>
          </Link>
          <p className="font-serif text-base text-[#4A5859] mt-4">
            Essential ($29) or Custom ($99). No subscription. One-time payment per race.
          </p>
        </div>
      </div>
    </section>
  )
}
