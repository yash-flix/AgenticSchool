import Link from "next/link";
import { courses, libraryCount, libraryMinutes } from "@/lib/courses";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-obsidian px-6 pt-20 pb-10 text-canvas">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-x-12 gap-y-12 border-b border-line-dark pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo surface="dark" size="lg" />
            <p className="mt-6 max-w-[38ch] text-[14.5px] leading-[1.65] text-white/58">
              A free, unpaywalled reading order for {libraryCount} YouTube
              videos on agentic AI, {Math.round(libraryMinutes / 60)} hours in
              total. Not affiliated with any of the creators listed, and nothing
              here is sold.
            </p>
            <span className="mt-7 inline-flex items-center gap-2 rounded-full border border-moss/40 bg-moss/12 px-3 py-1.5 font-mono text-[9.5px] tracking-[0.15em] text-moss uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-moss" />
              Always free
            </span>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <span className="font-mono text-[10.5px] tracking-[0.15em] text-white/40 uppercase">
              Stages
            </span>
            <ul className="mt-5 space-y-3">
              {["ground", "orchestrate", "context", "ship", "field"].map((s) => (
                <li key={s}>
                  <Link
                    href={`/#${s}`}
                    className="text-[14.5px] text-white/70 capitalize transition-colors hover:text-canvas"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <span className="font-mono text-[10.5px] tracking-[0.15em] text-white/40 uppercase">
              Start here
            </span>
            <ul className="mt-5 space-y-3">
              {courses.slice(0, 4).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/course/${c.slug}`}
                    className="flex gap-3 text-[14.5px] text-white/70 transition-colors hover:text-canvas"
                  >
                    <span className="font-mono text-[11px] text-white/30 tabular-nums">
                      {c.n}
                    </span>
                    {c.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/community"
                  className="text-[14.5px] text-white/70 transition-colors hover:text-canvas"
                >
                  Community wall
                </Link>
              </li>
              <li>
                <Link
                  href="/#catalog"
                  className="text-[14.5px] text-white/40 transition-colors hover:text-canvas"
                >
                  and six more
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="font-mono text-[10.5px] tracking-[0.15em] text-white/35 uppercase">
            Built with Next.js
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.15em] text-white/35 uppercase">
            Data read from YouTube · Sept 2026
          </span>
          <span className="ml-auto font-mono text-[10.5px] tracking-[0.15em] text-white/35 uppercase">
            No sign-up · No paywall
          </span>
        </div>
      </div>
    </footer>
  );
}
