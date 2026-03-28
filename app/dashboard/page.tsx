import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db/drizzle";
import { user, purchase, questionnaire, guide, userRace } from "@/db/schema";
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
  const [userData, purchaseRows, standaloneRaces] = await Promise.all([
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
    db
      .select()
      .from(userRace)
      .where(eq(userRace.userId, userId))
      .orderBy(desc(userRace.createdAt)),
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
      .select({ purchase, questionnaire, guide })
      .from(purchase)
      .leftJoin(questionnaire, eq(questionnaire.purchaseId, purchase.id))
      .leftJoin(guide, eq(guide.questionnaireId, questionnaire.id))
      .where(eq(purchase.userId, userId))
      .orderBy(desc(purchase.createdAt));

    guideRows = rows as GuideRow[];
  }

  // ── Build countdown races — guide races + standalone races, soonest first ───
  const now = new Date();

  const guideCountdownRaces: CountdownRace[] = guideRows
    .filter((r) => r.questionnaire?.raceDate != null)
    .filter((r) => new Date(r.questionnaire!.raceDate) >= now)
    .map((r) => ({
      id: r.questionnaire!.id,
      source: "guide" as const,
      raceName: r.questionnaire!.raceName,
      raceDate: r.questionnaire!.raceDate,
      completedAt: r.questionnaire!.completedAt,
      guide: r.guide ? { id: r.guide.id, status: r.guide.status } : null,
      purchaseCreatedAt: r.purchase.createdAt,
    }));

  const standaloneCountdownRaces: CountdownRace[] = standaloneRaces
    .filter((r) => new Date(r.raceDate) >= now)
    .map((r) => ({
      id: r.id,
      source: "standalone" as const,
      raceName: r.raceName,
      raceDate: r.raceDate,
      completedAt: null,
      guide: null,
      purchaseCreatedAt: r.createdAt,
    }));

  const allCountdownRaces: CountdownRace[] = [
    ...guideCountdownRaces,
    ...standaloneCountdownRaces,
  ].sort((a, b) => new Date(a.raceDate).getTime() - new Date(b.raceDate).getTime());

  // Fallback: show most recent guide race if nothing upcoming
  const countdownRaces: CountdownRace[] =
    allCountdownRaces.length > 0
      ? allCountdownRaces
      : guideRows
          .filter((r) => r.questionnaire != null)
          .slice(0, 1)
          .map((r) => ({
            id: r.questionnaire!.id,
            source: "guide" as const,
            raceName: r.questionnaire!.raceName,
            raceDate: r.questionnaire!.raceDate,
            completedAt: r.questionnaire!.completedAt,
            guide: r.guide ? { id: r.guide.id, status: r.guide.status } : null,
            purchaseCreatedAt: r.purchase.createdAt,
          }));

  // ── Active row for NextSteps / checklist (nearest upcoming guide race) ──────
  const activeRow =
    guideRows
      .filter((r) => r.questionnaire?.raceDate && new Date(r.questionnaire.raceDate) >= now)
      .sort((a, b) => new Date(a.questionnaire!.raceDate).getTime() - new Date(b.questionnaire!.raceDate).getTime())[0]
    ?? guideRows[0]
    ?? null;

  // ── Build guide card props — exclude archived guides and archived purchases ─
  const guideCardProps = guideRows
    .filter((row) => !row.guide?.archivedAt && !row.purchase.archivedAt)
    .map((row) => ({
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
    questionnaire: row.questionnaire ? {
      id: row.questionnaire.id,
      raceName: row.questionnaire.raceName,
      raceDate: row.questionnaire.raceDate,
      goalFinishTime: row.questionnaire.goalFinishTime,
      completedAt: row.questionnaire.completedAt,
    } : null,
    purchase: {
      id: row.purchase.id,
      tier: row.purchase.tier,
    },
  }));

  // ── NextSteps: nearest upcoming guide race ──────────────────────────────────
  const nextStepsGuide = activeRow
    ? {
        questionnaire: {
          raceName: activeRow.questionnaire!.raceName,
          raceDate: activeRow.questionnaire!.raceDate,
          completedAt: activeRow.questionnaire!.completedAt,
        },
        guide: activeRow.guide
          ? { id: activeRow.guide.id, status: activeRow.guide.status }
          : null,
      }
    : null;

  const checklistRaceDate = activeRow?.questionnaire?.raceDate
    ? new Date(activeRow.questionnaire.raceDate)
    : null;

  return (
    <div style={{ backgroundColor: "#F5F1EA", minHeight: "100%" }}>
      {/* ── Section 1: Header bar ─────────────────────────────────────────── */}
      <div className="px-6 py-5" style={{ backgroundColor: "#2C5F4D" }}>
        <p
          className="text-base"
          style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Source Serif 4, serif", marginBottom: "2px" }}
        >
          Dashboard
        </p>
        <h1
          className="font-semibold"
          style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif", fontSize: "clamp(22px, 3vw, 30px)" }}
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

        {/* ── Section 5: Next Steps ───────────────────────────────────────── */}
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
