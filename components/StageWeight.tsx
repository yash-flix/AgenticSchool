import { courses, fmtDuration, stages } from "@/lib/courses";

/**
 * Part-to-whole across four ordered stages. The ramp runs light to dark in path
 * order, so the bar encodes sequence as well as size — which is the one thing
 * this section is asking people to respect.
 *
 * Ordinal, not categorical: four accent hues would have said these stages are
 * different in kind rather than consecutive.
 */
const RAMP = ["bg-line-2", "bg-muted", "bg-ink-2", "bg-ink"];

export default function StageWeight() {
  const rows = stages.map((s, i) => ({
    ...s,
    tone: RAMP[i],
    minutes: courses
      .filter((c) => c.stage === s.id)
      .reduce((a, c) => a + c.minutes, 0),
  }));
  const total = rows.reduce((a, r) => a + r.minutes, 0);

  return (
    <figure className="mt-10">
      <figcaption className="label">Where the {Math.round(total / 60)} hours go</figcaption>

      {/* flexGrow with a zero basis keeps the segments proportional while the
          2px surface gaps eat their own width instead of overflowing. */}
      <div className="mt-5 flex h-3 gap-[2px]">
        {rows.map((r) => (
          <span
            key={r.id}
            style={{ flexGrow: r.minutes, flexBasis: 0 }}
            title={`${r.name} — ${fmtDuration(r.minutes)}`}
            className={`min-w-0 first:rounded-l-[4px] last:rounded-r-[4px] ${r.tone}`}
          />
        ))}
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
        {rows.map((r) => (
          <li key={r.id} className="flex items-center gap-2.5">
            <span
              aria-hidden
              className={`h-[7px] w-[7px] shrink-0 rounded-[2px] ${r.tone}`}
            />
            <span className="text-[13px] text-ink-2">{r.name}</span>
            <span className="ml-auto font-mono text-[10.5px] text-muted tabular-nums">
              {Math.round((r.minutes / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-[12.5px] leading-[1.5] text-muted">
        Over half the path is stage one. The foundations are long on purpose;
        everything after them is short because it can assume them.
      </p>
    </figure>
  );
}
