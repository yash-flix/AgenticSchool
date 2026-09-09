import {
  courses,
  fieldTrack,
  fmtViews,
  libraryCount,
  libraryMinutes,
  stages,
  totalMinutes,
  totalViews,
} from "@/lib/courses";
import Reveal from "./Reveal";

const board = [
  { stage: "1.0 Ground", task: "Understand the agent loop", state: "user" },
  { stage: "1.3 Ground", task: "Write an agent with no framework", state: "user" },
  { stage: "2.1 Orchestrate", task: "Model control flow as a graph", state: "run" },
  { stage: "3.1 Context", task: "Expose your tools over MCP", state: "todo" },
  { stage: "3.2 Context", task: "Evaluate retrieval quality", state: "todo" },
  { stage: "4.2 Ship", task: "Package an agent someone pays for", state: "todo" },
];

export default function Hero() {
  const hours = Math.round(totalMinutes / 60);
  const libraryHours = Math.round(libraryMinutes / 60);

  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-10 md:pt-24">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="rounded-full border border-moss/40 bg-moss/8 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-moss uppercase">
              Free resource
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-flame live-dot" />
              <span className="label">
                {courses.length} courses · {fieldTrack.length} field sessions ·{" "}
                {libraryHours} hours
              </span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="mt-6 max-w-[15ch] text-[42px] leading-[0.98] font-semibold tracking-[-0.035em] text-balance sm:text-[58px] md:text-[76px]">
            Go god level in agentic AI
          </h1>
        </Reveal>

        <div className="mt-7 grid gap-8 border-t border-line pt-7 md:grid-cols-12">
          <Reveal delay={120} className="md:col-span-7">
            <p className="max-w-[52ch] text-[17px] leading-[1.55] text-ink-2 md:text-[19px]">
              A free curriculum built out of {libraryCount} YouTube videos, put
              in the order you should actually watch them. You start by building
              an agent loop by hand and finish with a multi-agent system that
              retrieves, remembers, and ships.
            </p>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.55] text-muted">
              No sign-up, no paywall, no affiliate links. Every video plays on
              the creator&rsquo;s own channel.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#path"
                className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-canvas transition-transform hover:-translate-y-px"
              >
                Start with course 01
              </a>
              <a
                href="#catalog"
                className="rounded-full border border-line-2 px-5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:bg-panel"
              >
                Browse all {courses.length}
              </a>
            </div>
          </Reveal>

          <Reveal delay={180} className="md:col-span-5">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {[
                { k: "Core path", v: `${hours}h` },
                { k: "Stages", v: String(stages.length) },
                { k: "Views", v: fmtViews(totalViews) },
                { k: "Cost", v: "$0", tone: "text-moss" },
              ].map((s) => (
                <div key={s.k} className="bg-canvas px-4 py-5">
                  <dt className="label">{s.k}</dt>
                  <dd
                    className={`mt-2 text-[26px] leading-none font-semibold tracking-[-0.03em] ${
                      s.tone ?? ""
                    }`}
                  >
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              Nothing here is gated, sponsored, or resold. Every course links
              straight to the creator on YouTube.
            </p>
          </Reveal>
        </div>

        {/* run board */}
        <Reveal delay={240}>
          <div className="mt-14 rounded-2xl border border-line bg-panel p-2 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="rounded-xl border border-line bg-canvas">
              <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
                </div>
                <span className="label">agent-school / your-run</span>
                <span className="ml-auto flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-moss live-dot" />
                  <span className="label">in progress</span>
                </span>
              </div>

              <div className="grid md:grid-cols-[1fr_270px]">
                <ul className="divide-y divide-line">
                  {board.map((b) => (
                    <li
                      key={b.task}
                      className="flex items-center gap-4 px-4 py-3.5"
                    >
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] ${
                          b.state === "user"
                            ? "border-moss bg-moss text-white"
                            : b.state === "run"
                              ? "border-flame text-flame"
                              : "border-line-2 text-transparent"
                        }`}
                      >
                        {b.state === "user" ? "✓" : "•"}
                      </span>
                      <span className="font-mono text-[11px] tracking-wide text-muted">
                        {b.stage}
                      </span>
                      <span
                        className={`text-[14px] ${
                          b.state === "todo" ? "text-muted" : "text-ink"
                        }`}
                      >
                        {b.task}
                      </span>
                      {b.state === "run" && (
                        <span className="ml-auto hidden rounded-full bg-flame/10 px-2.5 py-1 font-mono text-[10px] tracking-wider text-flame uppercase sm:block">
                          watching
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                <aside className="border-t border-line p-4 md:border-t-0 md:border-l">
                  <span className="label">Stack you end up with</span>
                  <ul className="mt-3 space-y-2">
                    {[
                      "Python + structured outputs",
                      "LangGraph",
                      "CrewAI",
                      "OpenAI Agents SDK",
                      "MCP servers",
                      "Vector store + reranking",
                      "n8n",
                    ].map((t) => (
                      <li
                        key={t}
                        className="flex items-center gap-2 text-[13px] text-ink-2"
                      >
                        <span className="h-1 w-1 rounded-full bg-line-2" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
