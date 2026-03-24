"use server";

import type { Domain, GeneratedContent } from "@/lib/types";
import { getRandomContent } from "@/lib/content";

/**
 * Get content for a learning session.
 *
 * Uses pre-seeded passages by default. When ANTHROPIC_API_KEY is set,
 * falls back to generating fresh content via Claude API.
 */
export async function generateContent(
  preferredDomain?: Domain,
  recentTitle?: string
): Promise<GeneratedContent> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // If API key is available, generate fresh content
  if (apiKey) {
    try {
      return await generateWithAPI(apiKey, preferredDomain);
    } catch {
      // Fall back to seeded content if API call fails
      return getRandomContent(recentTitle, preferredDomain);
    }
  }

  // No API key — use pre-seeded content
  return getRandomContent(recentTitle, preferredDomain);
}

// --- API generation (used when API key is available) ---

const DOMAINS: Domain[] = ["tech", "business", "science"];

const DOMAIN_TOPICS: Record<Domain, string[]> = {
  tech: [
    "distributed systems",
    "compiler design",
    "cryptography fundamentals",
    "network protocols",
    "database internals",
    "operating system scheduling",
    "type theory",
    "WebAssembly",
    "consensus algorithms",
    "memory management",
  ],
  business: [
    "supply chain optimization",
    "behavioral economics",
    "market microstructure",
    "organizational psychology",
    "venture capital mechanics",
    "pricing strategy",
    "regulatory capture",
    "network effects",
    "corporate governance",
    "game theory in negotiations",
  ],
  science: [
    "quantum entanglement",
    "CRISPR gene editing",
    "plate tectonics",
    "neurotransmitter pathways",
    "stellar nucleosynthesis",
    "protein folding",
    "entropy and thermodynamics",
    "ocean current systems",
    "evolutionary game theory",
    "superconductivity",
  ],
};

async function generateWithAPI(
  apiKey: string,
  preferredDomain?: Domain
): Promise<GeneratedContent> {
  // Dynamic import so the app doesn't crash when the SDK isn't configured
  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const client = new Anthropic({ apiKey });

  const domain =
    preferredDomain || DOMAINS[Math.floor(Math.random() * DOMAINS.length)];
  const topics = DOMAIN_TOPICS[domain];
  const topic = topics[Math.floor(Math.random() * topics.length)];

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `Generate a learning passage and quiz questions about "${topic}" in the ${domain} domain.

Requirements:
1. PASSAGE: 300-400 words. Written for an intelligent adult who is NOT an expert in this field. Introduce one core concept clearly, with a concrete example or analogy. The passage should teach something genuinely useful — not surface-level fluff.

2. COMPREHENSION QUESTIONS: 4 multiple-choice questions that test understanding, not memorization. Good questions ask "what would happen if..." or "which of these follows from..." — not "what year did...". Each question has 4 options with exactly one correct answer.

3. RECALL QUESTIONS: 3 multiple-choice questions for a 24-hour delayed recall test. These should test whether the reader remembers the key concepts and can still reason about them a day later. Slightly harder than comprehension questions.

Respond in this exact JSON format (no markdown, no code fences):
{
  "title": "passage title",
  "content": "the full passage text",
  "wordCount": 350,
  "comprehensionQuestions": [
    {
      "id": "c1",
      "text": "question text",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0
    }
  ],
  "recallQuestions": [
    {
      "id": "r1",
      "text": "question text",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0
    }
  ]
}`,
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  const parsed = JSON.parse(text);
  return {
    passage: {
      title: parsed.title,
      content: parsed.content,
      domain,
      wordCount: parsed.wordCount || parsed.content.split(/\s+/).length,
    },
    comprehensionQuestions: parsed.comprehensionQuestions,
    recallQuestions: parsed.recallQuestions,
  };
}
