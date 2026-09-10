"use client";

import { MotionConfig } from "motion/react";

/**
 * Honours the OS "reduce motion" setting for every animation in the tree.
 * Transforms and layout shifts are dropped; opacity fades still run, so state
 * changes stay legible to someone who has asked for less movement.
 *
 * `children` is passed through untouched, so Server Components below this
 * boundary keep rendering on the server.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
