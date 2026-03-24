"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { generateContent } from "@/app/actions";
import PassageReader from "@/components/session/passage-reader";
import Quiz from "@/components/session/quiz";
import Reflection from "@/components/session/reflection";
import Results from "@/components/session/results";
import {
  calculateSpeedScore,
  calculateComprehensionScore,
  calculateVelocityScore,
} from "@/lib/scoring";
import {
  getSessions,
  saveSession,
  updateSession,
  getPendingRecallSession,
  getStreak,
} from "@/lib/storage";
import type {
  Domain,
  GeneratedContent,
  Session,
  LearningStrategy,
} from "@/lib/types";

/**
 * Session flow:
 * 0. First-time onboarding (if no sessions yet)
 * 1. Domain selection
 * 2. Check for pending recall quiz (from yesterday) → show recall quiz
 * 3. Passage reading with timer
 * 4. Comprehension quiz
 * 5. Meta-reflection (skippable)
 * 6. Results
 */

type Phase =
  | "onboarding"
  | "pick-domain"
  | "loading"
  | "recall"
  | "reading"
  | "quiz"
  | "reflection"
  | "results";

const DOMAIN_INFO: { value: Domain; label: string; color: string }[] = [
  { value: "tech", label: "Technology", color: "border-blue-400 bg-blue-400/10 text-blue-400" },
  { value: "business", label: "Business", color: "border-amber-400 bg-amber-400/10 text-amber-400" },
  { value: "science", label: "Science", color: "border-emerald-400 bg-emerald-400/10 text-emerald-400" },
];

