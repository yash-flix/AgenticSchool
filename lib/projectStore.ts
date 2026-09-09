import type { CommunityProject, NewProject } from "./community";
import { serverSupabase } from "./supabase/server";
import { supabaseEnabled } from "./supabase/config";

/**
 * Projects live in Supabase when it is configured. Without credentials the app
 * falls back to this in-memory list so a fresh clone still runs end to end.
 * Anything written to memory disappears when the server restarts.
 */
const memory: CommunityProject[] = [];

type Row = {
  id: string;
  title: string;
  tagline: string;
  author: string;
  repo_url: string;
  demo_url: string | null;
  stack: string[];
  stage: string;
  created_at: string;
};

function fromRow(r: Row): CommunityProject {
  return {
    id: r.id,
    title: r.title,
    tagline: r.tagline,
    author: r.author,
    repoUrl: r.repo_url,
    demoUrl: r.demo_url ?? undefined,
    stack: r.stack ?? [],
    stage: r.stage,
    createdAt: r.created_at,
  };
}

export async function listProjects(): Promise<CommunityProject[]> {
  if (!supabaseEnabled) {
    return [...memory].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  const supabase = await serverSupabase();
  const { data, error } = await supabase!
    .from("projects")
    .select("id,title,tagline,author,repo_url,demo_url,stack,stage,created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(120);

  if (error) {
    console.error("listProjects failed:", error.message);
    return [];
  }
  return (data as Row[]).map(fromRow);
}

export async function createProject(
  input: NewProject,
  userId: string
): Promise<CommunityProject> {
  if (!supabaseEnabled) {
    const project: CommunityProject = {
      id: `${userId}-${Date.now().toString(36)}`,
      title: input.title.trim(),
      tagline: input.tagline.trim(),
      author: input.author.trim(),
      repoUrl: input.repoUrl.trim(),
      demoUrl: input.demoUrl?.trim() || undefined,
      stack: input.stack,
      stage: input.stage,
      createdAt: new Date().toISOString(),
    };
    memory.unshift(project);
    return project;
  }

  const supabase = await serverSupabase();
  const { data, error } = await supabase!
    .from("projects")
    .insert({
      user_id: userId,
      title: input.title.trim(),
      tagline: input.tagline.trim(),
      author: input.author.trim(),
      repo_url: input.repoUrl.trim(),
      demo_url: input.demoUrl?.trim() || null,
      stack: input.stack,
      stage: input.stage,
    })
    .select("id,title,tagline,author,repo_url,demo_url,stack,stage,created_at")
    .single();

  if (error) throw new Error(error.message);
  return fromRow(data as Row);
}

/** One report per person per project; three hide it. Enforced in the database. */
export async function reportProject(projectId: string, userId: string) {
  if (!supabaseEnabled) return { ok: true, stored: false };

  const supabase = await serverSupabase();
  const { error } = await supabase!
    .from("project_reports")
    .insert({ project_id: projectId, user_id: userId });

  if (error && !error.message.includes("duplicate")) {
    throw new Error(error.message);
  }
  return { ok: true, stored: true };
}
