import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db/drizzle";
import { user, purchase, questionnaire, guide } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

import { CountdownCard, type CountdownRace } from "./_components/CountdownCard";
import { MyGuides } from "./_components/GuideCard";
import {
  ReadinessChecklist,
  TOTAL_CHECKLIST_ITEMS,
} from "./_components/ReadinessChecklist";
import { NextSteps } from "./_components/NextSteps";
import { QuickActions } from "./_components/QuickActions";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.session?.userId) {
    redirect("/sign-in");
  }

  const userId = session.user.id;
  const firstName = session.user.name?.split(" ")[0] ?? "Runner";

  // ── Fetch all data in parallel ──────────────────────────────────────────────
  const [userData, purchaseRows] = await Promise.all([
    db
      .select({ checklistProgress: user.checklistProgress })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1),
    db
      .select()
      .from(purchase)
      .where(eq(purchase.userId, userId))
      .orderBy(desc(purchase.createdAt)),
  ]);

  const checklistProgress =
    (userData[0]?.checklistProgress as Record<string, boolean> | null) ?? {};

  // ── For each purchase, fetch associated questionnaire + guide ───────────────
  type GuideRow = {
    purchase: typeof purchase.$inferSelect;
    questionnaire: typeof questionnaire.$inferSelect | null;
    guide: typeof guide.$inferSelect | null;
  };

  let guideRows: GuideRow[] = [];

  if (purchaseRows.length > 0) {
    const rows = await db
      .select({
        purchase,
        questionnaire,
        guide,
      })
      .from(purchase)
      .leftJoin(questionnaire, eq(questionnaire.purchaseId, purchase.id))
      .leftJoin(guide, eq(guide.questionnaireId, questionnaire.id))
      .where(eq(purchase.userId, userId))
      .orderBy(desc(purchase.createdAt));

    guideRows = rows as GuideRow[];
  }

  // ── Build countdown races — all upcoming races sorted soonest-first ─────────
  const now = new Date();
  const upcomingRows = guideRows
    .filter((r) => r.questionnaire?.raceDate && new Date(r.questionnaire.raceDate) >= now)
    .sort(
      (a, b) =>
        new Date(a.questionnaire!.raceDate).getTime() -
        new Date(b.questionnaire!.raceDate).getTime()
    );

  // Fallback: if no upcoming races, show the most recent one
  const countdownRows = upcomingRows.length > 0 ? upcomingRows : guideRows.slice(0, 1);

  const countdownRaces: CountdownRace[] = countdownRows
    .filter((r) => r.questionnaire != null)
    .map((r) => ({
      questionnaire: {
        raceName: r.questionnaire!.raceName,
        raceDate: r.questionnaire!.raceDate,
        completedAt: r.questionnaire!.completedAt,
      },
      guide: r.guide ? { id: r.guide.id, status: r.guide.status } : null,
      purchase: { createdAt: r.purchase.createdAt, tier: r.purchase.tier },
    }));

  const activeRow = upcomingRows[0] ?? guideRows[0] ?? null;

  // ── Build guide card props ──────────────────────────────────────────────────
  const guideCardProps = guideRows.map((row) => ({
    guide: row.guide
      ? {
          id: row.guide.id,
          status: row.guide.status,
          pdfUrl: row.guide.pdfUrl || null,
          error: row.guide.error || null,
          sections: row.guide.sections as Record<string, unknown> | null,
          createdAt: row.guide.createdAt,
        }
      : null,
    questionnaire: {
      id: row.questionnaire?.id ?? "",
      raceName: row.questionnaire?.raceName ?? row.purchase.tier,
      raceDate: row.questionnaire?.raceDate ?? new Date(),
      goalFinishTime: row.questionnaire?.goalFinishTime ?? "",
      completedAt: row.questionnaire?.completedAt ?? null,
    },
    purchase: {
      id: row.purchase.id,
      tier: row.purchase.tier,
    },
  }));

  // ── Active guide for NextSteps (use nearest upcoming race) ─────────────────
  const nextStepsGuide = activeRow
    ? {
        questionnaire: {
          raceName: activeRow.questionnaire!.raceName,
          raceDate: activeRow.questionnaire!.raceDate,
          completedAt: activeRow.questionnaire!.completedAt,
        },
        guide: activeRow.guide
          ? {
              id: activeRow.guide.id,
              status: activeRow.guide.status,
            }
          : null,
      }
    : null;

  // ── Race date for checklist overdue detection ───────────────────────────────
  const checklistRaceDate = activeRow?.questionnaire?.raceDate
    ? new Date(activeRow.questionnaire.raceDate)
    : null;

  return (
    <div style={{ backgroundColor: "#F5F1EA", minHeight: "100%" }}>
      {/* ── Section 1: Header bar ─────────────────────────────────────────── */}
      <div
        className="px-6 py-5"
        style={{ backgroundColor: "#2C5F4D" }}
      >
        <p
          className="text-base"
          style={{
            color: "rgba(255,255,255,0.65)",
            fontFamily: "Source Serif 4, serif",
            marginBottom: "2px",
          }}
        >
          Dashboard
        </p>
        <h1
          className="font-semibold"
          style={{
            color: "#FFFFFF",
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(22px, 3vw, 30px)",
          }}
        >
          Welcome back, {firstName}. Race day is coming.
        </h1>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="px-4 md:px-6 py-6 flex flex-col gap-8 max-w-5xl">

        {/* ── Section 2: Race Countdown ───────────────────────────────────── */}
        <CountdownCard
          races={countdownRaces}
          checklistProgress={checklistProgress}
          totalChecklistItems={TOTAL_CHECKLIST_ITEMS}
        />

        {/* ── Section 5: Next Steps (shown before guides on purpose — coach talks first) */}
        <NextSteps
          activeGuide={nextStepsGuide}
          checklistProgress={checklistProgress}
          totalChecklistItems={TOTAL_CHECKLIST_ITEMS}
          hasPurchase={purchaseRows.length > 0}
        />

        {/* ── Section 3: My Guides ────────────────────────────────────────── */}
        <MyGuides guides={guideCardProps} />

        {/* ── Section 4: Race Readiness Checklist ─────────────────────────── */}
        <div id="checklist">
          <ReadinessChecklist
            initialProgress={checklistProgress}
            raceDate={checklistRaceDate}
          />
        </div>

        {/* ── Section 6: Quick Actions ────────────────────────────────────── */}
        <QuickActions />
      </div>
    </div>
  );
}
