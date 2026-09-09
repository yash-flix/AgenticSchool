"use client";

import { useProgress } from "@/lib/useProgress";

export default function MarkDone({ slug }: { slug: string }) {
  const { done, ready, toggle } = useProgress();
  const complete = ready && done.includes(slug);

  return (
    <button
      onClick={() => toggle(slug)}
      aria-pressed={complete}
      className={`rounded-full border px-5 py-2.5 text-[14px] font-medium transition-colors ${
        complete
          ? "border-moss/50 bg-moss/10 text-moss"
          : "border-line-2 text-ink hover:bg-panel"
      }`}
    >
      {complete ? "✓ Marked as done" : "Mark as done"}
    </button>
  );
}
