/**
 * Where people stop. Bars run in path order, so a drop between two neighbours
 * is the thing you are looking for — sorting by count would hide exactly that.
 */
export default function CourseFunnel({
  rows,
  members,
}: {
  rows: { n: string; title: string; count: number }[];
  members: number;
}) {
  const peak = Math.max(1, ...rows.map((r) => r.count));

  return (
    <section className="card p-6 hover:translate-y-0 hover:shadow-[var(--shadow-card)]">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="label">Completions by course</h2>
        <span className="font-mono text-[11px] text-muted tabular-nums">
          of {members} active
        </span>
      </div>

      <ul className="mt-6 space-y-[3px]">
        {rows.map((r) => (
          <li key={r.n} className="flex items-center gap-3" title={r.title}>
            <span className="w-[17px] shrink-0 font-mono text-[10px] text-muted tabular-nums">
              {r.n}
            </span>
            <span className="relative h-[11px] flex-1">
              <span
                style={{ width: `${Math.max((r.count / peak) * 100, 1.5)}%` }}
                className="absolute inset-y-0 left-0 rounded-r-[4px] bg-ink"
              />
            </span>
            <span className="w-[26px] shrink-0 text-right font-mono text-[10px] text-ink-2 tabular-nums">
              {r.count}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
