"use client";

import { EssentialForm } from "@/components/questionnaire/EssentialForm";
import { CustomForm } from "@/components/questionnaire/CustomForm";
import type { EssentialQuestionnaire, CustomQuestionnaire } from "@/lib/schemas/questionnaire";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface QuestionnaireClientProps {
  purchaseId: string;
  questionnaireId?: string;
  initialData?: Partial<EssentialQuestionnaire> | Partial<CustomQuestionnaire>;
  tier: string;
}

export function QuestionnaireClient({
  purchaseId,
  questionnaireId,
  initialData,
  tier,
}: QuestionnaireClientProps) {
  const router = useRouter();

  const handleSubmit = async (data: EssentialQuestionnaire | CustomQuestionnaire) => {
    try {
      let currentQuestionnaireId = questionnaireId;

      if (questionnaireId) {
        // Update existing questionnaire
        const response = await fetch(`/api/questionnaire/${questionnaireId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            completedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to update questionnaire");
        }
      } else {
        // Create new questionnaire
        const response = await fetch("/api/questionnaire", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            completedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to create questionnaire");
        }

        const result = await response.json();
        currentQuestionnaireId = result.id;
      }

      // Trigger guide generation
      toast.success("Questionnaire submitted! Generating your race guide...");

      const generateResponse = await fetch("/api/generate-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionnaireId: currentQuestionnaireId,
        }),
      });

      if (!generateResponse.ok) {
        const error = await generateResponse.json();
        // Don't throw - guide generation can be retried from dashboard
        console.error("Guide generation failed:", error);
        toast.error("Guide generation started but may take a few minutes. Check your dashboard.");
      } else {
        const guideResult = await generateResponse.json();
        toast.success(`Race guide generated in ${(guideResult.generationTime / 1000).toFixed(1)} seconds!`);
      }

      router.push("/dashboard/guides");
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      throw error; // Re-throw so form can handle it
    }
  };

  const handleAutoSave = async (data: Partial<EssentialQuestionnaire> | Partial<CustomQuestionnaire>) => {
    if (!questionnaireId) {
      // Can't auto-save if questionnaire doesn't exist yet
      // Create it first
      try {
        const response = await fetch("/api/questionnaire", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to create questionnaire");
        }

        await response.json();
        // Refresh the page to get the new questionnaire ID
        router.refresh();
      } catch (error) {
        console.error("Auto-save failed (create):", error);
      }
      return;
    }

    // Update existing questionnaire
    try {
      const response = await fetch(`/api/questionnaire/${questionnaireId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to auto-save questionnaire");
      }
    } catch (error) {
      console.error("Auto-save failed (update):", error);
    }
  };

  const isCustomTier = tier === "custom" || tier === "ultra_bundle";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Race Planning Questionnaire</h1>
        <p className="text-muted-foreground">
          {tier === "custom"
            ? "Custom tier - Personalized with Strava data"
            : tier === "essential"
            ? "Essential tier - Basic race planning"
            : "Ultra Bundle - Premium race planning"}
        </p>
      </div>

      {isCustomTier ? (
        <CustomForm
          purchaseId={purchaseId}
          questionnaireId={questionnaireId}
          initialData={initialData as Partial<CustomQuestionnaire>}
          onSubmit={handleSubmit}
          onAutoSave={handleAutoSave}
        />
      ) : (
        <EssentialForm
          purchaseId={purchaseId}
          questionnaireId={questionnaireId}
          initialData={initialData as Partial<EssentialQuestionnaire>}
          onSubmit={handleSubmit}
          onAutoSave={handleAutoSave}
        />
      )}
    </div>
  );
}
