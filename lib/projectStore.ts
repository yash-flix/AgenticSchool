import type { CommunityProject, NewProject } from "./community";

/**
 * The seam where a real database goes.
 *
 * Right now this is a module-level array, which means submissions live only in
 * the running server process and vanish on restart. That is deliberate: it
 * keeps the submission flow, validation, and UI honest and testable before a
 * vendor is chosen. Swapping this file for Postgres, Supabase, or Convex should
 * not require touching the route handler or any component.
 */
export interface ProjectStore {
  list(): Promise<CommunityProject[]>;
  create(input: NewProject, authorId: string): Promise<CommunityProject>;
}

const memory: CommunityProject[] = [];

export const projectStore: ProjectStore = {
  async list() {
    return [...memory].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
  },

  async create(input, authorId) {
    const project: CommunityProject = {
      id: `${authorId}-${Date.now().toString(36)}`,
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
  },
};
