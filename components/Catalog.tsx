"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { allTopics, courses, fmtDuration, type Course } from "@/lib/courses";
import { CONTINUITY_SPRING } from "@/lib/motion";
import AccentText from "./AccentText";
import CourseCard from "./CourseCard";

type Sort = "path" | "shortest" | "popular";
const levels = ["Beginner", "Intermediate", "Advanced"] as const;

export default function Catalog() {
  const [topic, setTopic] = useState<string | null>(null);
  const [level, setLevel] = useState<Course["level"] | null>(null);
  const [sort, setSort] = useState<Sort>("path");

  const list = useMemo(() => {
    let out = courses.filter(
      (c) =>
        (!topic || c.topics.includes(topic)) && (!level || c.level === level)
    );
    if (sort === "shortest") out = [...out].sort((a, b) => a.minutes - b.minutes);
    if (sort === "popular") out = [...out].sort((a, b) => b.views - a.views);
    return out;
  }, [topic, level, sort]);

  const mins = list.reduce((a, c) => a + c.minutes, 0);

  return (
    <section id="catalog" className="scroll-mt-24 border-t border-line px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="label">All courses</span>
            <h2 className="display-2 mt-5 max-w-[16ch]">
              <AccentText>{"Pick by *what you need* next"}</AccentText>
            </h2>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-line bg-paper p-1 shadow-[var(--shadow-card)]">
            {(
              [
                ["path", "Path order"],
                ["shortest", "Shortest"],
                ["popular", "Most watched"],
              ] as [Sort, string][]
            ).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setSort(k)}
                aria-pressed={sort === k}
                className={`relative rounded-full px-3.5 py-2 font-mono text-[9.5px] tracking-[0.14em] uppercase transition-colors ${
                  sort === k ? "text-canvas" : "text-muted hover:text-ink"
                }`}
              >
                {/* A single shared element: motion tweens it between buttons
                    because the layoutId matches across renders. */}
                {sort === k && (
                  <motion.span
                    layoutId="catalog-sort-pill"
                    transition={CONTINUITY_SPRING}
                    className="absolute inset-0 rounded-full bg-ink"
                  />
                )}
                <span className="relative z-10">{l}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 border-y border-line py-4">
          <button
            onClick={() => {
              setTopic(null);
              setLevel(null);
            }}
            className={`rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors ${
              !topic && !level
                ? "border-ink bg-ink text-canvas"
                : "border-line bg-paper text-ink-2 hover:border-ink"
            }`}
          >
            Everything
          </button>
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(level === l ? null : l)}
              className={`rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors ${
                level === l
                  ? "border-ink bg-ink text-canvas"
                  : "border-line bg-paper text-ink-2 hover:border-ink"
              }`}
            >
              {l}
            </button>
          ))}
          <span className="mx-1 h-4 w-px bg-line" />
          {allTopics.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(topic === t ? null : t)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.02em] transition-colors ${
                topic === t
                  ? "border-flame bg-flame/10 text-flame"
                  : "border-line bg-paper text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
          <span className="label ml-auto">
            {list.length} shown · {fmtDuration(mins)}
          </span>
        </div>

        {list.length === 0 ? (
          <p className="py-16 text-center text-[15px] text-muted">
            No course matches that pair of filters. Clear one to see more.
          </p>
        ) : (
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((c) => (
                <motion.div
                  key={c.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={CONTINUITY_SPRING}
                >
                  <CourseCard course={c} variant="grid" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
