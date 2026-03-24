export type Domain = "tech" | "business" | "science";

export type LearningStrategy =
  | "skim-then-reread"
  | "linear-read"
  | "note-taking"
  | "visualization"
  | "summarize-aloud"
  | "other";

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GeneratedContent {
  passage: {
    title: string;
    content: string;
    domain: Domain;
    wordCount: number;
  };
  comprehensionQuestions: Question[];
  recallQuestions: Question[];
}

export interface Session {
  id: string;
  date: string; // ISO date string
  domain: Domain;
  passageTitle: string;
  passageContent: string;
  passageWordCount: number;
  // Reading phase
  readingTimeMs: number;
  // Comprehension phase
  comprehensionAnswers: number[]; // indices the user picked
  comprehensionCorrect: number[]; // correct indices
  comprehensionScore: number; // 0-100
  // Retention (filled in next day's recall quiz)
  recallQuestions: Question[];
  retentionAnswers: number[] | null;
  retentionScore: number | null; // 0-100
  // Scores
  speedScore: number; // 0-100 — how fast relative to expected reading time
  velocityScore: number; // composite 0-100
  // Reflection
  strategy: LearningStrategy | null;
  strategyNotes: string | null;
}

export interface VelocityDataPoint {
  date: string;
  velocity: number;
  speed: number;
  comprehension: number;
  retention: number | null;
}
