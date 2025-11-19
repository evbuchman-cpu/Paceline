"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface StravaAnalysis {
  totalActivities: number;
  totalDistance: number;
  totalElevationGain: number;
  averageFlatPace: string;
  averageClimbPace: string;
  weeklyVolume: number;
  longestRun: number;
  elevationTolerance: string;
}

interface StravaConnectProps {
  questionnaireId: string;
  isConnected?: boolean;
  stravaData?: StravaAnalysis | null;
  onAnalysisComplete?: (data: StravaAnalysis) => void;
}

export function StravaConnect({
  questionnaireId,
  isConnected = false,
  stravaData = null,
  onAnalysisComplete,
}: StravaConnectProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<StravaAnalysis | null>(stravaData);
  const [connected, setConnected] = useState(isConnected);
  const searchParams = useSearchParams();

  // Check for OAuth callback success/error
  useEffect(() => {
    const stravaSuccess = searchParams.get("strava_success");
    const stravaError = searchParams.get("strava_error");

    if (stravaSuccess === "true") {
      toast.success("Strava connected successfully!");
      setConnected(true);
      // Auto-trigger analysis after successful connection
      handleAnalyze();
    }

    if (stravaError === "access_denied") {
      toast.error("Strava connection was denied");
    } else if (stravaError === "connection_failed") {
      toast.error("Failed to connect to Strava. Please try again.");
    }
  }, [searchParams]);

  const handleConnect = () => {
    // Redirect to Strava OAuth
    const authorizeUrl = `/api/strava/authorize?questionnaireId=${questionnaireId}`;
    window.location.href = authorizeUrl;
  };

  const handleAnalyze = async () => {
    if (!connected && !searchParams.get("strava_success")) {
      toast.error("Please connect Strava first");
      return;
    }

    setAnalyzing(true);

    try {
      const response = await fetch("/api/strava/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionnaireId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to analyze activities");
      }

      const data = await response.json();
      setAnalysis(data.analysis);
      onAnalysisComplete?.(data.analysis);

      toast.success("Strava activities analyzed successfully!");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to analyze Strava activities"
      );
    } finally {
      setAnalyzing(false);
    }
  };

  if (!connected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"
                fill="#FC4C02"
              />
            </svg>
            Connect Strava (Custom Tier)
          </CardTitle>
          <CardDescription>
            Connect your Strava account to get personalized pacing based on your
            90-day fitness data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleConnect}
            className="w-full bg-[#FC4C02] hover:bg-[#E34402] text-white"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"
                fill="white"
              />
            </svg>
            Connect with Strava
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            We'll analyze your running activities from the last 90 days
          </p>
        </CardContent>
      </Card>
    );
  }

  if (analyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analyzing Strava Activities...</CardTitle>
          <CardDescription>
            Fetching and analyzing your 90-day training data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FC4C02]"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (analysis) {
    return (
      <Card className="border-[#FC4C02]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"
                fill="#FC4C02"
              />
            </svg>
            Strava Connected ✓
          </CardTitle>
          <CardDescription>Your 90-day fitness analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Activities</p>
              <p className="text-2xl font-bold">{analysis.totalActivities}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weekly Volume</p>
              <p className="text-2xl font-bold">{analysis.weeklyVolume} mi</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Flat Pace</p>
              <p className="text-2xl font-bold">
                {analysis.averageFlatPace}/mi
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Climb Pace</p>
              <p className="text-2xl font-bold">
                {analysis.averageClimbPace}/mi
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Longest Run</p>
              <p className="text-2xl font-bold">{analysis.longestRun} mi</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Elevation Tolerance
              </p>
              <p className="text-2xl font-bold capitalize">
                {analysis.elevationTolerance}
              </p>
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            variant="outline"
            className="w-full"
            disabled={analyzing}
          >
            Re-analyze Activities
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Connected but not analyzed yet
  return (
    <Card className="border-[#FC4C02]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"
              fill="#FC4C02"
            />
          </svg>
          Strava Connected ✓
        </CardTitle>
        <CardDescription>
          Analyze your activities to get personalized pacing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleAnalyze}
          className="w-full bg-[#FC4C02] hover:bg-[#E34402] text-white"
          disabled={analyzing}
        >
          Analyze 90 Days of Activities
        </Button>
      </CardContent>
    </Card>
  );
}
