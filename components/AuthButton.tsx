"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { courses } from "@/lib/courses";
import {
  CONTINUITY_LABEL,
  CONTINUITY_PANEL,
  CONTINUITY_SPRING,
} from "@/lib/motion";
import { browserSupabase } from "@/lib/supabase/client";
import { useProgress } from "@/lib/useProgress";
import { useViewer } from "@/lib/useViewer";

export default function AuthButton() {
  const { viewer, enabled } = useViewer();
  const { done, ready } = useProgress();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const box = useRef<HTMLDivElement>(null);

  // A menu that only closes by clicking its own trigger feels broken.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function signIn(provider: "github" | "google") {
    const supabase = browserSupabase();
    if (!supabase) return;
    setBusy(provider);
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
          window.location.pathname
        )}`,
      },
    });
  }

  const avatar = viewer?.avatar;
  const pct = ready ? Math.round((done.length / courses.length) * 100) : 0;

  /* ------------------------------------------------------------ signed in */
  if (viewer) {
    return (
      <div ref={box} className="relative">
        {/* The handle and sign-out used to sit in the bar beside the avatar.
            Folded into this menu, the header keeps room for the real action. */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Account"
          className="grid h-[30px] w-[30px] place-items-center overflow-hidden rounded-full border border-line-2 transition-colors hover:border-ink"
        >
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="" width={30} height={30} className="h-full w-full object-cover" />
          ) : (
            <span className="font-mono text-[11px] text-ink-2">
              {viewer.name.slice(0, 1).toUpperCase()}
            </span>
          )}
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="account-menu"
              variants={CONTINUITY_PANEL}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={CONTINUITY_SPRING}
              className="card absolute right-0 z-20 mt-2 w-60 origin-top-right p-2 hover:translate-y-0"
            >
              <div className="px-3 pt-2 pb-3">
                <p className="truncate text-[14px] font-medium">{viewer.name}</p>
                {viewer.handle && (
                  <p className="mt-0.5 truncate font-mono text-[10.5px] text-muted">
                    @{viewer.handle}
                  </p>
                )}
              </div>

              <div className="border-t border-line px-3 py-3">
                <div className="flex items-baseline justify-between">
                  <span className="label">Progress</span>
                  <span className="font-mono text-[11px] text-ink-2 tabular-nums">
                    {ready ? done.length : 0}/{courses.length}
                  </span>
                </div>
                <span className="mt-2.5 block h-[3px] rounded-full bg-line-2">
                  <motion.span
                    initial={false}
                    animate={{ width: `${pct}%` }}
                    transition={CONTINUITY_SPRING}
                    className="block h-full rounded-full bg-flame"
                  />
                </span>
              </div>

              <form action="/auth/signout" method="post" className="border-t border-line pt-1">
                <button
                  type="submit"
                  className="w-full rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors hover:bg-panel hover:text-flame"
                >
                  Sign out
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  /* ----------------------------------------------------------- signed out */
  return (
    <div ref={box} className="relative">
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="btn btn-ghost btn-sm">
        Sign in
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="auth-menu"
            variants={CONTINUITY_PANEL}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={CONTINUITY_SPRING}
            className="card absolute right-0 z-20 mt-2 w-56 origin-top-right p-2 hover:translate-y-0"
          >
            <motion.button
              layout
              transition={CONTINUITY_SPRING}
              whileTap={{ scale: 0.98 }}
              onClick={() => signIn("github")}
              disabled={busy !== null || !enabled}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors hover:bg-panel disabled:opacity-50"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4 fill-ink" aria-hidden>
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38l-.01-1.49C3.8 14.18 3.33 13 3.33 13c-.36-.93-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 014 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8 8 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={busy === "github" ? "busy" : "idle"}
                  layout
                  variants={CONTINUITY_LABEL}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={CONTINUITY_SPRING}
                  className="whitespace-nowrap"
                >
                  {busy === "github" ? "Opening GitHub…" : "Continue with GitHub"}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <motion.button
              layout
              transition={CONTINUITY_SPRING}
              whileTap={{ scale: 0.98 }}
              onClick={() => signIn("google")}
              disabled={busy !== null || !enabled}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors hover:bg-panel disabled:opacity-50"
            >
              <svg viewBox="0 0 18 18" className="h-4 w-4" aria-hidden>
                <path fill="#4285F4" d="M17.6 9.2c0-.6-.05-1.2-.16-1.7H9v3.3h4.8a4.1 4.1 0 01-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.5z" />
                <path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3A9 9 0 009 18z" />
                <path fill="#FBBC05" d="M3.9 10.7a5.4 5.4 0 010-3.4V5H.9a9 9 0 000 8l3-2.3z" />
                <path fill="#EA4335" d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 00.9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6z" />
              </svg>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={busy === "google" ? "busy" : "idle"}
                  layout
                  variants={CONTINUITY_LABEL}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={CONTINUITY_SPRING}
                  className="whitespace-nowrap"
                >
                  {busy === "google" ? "Opening Google…" : "Continue with Google"}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <p className="mt-1 border-t border-line px-3 py-2.5 text-[11.5px] leading-relaxed text-muted">
              {enabled
                ? "Signing in syncs your progress across devices and lets you post to the wall."
                : "Accounts are not switched on yet."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
