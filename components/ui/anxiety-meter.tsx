"use client"

import { cn } from "@/lib/utils"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

interface AnxietyMeterProps {
  level: number;
  variant: "problem" | "solution";
  label?: string;
  className?: string;
}

export function AnxietyMeter({
  level,
  variant,
  label = "Pre-Race Anxiety Level",
  className
}: AnxietyMeterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Animated number
  const isProblem = variant === "problem"
  const startValue = isProblem ? 0 : 8
  const endValue = level

  const springValue = useSpring(startValue, {
    bounce: 0,
    duration: 3000,
  })

  const displayValue = useTransform(springValue, (value) => Math.round(value))

  // Trigger animation when in view
  useEffect(() => {
    if (isInView) {
      springValue.set(endValue)
    }
  }, [isInView, springValue, endValue])

  return (
    <div className={cn(
      "mt-6 p-4 backdrop-blur-sm rounded-lg",
      isProblem
        ? "bg-red-50/80 border border-red-200/50"
        : "bg-green-50/80 border border-green-200/50",
      className
    )} ref={ref}>
      <div className="text-sm font-medium text-[#4A5859] mb-2">{label}</div>
      <div className="flex items-center gap-2">
        <div className={cn(
          "flex-1 h-3 rounded-full overflow-hidden",
          isProblem ? "bg-red-100" : "bg-green-100"
        )}>
          <motion.div
            className={cn(
              "h-full rounded-full",
              isProblem ? "bg-red-500" : "bg-green-500"
            )}
            initial={{ width: `${startValue * 10}%` }}
            animate={isInView ? { width: `${endValue * 10}%` } : { width: `${startValue * 10}%` }}
            transition={{
              duration: 3,
              ease: "easeOut",
            }}
          />
        </div>
        <motion.span
          className={cn(
            "text-lg font-bold tabular-nums",
            isProblem ? "text-red-500" : "text-green-500"
          )}
        >
          {isInView && (
            <motion.span>{displayValue}</motion.span>
          )}
          {!isInView && startValue}
          /10
        </motion.span>
      </div>
    </div>
  )
}
