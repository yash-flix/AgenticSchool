import AccentText from "./AccentText";
import CourseLengths from "./CourseLengths";
import Notes from "./Notes";
import Reveal from "./Reveal";

const builds = [
  {
    n: "01",
    title: "A research agent that cites",
    body: "Retrieval over your own documents, with answers that point back at sources instead of inventing them.",
    from: "Courses 04, 08",
  },
  {
    n: "02",
    title: "A crew that ships a report",
    body: "Researcher, analyst and writer agents handing work between each other, with a human approving anything that ships.",
    from: "Courses 05, 06",
  },
  {
    n: "03",
    title: "An MCP server your tools speak",
    body: "Your internal APIs exposed as callable tools, reachable from any agent client.",
    from: "Course 07",
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
            <CourseLengths />
          </Reveal>
          <Notes />
        </div>
      </section>
    </>
  );
}
