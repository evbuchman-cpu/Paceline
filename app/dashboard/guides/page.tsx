import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db/drizzle";
import { purchase, questionnaire, guide } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function GuidesPage() {
  // Verify authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in?callbackUrl=/dashboard/guides");
  }

  // Get user's guides
  const userGuides = await db
    .select({
      guide: guide,
      questionnaire: questionnaire,
      purchase: purchase,
    })
    .from(guide)
    .innerJoin(purchase, eq(guide.purchaseId, purchase.id))
    .innerJoin(questionnaire, eq(guide.questionnaireId, questionnaire.id))
    .where(eq(purchase.userId, session.user.id))
    .orderBy(desc(guide.createdAt));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">My Race Guides</h1>
        <p className="text-muted-foreground">
          View and download your personalized ultramarathon race guides
        </p>
      </div>

      {userGuides.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Guides Yet</CardTitle>
            <CardDescription>
              You haven&apos;t created any race guides yet. Complete a questionnaire to generate your first guide!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/questionnaire">
              <Button>Create Your First Guide</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userGuides.map(({ guide: g, questionnaire: q, purchase: p }) => (
            <Card key={g.id}>
              <CardHeader>
                <CardTitle className="text-lg">{q.raceName}</CardTitle>
                <CardDescription>
                  {new Date(q.raceDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  <div>Tier: {p.tier === "essential" ? "Essential" : p.tier === "custom" ? "Custom" : "Ultra Bundle"}</div>
                  <div>Status: {g.status === "completed" ? "✅ Completed" : g.status === "generating" ? "⏳ Generating..." : "❌ Failed"}</div>
                  {g.status === "completed" && (
                    <div className="text-xs">
                      Generated in {g.generationTime ? (g.generationTime / 1000).toFixed(1) : "N/A"}s
                    </div>
                  )}
                </div>
                {g.status === "completed" && g.pdfUrl && (
                  <div className="pt-2">
                    <a href={g.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full" variant="default">
                        Download PDF
                      </Button>
                    </a>
                  </div>
                )}
                {g.status === "failed" && (
                  <div className="pt-2 text-sm text-destructive">
                    Error: {g.error || "Unknown error"}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link href="/dashboard/questionnaire">
          <Button variant="outline">Create Another Guide</Button>
        </Link>
      </div>
    </div>
  );
}
