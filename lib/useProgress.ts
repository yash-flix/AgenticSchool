"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "agent-school.progress.v1";
const EMPTY: string[] = [];

/** Module-level cache so every consumer shares one stable snapshot reference. */
let snapshot: string[] = EMPTY;
let hydrated = false;
let syncing = false;
const listeners = new Set<() => void>();

function load(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persist(next: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage blocked, keep the value in memory for this session */
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(fn: () => void) {
  if (!hydrated) {
    hydrated = true;
    snapshot = load();
  }
  listeners.add(fn);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    snapshot = load();
    emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

function commit(next: string[]) {
  snapshot = next;
  persist(next);
  emit();
}

async function push(add: string[], remove: string[]) {
  if (!syncing) return;
  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ add, remove }),
    });
  } catch {
    // Offline or signed out. The local copy is still correct; the next sync
    // on load merges it back up.
  }
}

/**
 * Called once after mount. Merges whatever is in this browser with whatever the
 * account already has, so signing in never costs someone their existing ticks.
 */
export async function syncProgress() {
  try {
    const res = await fetch("/api/progress");
    const data = (await res.json()) as { done?: string[]; signedIn?: boolean };
    if (!data.signedIn) return;

    syncing = true;
    if (!hydrated) {
      hydrated = true;
      snapshot = load();
    }

    const remote = data.done ?? [];
    const merged = Array.from(new Set([...snapshot, ...remote]));
    const missingRemotely = merged.filter((s) => !remote.includes(s));

    if (merged.length !== snapshot.length) commit(merged);
    else persist(merged);

    if (missingRemotely.length > 0) await push(missingRemotely, []);
  } catch {
    // Supabase not configured, or the request failed. Stay local-only.
  }
}

export function useProgress() {
  const done = useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => EMPTY
  );
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const toggle = useCallback((slug: string) => {
    const has = snapshot.includes(slug);
    commit(has ? snapshot.filter((s) => s !== slug) : [...snapshot, slug]);
    void push(has ? [] : [slug], has ? [slug] : []);
  }, []);

  const reset = useCallback(() => {
    const previous = snapshot;
    commit(EMPTY);
    void push([], previous);
  }, []);

  return { done, ready, toggle, reset };
}
