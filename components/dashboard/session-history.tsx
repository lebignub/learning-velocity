"use client";

import type { Session } from "@/lib/types";

interface SessionHistoryProps {
  sessions: Session[];
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-accent";
  if (score >= 40) return "text-warning";
  return "text-danger";
}

const DOMAIN_COLORS: Record<string, string> = {
  tech: "bg-blue-500/20 text-blue-400",
  business: "bg-amber-500/20 text-amber-400",
  science: "bg-emerald-500/20 text-emerald-400",
};

export default function SessionHistory({ sessions }: SessionHistoryProps) {
  if (sessions.length === 0) return null;

  // Most recent first
  const sorted = [...sessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-card border border-card-border rounded-xl p-6">
      <h3 className="text-sm font-medium text-muted mb-4">Recent Sessions</h3>
      <div className="space-y-3">
        {sorted.slice(0, 10).map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between py-2 border-b border-card-border last:border-0"
          >
            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-mono uppercase ${DOMAIN_COLORS[session.domain] || "bg-card-border text-muted"}`}
              >
                {session.domain}
              </span>
              <div>
                <p className="text-sm font-medium truncate max-w-[200px]">
                  {session.passageTitle}
                </p>
                <p className="text-xs text-muted">
                  {new Date(session.date).toLocaleDateString("en", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-muted">SPD</p>
                <p
                  className={`text-sm font-mono font-bold ${getScoreColor(session.speedScore)}`}
                >
                  {session.speedScore}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted">CMP</p>
                <p
                  className={`text-sm font-mono font-bold ${getScoreColor(session.comprehensionScore)}`}
                >
                  {session.comprehensionScore}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted">RET</p>
                <p
                  className={`text-sm font-mono font-bold ${session.retentionScore !== null ? getScoreColor(session.retentionScore) : "text-muted"}`}
                >
                  {session.retentionScore !== null ? session.retentionScore : "—"}
                </p>
              </div>
              <div className="text-right min-w-[48px]">
                <p className="text-xs text-muted">VEL</p>
                <p
                  className={`text-sm font-mono font-bold ${getScoreColor(session.velocityScore)}`}
                >
                  {session.velocityScore}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
