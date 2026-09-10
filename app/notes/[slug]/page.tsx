import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import KindGlyph from "@/components/notes/KindGlyph";
import NoteFigure from "@/components/notes/NoteFigure";
import ReadingProgress from "@/components/notes/ReadingProgress";
import { courses, fmtDuration } from "@/lib/courses";
import { findNote, fmtNoteDate, kindLabel, sortedNotes } from "@/lib/notes";
import { readingMinutes } from "@/lib/notes.server";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sortedNotes.map((n) => ({ slug: n.slug }));
}

// Only slugs in the registry exist; anything else is a 404, not a build.
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const note = findNote(slug);
  if (!note) return { title: "Note not found — Agent School" };
  return {
    title: `${note.title} — Agent School`,
    description: note.summary,
    openGraph: { title: note.title, description: note.summary, type: "article" },
  };
}

export default async function NotePage({ params }: Params) {
  const { slug } = await params;
  const note = findNote(slug);
  if (!note) notFound();

  const [{ default: Body }, minutes] = await Promise.all([
    import(`@/content/notes/${slug}.mdx`),
    readingMinutes(slug),
  ]);

  const i = sortedNotes.findIndex((n) => n.slug === slug);
  const prev = sortedNotes[i - 1];
  const next = sortedNotes[i + 1];
  const paired = note.courses
    .map((s) => courses.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <Nav />
      <ReadingProgress />
      <main className="relative px-6 pt-10 pb-24">
        <div className="mx-auto max-w-[1200px]">
          <Link href="/notes" className="label transition-colors hover:text-ink">
            ← All notes
          </Link>

          <header className="mt-8 grid items-end gap-x-12 gap-y-8 md:grid-cols-12">
            <div className="max-w-[62ch] md:col-span-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="label inline-flex items-center gap-1.5 text-ink">
                  <KindGlyph kind={note.kind} className="h-4 w-4" />
                  {kindLabel(note.kind)}
                </span>
                <span className="label">{minutes} min read</span>
                <span className="label">{fmtNoteDate(note.date)}</span>
              </div>
              <h1 className="display-2 mt-6">{note.title}</h1>
              <p className="lede mt-7">{note.summary}</p>
            </div>
            <div className="md:col-span-3 md:col-start-10">
              <div className="overflow-hidden rounded-[14px] border border-line bg-panel/50 shadow-[var(--shadow-card)]">
                <NoteFigure slug={note.slug} animate className="w-full" />
              </div>
            </div>
          </header>

          <div className="mt-14 grid gap-x-12 gap-y-12 border-t border-line pt-12 md:grid-cols-12">
            <article className="max-w-[66ch] md:col-span-8">
              <Body />
            </article>

            <aside className="md:col-span-3 md:col-start-10">
              <div className="md:sticky md:top-24">
                <span className="label">Topics</span>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {note.topics.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>

                {paired.length > 0 && (
                  <>
                    <span className="label mt-10 block">Watch when you get stuck</span>
                    <ul className="mt-4">
                      {paired.map((c) => (
                        <li key={c.slug} className="border-b border-line-2 first:border-t">
                          <Link
                            href={`/course/${c.slug}`}
                            className="group flex gap-3 py-3.5 text-[14px] leading-snug text-ink-2 transition-colors hover:text-ink"
                          >
                            <span className="font-mono text-[11px] text-muted tabular-nums">{c.n}</span>
                            <span className="min-w-0">
                              {c.shortTitle}
                              <span className="mt-1 block font-mono text-[10px] tracking-[0.04em] text-muted">
                                {fmtDuration(c.minutes)}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </aside>
          </div>

          <nav className="mt-20 grid gap-5 border-t border-line pt-9 sm:grid-cols-2">
            {prev ? (
              <Link href={`/notes/${prev.slug}`} className="card flex items-center gap-5 p-5">
                <NoteFigure slug={prev.slug} className="h-[56px] w-[112px] shrink-0 rounded-lg border border-line bg-panel/50" />
                <span className="min-w-0">
                  <span className="label">← Newer · {kindLabel(prev.kind)}</span>
                  <span className="display-4 mt-2 block text-[1.1rem]">{prev.title}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/notes/${next.slug}`} className="card flex items-center gap-5 p-5 sm:flex-row-reverse sm:text-right">
                <NoteFigure slug={next.slug} className="h-[56px] w-[112px] shrink-0 rounded-lg border border-line bg-panel/50" />
                <span className="min-w-0">
                  <span className="label">{kindLabel(next.kind)} · Older →</span>
                  <span className="display-4 mt-2 block text-[1.1rem]">{next.title}</span>
                </span>
              </Link>
            )}
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
