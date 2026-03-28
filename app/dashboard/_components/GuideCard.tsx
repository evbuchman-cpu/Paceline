"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import Link from "next/link";

interface GuideCardProps {
  guide: {
    id: string;
    status: string;
    pdfUrl: string | null;
    error: string | null;
    sections: Record<string, unknown> | null;
    createdAt: Date;
  } | null;
  questionnaire: {
    id: string;
    raceName: string;
    raceDate: Date;
    goalFinishTime: string;
    completedAt: Date | null;
  };
  purchase: {
    id: string;
    tier: string;
  };
}

type GuideStatus = {
  status: string;
  pdfUrl: string | null;
  error: string | null;
  step?: number;
  stepName?: string;
  totalSteps?: number;
};

const TIER_LABELS: Record<string, string> = {
  essential: "Essential",
  custom: "Custom",
  ultra_bundle: "Ultra Bundle",
};

const TIER_COLORS: Record<string, { bg: string; color: string }> = {
  essential: { bg: "#EAF5F0", color: "#2C5F4D" },
  custom: { bg: "#EEF2FF", color: "#3B4EA6" },
  ultra_bundle: { bg: "#FDF4EE", color: "#C87350" },
};

function formatRaceDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getAidStationCount(sections: Record<string, unknown> | null): number | null {
  if (!sections) return null;
  const overview = sections.raceOverview as Record<string, unknown> | undefined;
  if (!overview) return null;
  const stations = overview.aidStations;
  if (Array.isArray(stations)) return stations.length;
  return null;
}

