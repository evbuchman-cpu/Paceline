import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db/drizzle";
import { purchase, questionnaire } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { QuestionnaireClient } from "./questionnaire-client";

export default async function QuestionnairePage({
  searchParams,
}: {
  searchParams: Promise<{ purchaseId?: string }>;
}) {
  // Verify authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in?callbackUrl=/dashboard/questionnaire");
  }

  const { purchaseId } = await searchParams;

  // Get user's most recent purchase if not specified
  let userPurchase;
  if (purchaseId) {
    const purchases = await db
      .select()
      .from(purchase)
      .where(and(eq(purchase.id, purchaseId), eq(purchase.userId, session.user.id)))
      .limit(1);
    userPurchase = purchases[0];
  } else {
    const purchases = await db
      .select()
      .from(purchase)
      .where(eq(purchase.userId, session.user.id))
      .orderBy(desc(purchase.createdAt))
      .limit(1);
    userPurchase = purchases[0];
  }

  if (!userPurchase) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">No Purchase Found</h1>
          <p className="text-muted-foreground mb-6">
            You need to purchase a race guide before filling out a questionnaire.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            View Pricing
          </a>
        </div>
      </div>
    );
  }

  // Check if questionnaire already exists for this purchase
  const existingQuestionnaires = await db
    .select()
    .from(questionnaire)
    .where(eq(questionnaire.purchaseId, userPurchase.id))
    .limit(1);

  const existingQuestionnaire = existingQuestionnaires[0] || null;

  // Pre-fill user info from session
  const initialData = existingQuestionnaire || {
    firstName: session.user.name?.split(" ")[0] || "",
    email: session.user.email || "",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <QuestionnaireClient
        purchaseId={userPurchase.id}
        questionnaireId={existingQuestionnaire?.id}
        initialData={initialData}
        tier={userPurchase.tier}
      />
    </div>
  );
}
