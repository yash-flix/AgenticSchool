/**
 * One light-to-dark step per stage, in path order. Shared so every stage
 * visual on the site speaks the same colour language: the hours breakdown and
 * your progress through those same stages use identical tones.
 */
export const STAGE_RAMP = ["bg-line-2", "bg-muted", "bg-ink-2", "bg-ink"] as const;

/** The unfilled track behind any progress mark. */
export const TRACK = "bg-line-2";
