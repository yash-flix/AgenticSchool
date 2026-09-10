"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A hairline under the nav that fills as you read. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-[68px] left-0 z-50 h-[2px] w-full origin-left bg-flame"
    />
  );
}
