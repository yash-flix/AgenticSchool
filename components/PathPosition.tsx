import { courses, stages } from "@/lib/courses";

/**
 * Orientation, not decoration: ten segments, one per course, grouped into the
 * four stages. Everything before this course is filled, everything after is
 * empty, so the reader can see how far in they are without counting.
 */
export default function PathPosition({ slug }: { slug: string }) {
  const here = courses.findIndex((c) => c.slug === slug);
  if (here < 0) return null;

  const current = courses[here];
  const stage = stages.find((s) => s.id === current.stage);

  return (
    <figure className="mt-6">
      <div className="flex items-center">
        {courses.map((c, i) => {
          const newStage = i > 0 && c.stage !== courses[i - 1].stage;
          const tone =
            i === here ? "bg-flame" : i < here ? "bg-ink-2" : "bg-line-2";

          return (
            <span
              key={c.slug}
              title={`${c.n} · ${c.shortTitle}`}
              // A wider gap where the stage changes, so the four groups read
              // without needing four colours.
              className={`h-[5px] flex-1 rounded-[2px] ${tone} ${
                newStage ? "ml-2.5" : i > 0 ? "ml-[3px]" : ""
              }`}
            />
          );
        })}
      </div>

      <figcaption className="mt-3 flex items-baseline gap-2 font-mono text-[10.5px] tracking-[0.02em] text-muted">
        <span className="text-ink-2 tabular-nums">
          {current.n}/{String(courses.length).padStart(2, "0")}
        </span>
        <span className="text-line-2">·</span>
        <span>stage {stage?.index.split(".")[0]} — {stage?.name}</span>
      </figcaption>
    </figure>
  );
}
