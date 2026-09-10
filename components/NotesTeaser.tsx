import Link from "next/link";
import { totalMinutes } from "@/lib/courses";
import { kindLabel, sortedNotes } from "@/lib/notes";
import AccentText from "./AccentText";
import KindGlyph from "./notes/KindGlyph";
import NoteFigure from "./notes/NoteFigure";
import Reveal from "./Reveal";

/**
 * Home-page pointer to /notes. Three latest entries; the page itself carries
 * the full list and the filters.
 */
export default function NotesTeaser() {
  const latest = sortedNotes.slice(0, 3);
  const hours = Math.round(totalMinutes / 60);

  return (
    <section id="notes" className="scroll-mt-24 border-t border-line px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-x-12 gap-y-10 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <span className="label">Notes</span>
          <h2 className="display-2 mt-5 max-w-[14ch]">
            <AccentText>{"Not everyone needs *the full 65 hours*"}</AccentText>
          </h2>
          <p className="lede mt-6 max-w-[42ch]">
            If watching {hours} hours of video sounds like tutorial hell, read
            the notes instead. Each one is a single idea from the path, written
            down so you can build it first and watch only what you get stuck on.
          </p>
          <Link href="/notes" className="btn btn-solid mt-8">
            Read the notes
            <span aria-hidden className="text-[12px] opacity-60">→</span>
          </Link>
        </Reveal>

        <div className="md:col-span-6 md:col-start-7">
          <ul>
            {latest.map((n, i) => (
              <Reveal key={n.slug} delay={i * 70}>
                <li className="border-b border-line-2 first:border-t">
                  <Link
                    href={`/notes/${n.slug}`}
                    className="group flex items-start gap-5 py-5"
                  >
                    <NoteFigure
                      slug={n.slug}
                      className="hidden h-[52px] w-[104px] shrink-0 rounded-lg border border-line bg-panel/50 transition-colors group-hover:border-line-2 sm:block"
                    />
                    <span className="min-w-0">
                      <span className="label flex items-center gap-1.5 text-ink">
                        <KindGlyph kind={n.kind} className="h-3.5 w-3.5" />
                        {kindLabel(n.kind)}
                      </span>
                      <span className="mt-2 block text-[17px] font-medium tracking-[-0.024em] text-ink transition-colors group-hover:text-flame">
                        {n.title}
                      </span>
                      <span className="mt-1.5 block max-w-[48ch] text-[14px] leading-[1.55] text-ink-2">
                        {n.summary}
                      </span>
                    </span>
                    <span aria-hidden className="ml-auto mt-1 shrink-0 text-line-2 transition-colors group-hover:text-flame">
                      →
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
