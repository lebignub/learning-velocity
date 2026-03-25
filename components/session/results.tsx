"use client";

import { useState } from "react";
import { calculateWPM } from "@/lib/scoring";
import { useCountUp } from "@/lib/hooks";
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

/**
 * Returns the CSS color variable name for the score ring gradient.
 * Maps to the same thresholds as getScoreColor but returns raw color values.
 */
function getScoreRingColor(score: number): string {
  if (score >= 80) return "var(--success)";
  if (score >= 60) return "var(--accent)";
  if (score >= 40) return "var(--warning)";
  return "var(--danger)";
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

  // Animated count-up values — staggered so they cascade in
  const animatedVelocity = useCountUp(velocityScore, 1400, 300);
  const animatedSpeed = useCountUp(speedScore, 800, 900);
  const animatedComprehension = useCountUp(comprehensionScore, 800, 1000);

  // XP earned: base XP from velocity score + streak bonus
  const baseXP = Math.round(velocityScore * 1.5);
  const streakBonus = streak > 1 ? Math.round(baseXP * (streak - 1) * 0.1) : 0;
  const totalXP = baseXP + streakBonus;
  const animatedXP = useCountUp(totalXP, 600, 1600);

  // Trend score: compare to a baseline of 50 for first session,
  // or show improvement direction for returning users
  const trendScore = sessionCount <= 1 ? 50 : Math.min(100, velocityScore + 10);

  // Score ring: SVG circle circumference for the animated ring
  const ringRadius = 54;
  const ringCircumference = 2 * Math.PI * ringRadius;
  // dashoffset goes from full circumference (empty) to proportional fill
  const ringOffset = ringCircumference - (velocityScore / 100) * ringCircumference;

  return (
    <div className="max-w-xl mx-auto text-center">
      {/* Big velocity score with animated ring */}
      <div className="mb-6 animate-fade-in-up">
        <p className="text-muted text-sm uppercase tracking-wider mb-4">
          Learning Velocity
        </p>

        {/* Score circle — ring animates in, number counts up */}
        <div className="relative inline-flex items-center justify-center mb-2">
          <svg width="140" height="140" className="rotate-[-90deg]">
            {/* Background ring */}
            <circle
              cx="70"
              cy="70"
              r={ringRadius}
              fill="none"
              stroke="var(--card-border)"
              strokeWidth="6"
            />
            {/* Animated score ring */}
            <circle
              cx="70"
              cy="70"
              r={ringRadius}
              fill="none"
              stroke={getScoreRingColor(velocityScore)}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={ringCircumference}
              strokeDashoffset={ringOffset}
              style={{
                animation: "scoreRingFill 1.4s ease-out 0.3s both",
              }}
            />
          </svg>
          {/* Number overlaid on the ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`text-6xl font-bold tabular-nums animate-bounce-in ${getScoreColor(velocityScore)}`}
            >
              {animatedVelocity}
            </span>
          </div>
        </div>

        <p className={`text-lg font-medium animate-fade-in delay-5 ${getScoreColor(velocityScore)}`}>
          {getVelocityLabel(velocityScore)}
        </p>
      </div>

      {/* XP earned — pops in after the score settles */}
      <div className="animate-pop-in delay-7 mb-8 inline-block">
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 animate-pulse-glow">
          <span className="text-accent font-bold text-xl">+{animatedXP} XP</span>
          {streakBonus > 0 && (
            <span className="text-accent/60 text-sm ml-2">
              ({streakBonus} streak bonus)
            </span>
          )}
        </div>
      </div>

      {/* Radar chart + breakdown side by side */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 animate-fade-in-up delay-4">
        {/* Radar chart — your learning shape */}
        <div className="flex-shrink-0 animate-fade-in delay-5">
          <RadarChart
            speed={speedScore}
            comprehension={comprehensionScore}
            retention={null}
            trend={trendScore}
          />
        </div>

        {/* Score cards — stagger in one by one */}
        <div className="grid grid-cols-2 gap-3 flex-1 w-full">
          <div className={`rounded-xl border p-3 animate-fade-in-up delay-4 ${getScoreBg(speedScore)}`}>
            <p className="text-muted text-xs uppercase tracking-wider mb-1">
              Speed
            </p>
            <p className={`text-2xl font-bold tabular-nums ${getScoreColor(speedScore)}`}>
              {animatedSpeed}
            </p>
            <p className="text-muted text-xs mt-1">
              {wpm} WPM
            </p>
          </div>

          <div className={`rounded-xl border p-3 animate-fade-in-up delay-5 ${getScoreBg(comprehensionScore)}`}>
            <p className="text-muted text-xs uppercase tracking-wider mb-1">
              Comprehension
            </p>
            <p className={`text-2xl font-bold tabular-nums ${getScoreColor(comprehensionScore)}`}>
              {animatedComprehension}
            </p>
            <p className="text-muted text-xs mt-1">
              {correctAnswers}/{totalQuestions} correct
            </p>
          </div>

          <div className="rounded-xl border border-card-border p-3 animate-fade-in-up delay-6">
            <p className="text-muted text-xs uppercase tracking-wider mb-1">
              Retention
            </p>
            <p className="text-2xl font-bold tabular-nums text-muted">
              —
            </p>
            <p className="text-muted text-xs mt-1">tomorrow</p>
          </div>

          <div className="rounded-xl border border-card-border p-3 animate-fade-in-up delay-7">
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
      <div className="mb-8 animate-fade-in delay-8">
        <button
          onClick={() => setShowFormula(!showFormula)}
          className="text-muted text-xs hover:text-foreground transition-colors cursor-pointer"
        >
          {showFormula ? "Hide" : "How is this calculated?"}
        </button>
        {showFormula && (
          <div className="mt-3 bg-card border border-card-border rounded-xl p-4 text-left text-sm font-mono animate-fade-in-up">
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
        <div className="mb-6 flex items-center justify-center gap-2 animate-pop-in delay-8">
          <span className="text-lg animate-fire inline-block">&#x1F525;</span>
          <span className="text-foreground font-medium">
            {streak} day streak
          </span>
        </div>
      )}

      {/* Retention reminder */}
      <div className="bg-card border border-card-border rounded-xl p-4 mb-8 text-left animate-fade-in-up delay-8">
        <p className="text-sm text-muted">
          Come back tomorrow for your <strong className="text-foreground">recall quiz</strong> —
          it measures how much you retained overnight and completes your
          velocity score.
        </p>
      </div>

      {/* Done */}
      <div className="animate-fade-in-up delay-8">
        <button
          onClick={onDone}
          className="bg-accent text-background px-8 py-3 rounded-lg font-medium text-lg hover:brightness-110 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
