"use client";

import { useState, useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// ── Checklist data ────────────────────────────────────────────────────────────

export interface ChecklistItem {
  id: string;
  text: string;
}

export interface ChecklistPhase {
  id: string;
  title: string;
  /** Days before race when this phase becomes active (and overdue if incomplete) */
  activeDaysBefore: number;
  items: ChecklistItem[];
}

export const CHECKLIST_PHASES: ChecklistPhase[] = [
  {
    id: "8-weeks",
    title: "8 Weeks Out",
    activeDaysBefore: 56,
    items: [
      { id: "q8-1", text: "Download official race guide from race website" },
      { id: "q8-2", text: "Identify all crew-accessible vs drop-bag-only aid stations" },
      { id: "q8-3", text: "Note cutoff times at each aid station" },
      { id: "q8-4", text: "Mark critical sections where 30%+ of DNFs historically occur" },
      { id: "q8-5", text: "Confirm crew members and assign roles (Chief, Logistics, Nutrition)" },
      { id: "q8-6", text: "Purchase your Paceline personalized guide (if not done)" },
    ],
  },
  {
    id: "4-6-weeks",
    title: "4–6 Weeks Out",
    activeDaysBefore: 42,
    items: [
      { id: "q4-1", text: "Complete your Paceline questionnaire" },
      { id: "q4-2", text: "Review your personalized pacing strategy" },
      { id: "q4-3", text: "Share crew logistics sheet with your crew" },
      { id: "q4-4", text: "Test nutrition plan on a long training run" },
      { id: "q4-5", text: "Break in race-day shoes (minimum 50 miles on them)" },
      { id: "q4-6", text: "Practice your drop bag packing" },
    ],
  },
  {
    id: "2-3-weeks",
    title: "2–3 Weeks Out",
    activeDaysBefore: 21,
    items: [
      { id: "q2-1", text: "Finalize drop bag contents using your guide checklist" },
      { id: "q2-2", text: "Share predicted arrival times with crew" },
      { id: "q2-3", text: "Review contingency protocols (GI issues, blisters, heat)" },
      { id: "q2-4", text: "Check gear requirements against your kit" },
      { id: "q2-5", text: "Book crew travel and accommodation at key aid stations" },
    ],
  },
  {
    id: "race-week",
    title: "Race Week",
    activeDaysBefore: 7,
    items: [
      { id: "qrw-1", text: "Download offline copy of your race guide" },
      { id: "qrw-2", text: "Print crew cheat sheet (laminated if possible)" },
      { id: "qrw-3", text: "Confirm start time and parking with crew" },
      { id: "qrw-4", text: "Prep and label all drop bags" },
      { id: "qrw-5", text: "Set up nutrition and hydration for race morning" },
      { id: "qrw-6", text: "Review mental strategy section of your guide" },
      { id: "qrw-7", text: "Get to sleep early the night before race-eve (not just the night before)" },
    ],
  },
];

export const TOTAL_CHECKLIST_ITEMS = CHECKLIST_PHASES.reduce(
  (sum, phase) => sum + phase.items.length,
  0
);

// ── Helper ────────────────────────────────────────────────────────────────────

function getDaysUntil(date: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function isPhaseOverdue(phase: ChecklistPhase, raceDate: Date | null, progress: Record<string, boolean>): boolean {
  if (!raceDate) return false;
  const daysUntil = getDaysUntil(raceDate);
  if (daysUntil > phase.activeDaysBefore) return false; // Not yet in window
  const allDone = phase.items.every((item) => progress[item.id] === true);
  return !allDone;
}

function getProgressBarColor(pct: number): string {
  if (pct < 40) return "#A85A3C";
  if (pct < 75) return "#C87350";
  return "#4A9B7F";
}

// ── Component ─────────────────────────────────────────────────────────────────

interface ReadinessChecklistProps {
  initialProgress: Record<string, boolean>;
  raceDate: Date | null;
}

export function ReadinessChecklist({ initialProgress, raceDate }: ReadinessChecklistProps) {
  const [progress, setProgress] = useState<Record<string, boolean>>(initialProgress);
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>(
    Object.fromEntries(CHECKLIST_PHASES.map((p) => [p.id, true]))
  );
  const [saving, setSaving] = useState<string | null>(null);

  const checkedCount = Object.values(progress).filter(Boolean).length;
  const pct = TOTAL_CHECKLIST_ITEMS > 0 ? (checkedCount / TOTAL_CHECKLIST_ITEMS) * 100 : 0;
  const barColor = getProgressBarColor(pct);

  const toggle = useCallback(
    async (itemId: string) => {
      const newChecked = !progress[itemId];
      setProgress((prev) => ({ ...prev, [itemId]: newChecked }));
      setSaving(itemId);
      try {
        await fetch("/api/user/checklist", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemId, checked: newChecked }),
        });
      } catch {
        // Revert optimistic update on failure
        setProgress((prev) => ({ ...prev, [itemId]: !newChecked }));
      } finally {
        setSaving(null);
      }
    },
    [progress]
  );

  const togglePhase = (phaseId: string) => {
    setOpenPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  return (
    <section>
      <h2
        className="text-xl font-semibold mb-1"
        style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}
      >
        Race Readiness Checklist
      </h2>
      <p
        className="text-sm mb-5"
        style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}
      >
        Your race operating system. Check off tasks as you prepare.
      </p>

      {/* Progress bar */}
      <div
        className="rounded-xl border p-5 mb-5"
        style={{ borderColor: "#E8E0D6", backgroundColor: "#FFFFFF" }}
      >
        <div className="flex justify-between items-center mb-2">
          <span
            className="text-sm font-semibold"
            style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}
          >
            Race Readiness
          </span>
          <span
            className="text-sm font-medium"
            style={{ color: "#4A5859", fontFamily: "Inter, sans-serif" }}
          >
            {checkedCount} of {TOTAL_CHECKLIST_ITEMS} tasks complete ({Math.round(pct)}%)
          </span>
        </div>
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: "8px", backgroundColor: "#F0EBE3" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: barColor }}
          />
        </div>
      </div>

      {/* Phases */}
      <div className="flex flex-col gap-3">
        {CHECKLIST_PHASES.map((phase) => {
          const overdue = isPhaseOverdue(phase, raceDate, progress);
          const open = openPhases[phase.id] ?? true;
          const phaseChecked = phase.items.filter((i) => progress[i.id]).length;
          const phaseTotal = phase.items.length;
          const phaseDone = phaseChecked === phaseTotal;

          return (
            <div
              key={phase.id}
              className="rounded-xl border overflow-hidden"
              style={{
                borderColor: overdue && !phaseDone ? "#C87350" : "#E8E0D6",
                borderLeftWidth: overdue && !phaseDone ? "3px" : "1px",
                backgroundColor: "#FFFFFF",
              }}
            >
              {/* Phase header */}
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[#F5F1EA]/50"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-semibold text-base"
                    style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}
                  >
                    {phase.title}
                  </span>
                  {overdue && !phaseDone && (
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#FDF4EE", color: "#C87350", fontFamily: "Inter, sans-serif" }}
                    >
                      Due now
                    </span>
                  )}
                  {phaseDone && (
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#EAF5F0", color: "#4A9B7F", fontFamily: "Inter, sans-serif" }}
                    >
                      Complete
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-sm"
                    style={{ color: "#4A5859", fontFamily: "Inter, sans-serif" }}
                  >
                    {phaseChecked}/{phaseTotal}
                  </span>
                  {open ? (
                    <ChevronUp className="w-4 h-4" style={{ color: "#4A5859" }} />
                  ) : (
                    <ChevronDown className="w-4 h-4" style={{ color: "#4A5859" }} />
                  )}
                </div>
              </button>

              {/* Phase items */}
              {open && (
                <div
                  className="px-5 pb-4 flex flex-col gap-1 border-t"
                  style={{ borderColor: "#F0EBE3" }}
                >
                  {phase.items.map((item) => {
                    const checked = !!progress[item.id];
                    const isSaving = saving === item.id;

                    return (
                      <label
                        key={item.id}
                        className="flex items-start gap-3 py-2.5 cursor-pointer group"
                      >
                        {/* Custom checkbox */}
                        <div className="relative flex-shrink-0 mt-0.5">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={checked}
                            disabled={isSaving}
                            onChange={() => toggle(item.id)}
                          />
                          <div
                            className="w-4 h-4 rounded border-2 flex items-center justify-center transition-all"
                            style={{
                              borderColor: checked ? "#2C5F4D" : "#C8BFB5",
                              backgroundColor: checked ? "#2C5F4D" : "transparent",
                            }}
                          >
                            {checked && (
                              <svg
                                className="w-2.5 h-2.5 text-white"
                                fill="none"
                                viewBox="0 0 10 8"
                              >
                                <path
                                  d="M1 4l2.5 2.5L9 1"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                        </div>

                        <span
                          className="text-sm leading-relaxed transition-all"
                          style={{
                            color: checked ? "#4A5859" : "#2C2C2C",
                            opacity: checked ? 0.6 : 1,
                            textDecoration: checked ? "line-through" : "none",
                            fontFamily: "Source Serif 4, serif",
                          }}
                        >
                          {item.text}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
