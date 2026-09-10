import { fieldTrack } from "@/lib/courses";

const HOUR = 60;

/**
 * One column per session, longest first, so the shape of the track is legible
 * at a glance: a few long talks and a long tail of short ones. A single hue —
 * there is one measure here and nothing to tell apart.
 */
export default function FieldShape() {
  const longest = Math.max(...fieldTrack.map((v) => v.minutes));
  const short = fieldTrack.filter((v) => v.minutes < HOUR).length;

  return (
    <figure className="mt-10">
      <figcaption className="label">Session length, longest first</figcaption>

      <div className="relative mt-5 h-[68px]">
        {/* Threshold rather than a full grid: one line is all this needs, and it
            is the line the caption is about. */}
        <span
          aria-hidden
          className="absolute inset-x-0 border-t border-ink/20"
          style={{ bottom: `${(HOUR / longest) * 100}%` }}
        />
        <span
          aria-hidden
          className="absolute right-0 font-mono text-[9.5px] text-muted"
          style={{ bottom: `calc(${(HOUR / longest) * 100}% + 3px)` }}
        >
          1h
        </span>

        <div className="flex h-full items-end gap-[2px]">
          {fieldTrack.map((v) => (
            <span
              key={v.videoId}
              title={`${v.title} — ${v.minutes}m`}
              style={{ height: `${Math.max((v.minutes / longest) * 100, 3)}%` }}
              className="flex-1 rounded-t-[4px] bg-muted"
            />
          ))}
        </div>
      </div>

      <p className="mt-4 text-[12.5px] leading-[1.5] text-muted">
        {short} of the {fieldTrack.length} sessions run under an hour. Dip in
        anywhere.
      </p>
    </figure>
  );
}
