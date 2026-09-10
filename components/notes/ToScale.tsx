import { courses, fmtDuration, totalMinutes } from "@/lib/courses";

/**
 * The argument, to scale. One measure (minutes) on one shared axis: the video
 * path as a bar segmented by course, and every note on the site as a second
 * bar. Linear scale on purpose, because the disparity is the point.
 *
 * Marks carry the colour; text stays in ink. Segments are separated by the
 * surface showing through, not by borders. Only segments wide enough to hold
 * a label get one.
 */
const TICK_HOURS = [0, 16, 32, 48, 64];

export default function ToScale({ readMinutes, count }: { readMinutes: number; count: number }) {
  const pct = (m: number) => (m / totalMinutes) * 100;
  const read = Math.max(pct(readMinutes), 0.8);
  const ratio = Math.round(totalMinutes / Math.max(readMinutes, 1));

  return (
    <figure className="m-0 overflow-hidden rounded-[14px] border border-line bg-paper shadow-[var(--shadow-card)]">
      <div className="grid md:grid-cols-12">
        {/* chart */}
        <div className="p-6 md:col-span-8 sm:p-7">
          <figcaption className="flex items-baseline justify-between gap-4">
            <span className="label text-ink">Tutorial hell, to scale</span>
            <span className="label">one axis · minutes</span>
          </figcaption>

          <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-y-7 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-x-5 sm:gap-y-6">
            {/* row: watch */}
            <RowLabel title="Watch the whole path" sub={`${courses.length} courses`} />
            <div>
              <div className="flex h-[16px] w-full gap-[2px]">
                {courses.map((c) => {
                  const w = pct(c.minutes);
                  return (
                    <span
                      key={c.slug}
                      title={`${c.n} · ${c.shortTitle} — ${fmtDuration(c.minutes)}`}
                      style={{ width: `${w}%` }}
                      className="relative h-full min-w-[3px] bg-ink first:rounded-l-[4px] last:rounded-r-[4px]"
                    >
                      {w >= 5 && (
                        <span className="absolute inset-0 grid place-items-center font-mono text-[9.5px] text-canvas/80 tabular-nums">
                          {c.n}
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
              <Value text={fmtDuration(totalMinutes)} />
            </div>

            {/* row: read */}
            <RowLabel title="Read every note here" sub={`${count} ${count === 1 ? "note" : "notes"}`} />
            <div>
              <div className="relative h-[16px] w-full">
                <span
                  title={`${readMinutes} min across ${count} ${count === 1 ? "note" : "notes"}`}
                  style={{ width: `${read}%` }}
                  className="block h-full min-w-[4px] rounded-[4px] bg-flame"
                />
                <span
                  className="hand absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[19px] leading-none text-ink-2"
                  style={{ left: `calc(${read}% + 12px)` }}
                >
                  ← read this, then go build
                </span>
              </div>
              <Value text={`${readMinutes} min`} />
            </div>

            {/* axis */}
            <span className="hidden sm:block" />
            <div className="relative mt-1 h-6 border-t border-line-2">
              {TICK_HOURS.map((h) => {
                const x = pct(h * 60);
                if (x > 100) return null;
                return (
                  <span
                    key={h}
                    className="absolute top-0 flex flex-col items-center"
                    style={{ left: `${x}%`, transform: "translateX(-50%)" }}
                  >
                    <span className="h-[5px] w-px bg-line-2" />
                    <span className="mt-1 font-mono text-[10px] text-muted tabular-nums">{h}h</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* hero figure */}
        <div className="flex flex-col justify-center border-t border-line bg-panel/50 p-6 md:col-span-4 md:border-t-0 md:border-l sm:p-7">
          <span className="label">Reading instead of watching is</span>
          <span className="mt-4 text-[64px] leading-[0.9] font-medium tracking-[-0.045em] text-ink">
            {ratio.toLocaleString()}
            <span className="text-flame">×</span>
          </span>
          <span className="mt-4 text-[15px] leading-[1.5] text-ink-2">shorter, and you still write every line yourself.</span>
          <span className="mt-6 text-[12.5px] leading-[1.5] text-muted">
            The ratio shrinks as notes are added. The point does not.
          </span>
        </div>
      </div>
    </figure>
  );
}

function RowLabel({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 sm:block sm:pt-px">
      <span className="text-[14px] leading-tight font-medium tracking-[-0.015em] text-ink">{title}</span>
      <span className="font-mono text-[10.5px] text-muted tabular-nums sm:mt-1 sm:block">{sub}</span>
    </div>
  );
}

function Value({ text }: { text: string }) {
  return (
    <span className="mt-2 block font-mono text-[12px] text-ink tabular-nums">{text}</span>
  );
}
