"use client";

import Link from "next/link";
import {
  ClipboardList,
  Loader2,
  CheckSquare,
  ShieldAlert,
  Printer,
  BookOpen,
} from "lucide-react";
import { ArrowRight } from "lucide-react";

interface NextStepsProps {
  activeGuide: {
    questionnaire: {
      raceName: string;
      raceDate: Date;
      completedAt: Date | null;
    };
    guide: {
      id: string;
      status: string;
    } | null;
  } | null;
  checklistProgress: Record<string, boolean>;
  totalChecklistItems: number;
  hasPurchase: boolean;
}

interface StepItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
}

function getDaysUntil(date: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

const iconStyle = { color: "#2C5F4D", width: 20, height: 20 };

export function NextSteps({
  activeGuide,
  checklistProgress,
  totalChecklistItems,
  hasPurchase,
}: NextStepsProps) {
  const checkedCount = Object.values(checklistProgress).filter(Boolean).length;
  const checklistPct = totalChecklistItems > 0 ? (checkedCount / totalChecklistItems) * 100 : 0;

  const daysUntil = activeGuide
    ? getDaysUntil(new Date(activeGuide.questionnaire.raceDate))
    : null;

  const steps: StepItem[] = [];

  // Priority 1: Questionnaire incomplete
  if (
    activeGuide &&
    !activeGuide.questionnaire.completedAt &&
    steps.length < 3
  ) {
    steps.push({
      icon: <ClipboardList style={iconStyle} />,
      title: "Complete your questionnaire",
      description:
        "Your personalized guide can't be built until the questionnaire is finished.",
      action: (
        <Link
          href="/dashboard/questionnaire"
          className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
          style={{ color: "#C87350", fontFamily: "Inter, sans-serif" }}
        >
          Start now <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      ),
    });
  }

  // Priority 2: Guide is generating
  if (
    activeGuide?.guide?.status === "generating" &&
    steps.length < 3
  ) {
    steps.push({
      icon: <Loader2 style={{ ...iconStyle, animation: "spin 1.5s linear infinite" }} />,
      title: "Your guide is being built",
      description:
        "We'll email you as soon as your personalized race plan is ready to download.",
      action: (
        <span
          className="text-sm"
          style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}
        >
          No action needed
        </span>
      ),
    });
  }

  // Priority 3: Guide ready but checklist under 25%
  if (
    activeGuide?.guide?.status === "completed" &&
    checklistPct < 25 &&
    steps.length < 3
  ) {
    steps.push({
      icon: <CheckSquare style={iconStyle} />,
      title: "Start your Race Readiness Checklist",
      description:
        "24 tasks across 4 phases. Start with 8 Weeks Out — it sets up everything else.",
      action: (
        <a
          href="#checklist"
          className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
          style={{ color: "#C87350", fontFamily: "Inter, sans-serif" }}
        >
          Open checklist <ArrowRight className="w-3.5 h-3.5" />
        </a>
      ),
    });
  }

  // Priority 4: Race under 14 days
  if (daysUntil !== null && daysUntil <= 14 && daysUntil > 0 && steps.length < 3) {
    steps.push({
      icon: <ShieldAlert style={iconStyle} />,
      title: "Review your contingency protocols",
      description:
        `${daysUntil} days out. Re-read your guide's contingency section — GI, blisters, heat, and mental fallback plans.`,
      action: (
        <Link
          href="/dashboard/guides"
          className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
          style={{ color: "#C87350", fontFamily: "Inter, sans-serif" }}
        >
          Open guide <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      ),
    });
  }

  // Priority 5: Race under 7 days
  if (daysUntil !== null && daysUntil <= 7 && daysUntil > 0 && steps.length < 3) {
    steps.push({
      icon: <Printer style={iconStyle} />,
      title: "Print your crew cheat sheet and label your drop bags",
      description:
        "Last chance to organize logistics before race week chaos kicks in.",
      action: (
        <Link
          href="/dashboard/guides"
          className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
          style={{ color: "#C87350", fontFamily: "Inter, sans-serif" }}
        >
          View guide <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      ),
    });
  }

  // Priority 6: No guide purchased
  if (!hasPurchase && steps.length < 3) {
    steps.push({
      icon: <BookOpen style={iconStyle} />,
      title: "Get your personalized race guide",
      description:
        "Built around your fitness, your race, and your crew. Three tiers — starting at Essential.",
      action: (
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
          style={{ color: "#C87350", fontFamily: "Inter, sans-serif" }}
        >
          See plans <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      ),
    });
  }

  if (steps.length === 0) {
    return null;
  }

  return (
    <section>
      <h2
        className="text-xl font-semibold mb-1"
        style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}
      >
        Next Steps
      </h2>
      <p
        className="text-sm mb-5"
        style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}
      >
        What to do right now — in order.
      </p>

      <div className="flex flex-col gap-3">
        {steps.slice(0, 3).map((step, i) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-xl border p-5"
            style={{ borderColor: "#E8E0D6", backgroundColor: "#FFFFFF" }}
          >
            <div
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#EAF5F0" }}
            >
              {step.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="font-semibold text-sm mb-0.5"
                style={{ color: "#1A2B24", fontFamily: "Inter, sans-serif" }}
              >
                {step.title}
              </p>
              <p
                className="text-sm mb-2"
                style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}
              >
                {step.description}
              </p>
              {step.action}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
