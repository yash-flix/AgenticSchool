import {
  courses,
  fieldMinutes,
  fieldTrack,
  fmtViews,
  libraryMinutes,
  stages,
  totalMinutes,
  totalViews,
} from "@/lib/courses";
import PathFlow from "./PathFlow";
import Reveal from "./Reveal";

const board = [
  { stage: "1.1", task: "Understand the agent loop", state: "done" },
  { stage: "1.3", task: "Write an agent with no framework", state: "done" },
  { stage: "2.1", task: "Model control flow as a graph", state: "run" },
  { stage: "3.1", task: "Expose your tools over MCP", state: "todo" },
  { stage: "3.2", task: "Evaluate retrieval quality", state: "todo" },
  { stage: "4.2", task: "Package an agent someone pays for", state: "todo" },
];

const stack = [
  "Python + structured outputs",
  "LangGraph",
  "CrewAI",
  "OpenAI Agents SDK",
  "MCP servers",
  "Vector store + reranking",
  "n8n",
];

export default function Hero() {
  const hours = Math.round(totalMinutes / 60);

  const done = board.filter((b) => b.state === "done").length;
  const fieldHours = Math.round(fieldMinutes / 60);

  // Every tile carries a 3px meter so the row reads as one instrument rather
  // than four unrelated numbers. The two hour tiles share a scale — together
  // they are the whole library — which is a relationship worth showing.
  const stats = [
    {
      k: "Core path",
      v: `${hours}h`,
      note: `${courses.length} courses · ${fmtViews(totalViews)} views`,
      fill: totalMinutes / libraryMinutes,
    },
    {
      k: "Field track",
      v: `${fieldHours}h`,
      note: `${fieldTrack.length} sessions`,
      fill: fieldMinutes / libraryMinutes,
    },
    { k: "Stages", v: String(stages.length), note: "in order", segments: stages.length },
    { k: "Cost", v: "Free", note: "no sign-up", tone: "text-moss", fill: 1, moss: true },
  ];

  return (
    <section className="relative overflow-hidden px-6 pt-12 pb-14 md:pt-16">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[620px] opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black,transparent)]"
      />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="grid items-center gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="label flex flex-wrap items-center gap-2.5">
                YouTube
                <span aria-hidden className="text-line-2">
                  &rarr;
                </span>
                Structured
                <span aria-hidden className="text-line-2">
                  &rarr;
                </span>
                Real skills
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="display-1 mt-7">
                Go god level in <span className="em-serif">agentic AI</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="lede mt-8 max-w-[44ch]">
                The best agentic AI courses on YouTube, put in the order you
                should actually watch them. Start by writing an agent loop by
                hand, finish with a multi-agent system that ships.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#path" className="btn btn-solid">
                  Start with course 01
                  <span aria-hidden className="text-[13px] opacity-60">
                    &rarr;
                  </span>
                </a>
                <a href="#catalog" className="btn btn-ghost">
                  Browse everything
                </a>
              </div>

              <p className="mt-8 flex items-start gap-3 text-[13.5px] leading-[1.5] text-muted">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="mt-[-2px] h-[26px] w-[26px] shrink-0"
                >
                  <path
                    fill="#ff0000"
                    d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81Z"
                  />
                  <path fill="#fff" d="M9.6 15.6V8.4l6.24 3.6-6.24 3.6Z" />
                </svg>
                <span>Free on YouTube. No sign-up, no paywall.</span>
              </p>
            </Reveal>
          </div>

          <Reveal delay={180} className="lg:col-span-6">
            <PathFlow />
          </Reveal>
        </div>

        <div className="mt-20">
          <Reveal>
            {/* gap-px over a line-coloured ground draws the hairlines between
                cells, so the 2x2 and 1x4 layouts both close up correctly. */}
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-line bg-line shadow-[var(--shadow-card)] sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.k} className="bg-paper p-5 sm:p-6">
                  <dt className="label">{s.k}</dt>
                  <dd
                    className={`mt-3.5 text-[32px] leading-none font-medium tracking-[-0.04em] tabular-nums ${
                      s.tone ?? ""
                    }`}
                  >
                    {s.v}
                  </dd>

                  {s.segments ? (
                    <dd className="mt-4 flex gap-[3px]" aria-hidden>
                      {Array.from({ length: s.segments }).map((_, i) => (
                        <span key={i} className="h-[3px] flex-1 rounded-full bg-ink" />
                      ))}
                    </dd>
                  ) : (
                    <dd className="mt-4 h-[3px] rounded-full bg-line-2" aria-hidden>
                      <span
                        style={{ width: `${Math.round((s.fill ?? 0) * 100)}%` }}
                        className={`block h-full rounded-full ${
                          s.moss ? "bg-moss" : "bg-ink"
                        }`}
                      />
                    </dd>
                  )}

                  <dd className="mt-3 text-[12.5px] text-muted">{s.note}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* console */}
        <Reveal delay={240}>
          <div className="mt-16 overflow-hidden rounded-[18px] bg-obsidian text-canvas shadow-[var(--shadow-panel)] ring-1 ring-black/10">
            <div className="flex items-center gap-3 border-b border-line-dark px-5 py-3.5">
              <div className="flex gap-[5px]">
                <span className="h-[9px] w-[9px] rounded-full bg-white/10 ring-1 ring-white/[0.06]" />
                <span className="h-[9px] w-[9px] rounded-full bg-white/10 ring-1 ring-white/[0.06]" />
                <span className="h-[9px] w-[9px] rounded-full bg-white/10 ring-1 ring-white/[0.06]" />
              </div>
              {/* A path reads as a path: the root recedes, the leaf carries. */}
              <span className="ml-1 font-mono text-[10.5px] tracking-[0.13em] uppercase">
                <span className="text-white/35">agent-school</span>
                <span className="mx-1.5 text-white/20">/</span>
                <span className="text-canvas">your-run</span>
              </span>
              <span className="ml-auto flex items-center gap-2.5">
                <span className="font-mono text-[10.5px] text-white/45 tabular-nums">
                  {done}/{board.length}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-moss live-dot" />
                <span className="hidden font-mono text-[10.5px] tracking-[0.13em] text-chalk uppercase sm:block">
                  in progress
                </span>
              </span>
            </div>

            <div className="grid md:grid-cols-[1fr_280px]">
              <ul className="divide-y divide-[var(--color-line-dark)]">
                {board.map((b) => (
                  <li
                    key={b.task}
                    className="flex items-center gap-4 px-5 py-[15px]"
                  >
                    <span
                      className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border text-[9px] ${
                        b.state === "done"
                          ? "border-moss bg-moss text-obsidian"
                          : b.state === "run"
                            ? "border-flame text-flame"
                            : "border-white/15 text-transparent"
                      }`}
                    >
                      {b.state === "done" ? "✓" : "•"}
                    </span>
                    <span className="font-mono text-[10.5px] tracking-[0.12em] text-chalk tabular-nums">
                      {b.stage}
                    </span>
                    <span
                      className={`text-[14.5px] tracking-[-0.012em] ${
                        b.state === "todo" ? "text-chalk" : "text-canvas"
                      }`}
                    >
                      {b.task}
                    </span>
                    {b.state === "run" && (
                      <span className="ml-auto hidden rounded-full bg-flame/15 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.15em] text-flame uppercase sm:block">
                        watching
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <aside className="border-t border-line-dark p-5 md:border-t-0 md:border-l">
                <span className="font-mono text-[10.5px] tracking-[0.13em] text-chalk uppercase">
                  Stack you end up with
                </span>
                <ul className="mt-4 space-y-2.5">
                  {stack.map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2.5 text-[13px] text-white/72"
                    >
                      <span className="h-1 w-1 rounded-full bg-flame/70" />
                      {t}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
