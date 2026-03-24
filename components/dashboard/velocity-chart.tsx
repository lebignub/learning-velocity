"use client";

import type { VelocityDataPoint } from "@/lib/types";

interface VelocityChartProps {
  data: VelocityDataPoint[];
}

/**
 * Simple SVG line chart for Learning Velocity trend.
 * No dependencies — just SVG paths.
 */
export default function VelocityChart({ data }: VelocityChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-card border border-card-border rounded-xl p-8 text-center">
        <p className="text-muted">No sessions yet. Start your first workout!</p>
      </div>
    );
  }

  const width = 600;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  // Scale: X is evenly spaced, Y is 0-100
  const xStep = data.length > 1 ? chartW / (data.length - 1) : chartW / 2;

  function toX(i: number): number {
    return padding.left + (data.length > 1 ? i * xStep : chartW / 2);
  }

  function toY(value: number): number {
    return padding.top + chartH - (value / 100) * chartH;
  }

  // Build SVG path for velocity line
  const velocityPath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(d.velocity)}`)
    .join(" ");

  // Gradient fill area
  const areaPath = `${velocityPath} L ${toX(data.length - 1)} ${toY(0)} L ${toX(0)} ${toY(0)} Z`;

  // Y-axis labels
  const yLabels = [0, 25, 50, 75, 100];

  return (
    <div className="bg-card border border-card-border rounded-xl p-6">
      <h3 className="text-sm font-medium text-muted mb-4">
        Learning Velocity Trend
      </h3>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {yLabels.map((v) => (
          <g key={v}>
            <line
              x1={padding.left}
              y1={toY(v)}
              x2={width - padding.right}
              y2={toY(v)}
              stroke="var(--card-border)"
              strokeWidth="1"
            />
            <text
              x={padding.left - 8}
              y={toY(v) + 4}
              textAnchor="end"
              fill="var(--muted)"
              fontSize="10"
              fontFamily="var(--font-mono)"
            >
              {v}
            </text>
          </g>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#velocityGradient)" />

        {/* Velocity line */}
        <path
          d={velocityPath}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((d, i) => (
          <g key={i}>
            <circle
              cx={toX(i)}
              cy={toY(d.velocity)}
              r="4"
              fill="var(--accent)"
              stroke="var(--card)"
              strokeWidth="2"
            />
            {/* Date label on x-axis */}
            <text
              x={toX(i)}
              y={height - 5}
              textAnchor="middle"
              fill="var(--muted)"
              fontSize="9"
              fontFamily="var(--font-mono)"
            >
              {new Date(d.date).toLocaleDateString("en", {
                month: "short",
                day: "numeric",
              })}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
