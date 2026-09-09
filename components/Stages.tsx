import { courses, fmtDuration, stages } from "@/lib/courses";
import CourseCard from "./CourseCard";
import ProgressBar from "./ProgressBar";
import Reveal from "./Reveal";

export default function Stages() {
  return (
    <section id="path" className="scroll-mt-20 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1180px]">
        {/* section intro */}
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <span className="label">The path</span>
            <h2 className="mt-4 max-w-[16ch] text-[34px] leading-[1.02] font-semibold tracking-[-0.035em] text-balance md:text-[46px]">
              Four stages. Watch them in order.
            </h2>
            <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-ink-2">
              Most people watch agent content at random and end up with ten
              half-built demos. The order below fixes that. Each stage assumes
              the one before it, and each course earns its place by teaching
              something the others do not.
            </p>
          </Reveal>
          <Reveal delay={80} className="md:col-span-5 md:col-start-8">
            <ProgressBar />
          </Reveal>
        </div>

        {/* stages */}
        <div className="mt-16">
          {stages.map((stage, si) => {
            const list = courses.filter((c) => c.stage === stage.id);
            const mins = list.reduce((a, c) => a + c.minutes, 0);

            return (
              <section
                key={stage.id}
                id={stage.id}
                className="scroll-mt-24 border-t border-line pt-7 pb-16 last:pb-0"
              >
                <Reveal>
                  {/* meta bar */}
                  <div className="flex items-center gap-4">
                    <span className="label whitespace-nowrap text-ink">
                      {stage.index}
                    </span>
                    <span className="label whitespace-nowrap">
                      {stage.name}
                    </span>
                    <span className="h-px flex-1 bg-line" />
                    <span className="label whitespace-nowrap">
                      {list.length} course{list.length > 1 ? "s" : ""}
                    </span>
                    <span className="label whitespace-nowrap">
                      {fmtDuration(mins)}
                    </span>
                    <span className="label whitespace-nowrap text-moss">
                      Free
                    </span>
                  </div>

                  {/* headline + blurb, aligned to one baseline */}
                  <div className="mt-7 grid gap-x-10 gap-y-4 md:grid-cols-12">
                    <h3 className="text-[28px] leading-[1.06] font-semibold tracking-[-0.032em] text-balance md:col-span-6 md:text-[38px]">
                      {stage.headline}
                    </h3>
                    <p className="text-[15.5px] leading-[1.6] text-ink-2 md:col-span-5 md:col-start-8 md:pt-2">
                      {stage.blurb}
                    </p>
                  </div>
                </Reveal>

                <div className="mt-9 space-y-4">
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
