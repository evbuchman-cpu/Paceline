"use client"

import { Button } from "@/components/ui/button"
import { TimeComparisonBadge } from "@/components/ui/time-comparison-badge"
import { ComparisonCard } from "@/components/ui/comparison-card"
import {
  Clock,
  FileText,
  Activity,
  User,
  ClipboardList,
  HelpCircle,
  Zap,
  TrendingUp,
  Target,
  CheckCircle2,
  Users,
  Check,
  ArrowDown,
} from "lucide-react"

interface ProblemSolutionSectionProps {
  variant?: "two-column" | "timeline"
}

// Problem items data
const problemItems = [
  {
    icon: <Clock className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />,
    text: "30 hours lost to research when you could be training or resting",
  },
  {
    icon: <Activity className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />,
    text: "Hit mile 38 too fast, bonk at mile 62, miss cutoff by 8 minutes",
  },
  {
    icon: <ClipboardList className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />,
    text: '"Honey, what do you need at mile 45?" - crew panics, you improvise',
  },
  {
    icon: <HelpCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />,
    text: "Forgot spare headlamp. It's mile 80. The sun is setting.",
  },
  {
    icon: <FileText className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />,
    text: '"At mile 62, slow down" - but by how much? Blogs don\'t say.',
  },
  {
    icon: <User className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />,
    text: "Generic plan for someone 20 lbs lighter running 70 mpw. You run 50.",
  },
]

// Solution items data
const solutionItems = [
  {
    icon: <Zap className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />,
    text: "Order in 10 min. Guide ready in 5. Race-ready today.",
  },
  {
    icon: <Target className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />,
    text: '"Mile 38-45: 12:30 pace, +2800ft climb" - exact targets, no guessing',
  },
  {
    icon: <Users className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />,
    text: '"4:30pm: Meet Sarah at Winfield. Hand you trekking poles + headlamp."',
  },
  {
    icon: <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />,
    text: "🟢 Mile 62: Arrive 3:15 before cutoff - confidence, not panic",
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />,
    text: "90 days of runs analyzed. Pacing adjusted for YOUR Fitness.",
  },
  {
    icon: <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />,
    text: "8 comprehensive sections—nothing left to chance",
  },
]

export function ProblemSolution({
  variant = "two-column",
}: ProblemSolutionSectionProps) {
  if (variant === "two-column") {
    return (
      <section className="relative py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Headline */}
          <div className="text-center mb-8">
            <h2 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2C5F4D] mb-4 text-balance">
              Your fitness. Your crew. Your race.
            </h2>
            <p className="font-serif text-lg text-[#4A5859] max-w-3xl mx-auto mb-8">
              AI-powered race plan personalized to YOUR fitness.
              <br />
              Built in 10 minutes, not 30 hours.
            </p>
          </div>

          {/* Time Comparison Badge */}
          <TimeComparisonBadge
            before="30 hours"
            after="10 minutes"
            savings="90%"
          />

          {/* Two-Column Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <ComparisonCard
              type="problem"
              title="How Most Ultrarunners Plan"
              items={problemItems}
              anxietyLevel={8}
            />
            <ComparisonCard
              type="solution"
              title="How Paceline Users Plan"
              badge="✨ The Paceline Way"
              items={solutionItems}
              anxietyLevel={2}
            />
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-[#C87350] hover:bg-[#A85A3C] text-white font-semibold"
              asChild
            >
              <a href="#pricing">
                Start Planning with Confidence
              </a>
            </Button>
            <p className="text-sm text-[#4A5859] mt-3">
              Essential $29 | Custom $99
            </p>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-[#4A5859]">
              <span>🔒 Secure Checkout</span>
              <span>💳 Money-Back Guarantee</span>
              <span>⭐ 4.8/5 Stars</span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Variation B: Timeline
  return <TimelineVariation />
}

// Helper component for timeline variation
function TimelineVariation() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Headline (same as two-column) */}
        <div className="text-center mb-8">
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2C5F4D] mb-4 text-balance">
            Your fitness. Your crew. Your race.
          </h2>
          <p className="font-serif text-lg text-[#4A5859] max-w-3xl mx-auto mb-8">
            AI-powered race plan personalized to YOUR fitness.
            <br />
            Built in 10 minutes, not 30 hours.
          </p>
        </div>

        {/* Time Comparison Badge */}
        <TimeComparisonBadge
          before="30 hours"
          after="10 minutes"
          savings="90%"
        />

        {/* Problem Card - Full Width */}
        <ComparisonCard
          type="problem"
          title="How Most Ultrarunners Plan"
          items={problemItems}
          anxietyLevel={8}
          className="mb-6"
        />

        {/* Arrow Separator */}
        <div className="flex items-center justify-center my-8">
          <div className="flex flex-col items-center">
            <ArrowDown className="w-12 h-12 text-[#C87350] mb-2 animate-bounce" />
            <p className="text-sm font-semibold text-[#C87350]">
              Transform Your Planning
            </p>
          </div>
        </div>

        {/* Solution Card - Full Width */}
        <ComparisonCard
          type="solution"
          title="How Paceline Users Plan"
          badge="✨ The Paceline Way"
          items={solutionItems}
          anxietyLevel={2}
          className="mb-12"
        />

        {/* CTA (same as two-column) */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-[#C87350] hover:bg-[#A85A3C] text-white font-semibold"
            asChild
          >
            <a href="#pricing">
              Start Planning with Confidence →
            </a>
          </Button>
          <p className="text-sm text-[#4A5859] mt-3">
            Essential $29 | Custom $99 | Ultra Bundle $497
          </p>
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-[#4A5859]">
            <span>🔒 Secure Checkout</span>
            <span>💳 Money-Back Guarantee</span>
            <span>⭐ 4.8/5 Stars</span>
          </div>
        </div>
      </div>
    </section>
  )
}
