"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CONTINUITY_SPRING } from "@/lib/motion";
import { noteKinds, type Note, type NoteKind } from "@/lib/notes";
import NoteCard from "./NoteCard";

type Props = {
  notes: Note[];
  /** slug → reading minutes, computed on the server from the MDX source. */
  minutes: Record<string, number>;
};

/**
 * Filterable list. Kinds with nothing in them still show as chips, greyed
 * out, so the taxonomy is visible before the content fills in.
 */
export default function NotesIndex({ notes, minutes }: Props) {
  const [kind, setKind] = useState<NoteKind | "all">("all");
  const visible = kind === "all" ? notes : notes.filter((n) => n.kind === kind);
  const count = (k: NoteKind) => notes.filter((n) => n.kind === k).length;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter by kind">
        <FilterChip active={kind === "all"} onClick={() => setKind("all")} n={notes.length}>
          Everything
        </FilterChip>
        {noteKinds.map((k) => (
          <FilterChip
            key={k.id}
            active={kind === k.id}
            disabled={count(k.id) === 0}
            onClick={() => setKind(k.id)}
            n={count(k.id)}
          >
            {k.plural}
          </FilterChip>
        ))}
      </div>

      <motion.ul layout transition={CONTINUITY_SPRING} className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((n, i) => (
            <motion.li
              key={n.slug}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={CONTINUITY_SPRING}
            >
              <NoteCard note={n} minutes={minutes[n.slug] ?? 1} index={i} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="mt-9 text-[14.5px] text-muted">Nothing here yet. It is coming.</p>
      )}
    </div>
  );
}

function FilterChip({
  active,
  disabled,
  onClick,
  n,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  n: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "border-ink bg-ink text-canvas"
          : "border-line-2 bg-paper text-ink-2 hover:border-ink hover:text-ink"
      }`}
    >
      {children}
      <span className={`font-mono text-[10.5px] tabular-nums ${active ? "text-canvas/60" : "text-muted"}`}>
        {n}
      </span>
    </button>
  );
}
