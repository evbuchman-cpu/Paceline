import { TrendingUp, Clock, Users, Utensils, Wrench, Activity } from "lucide-react"
import { TopographicPattern } from "@/components/patterns"

const features = [
  {
    icon: TrendingUp,
    title: "Smart Pacing for Your Terrain",
    description:
      "Not all miles are equal. Get section-by-section pace targets adjusted for Wasatch's 26,882 feet of climbing—so you don't blow up at mile 70.",
  },
  {
    icon: Clock,
    title: "Know Exactly Where You Stand",
    description:
      "See your margin at every aid station. 🟢 Safe (3+ hours), 🟡 Caution (1-3 hours), 🔴 Risk (<1 hour). No more guessing if you'll make cutoffs.",
  },
  {
    icon: Users,
    title: "Crew-Ready in 10 Minutes",
    description:
      "One-page cheat sheet with predicted arrival times and exactly what you need at each station. Your crew will thank you.",
  },
  {
    icon: Utensils,
    title: "Fuel Smart, Not Hard",
    description:
      "Calorie and hydration targets matched to your effort level and the weather forecast. No more mile-70 bonks.",
  },
  {
    icon: Wrench,
    title: "When Things Go Wrong",
    description:
      "Step-by-step protocols for GI issues, blisters, heat exhaustion, falling behind. Print the quick reference card for race-day carry.",
  },
  {
    icon: Activity,
    title: "Your Data, Your Plan",
    description: "Connect your Strava to auto-import training paces and climbing ability. No manual data entry.",
    badge: "Coming Soon",
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-20 bg-[#F5F1EA] overflow-hidden">
      <TopographicPattern />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2C5F4D] mb-4 text-balance">
            Everything You Need to Finish Strong
          </h2>
          <p className="font-serif text-xl text-[#4A5859]">No guesswork. No spreadsheets. Just a plan that works.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#2C5F4D] bg-opacity-10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-[#2C5F4D]" />
                </div>
                {feature.badge && (
                  <span className="px-2 py-1 text-xs font-sans font-semibold bg-[#D4B896] text-[#2C5F4D] rounded">
                    {feature.badge}
                  </span>
                )}
              </div>
              <h3 className="font-sans font-semibold text-xl text-[#2C5F4D] mb-2">{feature.title}</h3>
              <p className="font-serif text-[#4A5859] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
