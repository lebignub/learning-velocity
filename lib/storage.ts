/**
 * localStorage wrapper for session data.
 * All data lives under the "lv_sessions" key as a JSON array.
 */

import type { Session, VelocityDataPoint } from "./types";

const SESSIONS_KEY = "lv_sessions";

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function getSessions(): Session[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSession(session: Session): void {
  if (!isClient()) return;
  const sessions = getSessions();
  sessions.push(session);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function updateSession(
  sessionId: string,
  updates: Partial<Session>
): void {
  if (!isClient()) return;
  const sessions = getSessions();
  const idx = sessions.findIndex((s) => s.id === sessionId);
  if (idx === -1) return;
  sessions[idx] = { ...sessions[idx], ...updates };
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

/**
 * Get the most recent session that still needs a recall quiz.
 * Returns null if there's nothing to recall or if the most recent session
 * already has retention data.
 */
export function getPendingRecallSession(): Session | null {
  const sessions = getSessions();
  if (sessions.length === 0) return null;

  // Sort by date descending, find the most recent session
  const sorted = [...sessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const latest = sorted[0];

  // Only show recall if:
  // 1. It doesn't already have retention data
  // 2. It's from a previous day (not today)
  if (latest.retentionScore !== null) return null;

  const sessionDate = new Date(latest.date).toDateString();
  const today = new Date().toDateString();
  if (sessionDate === today) return null;

  return latest;
}

/**
 * Build velocity trend data for the chart.
 */
export function getVelocityTrend(): VelocityDataPoint[] {
  const sessions = getSessions();
  return sessions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((s) => ({
      date: s.date,
      velocity: s.velocityScore,
      speed: s.speedScore,
      comprehension: s.comprehensionScore,
      retention: s.retentionScore,
    }));
}

/**
 * Get streak: number of consecutive days with at least one session.
 */
export function getStreak(): number {
  const sessions = getSessions();
  if (sessions.length === 0) return 0;

  // Get unique session dates, sorted descending
  const dates = [
    ...new Set(sessions.map((s) => new Date(s.date).toDateString())),
  ].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < dates.length; i++) {
    const expected = new Date(today);
    expected.setDate(expected.getDate() - i);

    if (new Date(dates[i]).toDateString() === expected.toDateString()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
