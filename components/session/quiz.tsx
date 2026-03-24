"use client";

import { useState } from "react";
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

  const current = questions[currentIdx];
  const isCorrect = selectedOption === current.correctIndex;
  const isLast = currentIdx === questions.length - 1;

  function handleSelect(optionIdx: number) {
    if (showFeedback) return; // Already answered
    setSelectedOption(optionIdx);
    setShowFeedback(true);
  }

  function handleNext() {
    const newAnswers = [...answers, selectedOption!];
    setAnswers(newAnswers);

    if (isLast) {
      onComplete(newAnswers);
    } else {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-muted text-sm mt-1">{subtitle}</p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < currentIdx
                ? "bg-accent"
                : i === currentIdx
                  ? "bg-accent/50"
                  : "bg-card-border"
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <p className="text-lg mb-6">{current.text}</p>

      {/* Options */}
      <div className="space-y-3">
        {current.options.map((option, i) => {
          let borderColor = "border-card-border hover:border-accent/50";
          if (showFeedback) {
            if (i === current.correctIndex) {
              borderColor = "border-success bg-success/10";
            } else if (i === selectedOption && !isCorrect) {
              borderColor = "border-danger bg-danger/10";
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
              className={`w-full text-left p-4 rounded-lg border ${borderColor} transition-all cursor-pointer disabled:cursor-default`}
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
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-sm font-medium ${isCorrect ? "text-success" : "text-danger"}`}
            >
              {isCorrect ? "Correct!" : "Incorrect"}
            </span>
            <button
              onClick={handleNext}
              className="bg-accent text-background px-6 py-2 rounded-lg font-medium hover:brightness-110 cursor-pointer"
            >
              {isLast ? "Finish" : "Next"}
            </button>
          </div>
          {/* Show explanation on wrong answers (or always if explanation exists) */}
          {!isCorrect && current.explanation && (
            <p className="text-sm text-muted bg-card border border-card-border rounded-lg p-3 mt-2">
              {current.explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
