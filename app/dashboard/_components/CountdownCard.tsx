"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";

export interface CountdownRace {
  id: string;
  source: "guide" | "standalone";
  raceName: string;
  raceDate: Date;
  completedAt: Date | null;
  guide: { id: string; status: string } | null;
  purchaseCreatedAt: Date;
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

function formatShortDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
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

function getStatusBadge(race: CountdownRace, checklistPct: number): StatusBadge {
  if (race.source === "standalone") {
    return { label: "No Guide Yet", color: "#4A5859", bg: "#F0EBE3", dot: "#C8BFB5" };
  }
  if (!race.completedAt || race.guide?.status === "failed") {
    return { label: "Action Needed", color: "#A85A3C", bg: "#FDF0EB", dot: "#A85A3C" };
  }
  if (!race.guide || race.guide.status === "generating") {
    return { label: "Guide Generating", color: "#C87350", bg: "#FDF4EE", dot: "#C87350" };
  }
  if (race.guide.status === "completed" && checklistPct >= 40) {
    return { label: "On Track", color: "#4A9B7F", bg: "#EAF5F0", dot: "#4A9B7F" };
  }
  return { label: "Check In", color: "#C87350", bg: "#FDF4EE", dot: "#C87350" };
}

// ── Add Race Form ─────────────────────────────────────────────────────────────

function AddRaceForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [raceName, setRaceName] = useState("");
  const [raceDate, setRaceDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!raceName.trim()) { setError("Race name is required"); return; }
    if (!raceDate) { setError("Race date is required"); return; }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/user/races", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raceName: raceName.trim(), raceDate }),
      });
      if (!res.ok) throw new Error("Failed to save");
      router.refresh();
      onClose();
    } catch {
      setError("Something went wrong. Try again.");
      setSaving(false);
    }
  };

  return (
    <div
      className="mt-4 rounded-xl p-5"
      style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>
          Add a Race
        </span>
        <button onClick={onClose}>
          <X className="w-4 h-4" style={{ color: "rgba(255,255,255,0.6)" }} />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <label className="block text-xs mb-1" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif" }}>
            Race name
          </label>
          <input
            type="text"
            value={raceName}
            onChange={(e) => setRaceName(e.target.value)}
            placeholder="e.g. Western States 100"
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.25)",
              fontFamily: "Inter, sans-serif",
            }}
          />
        </div>

        <div>
          <label className="block text-xs mb-1" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif" }}>
            Race date
          </label>
          <input
            type="date"
            value={raceDate}
            onChange={(e) => setRaceDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.25)",
              fontFamily: "Inter, sans-serif",
              colorScheme: "dark",
            }}
          />
        </div>

        {error && (
          <p className="text-xs" style={{ color: "#FCA5A5", fontFamily: "Inter, sans-serif" }}>
            {error}
          </p>
        )}

        <div className="flex gap-2 mt-1">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2 rounded-lg text-sm font-semibold text-white transition-opacity"
            style={{ backgroundColor: "#C87350", fontFamily: "Inter, sans-serif", opacity: saving ? 0.7 : 1 }}
          >
            {saving ? "Saving..." : "Add Race"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontFamily: "Inter, sans-serif" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const ADD_NEW_VALUE = "__add_new__";

export function CountdownCard({ races, checklistProgress, totalChecklistItems }: CountdownCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);

  const checkedCount = Object.values(checklistProgress).filter(Boolean).length;
  const checklistPct = totalChecklistItems > 0 ? (checkedCount / totalChecklistItems) * 100 : 0;

  // Empty state
  if (races.length === 0 && !showAddForm) {
    return (
      <div
        className="rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{ backgroundColor: "#2C5F4D" }}
      >
        <div>
          <p className="text-lg font-semibold mb-1" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.7)" }}>
            Race countdown
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
            No race scheduled yet.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Source Serif 4, serif", fontSize: "17px" }}>
            Add a race to start your countdown, or get a guide to build your full plan.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white whitespace-nowrap"
            style={{ backgroundColor: "#C87350", fontFamily: "Inter, sans-serif", fontSize: "16px" }}
          >
            + Add a Race
          </button>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#FFFFFF", fontFamily: "Inter, sans-serif", fontSize: "15px", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            Get a Race Guide →
          </Link>
        </div>
      </div>
    );
  }

  // Empty state with form open
  if (races.length === 0 && showAddForm) {
    return (
      <div className="rounded-xl p-8 md:p-10" style={{ backgroundColor: "#2C5F4D" }}>
        <p className="text-lg font-semibold mb-1" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.7)" }}>
          Race countdown
        </p>
        <AddRaceForm onClose={() => setShowAddForm(false)} />
      </div>
    );
  }

  const race = races[Math.min(selectedIndex, races.length - 1)];
  const daysUntil = getDaysUntil(new Date(race.raceDate));
  const trainingProgress = getTrainingProgress(race.purchaseCreatedAt, race.raceDate);
  const badge = getStatusBadge(race, checklistPct);
  const isPast = daysUntil < 0;

  const handleDropdownChange = (value: string) => {
    if (value === ADD_NEW_VALUE) {
      setShowAddForm(true);
    } else {
      setSelectedIndex(Number(value));
      setShowAddForm(false);
    }
  };

  return (
    <div className="rounded-xl p-8 md:p-10" style={{ backgroundColor: "#2C5F4D" }}>
      {/* Dropdown — always shown so user can switch or add */}
      <div className="mb-6 flex items-center gap-3">
        <div className="relative inline-block">
          <select
            value={selectedIndex}
            onChange={(e) => handleDropdownChange(e.target.value)}
            className="appearance-none pr-8 pl-3 py-2 rounded-lg text-sm font-semibold cursor-pointer"
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.25)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {races.map((r, i) => (
              <option key={r.id} value={i} style={{ backgroundColor: "#2C5F4D", color: "#FFFFFF" }}>
                {r.raceName} — {formatShortDate(r.raceDate)}
              </option>
            ))}
            <option value={ADD_NEW_VALUE} style={{ backgroundColor: "#2C5F4D", color: "#C87350" }}>
              + Add a New Race
            </option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgba(255,255,255,0.7)" }} />
        </div>
      </div>

      {/* Add race form */}
      {showAddForm && <AddRaceForm onClose={() => setShowAddForm(false)} />}

      {/* Countdown */}
      {!showAddForm && (
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            {/* Label + badge */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif", letterSpacing: "0.12em" }}
              >
                {race.source === "standalone" ? "Upcoming Race" : "Next Race"}
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: badge.bg, color: badge.color, fontFamily: "Inter, sans-serif" }}
              >
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: badge.dot }} />
                {badge.label}
              </span>
              {race.source === "standalone" && (
                <Link
                  href="/pricing"
                  className="text-xs font-semibold underline"
                  style={{ color: "#C87350", fontFamily: "Inter, sans-serif" }}
                >
                  Get a guide →
                </Link>
              )}
            </div>

            {/* Big number */}
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
              {race.raceName}
            </h2>
            <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Source Serif 4, serif" }}>
              {formatRaceDate(new Date(race.raceDate))}
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
      )}
    </div>
  );
}
