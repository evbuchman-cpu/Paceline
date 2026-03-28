"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export interface CountdownRace {
  questionnaire: {
    raceName: string;
    raceDate: Date;
    completedAt: Date | null;
  };
  guide: {
    id: string;
    status: string;
  } | null;
  purchase: {
    createdAt: Date;
    tier: string;
  };
}

interface CountdownCardProps {
  races: CountdownRace[];
  checklistProgress: Record<string, boolean>;
  totalChecklistItems: number;
}

function formatRaceDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getDaysUntil(date: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function getTrainingProgress(purchaseDate: Date, raceDate: Date): number {
  const now = Date.now();
  const start = new Date(purchaseDate).getTime();
  const end = new Date(raceDate).getTime();
  if (end <= start) return 100;
  return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
}

type StatusBadge = { label: string; color: string; bg: string; dot: string };

function getStatusBadge(
  guide: { status: string } | null,
  questionnaire: { completedAt: Date | null },
  checklistPct: number
): StatusBadge {
  if (!questionnaire.completedAt || (guide && guide.status === "failed")) {
    return { label: "Action Needed", color: "#A85A3C", bg: "#FDF0EB", dot: "#A85A3C" };
  }
  if (!guide || guide.status === "generating") {
    return { label: "Guide Generating", color: "#C87350", bg: "#FDF4EE", dot: "#C87350" };
  }
  if (guide.status === "completed" && checklistPct >= 40) {
    return { label: "On Track", color: "#4A9B7F", bg: "#EAF5F0", dot: "#4A9B7F" };
  }
  return { label: "Check In", color: "#C87350", bg: "#FDF4EE", dot: "#C87350" };
}

export function CountdownCard({ races, checklistProgress, totalChecklistItems }: CountdownCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (races.length === 0) {
    return (
      <div className="rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6" style={{ backgroundColor: "#2C5F4D" }}>
        <div>
          <p className="text-lg font-semibold mb-1" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.7)" }}>
            Race countdown
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
            No race scheduled yet.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Source Serif 4, serif", fontSize: "17px" }}>
            Your personalized race plan begins with a guide. Build yours in minutes.
          </p>
        </div>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white whitespace-nowrap"
          style={{ backgroundColor: "#C87350", fontFamily: "Inter, sans-serif", fontSize: "16px" }}
        >
          Get Your Race Guide →
        </Link>
      </div>
    );
  }

  const race = races[Math.min(selectedIndex, races.length - 1)];
  const { questionnaire, guide, purchase } = race;

  const daysUntil = getDaysUntil(new Date(questionnaire.raceDate));
  const trainingProgress = getTrainingProgress(purchase.createdAt, questionnaire.raceDate);

  const checkedCount = Object.values(checklistProgress).filter(Boolean).length;
  const checklistPct = totalChecklistItems > 0 ? (checkedCount / totalChecklistItems) * 100 : 0;
  const badge = getStatusBadge(guide, questionnaire, checklistPct);
  const isPast = daysUntil < 0;

  return (
    <div className="rounded-xl p-8 md:p-10" style={{ backgroundColor: "#2C5F4D" }}>
      {/* Race selector — only shown when user has multiple races */}
      {races.length > 1 && (
        <div className="mb-6">
          <div className="relative inline-block">
            <select
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(Number(e.target.value))}
              className="appearance-none pr-8 pl-3 py-2 rounded-lg text-sm font-semibold cursor-pointer"
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                color: "#FFFFFF",
                border: "1px solid rgba(255,255,255,0.25)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {races.map((r, i) => (
                <option key={i} value={i} style={{ backgroundColor: "#2C5F4D", color: "#FFFFFF" }}>
                  {r.questionnaire.raceName} — {new Date(r.questionnaire.raceDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgba(255,255,255,0.7)" }} />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1">
          {/* Label + badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif", letterSpacing: "0.12em" }}>
              {races.length > 1 ? "Selected Race" : "Next Race"}
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: badge.bg, color: badge.color, fontFamily: "Inter, sans-serif" }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: badge.dot }} />
              {badge.label}
            </span>
          </div>

          {/* Countdown number */}
          <div className="flex items-baseline gap-3 mb-1">
            <span
              className="font-semibold leading-none"
              style={{ fontSize: "clamp(52px, 8vw, 80px)", color: "#C87350", fontFamily: "Inter, sans-serif" }}
            >
              {isPast ? "0" : daysUntil}
            </span>
            <span className="text-2xl md:text-3xl font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>
              {isPast ? "days past" : daysUntil === 1 ? "day until" : "days until"}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-semibold text-white mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
            {questionnaire.raceName}
          </h2>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Source Serif 4, serif" }}>
            {formatRaceDate(new Date(questionnaire.raceDate))}
          </p>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif" }}>
                Training window
              </span>
              <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif" }}>
                {Math.round(trainingProgress)}% elapsed
              </span>
            </div>
            <div className="w-full rounded-full overflow-hidden" style={{ height: "6px", backgroundColor: "rgba(255,255,255,0.15)" }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${trainingProgress}%`, backgroundColor: "#C87350" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
