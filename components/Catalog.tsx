"use client";

import { useMemo, useState } from "react";
import { allTopics, courses, fmtDuration, type Course } from "@/lib/courses";
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
    <section id="catalog" className="scroll-mt-20 border-t border-line px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="label">All courses</span>
            <h2 className="mt-4 text-[34px] leading-[1.02] font-semibold tracking-[-0.035em] md:text-[46px]">
              Pick by what you need next
            </h2>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-line p-1">
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
                className={`rounded-full px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase transition-colors ${
                  sort === k ? "bg-ink text-canvas" : "text-muted hover:text-ink"
                }`}
              >
                {l}
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
            className={`rounded-full border px-3 py-1.5 text-[12.5px] transition-colors ${
              !topic && !level
                ? "border-ink bg-ink text-canvas"
                : "border-line text-ink-2 hover:border-line-2"
            }`}
          >
            Everything
          </button>
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(level === l ? null : l)}
              className={`rounded-full border px-3 py-1.5 text-[12.5px] transition-colors ${
                level === l
                  ? "border-ink bg-ink text-canvas"
                  : "border-line text-ink-2 hover:border-line-2"
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
              className={`rounded-full border px-3 py-1.5 font-mono text-[11px] transition-colors ${
                topic === t
                  ? "border-flame bg-flame/10 text-flame"
                  : "border-line text-muted hover:border-line-2 hover:text-ink"
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
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c) => (
              <CourseCard key={c.slug} course={c} variant="grid" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
