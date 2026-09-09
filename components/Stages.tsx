import { courses, fmtDuration, stages } from "@/lib/courses";
import CourseCard from "./CourseCard";
import ProgressBar from "./ProgressBar";
import Reveal from "./Reveal";

export default function Stages() {
  return (
    <section id="path" className="scroll-mt-20 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-8 border-b border-line pb-10 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <span className="label">The path</span>
            <h2 className="mt-4 text-[34px] leading-[1.02] font-semibold tracking-[-0.035em] text-balance md:text-[46px]">
              Four stages.
              <br />
              Watch them in order.
            </h2>
          </Reveal>
          <Reveal delay={80} className="md:col-span-5 md:col-start-8">
            <p className="text-[16px] leading-[1.55] text-ink-2">
              Most people watch agent content at random and end up with ten
              half-built demos. The order below fixes that. Each stage assumes
              the one before it, and each course earns its place by teaching
              something the others do not.
            </p>
            <div className="mt-6">
              <ProgressBar />
            </div>
          </Reveal>
        </div>

        {stages.map((stage, si) => {
          const list = courses.filter((c) => c.stage === stage.id);
          const mins = list.reduce((a, c) => a + c.minutes, 0);
          return (
            <div
              key={stage.id}
              id={stage.id}
              className="scroll-mt-20 border-b border-line py-14 last:border-b-0"
            >
              <div className="grid gap-8 md:grid-cols-12">
                <div className="md:col-span-5">
                  <Reveal>
                    <div className="sticky top-24">
                      <span className="label">
                        {stage.index} — {stage.name}
                      </span>
                      <h3 className="mt-4 text-[27px] leading-[1.08] font-semibold tracking-[-0.03em] whitespace-pre-line md:text-[34px]">
                        {stage.headline}
                      </h3>
                      <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.55] text-ink-2">
                        {stage.blurb}
                      </p>
                      <div className="mt-6 flex items-center gap-4 rule-x pt-5">
                        <span className="label">
                          {list.length} course{list.length > 1 ? "s" : ""}
                        </span>
                        <span className="label">{fmtDuration(mins)}</span>
                      </div>
                    </div>
                  </Reveal>
                </div>

                <div className="space-y-4 md:col-span-7">
                  {list.map((c, i) => (
                    <Reveal key={c.slug} delay={i * 70 + si * 20}>
                      <CourseCard course={c} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
