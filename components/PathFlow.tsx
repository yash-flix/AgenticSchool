const steps = [
  {
    n: "01",
    title: "Foundations",
    note: "Write. Code. Build.",
    icon: (
      <>
        <path d="M4.2 19.8l1-3.6 9.5-9.5a1.6 1.6 0 012.3 0l1.3 1.3a1.6 1.6 0 010 2.3l-9.5 9.5-3.6 1a.5.5 0 01-.6-.6z" />
        <path d="M13.4 8.1l2.5 2.5" />
        <path d="M6.6 3.6l.5 1.8M3.2 6.4l1.8.5M4.6 1.9l-.5 1.8" />
      </>
    ),
  },
  {
    n: "02",
    title: "System Design",
    note: "Think in systems.",
    icon: (
      <>
        <path d="M12 2.6l4 2.3v4l-4 2.3-4-2.3v-4z" />
        <path d="M6.6 12.6l4 2.3v4l-4 2.3-4-2.3v-4z" />
        <path d="M17.4 12.6l4 2.3v4l-4 2.3-4-2.3v-4z" />
      </>
    ),
  },
  {
    n: "03",
    title: "Agentic AI",
    note: "Build what works.",
    icon: (
      <>
        <rect x="3.6" y="8" width="16.8" height="11.4" rx="3.4" />
        <path d="M12 3.2v4.8M9.6 13.4v1.6M14.4 13.4v1.6" />
        <circle cx="12" cy="2.4" r="1.2" />
      </>
    ),
  },
];

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid h-[62px] w-[62px] place-items-center rounded-[18px] border border-line bg-paper shadow-[0_1px_2px_rgba(21,21,26,0.05),0_14px_28px_-18px_rgba(21,21,26,0.35)]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7 text-ink"
        aria-hidden
      >
        {children}
      </svg>
    </span>
  );
}

/**
 * The three-beat arc from the hero mock: foundations, system design, agentic
 * AI, riding a rising curve. Absolutely positioned on wide screens so the
 * curve reads, stacked into a plain list on narrow ones.
 */
export default function PathFlow() {
  return (
    <figure className="m-0">
      {/* wide: the arc */}
      <div className="relative hidden h-[440px] w-full lg:block">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <marker
              id="flow-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
              markerUnits="userSpaceOnUse"
            >
              <path d="M0 1l8 4-8 4z" fill="var(--color-line-2)" />
            </marker>
          </defs>
          <path
            d="M14 78 C 27 78, 28 55, 40 51 C 52 47, 56 25, 70 21 C 80 18, 86 12, 93 5"
            fill="none"
            stroke="var(--color-line-2)"
            strokeWidth="0.4"
            vectorEffect="non-scaling-stroke"
            markerEnd="url(#flow-arrow)"
          />
        </svg>

        {steps.map((s, i) => (
          <div
            key={s.n}
            className="absolute w-[190px]"
            style={{
              left: [`2%`, `36%`, `68%`][i],
              top: [`58%`, `31%`, `4%`][i],
            }}
          >
            <span className="ghost-num block text-[13px] tracking-[0.18em] text-muted">
              {s.n}
            </span>
            <span className="mt-3 block">
              <Tile>{s.icon}</Tile>
            </span>
            <p className="mt-4 text-[18px] leading-tight font-medium tracking-[-0.026em]">
              {s.title}
            </p>
            <p className="mt-1.5 text-[14px] text-muted">{s.note}</p>
          </div>
        ))}

        <figcaption className="hand absolute right-[1%] bottom-[2%] w-[190px] text-right text-[19px] leading-[1.35] text-ink-2">
          A clear path from concepts to real agents.
          <svg
            viewBox="0 0 120 12"
            className="mt-1.5 ml-auto block h-3 w-[120px] text-line-2"
            aria-hidden
          >
            <path
              d="M2 9C24 3 74 1 118 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </figcaption>
      </div>

      {/* narrow: the same three beats, stacked */}
      <ol className="lg:hidden">
        {steps.map((s, i) => (
          <li key={s.n} className="relative flex gap-5 pb-8 last:pb-0">
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute top-[70px] bottom-2 left-[31px] w-px bg-line"
              />
            )}
            <Tile>{s.icon}</Tile>
            <div className="pt-2">
              <span className="label">{s.n}</span>
              <p className="mt-2.5 text-[18px] leading-tight font-medium tracking-[-0.026em]">
                {s.title}
              </p>
              <p className="mt-1 text-[14px] text-muted">{s.note}</p>
            </div>
          </li>
        ))}
        <figcaption className="hand mt-2 text-[19px] text-ink-2">
          A clear path from concepts to real agents.
        </figcaption>
      </ol>
    </figure>
  );
}
