"use client";

import { useState } from "react";
import { calculateWPM } from "@/lib/scoring";
import RadarChart from "@/components/dashboard/radar-chart";

interface ResultsProps {
  speedScore: number;
  comprehensionScore: number;
  velocityScore: number;
  readingTimeMs: number;
  wordCount: number;
  correctAnswers: number;
  totalQuestions: number;
  streak: number;
  sessionCount: number;
  onDone: () => void;
}

/**
 * Get a color class and label based on score thresholds.
 * Inspired by TriviaDuel's vibrant, immediate feedback.
 */
function getScoreColor(score: number): string {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-accent";
  if (score >= 40) return "text-warning";
  return "text-danger";
}

function getScoreBg(score: number): string {
  if (score >= 80) return "bg-success/10 border-success/30";
  if (score >= 60) return "bg-accent/10 border-accent/30";
  if (score >= 40) return "bg-warning/10 border-warning/30";
  return "bg-danger/10 border-danger/30";
}

function getVelocityLabel(score: number): string {
  if (score >= 85) return "Elite Learner";
  if (score >= 70) return "Fast Absorber";
  if (score >= 55) return "Solid Progress";
  if (score >= 40) return "Building Up";
  return "Getting Started";
}

export default function Results({
  speedScore,
  comprehensionScore,
  velocityScore,
  readingTimeMs,
  wordCount,
  correctAnswers,
  totalQuestions,
  streak,
  sessionCount,
  onDone,
}: ResultsProps) {
  const [showFormula, setShowFormula] = useState(false);
  const wpm = calculateWPM(wordCount, readingTimeMs);
  const minutes = Math.floor(readingTimeMs / 60_000);
  const seconds = Math.floor((readingTimeMs % 60_000) / 1000);

  // XP earned: base XP from velocity score + streak bonus
  const baseXP = Math.round(velocityScore * 1.5);
  const streakBonus = streak > 1 ? Math.round(baseXP * (streak - 1) * 0.1) : 0;
  const totalXP = baseXP + streakBonus;

  // Trend score: compare to a baseline of 50 for first session,
  // or show improvement direction for returning users
  const trendScore = sessionCount <= 1 ? 50 : Math.min(100, velocityScore + 10);

  return (
    <div className="max-w-xl mx-auto text-center">
      {/* Big velocity score */}
      <div className="mb-6">
        <p className="text-muted text-sm uppercase tracking-wider mb-2">
          Learning Velocity
        </p>
        <div
          className={`text-7xl font-bold tabular-nums ${getScoreColor(velocityScore)}`}
        >
          {velocityScore}
        </div>
        <p className={`text-lg font-medium mt-2 ${getScoreColor(velocityScore)}`}>
          {getVelocityLabel(velocityScore)}
        </p>
      </div>

      {/* XP earned */}
      <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-8 inline-block">
        <span className="text-accent font-bold text-xl">+{totalXP} XP</span>
        {streakBonus > 0 && (
          <span className="text-accent/60 text-sm ml-2">
            ({streakBonus} streak bonus)
          </span>
        )}
      </div>

      {/* Radar chart + breakdown side by side */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        {/* Radar chart — your learning shape */}
        <div className="flex-shrink-0">
          <RadarChart
            speed={speedScore}
            comprehension={comprehensionScore}
            retention={null}
            trend={trendScore}
          />
        </div>

        {/* Score cards */}
        <div className="grid grid-cols-2 gap-3 flex-1 w-full">
          <div className={`rounded-xl border p-3 ${getScoreBg(speedScore)}`}>
            <p className="text-muted text-xs uppercase tracking-wider mb-1">
              Speed
            </p>
            <p className={`text-2xl font-bold tabular-nums ${getScoreColor(speedScore)}`}>
              {speedScore}
            </p>
            <p className="text-muted text-xs mt-1">
              {wpm} WPM
            </p>
          </div>

          <div className={`rounded-xl border p-3 ${getScoreBg(comprehensionScore)}`}>
            <p className="text-muted text-xs uppercase tracking-wider mb-1">
              Comprehension
            </p>
            <p className={`text-2xl font-bold tabular-nums ${getScoreColor(comprehensionScore)}`}>
              {comprehensionScore}
            </p>
            <p className="text-muted text-xs mt-1">
              {correctAnswers}/{totalQuestions} correct
            </p>
          </div>

          <div className="rounded-xl border border-card-border p-3">
            <p className="text-muted text-xs uppercase tracking-wider mb-1">
              Retention
            </p>
            <p className="text-2xl font-bold tabular-nums text-muted">
              —
            </p>
            <p className="text-muted text-xs mt-1">tomorrow</p>
          </div>

          <div className="rounded-xl border border-card-border p-3">
            <p className="text-muted text-xs uppercase tracking-wider mb-1">
              Reading Time
            </p>
            <p className="text-2xl font-bold tabular-nums text-foreground">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </p>
            <p className="text-muted text-xs mt-1">{wordCount} words</p>
          </div>
        </div>
      </div>

      {/* Formula transparency */}
      <div className="mb-8">
        <button
          onClick={() => setShowFormula(!showFormula)}
          className="text-muted text-xs hover:text-foreground transition-colors cursor-pointer"
        >
          {showFormula ? "Hide" : "How is this calculated?"}
        </button>
        {showFormula && (
          <div className="mt-3 bg-card border border-card-border rounded-xl p-4 text-left text-sm font-mono">
            <p className="text-muted mb-2">Without retention (first day):</p>
            <p className="text-foreground mb-3">
              <span className="text-accent">LV</span> = Speed &times;{" "}
              <span className="text-accent">0.35</span> + Comprehension &times;{" "}
              <span className="text-accent">0.65</span>
            </p>
            <p className="text-muted mb-2">With retention (after recall quiz):</p>
            <p className="text-foreground mb-3">
              <span className="text-accent">LV</span> = Speed &times;{" "}
              <span className="text-accent">0.25</span> + Comprehension &times;{" "}
              <span className="text-accent">0.50</span> + Retention &times;{" "}
              <span className="text-accent">0.25</span>
            </p>
            <p className="text-muted text-xs mb-2">
              Speed uses a sigmoid curve: 250 WPM (average) = 50. Diminishing
              returns above ~400 WPM — no reward for skimming.
            </p>
            <p className="text-muted text-xs">
              Speed is penalized 50% if comprehension drops below 40 — fast
              reading without understanding is just skimming.
            </p>
          </div>
        )}
      </div>

      {/* Streak */}
      {streak > 0 && (
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="text-warning text-lg">&#x1F525;</span>
          <span className="text-foreground font-medium">
            {streak} day streak
          </span>
        </div>
      )}

      {/* Retention reminder */}
      <div className="bg-card border border-card-border rounded-xl p-4 mb-8 text-left">
        <p className="text-sm text-muted">
          Come back tomorrow for your <strong className="text-foreground">recall quiz</strong> —
          it measures how much you retained overnight and completes your
          velocity score.
        </p>
      </div>

      {/* Done */}
      <button
        onClick={onDone}
        className="bg-accent text-background px-8 py-3 rounded-lg font-medium text-lg hover:brightness-110 cursor-pointer"
      >
        Back to Dashboard
      </button>
    </div>
  );
}
