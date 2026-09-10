"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { courses } from "@/lib/courses";
import { CONTINUITY_SPRING } from "@/lib/motion";
import { useProgress } from "@/lib/useProgress";
import AuthButton from "./AuthButton";
import ContinueButton from "./ContinueButton";
import FreeBadge from "./FreeBadge";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

/**
 * `route` is what the link is active on. Anchor links into the home page
 * share one route and never light up individually; the section pages do.
 */
const links = [
  { href: "/#path", label: "The path", route: null },
  { href: "/#catalog", label: "All courses", route: null },
  { href: "/#field", label: "Field track", route: null },
  { href: "/notes", label: "Notes", route: "/notes" },
  { href: "/community", label: "Community", route: "/community" },
];

/** Circumference of the r=7 progress ring, so the dash maths stays readable. */
const RING = 2 * Math.PI * 7;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { done, ready } = useProgress();
  const pathname = usePathname();

  // The sheet remembers which route it was opened on, so a navigation closes
  // it by derivation rather than by an effect that sets state.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (v: boolean) => setOpenAt(v ? pathname : null);

  const isActive = (route: string | null) =>
    route !== null && (pathname === route || pathname.startsWith(`${route}/`));

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-canvas/85 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_10px_30px_-24px_rgba(21,21,26,0.35)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[64px] max-w-[1200px] items-center gap-6 px-6">
        {/* brand */}
        <div className="flex min-w-0 items-center gap-3">
          <Logo href="/" />
          <FreeBadge className="hidden lg:inline-flex" />
        </div>

        {/* primary */}
        <nav
          aria-label="Primary"
          className="mx-auto hidden items-center gap-0.5 rounded-full border border-line bg-paper/70 p-1 md:flex"
        >
          {links.map((l) => {
            const active = isActive(l.route);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-1.5 text-[13px] tracking-[-0.01em] transition-colors ${
                  active ? "text-ink" : "text-ink-2 hover:text-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={CONTINUITY_SPRING}
                    className="absolute inset-0 rounded-full bg-panel-2/80"
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* actions */}
        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <span
            className="hidden items-center gap-2 lg:flex"
            title={`${done.length} of ${courses.length} courses marked done`}
          >
            <svg viewBox="0 0 18 18" className="h-[18px] w-[18px] -rotate-90">
              <circle cx="9" cy="9" r="7" fill="none" strokeWidth="2" className="stroke-line-2" />
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
                  strokeDashoffset: RING * (1 - (ready ? done.length / courses.length : 0)),
                }}
                transition={CONTINUITY_SPRING}
              />
            </svg>
            <span className="label tabular-nums">
              {ready ? `${done.length}/${courses.length}` : ""}
            </span>
          </span>

          <span aria-hidden className="hidden h-5 w-px bg-line lg:block" />

          <ThemeToggle className="hidden sm:grid" />
          <AuthButton />
          <ContinueButton className="hidden sm:block" />

          <motion.button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            whileTap={{ scale: 0.92 }}
            className="grid h-9 w-9 place-items-center rounded-full border border-line-2 bg-paper md:hidden"
          >
            {/* Two bars that rotate into a cross, so open and closed are one
                mark in two states. */}
            <span className="relative block h-3 w-4">
              <motion.span
                animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={CONTINUITY_SPRING}
                className="absolute top-0 left-0 block h-[1.5px] w-4 rounded-full bg-ink"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="absolute top-[5px] left-0 block h-[1.5px] w-4 rounded-full bg-ink"
              />
              <motion.span
                animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={CONTINUITY_SPRING}
                className="absolute top-[10px] left-0 block h-[1.5px] w-4 rounded-full bg-ink"
              />
            </span>
          </motion.button>
        </div>
      </div>

      {/* mobile sheet */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={CONTINUITY_SPRING}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="px-6 pt-3 pb-5">
              <ul className="divide-y divide-line">
                {links.map((l, i) => {
                  const active = isActive(l.route);
                  return (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...CONTINUITY_SPRING, delay: i * 0.03 }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between py-3.5 text-[15.5px] tracking-[-0.012em] ${
                          active ? "text-ink" : "text-ink-2"
                        }`}
                      >
                        {l.label}
                        <span
                          aria-hidden
                          className={`font-mono text-[11px] ${active ? "text-flame" : "text-line-2"}`}
                        >
                          {active ? "●" : "→"}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-line bg-paper p-3">
                <span className="flex items-center gap-2.5">
                  <ThemeToggle />
                  <FreeBadge className="inline-flex" />
                  <span className="label tabular-nums">
                    {ready ? `${done.length}/${courses.length} done` : ""}
                  </span>
                </span>
                <span onClick={() => setOpen(false)}>
                  <ContinueButton />
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
