"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { courses } from "@/lib/courses";
import { useProgress } from "@/lib/useProgress";
import AuthButton from "./AuthButton";
import Logo from "./Logo";

const links = [
  { href: "/#path", label: "The path" },
  { href: "/#catalog", label: "All courses" },
  { href: "/#field", label: "Field track" },
  { href: "/community", label: "Community" },
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
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-canvas/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center gap-6 px-6">
        <Link href="/" aria-label="Agent School home">
          <Logo />
        </Link>
        <span className="chip chip-free hidden sm:inline-flex">Free</span>

        <nav className="ml-auto hidden items-center gap-0.5 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-[13.5px] text-ink-2 transition-colors hover:bg-panel hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-4">
          <span className="label hidden lg:block">
            {ready ? `${done.length}/${courses.length}` : ""}
          </span>
          <AuthButton />
          <a href="#path" className="btn btn-solid btn-sm">
            Start the path
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-line-2 md:hidden"
          >
            <span className="font-mono text-xs">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-canvas px-6 py-2 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-3 text-[15px] text-ink-2 last:border-b-0"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