export default function SessionPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("pick-domain");
  const [error, setError] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<Domain | undefined>(
    undefined
  );

  // Content
  const [content, setContent] = useState<GeneratedContent | null>(null);

  // Recall state
  const [recallSession, setRecallSession] = useState<Session | null>(null);

  // Session data being built up
  const [readingTimeMs, setReadingTimeMs] = useState(0);
  const [comprehensionAnswers, setComprehensionAnswers] = useState<number[]>(
    []
  );

  // Computed scores
  const [speedScore, setSpeedScore] = useState(0);
  const [comprehensionScore, setComprehensionScore] = useState(0);
  const [velocityScore, setVelocityScore] = useState(0);

  // Show onboarding if this is the user's first session
  useEffect(() => {
    const sessions = getSessions();
    if (sessions.length === 0) {
      setPhase("onboarding");
    }
  }, []);

  // Load content after domain is picked
  const loadContent = useCallback(
    async (domain?: Domain) => {
      setPhase("loading");
      try {
        // Check for pending recall quiz
        const pending = getPendingRecallSession();
        if (pending) {
          setRecallSession(pending);
          setPhase("recall");
        }

        // Get the most recent session title to avoid repeats
        const sessions = getSessions();
        const recentTitle =
          sessions.length > 0
            ? [...sessions].sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )[0].passageTitle
            : undefined;

        const generated = await generateContent(domain, recentTitle);
        setContent(generated);

        // If no recall quiz, go straight to reading
        if (!pending) {
          setPhase("reading");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to generate content"
        );
      }
    },
    []
  );

  // --- Phase handlers ---

  function handleDomainPick(domain?: Domain) {
    setSelectedDomain(domain);
    loadContent(domain);
  }

  function handleRecallComplete(answers: number[]) {
    if (!recallSession) return;

    const correctIndices = recallSession.recallQuestions.map(
      (q) => q.correctIndex
    );
    const retentionScore = calculateComprehensionScore(answers, correctIndices);

    const updatedVelocity = calculateVelocityScore(
      recallSession.speedScore,
      recallSession.comprehensionScore,
      retentionScore
    );

    updateSession(recallSession.id, {
      retentionAnswers: answers,
      retentionScore,
      velocityScore: updatedVelocity,
    });

    if (content) {
      setPhase("reading");
    } else {
      setPhase("loading");
    }
  }

  // If content arrives while we're waiting after recall
  useEffect(() => {
    if (phase === "loading" && content && recallSession) {
      setPhase("reading");
    }
  }, [phase, content, recallSession]);

  function handleDoneReading(timeMs: number) {
    setReadingTimeMs(timeMs);
    setPhase("quiz");
  }

  function handleQuizComplete(answers: number[]) {
    setComprehensionAnswers(answers);
    setPhase("reflection");
  }

  function handleReflectionComplete(
    strat: LearningStrategy | null,
    notes: string
  ) {
    if (!content) return;

    const correctIndices = content.comprehensionQuestions.map(
      (q) => q.correctIndex
    );
    const speed = calculateSpeedScore(
      content.passage.wordCount,
      readingTimeMs
    );
    const comprehension = calculateComprehensionScore(
      comprehensionAnswers,
      correctIndices
    );
    const velocity = calculateVelocityScore(speed, comprehension, null);

    setSpeedScore(speed);
    setComprehensionScore(comprehension);
    setVelocityScore(velocity);

    const session: Session = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      domain: content.passage.domain,
      passageTitle: content.passage.title,
      passageContent: content.passage.content,
      passageWordCount: content.passage.wordCount,
      readingTimeMs,
      comprehensionAnswers,
      comprehensionCorrect: correctIndices,
      comprehensionScore: comprehension,
      recallQuestions: content.recallQuestions,
      retentionAnswers: null,
      retentionScore: null,
      speedScore: speed,
      velocityScore: velocity,
      strategy: strat,
      strategyNotes: notes,
    };

    saveSession(session);
    setPhase("results");
  }

  // --- Render ---

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-card border border-danger/30 rounded-xl p-8 max-w-md text-center">
          <p className="text-danger font-medium mb-2">Something went wrong</p>
          <p className="text-muted text-sm mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setPhase("pick-domain");
            }}
            className="bg-accent text-background px-6 py-2 rounded-lg font-medium hover:brightness-110 cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      {/* Onboarding — shown once for first-time users */}
      {phase === "onboarding" && (
        <div className="max-w-md mx-auto text-center py-12">
          <h2 className="text-2xl font-bold mb-4">How it works</h2>
          <div className="space-y-4 text-left mb-8">
            <div className="flex gap-3 items-start">
              <span className="text-accent font-bold text-lg w-6 shrink-0">1</span>
              <p className="text-foreground/90">
                <strong>Read</strong> a short passage on an unfamiliar topic.
                A timer tracks your reading speed.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-accent font-bold text-lg w-6 shrink-0">2</span>
              <p className="text-foreground/90">
                <strong>Answer</strong> comprehension questions that test
                understanding, not memorization.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-accent font-bold text-lg w-6 shrink-0">3</span>
              <p className="text-foreground/90">
                <strong>Come back tomorrow</strong> for a recall quiz that
                measures what you actually retained overnight.
              </p>
            </div>
          </div>
          <p className="text-muted text-sm mb-6">
            Your <strong className="text-accent">Learning Velocity</strong>{" "}
            score combines speed, comprehension, and retention. Most people
            score 40–65 on their first session.
          </p>
          <button
            onClick={() => setPhase("pick-domain")}
            className="bg-accent text-background px-8 py-3 rounded-lg font-medium text-lg hover:brightness-110 cursor-pointer"
          >
            Got it — let&apos;s go
          </button>
        </div>
      )}

      {/* Domain selection */}
      {phase === "pick-domain" && (
        <div className="max-w-md mx-auto text-center py-12">
          <h2 className="text-xl font-bold mb-2">Pick a domain</h2>
          <p className="text-muted text-sm mb-6">
            Or let us surprise you with a random topic
          </p>
          <div className="space-y-3 mb-6">
            {DOMAIN_INFO.map((d) => (
              <button
                key={d.value}
                onClick={() => handleDomainPick(d.value)}
                className={`w-full p-4 rounded-lg border ${d.color} text-left font-medium hover:brightness-110 transition-all cursor-pointer`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleDomainPick(undefined)}
            className="text-muted text-sm hover:text-foreground transition-colors cursor-pointer"
          >
            Surprise me
          </button>
        </div>
      )}

      {/* Loading */}
      {phase === "loading" && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-muted text-sm">Generating your workout...</p>
        </div>
      )}

      {/* Recall quiz */}
      {phase === "recall" && recallSession && (
        <Quiz
          questions={recallSession.recallQuestions}
          title="Recall Warm-Up"
          subtitle={`Let's see what you remember from "${recallSession.passageTitle}"`}
          onComplete={handleRecallComplete}
        />
      )}

      {/* Reading */}
      {phase === "reading" && content && (
        <PassageReader
          title={content.passage.title}
          content={content.passage.content}
          domain={content.passage.domain}
          wordCount={content.passage.wordCount}
          onDoneReading={handleDoneReading}
        />
      )}

      {/* Comprehension quiz */}
      {phase === "quiz" && content && (
        <Quiz
          questions={content.comprehensionQuestions}
          title="Comprehension Check"
          subtitle="Test your understanding — not memorization"
          onComplete={handleQuizComplete}
        />
      )}

      {/* Reflection */}
      {phase === "reflection" && (
        <Reflection onComplete={handleReflectionComplete} />
      )}

      {/* Results */}
      {phase === "results" && content && (
        <Results
          speedScore={speedScore}
          comprehensionScore={comprehensionScore}
          velocityScore={velocityScore}
          readingTimeMs={readingTimeMs}
          wordCount={content.passage.wordCount}
          correctAnswers={
            comprehensionAnswers.filter(
              (a, i) =>
                a === content.comprehensionQuestions[i].correctIndex
            ).length
          }
          totalQuestions={content.comprehensionQuestions.length}
          streak={getStreak()}
          sessionCount={getSessions().length}
          onDone={() => router.push("/")}
        />
      )}
    </div>
  );
}
