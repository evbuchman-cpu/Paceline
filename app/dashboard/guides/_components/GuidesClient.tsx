"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronUp, RotateCcw, Trash2 } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface GuideRow {
  guide: {
    id: string;
    status: string;
    pdfUrl: string;
    error: string | null;
    archivedAt: Date | null;
    generationTime: number | null;
    createdAt: Date;
  };
  questionnaire: {
    raceName: string;
    raceDate: Date;
    goalFinishTime: string;
  };
  purchase: {
    tier: string;
  };
}

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

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

// ── Active Guide Card ────────────────────────────────────────────────────────

function ActiveGuideCard({ row }: { row: GuideRow }) {
  const router = useRouter();
  const [archiving, setArchiving] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const tierStyle = TIER_COLORS[row.purchase.tier] ?? TIER_COLORS.essential;

  const handleArchive = async () => {
    setArchiving(true);
    await fetch(`/api/guide/${row.guide.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "archive" }),
    });
    router.refresh();
  };

  return (
    <div className="rounded-xl border bg-white p-6 flex flex-col gap-4" style={{ borderColor: "#E8E0D6" }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold mb-0.5 truncate" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>
            {row.questionnaire.raceName}
          </h3>
          <p className="text-sm" style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}>
            {formatDate(row.questionnaire.raceDate)}
          </p>
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
          style={{ backgroundColor: tierStyle.bg, color: tierStyle.color, fontFamily: "Inter, sans-serif" }}
        >
          {TIER_LABELS[row.purchase.tier] ?? row.purchase.tier}
        </span>
      </div>

      {/* Status + actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t" style={{ borderColor: "#F0EBE3" }}>
        <div className="flex items-center gap-3">
          {row.guide.status === "completed" && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: "#EAF5F0", color: "#4A9B7F", fontFamily: "Inter, sans-serif" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A9B7F] inline-block" />
              Ready
            </span>
          )}
          {row.guide.status === "generating" && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: "#FDF4EE", color: "#C87350", fontFamily: "Inter, sans-serif" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C87350] inline-block animate-pulse" />
              Generating...
            </span>
          )}
          {row.guide.status === "failed" && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: "#FDF0EB", color: "#A85A3C", fontFamily: "Inter, sans-serif" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A85A3C] inline-block" />
              Failed
            </span>
          )}
          {row.guide.generationTime && (
            <span className="text-xs" style={{ color: "#4A5859", opacity: 0.6, fontFamily: "Inter, sans-serif" }}>
              Generated in {(row.guide.generationTime / 1000).toFixed(1)}s
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {row.guide.status === "completed" && row.guide.pdfUrl && (
            <a
              href={row.guide.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: "#C87350", fontFamily: "Inter, sans-serif" }}
            >
              Download PDF
            </a>
          )}

          {/* Archive */}
          {!confirm ? (
            <button
              onClick={() => setConfirm(true)}
              className="p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
              title="Archive guide"
            >
              <Trash2 className="w-4 h-4" style={{ color: "#C8BFB5" }} />
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="text-xs" style={{ color: "#C87350", fontFamily: "Inter, sans-serif" }}>Archive?</span>
              <button
                onClick={handleArchive}
                disabled={archiving}
                className="text-xs font-semibold px-2 py-1 rounded text-white"
                style={{ backgroundColor: "#C87350", fontFamily: "Inter, sans-serif" }}
              >
                {archiving ? "..." : "Yes"}
              </button>
              <button
                onClick={() => setConfirm(false)}
                className="text-xs font-medium px-2 py-1 rounded border"
                style={{ borderColor: "#E8E0D6", color: "#4A5859", fontFamily: "Inter, sans-serif" }}
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Summary row */}
      {row.guide.status === "completed" && (
        <div className="flex flex-wrap gap-6 pt-2 border-t" style={{ borderColor: "#F0EBE3" }}>
          <div>
            <span className="block text-xs uppercase tracking-wide font-medium mb-0.5" style={{ color: "#4A5859", opacity: 0.6, fontFamily: "Inter, sans-serif" }}>Goal Time</span>
            <span className="text-sm font-semibold" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>{row.questionnaire.goalFinishTime}</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wide font-medium mb-0.5" style={{ color: "#4A5859", opacity: 0.6, fontFamily: "Inter, sans-serif" }}>Created</span>
            <span className="text-sm font-semibold" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>{formatDate(row.guide.createdAt)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Archived Guide Card ──────────────────────────────────────────────────────

function ArchivedGuideCard({ row }: { row: GuideRow }) {
  const router = useRouter();
  const [step, setStep] = useState<"idle" | "confirm1" | "confirm2">("idle");
  const [loading, setLoading] = useState(false);
  const tierStyle = TIER_COLORS[row.purchase.tier] ?? TIER_COLORS.essential;

  const handleRestore = async () => {
    setLoading(true);
    await fetch(`/api/guide/${row.guide.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "restore" }),
    });
    router.refresh();
  };

  const handleDelete = async () => {
    setLoading(true);
    await fetch(`/api/guide/${row.guide.id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="rounded-xl border p-5 flex flex-col gap-3" style={{ borderColor: "#E8E0D6", backgroundColor: "#FAFAF8", opacity: 0.85 }}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold mb-0.5 truncate" style={{ color: "#4A5859", fontFamily: "Inter, sans-serif" }}>
            {row.questionnaire.raceName}
          </h3>
          <p className="text-sm" style={{ color: "#4A5859", opacity: 0.6, fontFamily: "Source Serif 4, serif" }}>
            {formatDate(row.questionnaire.raceDate)}
          </p>
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
          style={{ backgroundColor: tierStyle.bg, color: tierStyle.color, fontFamily: "Inter, sans-serif", opacity: 0.7 }}
        >
          {TIER_LABELS[row.purchase.tier] ?? row.purchase.tier}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2 border-t" style={{ borderColor: "#F0EBE3" }}>
        {/* Restore */}
        <button
          onClick={handleRestore}
          disabled={loading}
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
          style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Restore
        </button>

        {/* Two-step permanent delete */}
        {step === "idle" && (
          <button
            onClick={() => setStep("confirm1")}
            className="text-sm font-medium transition-colors"
            style={{ color: "#C8BFB5", fontFamily: "Inter, sans-serif" }}
          >
            Delete permanently
          </button>
        )}
        {step === "confirm1" && (
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: "#A85A3C", fontFamily: "Inter, sans-serif" }}>
              This cannot be undone.
            </span>
            <button
              onClick={() => setStep("confirm2")}
              className="text-sm font-semibold px-2.5 py-1 rounded"
              style={{ backgroundColor: "#FDF0EB", color: "#A85A3C", fontFamily: "Inter, sans-serif" }}
            >
              I understand, continue
            </button>
            <button
              onClick={() => setStep("idle")}
              className="text-sm"
              style={{ color: "#4A5859", fontFamily: "Inter, sans-serif" }}
            >
              Cancel
            </button>
          </div>
        )}
        {step === "confirm2" && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: "#A85A3C", fontFamily: "Inter, sans-serif" }}>
              Delete forever?
            </span>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="text-sm font-bold px-3 py-1 rounded text-white"
              style={{ backgroundColor: "#A85A3C", fontFamily: "Inter, sans-serif" }}
            >
              {loading ? "Deleting..." : "Yes, delete forever"}
            </button>
            <button
              onClick={() => setStep("idle")}
              className="text-sm"
              style={{ color: "#4A5859", fontFamily: "Inter, sans-serif" }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main client component ────────────────────────────────────────────────────

interface GuidesClientProps {
  active: GuideRow[];
  archived: GuideRow[];
}

export function GuidesClient({ active, archived }: GuidesClientProps) {
  const [archiveOpen, setArchiveOpen] = useState(false);

  return (
    <>
      {/* Active guides */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>
            Active Guides
          </h2>
          <Link
            href="/dashboard/questionnaire"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ backgroundColor: "#C87350", fontFamily: "Inter, sans-serif" }}
          >
            + New Guide
          </Link>
        </div>

        {active.length === 0 ? (
          <div className="rounded-xl border p-10 text-center" style={{ borderColor: "#E8E0D6", backgroundColor: "#FAFAF8" }}>
            <p className="text-lg font-semibold mb-2" style={{ color: "#2C5F4D", fontFamily: "Inter, sans-serif" }}>
              No active guides.
            </p>
            <p className="text-base mb-6" style={{ color: "#4A5859", fontFamily: "Source Serif 4, serif" }}>
              Get a personalized plan built around your fitness and your race.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white"
              style={{ backgroundColor: "#C87350", fontFamily: "Inter, sans-serif" }}
            >
              Get My Race Guide →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {active.map((row) => (
              <ActiveGuideCard key={row.guide.id} row={row} />
            ))}
          </div>
        )}
      </section>

      {/* Archived guides */}
      {archived.length > 0 && (
        <section>
          <button
            onClick={() => setArchiveOpen(!archiveOpen)}
            className="flex items-center gap-2 mb-4 group"
          >
            <h2 className="text-base font-semibold" style={{ color: "#4A5859", fontFamily: "Inter, sans-serif" }}>
              Archived ({archived.length})
            </h2>
            {archiveOpen
              ? <ChevronUp className="w-4 h-4" style={{ color: "#4A5859" }} />
              : <ChevronDown className="w-4 h-4" style={{ color: "#4A5859" }} />
            }
          </button>

          {archiveOpen && (
            <>
              <p className="text-sm mb-4" style={{ color: "#4A5859", opacity: 0.7, fontFamily: "Source Serif 4, serif" }}>
                Archived guides are hidden from your dashboard. Restore to make them active again, or delete permanently — which cannot be undone.
              </p>
              <div className="flex flex-col gap-3">
                {archived.map((row) => (
                  <ArchivedGuideCard key={row.guide.id} row={row} />
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}
