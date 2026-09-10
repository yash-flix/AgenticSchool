"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type Course,
  fmtDuration,
  fmtViews,
  thumb,
  watchUrl,
} from "@/lib/courses";
import { useProgress } from "@/lib/useProgress";

const levelTone: Record<Course["level"], string> = {
  Beginner: "bg-moss",
  Intermediate: "bg-sky",
  Advanced: "bg-flame",
};

/**
 * Two variants share one body. In the grid every row of the body has a fixed
 * height (title two lines, channel one, summary three, topics one), so the
 * cards line up across a row and the button bar sits on the same baseline
 * whatever the copy does.
 */
export default function CourseCard({
  course,
  variant = "path",
}: {
  course: Course;
  variant?: "path" | "grid";
}) {
  const { done, ready, toggle } = useProgress();
  const complete = ready && done.includes(course.slug);
  const wide = variant === "path";

  return (
    <article
      className={`card group h-full overflow-hidden ${
        complete ? "border-moss/40" : ""
      }`}
    >
      {complete && (
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 z-10 w-[3px] bg-moss/70"
        />
      )}

      <div className={wide ? "grid h-full sm:grid-cols-[320px_1fr]" : "flex h-full flex-col"}>
        <Link
          href={`/course/${course.slug}`}
          className={`relative block overflow-hidden bg-panel ${
            wide
              ? "aspect-[16/9] sm:aspect-auto sm:border-r sm:border-line"
              : "aspect-[16/9] border-b border-line"
          }`}
          tabIndex={-1}
          aria-hidden
        >
          <Image
            src={thumb(course.videoId)}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 380px"
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-obsidian/10" />

          {/* number and level live on the image, so the body starts clean */}
          <span className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span className="rounded-md bg-canvas/95 px-2 py-1 font-mono text-[10.5px] tracking-[0.08em] text-ink tabular-nums backdrop-blur">
              {course.sub}
            </span>
            <span className="flex items-center gap-1.5 rounded-md bg-obsidian/70 px-2 py-1 font-mono text-[9.5px] tracking-[0.12em] text-canvas uppercase backdrop-blur">
              <span className={`h-1.5 w-1.5 rounded-full ${levelTone[course.level]}`} />
              {course.level}
            </span>
          </span>

          <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-canvas/95 text-ink shadow-lg backdrop-blur">
              <svg viewBox="0 0 12 14" className="ml-0.5 h-3.5 w-3.5" aria-hidden>
                <path d="M0 0l12 7-12 7z" fill="currentColor" />
              </svg>
            </span>
          </span>

          <span className="absolute right-2.5 bottom-2.5 rounded-md bg-obsidian/80 px-2 py-1 font-mono text-[10px] tracking-wide text-canvas tabular-nums backdrop-blur">
            {fmtDuration(course.minutes)}
          </span>
        </Link>

        <div className="relative flex flex-1 flex-col p-6">
          {wide && (
            <span
              aria-hidden
              className="ghost-num pointer-events-none absolute top-4 right-5 text-[52px]"
            >
              {course.n}
            </span>
          )}

          <div className="relative flex items-center gap-3">
            <span className="label text-ink">{course.channel}</span>
            <span className="label ml-auto">{fmtViews(course.views)} views</span>
          </div>

          <Link href={`/course/${course.slug}`} className="relative mt-3.5 block">
            <h3
              className={`display-4 ${
                wide ? "max-w-[26ch]" : "line-clamp-2 min-h-[calc(2*1.18em)]"
              }`}
            >
              {course.shortTitle}
            </h3>
            <p className="mt-2 truncate font-mono text-[11px] leading-relaxed tracking-[0.02em] text-muted">
              {course.title}
            </p>
          </Link>

          <p
            className={`mt-4 line-clamp-3 text-[14.5px] leading-[1.58] text-ink-2 ${
              wide ? "" : "min-h-[calc(3*1.58em)]"
            }`}
          >
            {course.summary}
          </p>

          {/* one line, never wraps; anything past the edge fades out */}
          <div
            className={`mt-5 flex gap-1.5 ${
              wide
                ? "flex-wrap"
                : "flex-nowrap overflow-hidden"
            }`}
          >
            {course.topics.map((t) => (
              <span key={t} className="chip shrink-0">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-2 pt-6">
            <a
              href={watchUrl(course.videoId)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-solid btn-sm"
            >
              Watch
              <span aria-hidden className="text-[11px] opacity-60">
                ↗
              </span>
            </a>
            <Link href={`/course/${course.slug}`} className="btn btn-ghost btn-sm">
              Details
            </Link>
            <button
              onClick={() => toggle(course.slug)}
              aria-pressed={complete}
              className={`ml-auto flex items-center gap-1.5 rounded-full border px-3 py-2 font-mono text-[9.5px] tracking-[0.14em] uppercase transition-colors ${
                complete
                  ? "border-moss/45 bg-moss/8 text-moss"
                  : "border-line text-muted hover:border-ink hover:text-ink"
              }`}
            >
              <span
                className={`grid h-3.5 w-3.5 place-items-center rounded-full border text-[8px] ${
                  complete
                    ? "border-moss bg-moss text-white"
                    : "border-line-2"
                }`}
              >
                {complete ? "✓" : ""}
              </span>
              {complete ? "Done" : "Mark done"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
