import { ArrowRight, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimeComparisonBadgeProps {
  before: string;
  after: string;
  savings: string;
  className?: string;
}

export function TimeComparisonBadge({
  before,
  after,
  savings,
  className
}: TimeComparisonBadgeProps) {
  return (
    <div className={cn("mb-8 text-center", className)}>
      {/* Desktop Layout */}
      <div className="hidden md:inline-flex items-center gap-4 bg-white border-2 border-[#C87350] rounded-2xl px-8 py-6 shadow-lg">
        <div className="text-center">
          <div className="text-4xl font-bold text-red-500">{before}</div>
          <div className="text-sm text-[#4A5859]">DIY Planning</div>
        </div>
        <div className="flex flex-col items-center">
          <ArrowRight className="w-12 h-12 text-[#C87350]" />
          <div className="text-xs font-semibold text-[#C87350] mt-1">{savings} faster</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-green-500">{after}</div>
          <div className="text-sm text-[#4A5859]">With Paceline</div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="inline-flex md:hidden flex-col items-center gap-3 bg-white border-2 border-[#C87350] rounded-2xl px-6 py-6 shadow-lg">
        <div className="text-center">
          <div className="text-3xl font-bold text-red-500">{before}</div>
          <div className="text-xs text-[#4A5859]">DIY Planning</div>
        </div>
        <div className="flex flex-col items-center">
          <ArrowDown className="w-10 h-10 text-[#C87350]" />
          <div className="text-xs font-semibold text-[#C87350] mt-1">{savings} faster</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-500">{after}</div>
          <div className="text-xs text-[#4A5859]">With Paceline</div>
        </div>
      </div>
    </div>
  )
}
