"use client";

import { courses, fmtDuration } from "@/lib/courses";
import { useProgress } from "@/lib/useProgress";

export default function ProgressBar() {
  const { done, ready, reset } = useProgress();
  const pct = ready ? Math.round((done.length / courses.length) * 100) : 0;
  const left = courses
    .filter((c) => !done.includes(c.slug))
    .reduce((a, c) => a + c.minutes, 0);

  return (
    <div className="card p-6 hover:translate-y-0 hover:shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="label">Your progress</span>
          <p className="mt-3 text-[34px] leading-none font-medium tracking-[-0.04em] tabular-nums">
            {ready ? done.length : 0}
            <span className="text-line-2">/{courses.length}</span>
          </p>
        </div>
        {ready && done.length > 0 && (
          <button
            onClick={reset}
            className="label transition-colors hover:text-flame"
          >
            Reset
          </button>
        )}
      </div>

      <div className="mt-6 flex gap-1">
        {courses.map((c) => (
          <span
            key={c.slug}
            title={c.shortTitle}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
              ready && done.includes(c.slug) ? "bg-ink" : "bg-line"
            }`}
          />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line pt-4">
        <span className="text-[13.5px] text-ink-2">
          {ready ? `${fmtDuration(left)} of watching left` : " "}
        </span>
        <span className="label ml-auto">{pct}%</span>
      </div>
      <p className="mt-3 text-[12px] text-muted">
        Kept in this browser only. Nothing is sent anywhere.
      </p>
    </div>
  );
}
