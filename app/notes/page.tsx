import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import KindGlyph from "@/components/notes/KindGlyph";
import NotesIndex from "@/components/notes/NotesIndex";
import NotesDeck from "@/components/notes/NotesDeck";
import ToScale from "@/components/notes/ToScale";
import { totalMinutes } from "@/lib/courses";
import { noteKinds, sortedNotes } from "@/lib/notes";
import { readingMinutes } from "@/lib/notes.server";

export const metadata: Metadata = {
  title: "Notes — Agent School",
  description:
    "The ideas behind the courses, written down. Read a note in ten minutes, build the thing, and watch the video only when you get stuck.",
};

export default async function NotesPage() {
  const minutes = Object.fromEntries(
    await Promise.all(sortedNotes.map(async (n) => [n.slug, await readingMinutes(n.slug)]))
  ) as Record<string, number>;
  const totalRead = Object.values(minutes).reduce((a, b) => a + b, 0);
  const hours = Math.round(totalMinutes / 60);

  return (
    <>
      <Nav />
      <main>
        {/* ------------------------------------------------ hero -- */}
        <section className="relative overflow-hidden px-6 pt-14 pb-16 md:pt-20">
          <div
            aria-hidden
            className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black,transparent)]"
          />
          <div className="relative mx-auto max-w-[1200px]">
            <div className="grid gap-x-12 gap-y-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <Reveal>
                  <span className="label">Notes</span>
                  <h1 className="display-1 mt-6 max-w-[13ch]">
                    Skip the <span className="em-serif">tutorial hell.</span>
                  </h1>
                </Reveal>
                <Reveal delay={100}>
                  <p className="lede mt-9 max-w-[54ch]">
                    The path is {hours} hours of video, and watching all of it
                    is one way through. This is the other. The ideas behind the
                    courses, written down, so you can read one in ten minutes,
                    build it from an empty file, and open the video only when
                    you get stuck.
                  </p>
                  <p className="mt-6 text-[13.5px] leading-[1.55] text-muted">
                    Read, build, then watch. In that order. The{" "}
                    <Link
                      href="/notes/tutorial-hell-and-the-way-out"
                      className="text-ink underline decoration-line-2 underline-offset-[3px] hover:decoration-ink"
                    >
                      first article
                    </Link>{" "}
                    explains why.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={160} className="md:col-span-5 md:col-start-8">
                <NotesDeck />
              </Reveal>
            </div>

            {/* to scale */}
            <Reveal delay={80}>
              <div className="mt-16">
                <ToScale readMinutes={totalRead} count={sortedNotes.length} />
              </div>
            </Reveal>

            {/* kinds */}
            <Reveal delay={60}>
              <div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
                {noteKinds.map((k) => {
                  const n = sortedNotes.filter((x) => x.kind === k.id).length;
                  return (
                    <div key={k.id} className="flex gap-4 bg-paper px-5 py-6">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] border border-line bg-canvas text-ink">
                        <KindGlyph kind={k.id} className="h-[22px] w-[22px]" />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-baseline gap-2">
                          <span className="label text-ink">{k.plural}</span>
                          <span className="font-mono text-[10.5px] text-muted tabular-nums">
                            {n === 0 ? "soon" : n}
                          </span>
                        </span>
                        <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-2">{k.blurb}</p>
                      </span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------ list -- */}
        <section
          id="all"
          className="scroll-mt-24 border-t border-line bg-panel/45 px-6 py-20 md:py-28"
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="flex items-center gap-4 border-t border-ink pt-4">
              <span className="label text-ink">Everything written so far</span>
              <span className="rule-x h-px flex-1" />
              <span className="label">newest first</span>
            </div>
            <div className="mt-9">
              <NotesIndex notes={sortedNotes} minutes={minutes} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
