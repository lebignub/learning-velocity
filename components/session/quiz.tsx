"use client";

import { useState, useCallback } from "react";
import type { Question } from "@/lib/types";

interface QuizProps {
  questions: Question[];
  title: string;
  subtitle: string;
  onComplete: (answers: number[]) => void;
}

export default function Quiz({
  questions,
  title,
  subtitle,
  onComplete,
}: QuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  // Key that changes each question to re-trigger enter animations on options
  const [questionKey, setQuestionKey] = useState(0);

  const current = questions[currentIdx];
  const isCorrect = selectedOption === current.correctIndex;
  const isLast = currentIdx === questions.length - 1;

  const handleSelect = useCallback(
    (optionIdx: number) => {
      if (showFeedback) return; // Already answered
      setSelectedOption(optionIdx);
      setShowFeedback(true);
    },
    [showFeedback]
  );

  function handleNext() {
    const newAnswers = [...answers, selectedOption!];
    setAnswers(newAnswers);

    if (isLast) {
      onComplete(newAnswers);
    } else {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      // Bump the key so the new question's options re-animate in
      setQuestionKey((k) => k + 1);
    }
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-muted text-sm mt-1">{subtitle}</p>
      </div>

      {/* Progress dots — completed ones scale up briefly via transition */}
      <div className="flex gap-2 mb-8">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              i < currentIdx
                ? "bg-accent scale-y-100"
                : i === currentIdx
                  ? "bg-accent/50"
                  : "bg-card-border"
            }`}
          />
        ))}
      </div>

      {/* Question — keyed so it re-triggers the slide animation */}
      <div key={`q-${questionKey}`} className="animate-slide-in-right">
        <p className="text-lg mb-6">{current.text}</p>

        {/* Options — each staggers in with a small delay */}
        <div className="space-y-3">
          {current.options.map((option, i) => {
            // Determine border/bg based on feedback state
            let borderColor = "border-card-border hover:border-accent/50";
            let extraClass = "";

            if (showFeedback) {
              if (i === current.correctIndex) {
                // Correct answer: green border + a subtle scale pulse
                borderColor = "border-success bg-success/10";
                extraClass = "animate-pop-in";
              } else if (i === selectedOption && !isCorrect) {
                // Wrong pick: red border + shake
                borderColor = "border-danger bg-danger/10";
                extraClass = "animate-shake";
              } else {
                borderColor = "border-card-border opacity-50";
              }
            } else if (i === selectedOption) {
              borderColor = "border-accent";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-lg border ${borderColor} transition-all cursor-pointer disabled:cursor-default animate-fade-in-up delay-${i} ${extraClass}`}
                // Override the stagger delay for the entrance animation
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="text-muted mr-3 font-mono text-sm">
                  {String.fromCharCode(65 + i)}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback + Explanation + Next */}
        {showFeedback && (
          <div className="mt-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-sm font-medium ${isCorrect ? "text-success" : "text-danger"}`}
              >
                {isCorrect ? "Correct!" : "Incorrect"}
              </span>
              <button
                onClick={handleNext}
                className="bg-accent text-background px-6 py-2 rounded-lg font-medium hover:brightness-110 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {isLast ? "Finish" : "Next"}
              </button>
            </div>
            {/* Show explanation on wrong answers */}
            {!isCorrect && current.explanation && (
              <p className="text-sm text-muted bg-card border border-card-border rounded-lg p-3 mt-2 animate-fade-in">
                {current.explanation}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
