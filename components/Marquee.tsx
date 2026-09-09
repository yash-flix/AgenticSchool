import { courses, fmtViews, totalViews } from "@/lib/courses";

export default function Marquee() {
  const channels = Array.from(new Set(courses.map((c) => c.channel)));
  const row = [...channels, ...channels];

  return (
    <section className="border-y border-line bg-panel/60 py-8">
      <p className="px-6 text-center text-[14px] text-muted">
        <span className="text-ink">{fmtViews(totalViews)} views</span> across
        these ten courses, from the people who made them
      </p>
      <div className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track flex w-max gap-10 pr-10">
          {row.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="text-[17px] font-medium tracking-[-0.02em] whitespace-nowrap text-ink-2"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
