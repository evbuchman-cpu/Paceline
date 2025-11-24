import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProblemSolution() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2C5F4D] mb-4 text-balance">
            Stop Piecing Together Advice From Scattered Sources
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Current State */}
          <div className="p-8 bg-red-50 rounded-lg border-2 border-red-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                <X className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-sans font-medium text-2xl text-[#2C5F4D]">How Most Ultrarunners Plan</h3>
            </div>
            <ul className="space-y-3">
              {[
                "12+ hours googling pacing strategies",
                "23 browser tabs with conflicting advice",
                "Excel spreadsheet with broken formulas",
                "Reddit threads from 2019",
                "Generic crew instructions",
                "Anxiety level: 8/10 pre-race",
                "Result: Barely make cutoffs or DNF",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 font-serif text-[#4A5859]">
                  <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Paceline Solution */}
          <div className="p-8 bg-green-50 rounded-lg border-2 border-green-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-sans font-medium text-2xl text-[#2C5F4D]">How Paceline Users Plan</h3>
            </div>
            <ul className="space-y-3">
              {[
                "10 minutes to purchase + fill questionnaire",
                "AI-powered race plan in 24-48 hours",
                "Section-by-section pacing (elevation-adjusted)",
                "Crew cheat sheet with arrival times",
                "Nutrition timeline + contingency plans",
                "Anxiety level: 2/10 pre-race",
                "Result: 3+ hour cutoff buffers, organized crew",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 font-serif text-[#4A5859]">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center">
          <Button size="lg" className="bg-[#C87350] hover:bg-[#A85A3C] text-white font-semibold" asChild>
            <a href="/pricing">Ready to stop winging it? Get your personalized guide →</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
