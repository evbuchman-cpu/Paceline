import { Gauge, Users, Mountain, Utensils, Wrench, Package } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Gauge,
    title: "Never Miss a Cutoff Again",
    description:
      "See your cutoff buffer at every aid station—🟢🟡🔴 coded so you know when to push or recover. No more mile-62 panic.",
  },
  {
    icon: Mountain,
    title: "Pacing That Actually Matches the Terrain",
    description:
      "Strava-powered pacing adjusted for elevation, your climbing strength, and training load. The mountains won't catch you off guard.",
    badge: "Custom Tier",
  },
  {
    icon: Package,
    title: "Drop Bag Strategy (No More Packing Panic)",
    description:
      "Know exactly what to pack for each station. Weather-adjusted lists, critical gear prioritized, no overpacking. Stop panicking at 2am the night before.",
  },
  {
    icon: Utensils,
    title: "Nutrition Timeline (No More GI Disasters)",
    description:
      "Know exactly what to eat and when. No bonking at mile 40. No puking at mile 50.",
  },
  {
    icon: Users,
    title: "Crew Instructions They'll Actually Understand",
    description:
      "Your crew knows when you'll arrive and what you need. No parking lot chaos. No forgotten headlamps.",
  },
  {
    icon: Wrench,
    title: "When Things Go Wrong (And They Will)",
    description:
      "Exact action plans for blisters, GI issues, falling behind—tailored to what derails you most.",
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2C5F4D] mb-4 text-balance">
            Stop piecing together advice. Start following your plan.
          </h2>
          <p className="font-serif text-xl text-[#4A5859]">No more scattered advice. No more cutoff anxiety. Just mile-by-mile instructions you can actually execute.</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="
                rounded-lg border-2 border-transparent bg-white
                shadow-[0_2px_12px_rgba(44,95,77,0.12)]
                hover:shadow-[0_8px_24px_rgba(44,95,77,0.20)]
                hover:-translate-y-[3px]
                hover:border-[#2C5F4D]/30
                transition-all duration-200 ease-out
              "
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="w-12 h-12 rounded-lg bg-[#D4B896]/20 flex items-center justify-center">
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
                <p className="font-serif text-base text-[#4A5859] leading-[1.7]">{feature.description}</p>
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
        <div className="py-10 px-8 text-center bg-[#F5F1EA] border-2 border-[#2C5F4D] rounded-lg mx-auto max-w-4xl">
          <h3 className="font-sans font-semibold text-3xl text-[#2C5F4D] mb-4">
            Finish with Confidence, Not Chaos
          </h3>
          <a href="#pricing">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#C87350] text-[#C87350] hover:bg-[#C87350] hover:text-white font-semibold"
            >
              Get My Race Day Plan
            </Button>
          </a>
          <p className="font-serif text-base text-[#4A5859] mt-3">
            Plans from $7. Ready in 10 minutes.
          </p>
        </div>
      </div>
    </section>
  )
}
