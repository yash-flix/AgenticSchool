"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CONTINUITY_LABEL, CONTINUITY_SPRING } from "@/lib/motion";
import { useViewer } from "@/lib/useViewer";
import AuthButton from "./AuthButton";
import {
  projectStages,
  stackOptions,
  validateProject,
  type CommunityProject,
  type NewProject,
} from "@/lib/community";

const empty: NewProject = {
  title: "",
  tagline: "",
  author: "",
  repoUrl: "",
  demoUrl: "",
  stack: [],
  stage: "",
};

export default function CommunityWall({
  initialProjects,
  persisted,
}: {
  initialProjects: CommunityProject[];
  persisted: boolean;
}) {
  const { viewer, enabled } = useViewer();
  const needsAuth = enabled && !viewer;

  const [projects, setProjects] = useState<CommunityProject[]>(initialProjects);
  const [reported, setReported] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<NewProject>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const set = <K extends keyof NewProject>(k: K, v: NewProject[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleStack = (s: string) =>
    setForm((f) => ({
      ...f,
      stack: f.stack.includes(s)
        ? f.stack.filter((x) => x !== s)
        : [...f.stack, s],
    }));

  async function report(id: string) {
    setReported((r) => [...r, id]);
    try {
      await fetch(`/api/projects/${id}/report`, { method: "POST" });
    } catch {
      // Nothing useful to tell the reporter; the button already changed state.
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateProject(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSending(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 422) {
        setErrors((await res.json()).errors ?? {});
        return;
      }
      const data = await res.json();
      setProjects((p) => [data.project, ...p]);
      setForm(empty);
      setOpen(false);
    } catch {
      setErrors({ repoUrl: "Could not reach the server. Try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="label">Community wall</span>
          <h2 className="display-2 mt-5 max-w-[16ch]">
            Built something? <span className="em-serif">Put it up.</span>
          </h2>
        </div>
        {needsAuth ? (
          <AuthButton />
        ) : (
          <motion.button
            layout
            transition={CONTINUITY_SPRING}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setOpen((v) => !v);
              if (viewer && !form.author) {
                set("author", viewer.handle ? `@${viewer.handle}` : viewer.name);
              }
            }}
            className="btn btn-solid"
            aria-expanded={open}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={open ? "close" : "submit"}
                layout
                variants={CONTINUITY_LABEL}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={CONTINUITY_SPRING}
                className="whitespace-nowrap"
              >
                {open ? "Close form" : "Submit a project"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        )}
      </div>

      <p className="lede mt-6 max-w-[58ch]">
        Anyone working through the path can list what they built, so the next
        person can read the code instead of starting from a blank file. Public
        repository, one sentence on what it does, and the stage it came out of.
      </p>

      {!persisted && (
        <p className="mt-6 flex items-start gap-3 rounded-xl border border-amber/35 bg-amber/8 p-4 text-[13.5px] leading-relaxed text-ink-2">
          <span className="mt-0.5 font-mono text-[10px] tracking-[0.15em] text-amber uppercase">
            Local
          </span>
          Supabase credentials are not set, so the wall is running against an
          in-memory store. Submissions work end to end but vanish on restart.
          Add the keys from <code className="font-mono">.env.example</code> to
          switch it on.
        </p>
      )}

      {needsAuth && (
        <p className="mt-6 rounded-xl border border-line bg-panel/70 p-4 text-[13.5px] leading-relaxed text-ink-2">
          Sign in with GitHub or Google to post. It also syncs your course
          progress across devices.
        </p>
      )}

      <AnimatePresence initial={false}>
        {open && (
          <motion.form
            key="submit-form"
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={CONTINUITY_SPRING}
            onSubmit={submit}
            className="card mt-8 overflow-hidden p-7 hover:translate-y-0 hover:shadow-[var(--shadow-card)]"
            noValidate
          >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="Project name"
              error={errors.title}
              value={form.title}
              onChange={(v) => set("title", v)}
              placeholder="Inbox triage crew"
            />
            <Field
              label="Your name or handle"
              error={errors.author}
              value={form.author}
              onChange={(v) => set("author", v)}
              placeholder="@yourhandle"
            />
            <div className="sm:col-span-2">
              <Field
                label="One sentence on what it does"
                error={errors.tagline}
                value={form.tagline}
                onChange={(v) => set("tagline", v)}
                placeholder="Sorts a shared inbox and drafts replies a human approves."
              />
            </div>
            <Field
              label="Repository"
              error={errors.repoUrl}
              value={form.repoUrl}
              onChange={(v) => set("repoUrl", v)}
              placeholder="https://github.com/you/project"
            />
            <Field
              label="Live demo (optional)"
              error={errors.demoUrl}
              value={form.demoUrl ?? ""}
              onChange={(v) => set("demoUrl", v)}
              placeholder="https://your-demo.app"
            />
          </div>

          <fieldset className="mt-7 border-t border-line pt-6">
            <legend className="label">What you used</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {stackOptions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleStack(s)}
                  className={`rounded-full border px-3.5 py-1.5 font-mono text-[10.5px] transition-colors ${
                    form.stack.includes(s)
                      ? "border-ink bg-ink text-canvas"
                      : "border-line bg-paper text-muted hover:border-ink hover:text-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {errors.stack && <Err>{errors.stack}</Err>}
          </fieldset>

          <fieldset className="mt-7 border-t border-line pt-6">
            <legend className="label">Which stage it came out of</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {projectStages.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set("stage", s)}
                  className={`rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors ${
                    form.stage === s
                      ? "border-ink bg-ink text-canvas"
                      : "border-line bg-paper text-ink-2 hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {errors.stage && <Err>{errors.stage}</Err>}
          </fieldset>

          <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
            <button
              type="submit"
              disabled={sending}
              className="btn btn-solid disabled:opacity-55"
            >
              {sending ? "Posting…" : "Post to the wall"}
            </button>
            <span className="text-[13px] text-muted">
              Goes live immediately. Anyone can report it if it does not belong.
            </span>
          </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="mt-12">
        {projects.length === 0 ? (
          <div className="card grid place-items-center px-6 py-20 text-center hover:translate-y-0 hover:shadow-[var(--shadow-card)]">
            <span className="ghost-num text-[64px]">00</span>
            <p className="display-4 mt-6">Nothing on the wall yet</p>
            <p className="mt-3 max-w-[42ch] text-[14.5px] leading-[1.6] text-ink-2">
              Be the first. A half-working agent with an honest README helps more
              people than a polished demo nobody can read.
            </p>
            <button onClick={() => setOpen(true)} className="btn btn-ghost mt-7">
              Submit the first one
            </button>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
            {projects.map((p) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={CONTINUITY_SPRING}
                className="card flex flex-col p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="label text-ink">{p.stage}</span>
                </div>
                <h3 className="display-4 mt-3.5">{p.title}</h3>
                <p className="mt-2 font-mono text-[11px] text-muted">
                  {p.author}
                </p>
                <p className="mt-3.5 text-[14.5px] leading-[1.6] text-ink-2">
                  {p.tagline}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center gap-2 pt-6">
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost btn-sm"
                  >
                    Code ↗
                  </a>
                  {p.demoUrl && (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-ghost btn-sm"
                    >
                      Demo ↗
                    </a>
                  )}
                  <button
                    onClick={() => report(p.id)}
                    disabled={reported.includes(p.id)}
                    className="ml-auto font-mono text-[9.5px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-flame disabled:text-moss"
                  >
                    {reported.includes(p.id) ? "Reported" : "Report"}
                  </button>
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

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-3 w-full rounded-lg border bg-canvas px-3.5 py-2.5 text-[14.5px] transition-colors outline-none placeholder:text-muted/70 focus:border-ink ${
          error ? "border-flame" : "border-line"
        }`}
      />
      {error && <Err>{error}</Err>}
    </label>
  );
}

function Err({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-2 block font-mono text-[10.5px] tracking-[0.06em] text-flame">
      {children}
    </span>
  );
}
