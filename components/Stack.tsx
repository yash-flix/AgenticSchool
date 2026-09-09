import Reveal from "./Reveal";

const builds = [
  {
    n: "01",
    title: "A research agent that cites",
    body: "Retrieval over your own documents, a reranker in front of the model, and answers that point back at sources instead of inventing them.",
    from: "Courses 04, 08",
  },
  {
    n: "02",
    title: "A crew that ships a report",
    body: "Researcher, analyst, and writer agents handing work between each other, with a human approving anything that leaves the building.",
    from: "Courses 05, 06",
  },
  {
    n: "03",
    title: "An MCP server your tools speak",
    body: "Your internal APIs exposed as callable tools, deployed once and reachable from any agent client you point at it.",
    from: "Course 07",
  },
];

const notes = [
  {
    q: "Why these ten and not the other hundred?",
    a: "Every course here teaches something none of the others do. Where two overlapped, the one with the clearer build survived. Length was not the criterion, which is why a 47 minute course sits next to a 24 hour one.",
  },
  {
    q: "Do I need all 65 hours?",
    a: "No. Courses 03, 04, and 07 are the load-bearing ones if you already write Python. The long foundational courses are there for coverage, not homework.",
  },
  {
    q: "Python or no-code?",
    a: "The path is Python-first. Course 10 is the no-code track, and it is deliberately last, because n8n makes far more sense once you know what it is abstracting away.",
  },
  {
    q: "How current is this?",
    a: "Durations, channels, and view counts were read from YouTube in September 2026. Frameworks move fast, so treat the orchestration courses as teaching patterns rather than exact APIs.",
  },
];

export default function Stack() {
  return (
    <>
      <section id="stack" className="scroll-mt-20 border-t border-line bg-panel/50 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <span className="label">What you build</span>
            <h2 className="mt-4 max-w-[20ch] text-[34px] leading-[1.02] font-semibold tracking-[-0.035em] text-balance md:text-[46px]">
              Finish the path with three things that work
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {builds.map((b, i) => (
              <Reveal key={b.n} delay={i * 90}>
                <div className="h-full bg-canvas p-6">
                  <span className="label">{b.n}</span>
                  <h3 className="mt-4 text-[20px] leading-[1.15] font-semibold tracking-[-0.025em]">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.55] text-ink-2">
                    {b.body}
                  </p>
                  <p className="mt-6 rule-x pt-4 font-mono text-[10px] tracking-widest text-muted uppercase">
                    {b.from}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 border-t border-line px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1180px] gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <span className="label">Notes</span>
            <h2 className="mt-4 text-[32px] leading-[1.05] font-semibold tracking-[-0.035em] md:text-[40px]">
              How to use this
            </h2>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6">
            {notes.map((n, i) => (
              <Reveal key={n.q} delay={i * 60}>
                <div className="border-b border-line py-6 first:pt-0">
                  <h3 className="text-[17px] font-medium tracking-[-0.02em]">
                    {n.q}
                  </h3>
                  <p className="mt-2.5 max-w-[60ch] text-[15px] leading-[1.6] text-ink-2">
                    {n.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
