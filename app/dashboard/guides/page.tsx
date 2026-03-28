import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db/drizzle";
import { purchase, questionnaire, guide } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { GuidesClient } from "./_components/GuidesClient";

export const dynamic = "force-dynamic";

export default async function GuidesPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in?callbackUrl=/dashboard/guides");

  const userGuides = await db
    .select({ guide, questionnaire, purchase })
    .from(guide)
    .innerJoin(purchase, eq(guide.purchaseId, purchase.id))
    .innerJoin(questionnaire, eq(guide.questionnaireId, questionnaire.id))
    .where(eq(purchase.userId, session.user.id))
    .orderBy(desc(guide.createdAt));

  const active = userGuides.filter((g) => !g.guide.archivedAt);
  const archived = userGuides.filter((g) => !!g.guide.archivedAt);

  return (
    <div style={{ backgroundColor: "#F5F1EA", minHeight: "100vh" }}>
      {/* Header */}
      <div className="px-6 py-5" style={{ backgroundColor: "#2C5F4D" }}>
        <p className="text-base" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Source Serif 4, serif", marginBottom: "2px" }}>
          Dashboard
        </p>
        <h1 className="font-semibold" style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif", fontSize: "clamp(22px, 3vw, 30px)" }}>
          My Guides
        </h1>
      </div>

      <div className="px-4 md:px-6 py-6 max-w-5xl flex flex-col gap-8">
        <GuidesClient active={active} archived={archived} />
      </div>
    </div>
  );
}
