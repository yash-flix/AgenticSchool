"use client";

import { AnimatePresence, motion } from "motion/react";
import { CONTINUITY_LABEL, CONTINUITY_SPRING } from "@/lib/motion";
import { useProgress } from "@/lib/useProgress";

export default function MarkDone({ slug }: { slug: string }) {
  const { done, ready, toggle } = useProgress();
  const complete = ready && done.includes(slug);

  return (
    <motion.button
      layout
      transition={CONTINUITY_SPRING}
      onClick={() => toggle(slug)}
      aria-pressed={complete}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[14px] font-medium transition-colors ${
        complete
          ? "border-moss/50 bg-moss/10 text-moss"
          : "border-line-2 text-ink hover:bg-panel"
      }`}
    >
      {/* Fixed-size slot: the ring is always there, so only the tick animates. */}
      <motion.span layout="position" className="grid h-[15px] w-[15px] shrink-0">
        <svg viewBox="0 0 15 15" className="h-[15px] w-[15px]" aria-hidden>
          <circle
            cx="7.5"
            cy="7.5"
            r="6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            opacity={complete ? 0.45 : 0.3}
          />
          <motion.path
            d="M4.4 7.8 L6.6 10 L10.8 5.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ pathLength: complete ? 1 : 0, opacity: complete ? 1 : 0 }}
            transition={CONTINUITY_SPRING}
          />
        </svg>
      </motion.span>

      {/* popLayout pulls the outgoing word out of flow, so the width springs
          straight to its new size instead of jumping when the exit finishes. */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={complete ? "done" : "todo"}
          layout
          variants={CONTINUITY_LABEL}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={CONTINUITY_SPRING}
          className="whitespace-nowrap"
        >
          {complete ? "Marked as done" : "Mark as done"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
