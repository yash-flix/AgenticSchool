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
    <div className="rounded-xl border border-line bg-panel/70 p-5">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="label">Your progress</span>
        <span className="text-[15px] font-medium tracking-[-0.02em]">
          {ready ? `${done.length} of ${courses.length}` : " "}
        </span>
        <span className="text-[13px] text-muted">
          {ready ? `${fmtDuration(left)} of watching left` : " "}
        </span>
        {ready && done.length > 0 && (
          <button
            onClick={reset}
            className="ml-auto font-mono text-[10px] tracking-wider text-muted uppercase transition-colors hover:text-flame"
          >
            Reset
          </button>
        )}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-ink transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2.5 text-[12px] text-muted">
        Kept in this browser only. Nothing is sent anywhere.
      </p>
    </div>
  );
}
