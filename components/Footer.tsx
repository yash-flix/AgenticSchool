import Link from "next/link";
import { courses, libraryCount, libraryMinutes } from "@/lib/courses";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel px-6 py-14">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-ink text-canvas">
                <span className="font-mono text-[11px] leading-none">A/</span>
              </span>
              <span className="text-[15px] font-semibold tracking-[-0.02em]">
                Agent School
              </span>
            </div>
            <p className="mt-4 max-w-[40ch] text-[14px] leading-[1.55] text-ink-2">
              A free, unpaywalled reading order for {libraryCount} YouTube
              videos on agentic AI, {Math.round(libraryMinutes / 60)} hours in
              total. Not affiliated with any of the creators listed, and
              nothing here is sold.
            </p>
          </div>

          <div className="md:col-span-3">
            <span className="label">Stages</span>
            <ul className="mt-4 space-y-2">
              {["ground", "orchestrate", "context", "ship", "field"].map((s) => (
                <li key={s}>
                  <a
                    href={`#${s}`}
                    className="text-[14px] text-ink-2 capitalize transition-colors hover:text-ink"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <span className="label">Courses</span>
            <ul className="mt-4 space-y-2">
              {courses.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/course/${c.slug}`}
                    className="text-[14px] text-ink-2 transition-colors hover:text-ink"
                  >
                    {c.n} — {c.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="#catalog"
                  className="text-[14px] text-muted transition-colors hover:text-ink"
                >
                  and five more
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6">
          <span className="label">Built with Next.js</span>
          <span className="label">Data read from YouTube · Sept 2026</span>
          <span className="label ml-auto">All courses free to watch</span>
        </div>
      </div>
    </footer>
  );
}
