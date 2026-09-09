"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { courses } from "@/lib/courses";
import { useProgress } from "@/lib/useProgress";

const links = [
  { href: "/#path", label: "The path" },
  { href: "/#catalog", label: "All courses" },
  { href: "/#stack", label: "What you build" },
  { href: "/#faq", label: "Notes" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { done, ready } = useProgress();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-line bg-canvas/85 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1180px] items-center gap-6 px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-ink text-canvas">
            <span className="font-mono text-[11px] leading-none">A/</span>
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.02em]">
            Agent School
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-[13.5px] text-ink-2 transition-colors hover:bg-panel-2 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span className="label hidden lg:block">
            {ready ? `${done.length}/${courses.length} done` : " "}
          </span>
          <a
            href="#path"
            className="rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-canvas transition-transform hover:-translate-y-px"
          >
            Start the path
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-line md:hidden"
          >
            <span className="font-mono text-xs">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-canvas px-6 py-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-[15px] text-ink-2"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
