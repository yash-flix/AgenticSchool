import {
  courses,
  fieldTrack,
  fmtViews,
  libraryMinutes,
  stages,
  totalMinutes,
  totalViews,
} from "@/lib/courses";
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
  const libraryHours = Math.round(libraryMinutes / 60);

  const stats = [
    { k: "Core path", v: `${hours}h`, note: `${courses.length} courses` },
    { k: "Field track", v: `${libraryHours - hours}h`, note: `${fieldTrack.length} sessions` },
    { k: "Stages", v: String(stages.length), note: "in order" },
    { k: "Cost", v: "Free", note: "no sign-up", tone: "text-moss" },
  ];

  return (
    <section className="relative overflow-hidden px-6 pt-14 pb-12 md:pt-20">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />

      <div className="relative mx-auto max-w-[1200px]">
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="chip chip-free">Free resource</span>
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
          <h1 className="display-1 mt-7 max-w-[13ch]">
            Go god level in <span className="em-serif">agentic AI</span>
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-x-12 gap-y-10 border-t border-line pt-9 md:grid-cols-12">
          <Reveal delay={120} className="md:col-span-5">
            <p className="lede max-w-[46ch]">
              A free curriculum assembled from YouTube and put in the order you
              should actually watch it. Start by writing an agent loop by hand.
              Finish with a multi-agent system that retrieves, remembers, and
              ships.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#path" className="btn btn-solid">
                Start with course 01
                <span aria-hidden className="text-[13px] opacity-60">
                  →
                </span>
              </a>
              <a href="#catalog" className="btn btn-ghost">
                Browse everything
              </a>
            </div>
            <p className="mt-5 text-[13.5px] leading-relaxed text-muted">
              No sign-up, no paywall, no affiliate links. Every video plays on
              the creator&rsquo;s own channel.
            </p>
          </Reveal>

          <Reveal delay={180} className="md:col-span-6 md:col-start-7">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4 md:gap-x-6">
              {stats.map((s) => (
                <div key={s.k} className="border-t border-ink pt-3.5">
                  <dt className="label">{s.k}</dt>
                  <dd
                    className={`mt-3 text-[30px] leading-none font-medium tracking-[-0.04em] ${
                      s.tone ?? ""
                    }`}
                  >
                    {s.v}
                  </dd>
                  <dd className="mt-2 text-[12.5px] text-muted">{s.note}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 max-w-[44ch] text-[13.5px] leading-relaxed text-muted">
              <span className="text-ink">{fmtViews(totalViews)} views</span> on
              the ten core courses. Nothing here is gated, sponsored, or resold.
            </p>
          </Reveal>
        </div>

        {/* console */}
        <Reveal delay={240}>
          <div className="mt-16 overflow-hidden rounded-[18px] bg-obsidian text-canvas shadow-[var(--shadow-panel)] ring-1 ring-black/10">
            <div className="flex items-center gap-3 border-b border-line-dark px-5 py-3.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
              </div>
              <span className="font-mono text-[10.5px] tracking-[0.13em] text-chalk uppercase">
                agent-school / your-run
              </span>
              <span className="ml-auto flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-moss live-dot" />
                <span className="font-mono text-[10.5px] tracking-[0.13em] text-chalk uppercase">
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
