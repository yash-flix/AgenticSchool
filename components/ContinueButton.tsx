"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { courses } from "@/lib/courses";
import { CONTINUITY_LABEL, CONTINUITY_SPRING } from "@/lib/motion";
import { useProgress } from "@/lib/useProgress";

/**
 * The nav's primary action, which is not the same action for everyone.
 * "Start the path" is wrong for someone eleven courses in, and it used to
 * point at a bare "#path" anchor that resolves to nothing anywhere except the
 * home page. Every target here is a real route.
 */
export default function ContinueButton({ className = "" }: { className?: string }) {
  const { done, ready } = useProgress();

  const next = courses.find((c) => !done.includes(c.slug));
  const started = ready && done.length > 0;

  const action = !started
    ? { key: "start", label: "Start the path", href: "/#path" }
    : next
      ? { key: "continue", label: "Continue", href: `/course/${next.slug}` }
      : { key: "done", label: "Post a project", href: "/community" };

  return (
    <motion.div layout transition={CONTINUITY_SPRING} className={className}>
      <Link href={action.href} className="btn btn-solid btn-sm">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={action.key}
            layout
            variants={CONTINUITY_LABEL}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={CONTINUITY_SPRING}
            className="whitespace-nowrap"
          >
            {action.label}
          </motion.span>
        </AnimatePresence>
        {action.key === "continue" && next && (
          <span aria-hidden className="font-mono text-[11px] opacity-55 tabular-nums">
            {next.n}
          </span>
        )}
      </Link>
    </motion.div>
  );
}
