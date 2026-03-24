"use client";

import { useState } from "react";
import type { LearningStrategy } from "@/lib/types";

interface ReflectionProps {
  onComplete: (strategy: LearningStrategy | null, notes: string) => void;
}

const STRATEGIES: { value: LearningStrategy; label: string; icon: string }[] = [
  {
    value: "linear-read",
    label: "Read straight through",
    icon: "arrow-down",
  },
  {
    value: "skim-then-reread",
    label: "Skimmed first, then re-read",
    icon: "layers",
  },
  { value: "note-taking", label: "Took mental notes / highlighted", icon: "pencil" },
  { value: "visualization", label: "Visualized the concepts", icon: "eye" },
  {
    value: "summarize-aloud",
    label: "Summarized in my head",
    icon: "message",
  },
  { value: "other", label: "Other approach", icon: "sparkle" },
];

export default function Reflection({ onComplete }: ReflectionProps) {
  const [selected, setSelected] = useState<LearningStrategy | null>(null);
  const [notes, setNotes] = useState("");

  function handleSubmit() {
    if (!selected) return;
    onComplete(selected, notes);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold">How did you approach it?</h2>
        <p className="text-muted text-sm mt-1">
          Tracking your strategy helps identify what works best for you
        </p>
      </div>

      {/* Strategy options */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {STRATEGIES.map((s) => (
          <button
            key={s.value}
            onClick={() => setSelected(s.value)}
            className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${
              selected === s.value
                ? "border-accent bg-accent/10"
                : "border-card-border hover:border-accent/30"
            }`}
          >
            <span className="text-sm">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Optional notes */}
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Anything you noticed about how you learned? (optional)"
        className="w-full bg-card border border-card-border rounded-lg p-4 text-sm text-foreground placeholder:text-muted/50 resize-none h-24 focus:outline-none focus:border-accent/50"
      />

      {/* Submit + Skip */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => onComplete(null, "")}
          className="text-muted text-sm hover:text-foreground transition-colors cursor-pointer"
        >
          Skip
        </button>
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="bg-accent text-background px-8 py-3 rounded-lg font-medium hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          See Results
        </button>
      </div>
    </div>
  );
}
