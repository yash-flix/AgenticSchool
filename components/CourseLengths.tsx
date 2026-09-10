import { courses, fmtDuration } from "@/lib/courses";

/** The three that carry the path if you already write Python. */
const LOAD_BEARING = new Set(["03", "04", "07"]);

/**
 * Emphasis chart, not a categorical one: a single measure (runtime) where three
 * bars are the story and the rest are context. One accent hue plus the site's
 * structural gray, so nothing competes with the three that matter.
 *
 * Bars stay in path order rather than sorted by length, because the disparity
 * *along the path* is the point the notes are making.
 */
export default function CourseLengths() {
  const longest = Math.max(...courses.map((c) => c.minutes));

  return (
    <figure className="mt-12">
      <figcaption className="label">Runtime, in path order</figcaption>

      <ul className="mt-5 space-y-[2px]">
        {courses.map((c) => {
          const key = LOAD_BEARING.has(c.n);
          // Linear scale: a 47 minute course really is 3% of a 24 hour one, and
          // flattening that would erase the thing worth seeing. The floor keeps
          // the shortest bar a visible mark rather than a hairline.
          const width = Math.max((c.minutes / longest) * 100, 2.5);

          return (
            <li
              key={c.slug}
              title={`${c.n} · ${c.shortTitle} — ${fmtDuration(c.minutes)}`}
              className="flex items-center gap-3"
            >
              <span className="w-[17px] shrink-0 font-mono text-[10px] text-muted tabular-nums">
                {c.n}
              </span>

              <span className="relative h-[11px] flex-1">
                <span
                  style={{ width: `${width}%` }}
                  className={`absolute inset-y-0 left-0 rounded-r-[4px] ${
                    key ? "bg-flame" : "bg-line-2"
                  }`}
                />
              </span>

              {/* Labelled selectively: the three the note is about. The rest
                  carry their runtime in the row tooltip and the catalog. */}
              <span className="w-[44px] shrink-0 text-right font-mono text-[10px] tabular-nums text-ink-2">
                {key ? fmtDuration(c.minutes) : ""}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 flex items-start gap-2.5 text-[12.5px] leading-[1.5] text-muted">
        <span
          aria-hidden
          className="mt-[5px] h-[7px] w-[7px] shrink-0 rounded-[2px] bg-flame"
        />
        <span>
          The three load-bearing courses. The long ones are coverage, not
          homework.
        </span>
      </p>
    </figure>
  );
}
