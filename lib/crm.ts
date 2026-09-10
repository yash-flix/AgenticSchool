import { courses } from "./courses";
import { serverSupabase } from "./supabase/server";

export type CrmUser = {
  id: string;
  handle: string | null;
  name: string;
  email: string | null;
  provider: string | null;
  role: string;
  createdAt: string;
  completed: number;
  projects: number;
  lastActive: string | null;
};

export type Metrics = {
  users: number;
  admins: number;
  withProgress: number;
  completions: number;
  finished: number;
  projects: number;
  avgCompleted: number;
  signupsByDay: { day: string; count: number }[];
  perCourse: { n: string; title: string; count: number }[];
};

type ProfileRow = {
  id: string;
  handle: string | null;
  display_name: string | null;
  email: string | null;
  provider: string | null;
  role: string;
  created_at: string;
};
type ProgressRow = { user_id: string; course_slug: string; completed_at: string };
type ProjectRow = { user_id: string; created_at: string };

/**
 * One read per table, joined in memory. At this scale that is faster than three
 * round trips with joins, and it keeps every query inside the RLS policies
 * rather than reaching for a service key.
 */
async function load() {
  const supabase = await serverSupabase();
  if (!supabase) return null;

  const [profiles, progress, projects] = await Promise.all([
    supabase
      .from("profiles")
      .select("id,handle,display_name,email,provider,role,created_at")
      .order("created_at", { ascending: false }),
    supabase.from("course_progress").select("user_id,course_slug,completed_at"),
    supabase.from("projects").select("user_id,created_at"),
  ]);

  const error = profiles.error ?? progress.error ?? projects.error;
  if (error) throw new Error(error.message);

  return {
    profiles: (profiles.data ?? []) as ProfileRow[],
    progress: (progress.data ?? []) as ProgressRow[],
    projects: (projects.data ?? []) as ProjectRow[],
  };
}

export async function listUsers(): Promise<CrmUser[]> {
  const data = await load();
  if (!data) return [];

  const done = new Map<string, ProgressRow[]>();
  data.progress.forEach((r) => {
    const list = done.get(r.user_id) ?? [];
    list.push(r);
    done.set(r.user_id, list);
  });

  const posted = new Map<string, number>();
  data.projects.forEach((r) =>
    posted.set(r.user_id, (posted.get(r.user_id) ?? 0) + 1)
  );

  return data.profiles.map((p) => {
    const rows = done.get(p.id) ?? [];
    const last = rows
      .map((r) => r.completed_at)
      .sort()
      .at(-1);

    return {
      id: p.id,
      handle: p.handle,
      name: p.display_name || p.handle || "Member",
      email: p.email,
      provider: p.provider,
      role: p.role,
      createdAt: p.created_at,
      completed: rows.length,
      projects: posted.get(p.id) ?? 0,
      lastActive: last ?? null,
    };
  });
}

export async function metrics(): Promise<Metrics> {
  const data = await load();
  if (!data) {
    return {
      users: 0, admins: 0, withProgress: 0, completions: 0, finished: 0,
      projects: 0, avgCompleted: 0, signupsByDay: [], perCourse: [],
    };
  }

  const active = new Set(data.progress.map((r) => r.user_id));

  // Completions per user, so "finished the path" is countable.
  const perUser = new Map<string, number>();
  data.progress.forEach((r) =>
    perUser.set(r.user_id, (perUser.get(r.user_id) ?? 0) + 1)
  );

  const perSlug = new Map<string, number>();
  data.progress.forEach((r) =>
    perSlug.set(r.course_slug, (perSlug.get(r.course_slug) ?? 0) + 1)
  );

  // Thirty dated buckets, including the empty ones — a sparkline with gaps
  // silently skipped would misread as steady signup.
  const days: { day: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setUTCHours(0, 0, 0, 0);
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    days.push({
      day: key,
      count: data.profiles.filter((p) => p.created_at.slice(0, 10) === key)
        .length,
    });
  }

  return {
    users: data.profiles.length,
    admins: data.profiles.filter((p) => p.role === "admin").length,
    withProgress: active.size,
    completions: data.progress.length,
    finished: [...perUser.values()].filter((n) => n >= courses.length).length,
    projects: data.projects.length,
    avgCompleted: active.size
      ? Math.round((data.progress.length / active.size) * 10) / 10
      : 0,
    signupsByDay: days,
    perCourse: courses.map((c) => ({
      n: c.n,
      title: c.shortTitle,
      count: perSlug.get(c.slug) ?? 0,
    })),
  };
}
