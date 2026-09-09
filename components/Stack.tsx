import AccentText from "./AccentText";
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
    q: "Is any of it paid?",
    a: "No. Every course and every field session on this page is free to watch on YouTube, with no sign-up and no affiliate links. The site exists to order the material, not to resell it.",
  },
  {
    q: "What is the field track for?",
    a: "Watch it alongside the path, not after it. Courses teach you to build an agent. The field track shows principal engineers and founders running agents in real work, which is a different and equally useful thing.",
  },
  {
    q: "How current is this?",
    a: "Durations, channels, and view counts were read from YouTube in September 2026. Frameworks move fast, so treat the orchestration courses as teaching patterns rather than exact APIs.",
  },
];

export default function Stack() {
  return (
    <>
      <section id="stack" className="scroll-mt-24 border-t border-line px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <span className="label">What you build</span>
            <h2 className="display-2 mt-5 max-w-[18ch]">
              <AccentText>{"Finish the path with three things that *actually work*"}</AccentText>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {builds.map((b, i) => (
              <Reveal key={b.n} delay={i * 90}>
                <div className="card flex h-full flex-col p-7">
                  <span
                    aria-hidden
                    className="ghost-num text-[40px] leading-none"
                  >
                    {b.n}
                  </span>
                  <h3 className="display-4 mt-5">{b.title}</h3>
                  <p className="mt-3.5 text-[14.5px] leading-[1.6] text-ink-2">
                    {b.body}
                  </p>
                  <p className="rule-x mt-auto pt-5 font-mono text-[9.5px] tracking-[0.15em] text-muted uppercase">
                    <span className="bg-paper pr-2">{b.from}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-line bg-panel/45 px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-x-12 gap-y-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <span className="label">Notes</span>
            <h2 className="display-2 mt-5">
              <AccentText>{"How to *use this*"}</AccentText>
            </h2>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6">
            {notes.map((n, i) => (
              <Reveal key={n.q} delay={i * 60}>
                <div className="flex gap-6 border-b border-line-2 py-7 first:pt-0">
                  <span className="label mt-1.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[17.5px] font-medium tracking-[-0.024em]">
                      {n.q}
                    </h3>
                    <p className="mt-2.5 max-w-[58ch] text-[15px] leading-[1.65] text-ink-2">
                      {n.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