export function GuideCard({ guide, questionnaire, purchase }: GuideCardProps) {
  const router = useRouter();
  const [liveStatus, setLiveStatus] = useState<GuideStatus | null>(
    guide ? { status: guide.status, pdfUrl: guide.pdfUrl, error: guide.error } : null
  );
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const poll = useCallback(async () => {
    if (!guide) return;
    try {
      const res = await fetch(`/api/guide-status/${guide.id}`);
      if (!res.ok) return;
      const data = await res.json();
      setLiveStatus(data);
    } catch {
      // silently skip
    }
  }, [guide]);

  useEffect(() => {
    const status = liveStatus?.status ?? guide?.status;
    if (status !== "generating") return;
    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, [guide, liveStatus?.status, poll]);

  const handleArchive = async () => {
    if (!guide) return;
    setDeleting(true);
    try {
      await fetch(`/api/guide/${guide.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "archive" }),
      });
      router.refresh();
    } catch {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  const tierStyle = TIER_COLORS[purchase.tier] ?? TIER_COLORS.essential;
  const tierLabel = TIER_LABELS[purchase.tier] ?? purchase.tier;
  const currentStatus = liveStatus?.status ?? guide?.status;

  // ── No guide: questionnaire incomplete ──────────────────────────────────────
  if (!guide || !currentStatus) {
    return (
      <div
        className="rounded-xl border p-6 flex flex-col gap-4"
        style={{ borderColor: "#E8E0D6", backgroundColor: "#FFFFFF" }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold mb-0.5" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>
              {questionnaire.raceName}
            </h3>
            <p className="text-sm" style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}>
              {formatRaceDate(questionnaire.raceDate)}
            </p>
          </div>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{ backgroundColor: tierStyle.bg, color: tierStyle.color, fontFamily: "Inter, sans-serif" }}
          >
            {tierLabel}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "#F0EBE3" }}>
          <span
            className="inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "#EEF2FF", color: "#3B4EA6", fontFamily: "Inter, sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
            Questionnaire Incomplete
          </span>
          <Link
            href="/dashboard/questionnaire"
            className="text-sm font-semibold"
            style={{ color: "#C87350", fontFamily: "Inter, sans-serif" }}
          >
            Complete Now →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border p-6 flex flex-col gap-4"
      style={{ borderColor: "#E8E0D6", backgroundColor: "#FFFFFF" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold mb-0.5 truncate" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>
            {questionnaire.raceName}
          </h3>
          <p className="text-sm" style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}>
            {formatRaceDate(questionnaire.raceDate)}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: tierStyle.bg, color: tierStyle.color, fontFamily: "Inter, sans-serif" }}
          >
            {tierLabel}
          </span>
          {/* Delete button */}
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="p-1.5 rounded-lg transition-colors hover:bg-stone-100"
              title="Archive guide"
            >
              <Trash2 className="w-4 h-4" style={{ color: "#C8BFB5" }} />
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="text-xs" style={{ color: "#A85A3C", fontFamily: "Inter, sans-serif" }}>Archive?</span>
              <button
                onClick={handleArchive}
                disabled={deleting}
                className="text-xs font-semibold px-2 py-1 rounded text-white"
                style={{ backgroundColor: "#C87350", fontFamily: "Inter, sans-serif" }}
              >
                {deleting ? "..." : "Yes"}
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-xs font-medium px-2 py-1 rounded border"
                style={{ borderColor: "#E8E0D6", color: "#4A5859", fontFamily: "Inter, sans-serif" }}
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="flex flex-col gap-3 pt-3 border-t" style={{ borderColor: "#F0EBE3" }}>

        {/* GENERATING */}
        {currentStatus === "generating" && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span
                className="inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "#FDF4EE", color: "#C87350", fontFamily: "Inter, sans-serif" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C87350] inline-block animate-pulse" />
                Generating...
              </span>
              {liveStatus?.step && (
                <span className="text-xs" style={{ color: "#4A5859", fontFamily: "Inter, sans-serif" }}>
                  Step {liveStatus.step} of {liveStatus.totalSteps}
                </span>
              )}
            </div>
            {liveStatus?.stepName && (
              <p className="text-sm" style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}>
                {liveStatus.stepName}...
              </p>
            )}
            <div className="w-full rounded-full overflow-hidden" style={{ height: "4px", backgroundColor: "#F0EBE3" }}>
              <div
                className="h-full rounded-full animate-pulse"
                style={{
                  width: liveStatus?.step ? `${((liveStatus.step - 1) / (liveStatus.totalSteps ?? 8)) * 100 + 5}%` : "15%",
                  backgroundColor: "#C87350",
                  transition: "width 1s ease",
                }}
              />
            </div>
          </div>
        )}

        {/* COMPLETED */}
        {currentStatus === "completed" && (
          <>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span
                className="inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "#EAF5F0", color: "#4A9B7F", fontFamily: "Inter, sans-serif" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A9B7F] inline-block" />
                Ready
              </span>
              <div className="flex items-center gap-4">
                {(liveStatus?.pdfUrl ?? guide.pdfUrl) && (
                  <a
                    href={liveStatus?.pdfUrl ?? guide.pdfUrl ?? ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                    style={{ backgroundColor: "#C87350", fontFamily: "Inter, sans-serif" }}
                  >
                    Download PDF
                  </a>
                )}
                <Link
                  href="/dashboard/guides"
                  className="text-sm font-medium"
                  style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}
                >
                  View Guide →
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 pt-2 border-t" style={{ borderColor: "#F0EBE3" }}>
              <div>
                <span className="block text-xs uppercase tracking-wide font-medium mb-0.5" style={{ color: "#4A5859", opacity: 0.6, fontFamily: "Inter, sans-serif" }}>
                  Goal Time
                </span>
                <span className="text-sm font-semibold" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>
                  {questionnaire.goalFinishTime}
                </span>
              </div>
              {getAidStationCount(guide.sections) !== null && (
                <div>
                  <span className="block text-xs uppercase tracking-wide font-medium mb-0.5" style={{ color: "#4A5859", opacity: 0.6, fontFamily: "Inter, sans-serif" }}>
                    Aid Stations
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>
                    {getAidStationCount(guide.sections)}
                  </span>
                </div>
              )}
            </div>
          </>
        )}

        {/* FAILED */}
        {currentStatus === "failed" && (
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span
              className="inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "#FDF0EB", color: "#A85A3C", fontFamily: "Inter, sans-serif" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#A85A3C] inline-block" />
              Generation Failed
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  fetch("/api/generate-guide", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ questionnaireId: questionnaire.id }),
                  }).then(() => poll())
                }
                className="text-sm font-semibold"
                style={{ color: "#C87350", fontFamily: "Inter, sans-serif" }}
              >
                Retry
              </button>
              <a
                href="mailto:support@paceline.run"
                className="text-sm font-medium"
                style={{ color: "#4A5859", fontFamily: "Inter, sans-serif" }}
              >
                Contact Support
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── MyGuides section wrapper ─────────────────────────────────────────────────

interface MyGuidesProps {
  guides: GuideCardProps[];
}

export function MyGuides({ guides }: MyGuidesProps) {
  if (guides.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-semibold mb-4" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>
          My Guides
        </h2>
        <div className="rounded-xl border p-10 text-center" style={{ borderColor: "#E8E0D6", backgroundColor: "#FAFAF8" }}>
          <p className="text-lg mb-2 font-semibold" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>
            Your race plan starts here.
          </p>
          <p className="text-base mb-6 max-w-md mx-auto" style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}>
            Stop piecing together advice from Reddit threads. Get a plan built around your fitness, your crew, and your race.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: "#C87350", fontFamily: "Inter, sans-serif" }}
          >
            Get My Race Guide →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>
        My Guides
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map((g, i) => (
          <GuideCard key={i} {...g} />
        ))}
      </div>
    </section>
  );
}
