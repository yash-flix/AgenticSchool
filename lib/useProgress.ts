"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "agent-school.progress.v1";
const EMPTY: string[] = [];

/** Module-level cache so every consumer shares one stable snapshot reference. */
let snapshot: string[] = EMPTY;
let hydrated = false;
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
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage blocked, keep the value in memory for this session */
  }
  emit();
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
    commit(
      snapshot.includes(slug)
        ? snapshot.filter((s) => s !== slug)
        : [...snapshot, slug]
    );
  }, []);

  const reset = useCallback(() => {
    snapshot = EMPTY;
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* nothing to clear */
    }
    emit();
  }, []);

  return { done, ready, toggle, reset };
}
