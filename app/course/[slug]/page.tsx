import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import MarkDone from "@/components/MarkDone";
import PathPosition from "@/components/PathPosition";
import {
  courses,
  fmtDuration,
  fmtViews,
  stages,
  watchUrl,
} from "@/lib/courses";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return { title: "Course not found — Agent School" };
  return {
    title: `${course.n} · ${course.shortTitle} — Agent School`,
    description: course.summary,
  };
}

export default async function CoursePage({ params }: Params) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const i = courses.findIndex((c) => c.slug === slug);
  const prev = courses[i - 1];
  const next = courses[i + 1];
  const stage = stages.find((s) => s.id === course.stage)!;

  return (
    <>
      <Nav />
      <main className="relative px-6 pt-10 pb-24">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/#path"
            className="label transition-colors hover:text-ink"
          >
            ← Back to the path
          </Link>

          <div className="mt-8 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="label text-ink">
                  {course.sub} — {stage.name}
                </span>
                <span className="label">{course.level}</span>
                <span className="label">{fmtDuration(course.minutes)}</span>
                <span className="label">{fmtViews(course.views)} views</span>
                <span className="chip chip-free">Free</span>
              </div>

              <h1 className="display-2 mt-6 max-w-[16ch]">
                {course.shortTitle}
              </h1>
              <p className="mt-5 font-mono text-[11.5px] leading-relaxed tracking-[0.02em] text-muted">
                {course.channel}
                <span className="mx-2 text-line-2">/</span>
                {course.title}
              </p>
              <p className="lede mt-7 max-w-[56ch]">{course.summary}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={watchUrl(course.videoId)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-solid"
                >
                  Watch on YouTube
                  <span aria-hidden className="text-[12px] opacity-60">
                    ↗
                  </span>
                </a>
                <MarkDone slug={course.slug} />
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="overflow-hidden rounded-[16px] bg-obsidian p-2 shadow-[var(--shadow-panel)] ring-1 ring-black/10">
                <div className="aspect-video overflow-hidden rounded-[10px]">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${course.videoId}`}
                    title={course.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {course.topics.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <PathPosition slug={course.slug} />
            </div>
          </div>

          <div className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="label">What you walk away with</span>
              <h2 className="display-3 mt-5 max-w-[12ch]">Outcomes</h2>
            </div>
            <ul className="md:col-span-7 md:col-start-6">
              {course.outcomes.map((o, k) => (
                <li
                  key={o}
                  className="flex gap-6 border-b border-line-2 py-5 first:pt-0"
                >
                  <span className="mt-1 font-mono text-[11px] text-muted tabular-nums">
                    {String(k + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[16.5px] leading-[1.5] tracking-[-0.014em]">
                    {o}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <nav className="mt-20 grid gap-5 border-t border-line pt-9 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/course/${prev.slug}`}
                className="card p-6"
              >
                <span className="label">← Previous · {prev.n}</span>
                <p className="display-4 mt-3">{prev.shortTitle}</p>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/course/${next.slug}`}
                className="card p-6 text-right sm:col-start-2"
              >
                <span className="label">Next · {next.n} →</span>
                <p className="display-4 mt-3">{next.shortTitle}</p>
              </Link>
            )}
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
