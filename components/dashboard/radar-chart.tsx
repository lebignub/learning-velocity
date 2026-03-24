"use client";

/**
 * SVG radar chart showing the four dimensions of Learning Velocity.
 * Renders a diamond-shaped chart with axes for Speed, Comprehension,
 * Retention, and Trend — so users see their learning "shape," not just
 * a single number.
 */

interface RadarChartProps {
  speed: number; // 0-100
  comprehension: number; // 0-100
  retention: number | null; // 0-100 or null if not yet measured
  trend: number; // 0-100 — derived from recent velocity change
  size?: number;
}

// The four axes, positioned at cardinal directions
const AXES = [
  { label: "Speed", angle: -90 }, // top
  { label: "Comprehension", angle: 0 }, // right
  { label: "Retention", angle: 90 }, // bottom
  { label: "Trend", angle: 180 }, // left
];

function polarToXY(
  angleDeg: number,
  radius: number,
  cx: number,
  cy: number
): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
}

export default function RadarChart({
  speed,
  comprehension,
  retention,
  trend,
  size = 220,
}: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.38; // leave room for labels
  const labelR = size * 0.48;

  // Normalize values to 0-1 range
  const values = [
    speed / 100,
    comprehension / 100,
    retention !== null ? retention / 100 : 0,
    trend / 100,
  ];

  // Build the data polygon
  const dataPoints = AXES.map((axis, i) =>
    polarToXY(axis.angle, values[i] * maxR, cx, cy)
  );
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ") + " Z";

  // Grid rings at 25%, 50%, 75%, 100%
  const rings = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="overflow-visible"
      >
        {/* Grid rings */}
        {rings.map((r) => {
          const ringPoints = AXES.map((axis) =>
            polarToXY(axis.angle, r * maxR, cx, cy)
          );
          const ringPath =
            ringPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ") + " Z";
          return (
            <path
              key={r}
              d={ringPath}
              fill="none"
              stroke="var(--card-border)"
              strokeWidth={r === 1 ? "1.5" : "0.75"}
              opacity={r === 1 ? 0.6 : 0.3}
            />
          );
        })}

        {/* Axis lines */}
        {AXES.map((axis) => {
          const [x, y] = polarToXY(axis.angle, maxR, cx, cy);
          return (
            <line
              key={axis.label}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="var(--card-border)"
              strokeWidth="0.75"
              opacity="0.4"
            />
          );
        })}

        {/* Data fill */}
        <path d={dataPath} fill="var(--accent)" opacity="0.15" />

        {/* Data outline */}
        <path
          d={dataPath}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p[0]}
            cy={p[1]}
            r="4"
            fill={
              // Dim the retention dot if no data yet
              i === 2 && retention === null
                ? "var(--muted)"
                : "var(--accent)"
            }
            stroke="var(--card)"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {AXES.map((axis, i) => {
          const [x, y] = polarToXY(axis.angle, labelR, cx, cy);
          // Text anchor based on position
          const anchor =
            axis.angle === 0
              ? "start"
              : axis.angle === 180
                ? "end"
                : "middle";
          const dy = axis.angle === -90 ? -4 : axis.angle === 90 ? 14 : 4;

          const value =
            i === 2 && retention === null
              ? "—"
              : Math.round(values[i] * 100);

          return (
            <text
              key={axis.label}
              x={x}
              y={y + dy}
              textAnchor={anchor}
              fill="var(--muted)"
              fontSize="11"
              fontFamily="var(--font-sans)"
            >
              <tspan fill="var(--foreground)" fontWeight="600">
                {value}
              </tspan>{" "}
              {axis.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
