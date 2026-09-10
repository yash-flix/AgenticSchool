import type { Transition, Variants } from "motion/react";

/**
 * One spring for every layout change in the app, so a button resizing, a
 * highlight sliding between tabs and a panel opening all share a physics.
 * Reusing a single curve is what makes separate animations read as one system.
 */
export const CONTINUITY_SPRING: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.7,
};

/**
 * A label that appears beside an icon. It slides out of the icon rather than
 * fading in place, so the eye reads one element growing instead of two things
 * happening. Paired with `layout` on the button, the width follows along.
 */
export const CONTINUITY_LABEL: Variants = {
  hidden: { opacity: 0, x: -8, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -8, filter: "blur(4px)" },
};

/** Panels and dropdowns: scale from the edge they are anchored to. */
export const CONTINUITY_PANEL: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.97 },
};
