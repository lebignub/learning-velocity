"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import VelocityChart from "@/components/dashboard/velocity-chart";
import RadarChart from "@/components/dashboard/radar-chart";
import SessionHistory from "@/components/dashboard/session-history";
import {
  getSessions,
  getVelocityTrend,
  getStreak,
  getPendingRecallSession,
} from "@/lib/storage";
import type { Session, VelocityDataPoint } from "@/lib/types";

export default function Dashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [trend, setTrend] = useState<VelocityDataPoint[]>([]);
  const [streak, setStreak] = useState(0);
  const [hasRecall, setHasRecall] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSessions(getSessions());
    setTrend(getVelocityTrend());
    setStreak(getStreak());
    setHasRecall(getPendingRecallSession() !== null);
    setMounted(true);
  }, []);

  // Derived stats
  const totalSessions = sessions.length;
  const latestVelocity =
    sessions.length > 0
      ? [...sessions].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0].velocityScore
      : null;
  const avgVelocity =
    sessions.length > 0
      ? Math.round(
          sessions.reduce((sum, s) => sum + s.velocityScore, 0) /
            sessions.length
        )
      : null;

  // Latest session stats for radar chart
  const latestSession =
    sessions.length > 0
      ? [...sessions].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0]
      : null;

  // Don't render until client-side to avoid hydration mismatch with localStorage
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Hero section for first-time users */}
      {totalSessions === 0 ? (
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold mb-3">
            Train your{" "}
            <span className="text-accent">learning ability</span>
          </h1>
          <p className="text-muted text-lg mb-8 max-w-md mx-auto">
            15-minute daily workouts that measure and improve how fast you
            absorb, understand, and retain new knowledge.
          </p>
          <Link
            href="/session"
            className="inline-block bg-accent text-background px-8 py-3 rounded-lg font-medium text-lg hover:brightness-110"
          >
            Start First Workout
          </Link>
        </div>
      ) : (
        <>
          {/* Stats bar */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-card-border rounded-xl p-4 text-center">
              <p className="text-muted text-xs uppercase tracking-wider mb-1">
                Velocity
              </p>
              <p className="text-3xl font-bold text-accent tabular-nums">
                {latestVelocity}
              </p>
            </div>
            <div className="bg-card border border-card-border rounded-xl p-4 text-center">
              <p className="text-muted text-xs uppercase tracking-wider mb-1">
                Average
              </p>
              <p className="text-3xl font-bold text-foreground tabular-nums">
                {avgVelocity}
              </p>
            </div>
            <div className="bg-card border border-card-border rounded-xl p-4 text-center">
              <p className="text-muted text-xs uppercase tracking-wider mb-1">
                Sessions
              </p>
              <p className="text-3xl font-bold text-foreground tabular-nums">
                {totalSessions}
              </p>
            </div>
            <div className="bg-card border border-card-border rounded-xl p-4 text-center">
              <p className="text-muted text-xs uppercase tracking-wider mb-1">
                Streak
              </p>
              <p className="text-3xl font-bold text-warning tabular-nums">
                {streak}
              </p>
            </div>
          </div>

          {/* Radar chart — your learning shape */}
          {latestSession && (
            <div className="bg-card border border-card-border rounded-xl p-6 mb-6">
              <h3 className="text-sm font-medium text-muted mb-4">
                Your Learning Shape
              </h3>
              <div className="flex justify-center">
                <RadarChart
                  speed={latestSession.speedScore}
                  comprehension={latestSession.comprehensionScore}
                  retention={latestSession.retentionScore}
                  trend={Math.min(100, Math.max(0, latestVelocity ?? 50))}
                  size={240}
                />
              </div>
            </div>
          )}

          {/* Recall prompt */}
          {hasRecall && (
            <Link
              href="/session"
              className="block bg-accent-dim border border-accent/30 rounded-xl p-4 mb-6 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-accent">
                    Recall quiz available
                  </p>
                  <p className="text-sm text-muted mt-0.5">
                    Test what you remember from yesterday to complete your
                    velocity score
                  </p>
                </div>
                <span className="text-accent text-xl">&rarr;</span>
              </div>
            </Link>
          )}

          {/* Chart */}
          <div className="mb-6">
            <VelocityChart data={trend} />
          </div>

          {/* Start session CTA */}
          <div className="flex justify-center mb-8">
            <Link
              href="/session"
              className="inline-block bg-accent text-background px-8 py-3 rounded-lg font-medium text-lg hover:brightness-110"
            >
              Start Workout
            </Link>
          </div>

          {/* History */}
          <SessionHistory sessions={sessions} />
        </>
      )}
    </div>
  );
}
