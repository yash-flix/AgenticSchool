"use client";

import { courses, fmtDuration, stages } from "@/lib/courses";
import { AnimatePresence, motion } from "motion/react";
import { CONTINUITY_LABEL, CONTINUITY_SPRING } from "@/lib/motion";
import { STAGE_RAMP, TRACK } from "@/lib/palette";
import { useProgress } from "@/lib/useProgress";
import { useViewer } from "@/lib/useViewer";

export default function ProgressBar() {
  const { done, ready, reset } = useProgress();
  const { viewer } = useViewer();

  const pct = ready ? Math.round((done.length / courses.length) * 100) : 0;
  const left = courses
    .filter((c) => !done.includes(c.slug))
    .reduce((a, c) => a + c.minutes, 0);

  // Same four groups as the hours breakdown beside it, subdivided per course.
  const groups = stages.map((s, i) => {
    const list = courses.filter((c) => c.stage === s.id);
    return {
      ...s,
      tone: STAGE_RAMP[i],
      list,
      done: list.filter((c) => ready && done.includes(c.slug)).length,
    };
  });

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

        <AnimatePresence initial={false}>
          {ready && done.length > 0 && (
            <motion.button
              layout
              onClick={reset}
              variants={CONTINUITY_LABEL}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={CONTINUITY_SPRING}
              whileTap={{ scale: 0.95 }}
              className="label transition-colors hover:text-flame"
            >
              Reset
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Matches the hours bar beside it: 12px tall, 2px surface gaps, ends
          rounded per stage group rather than per course. */}
      <figure className="mt-6">
        <div className="flex h-3">
          {groups.map((g, gi) => (
            <div
              key={g.id}
              style={{ flexGrow: g.list.length, flexBasis: 0 }}
              className={`flex min-w-0 ${gi > 0 ? "ml-2.5" : ""}`}
            >
              {g.list.map((c, ci) => {
                const complete = ready && done.includes(c.slug);
                return (
                  <span
                    key={c.slug}
                    title={`${c.n} · ${c.shortTitle}`}
                    className={`min-w-0 flex-1 transition-colors duration-500 ${
                      ci > 0 ? "ml-[2px]" : ""
                    } ${ci === 0 ? "rounded-l-[4px]" : ""} ${
                      ci === g.list.length - 1 ? "rounded-r-[4px]" : ""
                    } ${complete ? g.tone : TRACK}`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
          {groups.map((g) => (
            <li key={g.id} className="flex items-center gap-2.5">
              <span
                aria-hidden
                className={`h-[7px] w-[7px] shrink-0 rounded-[2px] ${g.tone}`}
              />
              <span className="text-[13px] text-ink-2">{g.name}</span>
              <span className="ml-auto font-mono text-[10.5px] text-muted tabular-nums">
                {g.done}/{g.list.length}
              </span>
            </li>
          ))}
        </ul>
      </figure>

      <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line pt-4">
        <span className="text-[13.5px] text-ink-2">
          {ready ? `${fmtDuration(left)} of watching left` : " "}
        </span>
        <span className="label ml-auto tabular-nums">{pct}%</span>
      </div>

      {/* This used to claim nothing leaves the browser, which stopped being
          true once signing in synced progress to the account. */}
      <p className="mt-3 text-[12.5px] leading-[1.5] text-muted">
        {viewer
          ? "Synced to your account, so it follows you between devices."
          : "Kept in this browser. Sign in to sync it across devices."}
      </p>
    </div>
  );
}
