import { totalMinutes } from "@/lib/courses";
import { kindLabel, sortedNotes } from "@/lib/notes";
import NoteFigure from "./NoteFigure";

/**
 * The hero illustration: a short deck of notes, the front one opened far
 * enough to show what a note is. Cover, title, a few lines, a code excerpt.
 * The two behind it are real notes too, so the deck is never stock art and
 * grows as notes are written.
 */
const code = [
  [
    ["kw", "while "],
    ["", "True:"],
  ],
  [
    ["", "    reply = model(messages, tools="],
    ["id", "TOOLS"],
    ["", ")"],
  ],
  [
    ["kw", "    if not "],
    ["", "reply.tool_calls:"],
  ],
  [
    ["kw", "        return "],
    ["", "reply.content"],
  ],
  [
    ["cm", "    # act, observe, go round again"],
  ],
] as const;

const tone: Record<string, string> = {
  kw: "text-sky",
  id: "text-amber",
  cm: "text-white/35",
  "": "text-canvas/85",
};

export default function NotesDeck() {
  const [front, ...rest] = sortedNotes;
  const behind = rest.slice(0, 2);
  const hours = Math.round(totalMinutes / 60);

  return (
    <figure className="relative m-0 mx-auto w-full max-w-[420px] pt-8 pb-10 md:pt-6">
      {/* the cards behind, fanned */}
      {behind.map((n, i) => (
        <div
          key={n.slug}
          aria-hidden
          className="absolute inset-x-0 top-8 mx-auto w-[92%] overflow-hidden rounded-[18px] border border-line bg-paper shadow-[var(--shadow-card)] md:top-6"
          style={{
            transform: `translateY(${-14 * (i + 1)}px) rotate(${i === 0 ? -2.4 : 2.2}deg) scale(${1 - 0.04 * (i + 1)})`,
            transformOrigin: "50% 100%",
            zIndex: 1 - i,
            opacity: 1 - 0.28 * (i + 1),
          }}
        >
          <NoteFigure slug={n.slug} className="h-[84px] w-full bg-panel/50" />
          <div className="p-5">
            <p className="text-[15px] font-medium tracking-[-0.02em]">{n.title}</p>
          </div>
        </div>
      ))}

      {/* the front card */}
      <div className="relative z-10 overflow-hidden rounded-[18px] border border-line bg-paper shadow-[var(--shadow-lift)]">
        <div className="relative border-b border-line bg-panel/50">
          <NoteFigure slug={front.slug} animate className="h-[108px] w-full" />
          <span className="absolute top-3 left-3 rounded-full border border-line bg-paper/90 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.15em] text-ink uppercase backdrop-blur">
            {kindLabel(front.kind)}
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <p className="display-4 text-[1.15rem]">{front.title}</p>
          <p className="mt-2.5 line-clamp-2 text-[13.5px] leading-[1.55] text-ink-2">{front.summary}</p>

          <pre className="mt-4 overflow-hidden rounded-[10px] bg-obsidian px-4 py-3.5 font-mono text-[11.5px] leading-[1.65] ring-1 ring-black/10">
            {code.map((line, i) => (
              <span key={i} className="block whitespace-pre">
                {line.map(([t, text], k) => (
                  <span key={k} className={tone[t]}>
                    {text}
                  </span>
                ))}
              </span>
            ))}
          </pre>

          <div className="mt-4 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-muted">
              <span className="line-through decoration-line-2">{hours}h of video</span>
              <span aria-hidden className="text-line-2">→</span>
              <span className="text-ink">a few minutes</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 font-mono text-[9.5px] tracking-[0.12em] text-canvas uppercase">
              Read
              <span aria-hidden className="opacity-60">→</span>
            </span>
          </div>
        </div>
      </div>

      {/* hand note */}
      <span className="hand absolute right-0 -bottom-1 text-[19px] leading-none text-flame md:-right-2">
        read it, then go build ↗
      </span>
    </figure>
  );
}
