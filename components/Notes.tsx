"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { CONTINUITY_SPRING } from "@/lib/motion";

/**
 * Answers are kept to one or two sentences. Anything longer belongs in a
 * course, not in a note about the courses.
 */
const notes = [
  {
    q: "Why these ten and not the other hundred?",
    a: "Each one teaches something the others do not. Where two overlapped, the clearer build won.",
  },
  {
    q: "Do I need all 65 hours?",
    a: "No. Courses 03, 04 and 07 are the load-bearing ones if you already write Python. The rest is coverage, not homework.",
  },
  {
    q: "Python or no-code?",
    a: "Python-first. Course 10 covers n8n and comes last on purpose, because no-code makes more sense once you know what it abstracts away.",
  },
  {
    q: "Is any of it paid?",
    a: "No. Every course is free on YouTube. No sign-up, no affiliate links.",
  },
  {
    q: "What is the field track for?",
    a: "Watch it alongside the path. Courses teach you to build an agent. The field track shows people running them in real work.",
  },
  {
    q: "How current is this?",
    a: "Read from YouTube in September 2026. Treat the orchestration courses as patterns rather than exact APIs.",
  },
];

export default function Notes() {
  // One open at a time: the section stays a scannable list instead of
  // unfolding back into a wall of text.
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="md:col-span-7 md:col-start-6">
      <ul>
        {notes.map((n, i) => {
          const isOpen = open === i;
          return (
            <li key={n.q} className="border-b border-line-2 first:border-t">
              <motion.button
                layout
                transition={CONTINUITY_SPRING}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`note-${i}`}
                className="flex w-full items-center gap-5 py-5 text-left"
              >
                <span className="label shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-[16.5px] font-medium tracking-[-0.024em] transition-colors ${
                    isOpen ? "text-ink" : "text-ink-2"
                  }`}
                >
                  {n.q}
                </span>
                {/* A plus that turns into a cross, so open and closed are the
                    same mark at two angles. */}
                <motion.span
                  aria-hidden
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={CONTINUITY_SPRING}
                  className="ml-auto grid h-6 w-6 shrink-0 place-items-center"
                >
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5">
                    <path
                      d="M7 1v12M1 7h12"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      className={isOpen ? "text-flame" : "text-line-2"}
                    />
                  </svg>
                </motion.span>
              </motion.button>

              {/* Always rendered and merely clipped, so the answers stay in the
                  HTML for search engines and in the accessibility tree. */}
              <motion.div
                id={`note-${i}`}
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={CONTINUITY_SPRING}
                className="overflow-hidden"
              >
                <p className="max-w-[54ch] pt-1 pb-6 pl-[calc(2rem+9px)] text-[15px] leading-[1.6] text-ink-2">
                  {n.a}
                </p>
              </motion.div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
