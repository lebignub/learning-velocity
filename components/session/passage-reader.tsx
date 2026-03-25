"use client";

import { useState, useEffect, useRef } from "react";

interface PassageReaderProps {
  title: string;
  content: string;
  domain: string;
  wordCount: number;
  onDoneReading: (readingTimeMs: number) => void;
}

export default function PassageReader({
  title,
  content,
  domain,
  wordCount,
  onDoneReading,
}: PassageReaderProps) {
  const [startTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 100);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startTime]);

  function handleDone() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const readingTime = Date.now() - startTime;
    onDoneReading(readingTime);
  }

  // Format elapsed time as m:ss
  const minutes = Math.floor(elapsed / 60_000);
  const seconds = Math.floor((elapsed % 60_000) / 1000);
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 animate-fade-in delay-1">
          <span className="text-xs uppercase tracking-wider text-muted font-mono">
            {domain}
          </span>
          <span className="text-xs text-card-border">|</span>
          <span className="text-xs text-muted">{wordCount} words</span>
        </div>
        {/* Timer — subtle glow to draw attention without being distracting */}
        <div className="font-mono text-accent text-lg tabular-nums px-3 py-1 rounded-lg bg-accent/5 border border-accent/10">
          {timeDisplay}
        </div>
      </div>

      {/* Passage title and content fade in with a slight stagger */}
      <h2 className="text-2xl font-bold mb-4 animate-fade-in-up delay-1">{title}</h2>
      <div className="text-foreground/90 leading-relaxed text-[17px] whitespace-pre-line animate-fade-in delay-2">
        {content}
      </div>

      {/* Done button */}
      <div className="mt-8 flex justify-center animate-fade-in-up delay-3">
        <button
          onClick={handleDone}
          className="bg-accent text-background px-8 py-3 rounded-lg font-medium text-lg hover:brightness-110 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          Done Reading
        </button>
      </div>
    </div>
  );
}
