import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnxietyMeter } from "./anxiety-meter"

interface ComparisonCardItem {
  icon: React.ReactNode;
  text: string;
}

interface ComparisonCardProps {
  type: "problem" | "solution";
  title: string;
  badge?: string;
  items: ComparisonCardItem[];
  anxietyLevel: number;
  className?: string;
}

export function ComparisonCard({
  type,
  title,
  badge,
  items,
  anxietyLevel,
  className
}: ComparisonCardProps) {
  const isProblem = type === "problem"

  return (
    <div
      className={cn(
        "relative p-8 rounded-lg transition-all duration-300 flex flex-col",
        isProblem
          ? "bg-red-50/50 border border-red-200 opacity-70"
          : "bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-400 shadow-xl ring-2 ring-green-200 ring-offset-4",
        className
      )}
    >
      {/* Badge (solution only) */}
      {badge && !isProblem && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C87350] text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
          {badge}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            isProblem ? "bg-red-500" : "bg-green-500"
          )}
        >
          {isProblem ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Check className="w-6 h-6 text-white" />
          )}
        </div>
        <h3 className="font-sans font-medium text-2xl text-[#2C5F4D]">{title}</h3>
      </div>

      {/* Items List */}
      <ul className="space-y-4 flex-grow">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2 font-serif text-[#4A5859] transition-all duration-200 hover:translate-x-1 hover:text-[#2C5F4D]"
          >
            {item.icon}
            <span>{item.text}</span>
          </li>
        ))}
      </ul>

      {/* Anxiety Meter - Always at bottom */}
      <AnxietyMeter
        level={anxietyLevel}
        variant={isProblem ? "problem" : "solution"}
        label="Pre-Race Anxiety Level"
      />
    </div>
  )
}
