import { useId } from "react";

/**
 * A cover for a note that nobody has to draw. The slug seeds a small flow
 * diagram: a handful of nodes on a grid, one lit in flame, joined by a trace.
 * Same slug, same figure, on every render and every page, so a note is
 * recognisable from its thumbnail without anyone maintaining an image.
 */
function seed(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type FigureSpec = {
  points: { x: number; y: number }[];
  lit: number;
  d: string;
};

export function figureFor(slug: string, w = 240, h = 120): FigureSpec {
  const rnd = seed(slug);
  const n = 4 + Math.floor(rnd() * 3); // 4–6 nodes
  const rows = [h * 0.25, h * 0.5, h * 0.75];
  const padX = w * 0.1;
  const step = (w - padX * 2) / (n - 1);

  let lastRow = 1;
  const points = Array.from({ length: n }, (_, i) => {
    // Walk the rows rather than jump, so the trace reads as a path.
    const move = Math.floor(rnd() * 3) - 1;
    lastRow = Math.min(2, Math.max(0, lastRow + move));
    return { x: padX + step * i + (rnd() - 0.5) * step * 0.25, y: rows[lastRow] };
  });

  // Smooth the trace with a midpoint curve through each pair.
  const d = points.reduce((acc, p, i) => {
    if (i === 0) return `M${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    const prev = points[i - 1];
    const mx = ((prev.x + p.x) / 2).toFixed(1);
    return `${acc} C${mx} ${prev.y.toFixed(1)}, ${mx} ${p.y.toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }, "");

  return { points, lit: 1 + Math.floor(rnd() * (n - 2)), d };
}

export default function NoteFigure({
  slug,
  className = "",
  animate = false,
}: {
  slug: string;
  className?: string;
  /** Runs the trace once on mount; used on the note page header only. */
  animate?: boolean;
}) {
  const W = 240;
  const H = 120;
  const f = figureFor(slug, W, H);
  // Pattern ids are document-global; the same figure twice on a page must
  // not share one.
  const dots = `dots-${useId().replace(/:/g, "")}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <pattern id={dots} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="var(--color-line-2)" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={`url(#${dots})`} opacity="0.7" />

      <path
        d={f.d}
        fill="none"
        stroke="var(--color-line-2)"
        strokeWidth="1.6"
        strokeLinecap="round"
        pathLength={1}
        className={animate ? "trace-in" : undefined}
      />

      {f.points.map((p, i) => {
        const lit = i === f.lit;
        const last = i === f.points.length - 1;
        if (last) {
          return (
            <rect
              key={i}
              x={p.x - 5}
              y={p.y - 5}
              width="10"
              height="10"
              rx="2"
              fill="var(--color-paper)"
              stroke="var(--color-ink)"
              strokeWidth="1.5"
            />
          );
        }
        return (
          <g key={i}>
            {lit && (
              <circle cx={p.x} cy={p.y} r="11" fill="var(--color-flame)" opacity="0.14" />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={lit ? 5.5 : 4.5}
              fill={lit ? "var(--color-flame)" : "var(--color-paper)"}
              stroke={lit ? "var(--color-flame)" : "var(--color-line-2)"}
              strokeWidth="1.5"
            />
          </g>
        );
      })}
    </svg>
  );
}
