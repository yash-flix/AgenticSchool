import { courses, fieldTrack, fmtViews, totalViews } from "@/lib/courses";

export default function Marquee() {
  const names = Array.from(
    new Set([...courses.map((c) => c.channel), ...fieldTrack.map((v) => v.channel)])
  );
  const row = [...names, ...names];

  return (
    <section className="border-y border-line bg-panel/50 py-9">
      <p className="px-6 text-center text-[13.5px] text-muted">
        <span className="text-ink">{fmtViews(totalViews)} views</span> on the
        core ten, taught by the people who actually built this stuff
      </p>
      <div className="mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-8 pr-8">
          {row.map((c, i) => (
            <span key={`${c}-${i}`} className="flex items-center gap-8">
              <span className="text-[17px] font-medium tracking-[-0.025em] whitespace-nowrap text-ink-2">
                {c}
              </span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-line-2" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
