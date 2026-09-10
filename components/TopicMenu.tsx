"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { allTopics, courses } from "@/lib/courses";
import { CONTINUITY_PANEL, CONTINUITY_SPRING } from "@/lib/motion";

const counts = new Map<string, number>();
courses.forEach((c) => c.topics.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));

/**
 * The topic filter as one control instead of two dozen chips. The trigger
 * names the current topic; the panel lists them all in a grid with how many
 * courses each covers, so the whole taxonomy is scannable without sitting in
 * the page all the time.
 */
export default function TopicMenu({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (topic: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={box} className="relative">
      <div
        className={`flex items-center rounded-full border transition-colors ${
          value ? "border-ink bg-ink text-canvas" : "border-line bg-paper text-ink-2 hover:border-ink hover:text-ink"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className="flex items-center gap-2 py-1.5 pr-2.5 pl-3.5 text-[12.5px]"
        >
          <span className={value ? "" : "text-muted"}>Topic</span>
          {value && <span className="font-medium">{value}</span>}
          <svg viewBox="0 0 12 12" className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden>
            <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Clear topic"
            className="mr-1.5 grid h-5 w-5 place-items-center rounded-full text-canvas/70 transition-colors hover:bg-canvas/15 hover:text-canvas"
          >
            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" aria-hidden>
              <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="topics"
            role="listbox"
            aria-label="Filter by topic"
            variants={CONTINUITY_PANEL}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={CONTINUITY_SPRING}
            className="card absolute left-0 z-30 mt-2 w-[min(560px,calc(100vw-3rem))] origin-top-left p-2 hover:translate-y-0 hover:shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center justify-between px-3 pt-2 pb-2.5">
              <span className="label">{allTopics.length} topics</span>
              {value && (
                <button
                  type="button"
                  onClick={() => {
                    onChange(null);
                    setOpen(false);
                  }}
                  className="font-mono text-[10.5px] tracking-[0.06em] text-muted transition-colors hover:text-ink"
                >
                  Clear
                </button>
              )}
            </div>
            <ul className="grid gap-px border-t border-line pt-1 sm:grid-cols-2 md:grid-cols-3">
              {allTopics.map((t) => {
                const active = value === t;
                return (
                  <li key={t}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        onChange(active ? null : t);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
                        active ? "bg-ink text-canvas" : "text-ink-2 hover:bg-panel hover:text-ink"
                      }`}
                    >
                      <span className="truncate">{t}</span>
                      <span className={`font-mono text-[10.5px] tabular-nums ${active ? "text-canvas/60" : "text-muted"}`}>
                        {counts.get(t)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
