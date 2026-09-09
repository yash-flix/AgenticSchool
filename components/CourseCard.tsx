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
  Beginner: "text-moss",
  Intermediate: "text-sky",
  Advanced: "text-flame",
};

export default function CourseCard({
  course,
  variant = "path",
}: {
  course: Course;
  variant?: "path" | "grid";
}) {
  const { done, ready, toggle } = useProgress();
  const complete = ready && done.includes(course.slug);

  return (
    <article
      className={`group relative overflow-hidden rounded-xl border bg-canvas transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-18px_rgba(32,32,32,0.35)] ${
        complete ? "border-moss/45" : "border-line hover:border-line-2"
      }`}
    >
      <div
        className={
          variant === "path"
            ? "grid gap-0 sm:grid-cols-[300px_1fr]"
            : "flex flex-col"
        }
      >
        <Link
          href={`/course/${course.slug}`}
          className={`relative block overflow-hidden bg-panel ${
            variant === "path"
              ? "aspect-[16/9] sm:aspect-auto sm:border-r sm:border-line"
              : "aspect-[16/9] border-b border-line"
          }`}
        >
          <Image
            src={thumb(course.videoId)}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 380px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span className="absolute top-2 left-2 rounded-md bg-canvas/92 px-2 py-1 font-mono text-[10px] tracking-widest text-ink backdrop-blur">
            {course.n}
          </span>
          <span className="absolute right-2 bottom-2 rounded-md bg-ink/85 px-2 py-1 font-mono text-[10px] tracking-wide text-canvas">
            {fmtDuration(course.minutes)}
          </span>
        </Link>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-3">
            <span className="label">{course.sub}</span>
            <span className={`label ${levelTone[course.level]}`}>
              {course.level}
            </span>
            <span className="ml-auto flex items-center gap-2.5">
              <span className="label">{fmtViews(course.views)} views</span>
              <span className="rounded-full border border-moss/40 bg-moss/8 px-2 py-0.5 font-mono text-[9.5px] tracking-[0.14em] text-moss uppercase">
                Free
              </span>
            </span>
          </div>

          <Link href={`/course/${course.slug}`} className="mt-3 block">
            <h3 className="text-[19px] leading-[1.2] font-semibold tracking-[-0.025em] text-balance">
              {course.shortTitle}
            </h3>
            <p className="mt-1.5 text-[13px] text-muted">
              {course.title} · {course.channel}
            </p>
          </Link>

          <p className="mt-3 line-clamp-3 text-[14px] leading-[1.5] text-ink-2">
            {course.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {course.topics.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] tracking-wide text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
            <a
              href={watchUrl(course.videoId)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-ink px-3.5 py-2 text-[12.5px] font-medium text-canvas transition-transform hover:-translate-y-px"
            >
              Watch on YouTube
            </a>
            <Link
              href={`/course/${course.slug}`}
              className="rounded-full border border-line-2 px-3.5 py-2 text-[12.5px] font-medium transition-colors hover:bg-panel"
            >
              Details
            </Link>
            <button
              onClick={() => toggle(course.slug)}
              aria-pressed={complete}
              className={`ml-auto flex items-center gap-1.5 rounded-full border px-3 py-2 font-mono text-[10px] tracking-wider uppercase transition-colors ${
                complete
                  ? "border-moss/50 bg-moss/10 text-moss"
                  : "border-line text-muted hover:border-line-2 hover:text-ink"
              }`}
            >
              <span
                className={`grid h-3.5 w-3.5 place-items-center rounded-full border text-[8px] ${
                  complete ? "border-moss bg-moss text-white" : "border-line-2"
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
