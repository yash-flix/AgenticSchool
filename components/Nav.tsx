"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { courses } from "@/lib/courses";
import { CONTINUITY_SPRING } from "@/lib/motion";
import { useProgress } from "@/lib/useProgress";
import AuthButton from "./AuthButton";
import ContinueButton from "./ContinueButton";
import FreeBadge from "./FreeBadge";
import Logo from "./Logo";

const links = [
  { href: "/#path", label: "The path" },
  { href: "/#catalog", label: "All courses" },
  { href: "/#field", label: "Field track" },
  { href: "/community", label: "Community" },
  { href: "/#faq", label: "Notes" },
];

/** Circumference of the r=7 progress ring, so the dash maths stays readable. */
const RING = 2 * Math.PI * 7;

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
      <div className="mx-auto grid h-[68px] max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-6">
        <div className="flex items-center gap-3">
          <Logo href="/" />
          <FreeBadge className="hidden sm:inline-flex" />
        </div>

        <nav className="hidden items-center gap-0.5 md:flex">
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

        <div className="flex items-center justify-end gap-3">
          {/* A ring reads as progress at a glance; the bare fraction did not. */}
          <span
            className="hidden items-center gap-2 lg:flex"
            title={`${done.length} of ${courses.length} courses marked done`}
          >
            <svg viewBox="0 0 18 18" className="h-[18px] w-[18px] -rotate-90">
              <circle
                cx="9"
                cy="9"
                r="7"
                fill="none"
                strokeWidth="2"
                className="stroke-line-2"
              />
              <motion.circle
                cx="9"
                cy="9"
                r="7"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                className="stroke-flame"
                strokeDasharray={RING}
                initial={false}
                animate={{
                  strokeDashoffset:
                    RING * (1 - (ready ? done.length / courses.length : 0)),
                }}
                transition={CONTINUITY_SPRING}
              />
            </svg>
            <span className="label tabular-nums">
              {ready ? `${done.length}/${courses.length}` : ""}
            </span>
          </span>
          <AuthButton />
          <ContinueButton className="hidden sm:block" />
          <motion.button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            whileTap={{ scale: 0.9 }}
            className="grid h-9 w-9 place-items-center rounded-full border border-line-2 md:hidden"
          >
            {/* The two glyphs occupy the same cell, so one rotates out as the
                other rotates in instead of the button twitching. */}
            <span className="grid grid-cols-1 grid-rows-1 place-items-center">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={CONTINUITY_SPRING}
                  className="col-start-1 row-start-1 font-mono text-xs"
                >
                  {open ? "\u00d7" : "\u2261"}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={CONTINUITY_SPRING}
            className="overflow-hidden border-t border-line bg-canvas px-6 md:hidden"
          >
            <div className="py-2">
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
              {/* The bar hides the CTA under sm, so the menu has to carry it. */}
              <div className="py-4" onClick={() => setOpen(false)}>
                <ContinueButton className="[&_a]:w-full [&_a]:justify-center sm:hidden" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
