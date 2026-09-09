import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import MarkDone from "@/components/MarkDone";
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
      <main className="px-6 pt-10 pb-20">
        <div className="mx-auto max-w-[1180px]">
          <Link
            href="/#path"
            className="label transition-colors hover:text-ink"
          >
            ← Back to the path
          </Link>

          <div className="mt-8 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="label">
                  {course.sub} — {stage.name}
                </span>
                <span className="label">{course.level}</span>
                <span className="label">{fmtDuration(course.minutes)}</span>
                <span className="label">{fmtViews(course.views)} views</span>
              </div>

              <h1 className="mt-5 text-[36px] leading-[1.02] font-semibold tracking-[-0.035em] text-balance md:text-[50px]">
                {course.shortTitle}
              </h1>
              <p className="mt-4 text-[15px] text-muted">
                {course.title} · {course.channel}
              </p>
              <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.55] text-ink-2">
                {course.summary}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={watchUrl(course.videoId)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-canvas transition-transform hover:-translate-y-px"
                >
                  Watch on YouTube
                </a>
                <MarkDone slug={course.slug} />
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="overflow-hidden rounded-xl border border-line bg-panel">
                <div className="aspect-video">
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
                  <span
                    key={t}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] tracking-wide text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="label">What you walk away with</span>
            </div>
            <ul className="md:col-span-7 md:col-start-6">
              {course.outcomes.map((o, k) => (
                <li
                  key={o}
                  className="flex gap-5 border-b border-line py-4 first:pt-0"
                >
                  <span className="font-mono text-[11px] text-muted">
                    {String(k + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[16px] leading-[1.5]">{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <nav className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/course/${prev.slug}`}
                className="rounded-xl border border-line p-5 transition-colors hover:bg-panel"
              >
                <span className="label">← Previous · {prev.n}</span>
                <p className="mt-2 text-[17px] font-medium tracking-[-0.02em]">
                  {prev.shortTitle}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/course/${next.slug}`}
                className="rounded-xl border border-line p-5 text-right transition-colors hover:bg-panel sm:col-start-2"
              >
                <span className="label">Next · {next.n} →</span>
                <p className="mt-2 text-[17px] font-medium tracking-[-0.02em]">
                  {next.shortTitle}
                </p>
              </Link>
            )}
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
