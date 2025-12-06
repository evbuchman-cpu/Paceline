"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { essentialQuestionnaireSchema, type EssentialQuestionnaire } from "@/lib/schemas/questionnaire";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface EssentialFormProps {
  purchaseId: string;
  questionnaireId?: string;
  initialData?: Partial<EssentialQuestionnaire>;
  onSubmit: (data: EssentialQuestionnaire) => Promise<void>;
  onAutoSave?: (data: Partial<EssentialQuestionnaire>) => Promise<void>;
}

export function EssentialForm({
  purchaseId,
  questionnaireId,
  initialData,
  onSubmit,
  onAutoSave,
}: EssentialFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const form = useForm<EssentialQuestionnaire>({
    resolver: zodResolver(essentialQuestionnaireSchema),
    defaultValues: {
      purchaseId,
      raceName: initialData?.raceName || "",
      raceWebsite: initialData?.raceWebsite || "",
      raceDate: initialData?.raceDate || new Date(),
      goalFinishTime: initialData?.goalFinishTime || "",
      ultrasCompleted: initialData?.ultrasCompleted || "",
      recentFlatPace: initialData?.recentFlatPace || "",
      climbingStrength: initialData?.climbingStrength || "",
      weeklyTrainingVolume: initialData?.weeklyTrainingVolume || 0,
      crewSupport: initialData?.crewSupport || "",
      firstName: initialData?.firstName || "",
      email: initialData?.email || "",
    },
  });

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!onAutoSave || !questionnaireId) return;

    const interval = setInterval(async () => {
      const values = form.getValues();
      try {
        await onAutoSave(values);
        setLastSaved(new Date());
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [form, onAutoSave, questionnaireId]);

  // Calculate progress (only count fields actually filled by user, not pre-filled defaults)
  const watchedFields = form.watch();
  const requiredFields = [
    "raceName",
    "raceDate",
    "goalFinishTime",
    "ultrasCompleted",
    "climbingStrength",
    "crewSupport",
    "firstName",
    "email",
  ];

  // Define what counts as "empty" vs user-filled
  const isFieldFilled = (field: string, value: unknown) => {
    if (!value || value === "") return false;

    // Don't count auto-generated default date as "filled" unless user changed it
    if (field === "raceDate" && !initialData?.raceDate) {
      const today = new Date();
      const fieldDate = new Date(value);
      // Only count as filled if it's not today's date (user changed it)
      if (
        fieldDate.getFullYear() === today.getFullYear() &&
        fieldDate.getMonth() === today.getMonth() &&
        fieldDate.getDate() === today.getDate()
      ) {
        return false;
      }
    }

    return true;
  };

  const filledFields = requiredFields.filter((field) => {
    const value = watchedFields[field as keyof EssentialQuestionnaire];
    return isFieldFilled(field, value);
  }).length;

  const progress = (filledFields / requiredFields.length) * 100;

  const handleSubmit = async (data: EssentialQuestionnaire) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      toast.success("Questionnaire submitted successfully!");
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      toast.error("Failed to submit questionnaire. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Race Planning Questionnaire</CardTitle>
        <CardDescription>
          Help us create your personalized race-day execution guide
        </CardDescription>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress: {Math.round(progress)}%</span>
            {lastSaved && (
              <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
            )}
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Race Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Race Information</h3>

              <FormField
                control={form.control}
                name="raceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Race Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Wasatch Front 100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="raceWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Race Website (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Official race website URL (helps us gather course details)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="raceDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Race Date *</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="goalFinishTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Finish Time *</FormLabel>
                    <FormControl>
                      <Input placeholder="24:00 (HH:MM)" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your target finish time (e.g., 24:00 for 24 hours)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Experience & Fitness Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Experience & Fitness</h3>

              <FormField
                control={form.control}
                name="ultrasCompleted"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How many ultras have you completed? *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">This is my first ultra</SelectItem>
                        <SelectItem value="1-3">1-3 ultras</SelectItem>
                        <SelectItem value="4-10">4-10 ultras</SelectItem>
                        <SelectItem value="10+">10+ ultras</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recentFlatPace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recent Flat Pace (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="09:30 (MM:SS per mile)" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your typical pace on flat terrain during training runs
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="climbingStrength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How would you rate your climbing strength? *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your climbing strength" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="strong">Strong - I thrive on climbs</SelectItem>
                        <SelectItem value="average">Average - Climbs are manageable</SelectItem>
                        <SelectItem value="struggle">Struggle - Climbs slow me down significantly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weeklyTrainingVolume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weekly Training Volume (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Miles per week"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormDescription>
                      Average miles per week during peak training
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Logistics & Contact Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Logistics & Contact</h3>

              <FormField
                control={form.control}
                name="crewSupport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Will you have crew support? *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select crew support status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Yes - Full crew support</SelectItem>
                        <SelectItem value="partial">Partial - Some crew at key stations</SelectItem>
                        <SelectItem value="no">No - Running self-supported</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      We&apos;ll send your race guide to this email
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Questionnaire"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
