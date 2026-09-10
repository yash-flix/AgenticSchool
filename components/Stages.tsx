import { courses, fmtDuration, stages } from "@/lib/courses";
import AccentText from "./AccentText";
import CourseCard from "./CourseCard";
import StageWeight from "./StageWeight";
import ProgressBar from "./ProgressBar";
import Reveal from "./Reveal";

export default function Stages() {
  return (
    <section id="path" className="scroll-mt-24 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <span className="label">The path</span>
            <h2 className="display-2 mt-5 max-w-[14ch]">
              Four stages. <AccentText>{"Watch them *in order*"}</AccentText>.
            </h2>
            <p className="lede mt-6 max-w-[45ch]">
              Most people watch agent content at random and end up with ten
              half-built demos. The order below fixes that. Each stage assumes
              the one before it, and each course earns its place by teaching
              something the others do not.
            </p>
            <StageWeight />
          </Reveal>
          <Reveal delay={80} className="md:col-span-5 md:col-start-8 md:pt-1">
            <ProgressBar />
          </Reveal>
        </div>

        <div className="mt-20">
          {stages.map((stage, si) => {
            const list = courses.filter((c) => c.stage === stage.id);
            const mins = list.reduce((a, c) => a + c.minutes, 0);

            return (
              <section
                key={stage.id}
                id={stage.id}
                className="scroll-mt-24 pb-20 last:pb-0"
              >
                <Reveal>
                  <div className="flex items-center gap-4 border-t border-ink pt-4">
                    <span className="font-mono text-[13px] font-medium tracking-[-0.02em] text-ink tabular-nums">
                      {stage.index}
                    </span>
                    <span className="label text-ink">{stage.name}</span>
                    <span className="rule-x h-px flex-1" />
                    <span className="label">
                      {list.length} course{list.length > 1 ? "s" : ""}
                    </span>
                    <span className="label">{fmtDuration(mins)}</span>
                    <span className="chip chip-free hidden sm:inline-flex">
                      Free
                    </span>
                  </div>

                  <div className="mt-9 grid gap-x-12 gap-y-5 md:grid-cols-12">
                    <h3 className="display-3 md:col-span-6">
                      <AccentText>{stage.headline}</AccentText>
                    </h3>
                    <p className="text-[15px] leading-[1.65] text-ink-2 md:col-span-5 md:col-start-8 md:pt-2">
                      {stage.blurb}
                    </p>
                  </div>
                </Reveal>

                <div className="mt-11 space-y-5">
                  {list.map((c, i) => (
                    <Reveal key={c.slug} delay={i * 70 + si * 10}>
                      <CourseCard course={c} />
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
