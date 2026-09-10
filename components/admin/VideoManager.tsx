"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { thumb } from "@/lib/courses";
import { CONTINUITY_SPRING } from "@/lib/motion";
import { VIDEO_CATEGORIES, type CuratedVideo } from "@/lib/youtube";

export default function VideoManager({ videos }: { videos: CuratedVideo[] }) {
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [category, setCategory] = useState<string>(VIDEO_CATEGORIES[0]);
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [pending, setPending] = useState<string | null>(null);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const res = await fetch("/api/admin/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, category, note }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };

    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Could not add that video.");
      return;
    }
    setUrl("");
    setNote("");
    router.refresh();
  }

  async function patch(id: string, body: Record<string, unknown>) {
    setPending(id);
    await fetch(`/api/admin/videos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setPending(null);
    router.refresh();
  }

  async function remove(id: string, title: string) {
    if (!confirm(`Remove “${title}” from the wall?`)) return;
    setPending(id);
    await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
    setPending(null);
    router.refresh();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <form
        onSubmit={add}
        className="card h-fit p-6 hover:translate-y-0 hover:shadow-[var(--shadow-card)] lg:sticky lg:top-8"
      >
        <h2 className="label">Add a video</h2>

        <label className="mt-5 block">
          <span className="text-[13px] text-ink-2">YouTube link</span>
          <input
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=…"
            className="mt-2 w-full rounded-[10px] border border-line-2 bg-canvas px-3.5 py-2.5 text-[14px] outline-none focus:border-ink"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-[13px] text-ink-2">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full rounded-[10px] border border-line-2 bg-canvas px-3.5 py-2.5 text-[14px] outline-none focus:border-ink"
          >
            {VIDEO_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-4 block">
          <span className="text-[13px] text-ink-2">
            Note <span className="text-muted">(optional)</span>
          </span>
          <textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Why it is worth watching"
            className="mt-2 w-full resize-none rounded-[10px] border border-line-2 bg-canvas px-3.5 py-2.5 text-[14px] outline-none focus:border-ink"
          />
        </label>

        {error && (
          <p role="alert" className="mt-4 text-[13px] leading-[1.5] text-flame">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="btn btn-solid mt-5 w-full justify-center disabled:opacity-55"
        >
          {busy ? "Fetching from YouTube…" : "Add video"}
        </button>
      </form>

      <div>
        {videos.length === 0 ? (
          <div className="card grid place-items-center px-6 py-16 text-center hover:translate-y-0">
            <span className="ghost-num text-[56px]">00</span>
            <p className="display-4 mt-5">Nothing curated yet</p>
            <p className="mt-2.5 max-w-[40ch] text-[14px] leading-[1.6] text-ink-2">
              Paste a YouTube link on the left. It goes live on the home page
              straight away unless you unpublish it.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {videos.map((v) => (
                <motion.li
                  key={v.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={CONTINUITY_SPRING}
                  className={`card flex gap-4 p-4 hover:translate-y-0 hover:shadow-[var(--shadow-card)] ${
                    pending === v.id ? "opacity-55" : ""
                  }`}
                >
                  <Image
                    src={thumb(v.videoId)}
                    alt=""
                    width={112}
                    height={63}
                    className="h-[63px] w-[112px] shrink-0 rounded-[8px] object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                      <a
                        href={v.url}
                        target="_blank"
                        rel="noreferrer"
                        className="line-clamp-2 text-[14.5px] leading-[1.4] font-medium hover:underline"
                      >
                        {v.title}
                      </a>
                      {!v.published && (
                        <span className="shrink-0 rounded-full bg-panel px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] text-muted uppercase">
                          Draft
                        </span>
                      )}
                    </div>

                    <p className="mt-1 truncate font-mono text-[10.5px] text-muted">
                      {v.channel ?? "Unknown channel"}
                    </p>
                    {v.note && (
                      <p className="mt-1.5 line-clamp-1 text-[12.5px] text-ink-2">
                        {v.note}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <select
                        value={v.category}
                        onChange={(e) => patch(v.id, { category: e.target.value })}
                        className="rounded-full border border-line-2 bg-canvas px-2.5 py-1 font-mono text-[10px] outline-none focus:border-ink"
                      >
                        {VIDEO_CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => patch(v.id, { published: !v.published })}
                        className="label transition-colors hover:text-ink"
                      >
                        {v.published ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        onClick={() => remove(v.id, v.title)}
                        className="label ml-auto transition-colors hover:text-flame"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
