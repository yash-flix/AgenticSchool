/**
 * Thirty daily buckets, empty days included. A single measure, so one hue and
 * no legend — the heading says what is plotted.
 */
export default function SignupTrend({
  days,
}: {
  days: { day: string; count: number }[];
}) {
  const peak = Math.max(1, ...days.map((d) => d.count));
  const total = days.reduce((a, d) => a + d.count, 0);

  return (
    <section className="card p-6 hover:translate-y-0 hover:shadow-[var(--shadow-card)]">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="label">Signups, last 30 days</h2>
        <span className="font-mono text-[11px] text-muted tabular-nums">
          {total} total · peak {peak}
        </span>
      </div>

      <div className="mt-6 flex h-[92px] items-end gap-[2px]">
        {days.map((d) => (
          <span
            key={d.day}
            title={`${d.day} — ${d.count} signup${d.count === 1 ? "" : "s"}`}
            style={{ height: d.count ? `${(d.count / peak) * 100}%` : "2px" }}
            className={`flex-1 rounded-t-[3px] ${
              d.count ? "bg-ink" : "bg-line-2"
            }`}
          />
        ))}
      </div>

      <div className="mt-3 flex justify-between font-mono text-[10px] text-muted">
        <span>{days[0]?.day.slice(5)}</span>
        <span>{days.at(-1)?.day.slice(5)}</span>
      </div>
    </section>
  );
}
