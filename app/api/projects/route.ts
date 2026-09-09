import { NextResponse } from "next/server";
import { validateProject, type NewProject } from "@/lib/community";
import { createProject, listProjects } from "@/lib/projectStore";
import { supabaseEnabled } from "@/lib/supabase/config";
import { currentUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    projects: await listProjects(),
    persisted: supabaseEnabled,
  });
}

export async function POST(request: Request) {
  const user = await currentUser();

  // With Supabase wired up, posting requires an account. Without it, the wall
  // stays open so the flow can still be exercised locally.
  if (supabaseEnabled && !user) {
    return NextResponse.json(
      { error: "Sign in to post a project." },
      { status: 401 }
    );
  }

  let body: Partial<NewProject>;
  try {
    body = (await request.json()) as Partial<NewProject>;
  } catch {
    return NextResponse.json({ error: "Expected JSON." }, { status: 400 });
  }

  const errors = validateProject(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  try {
    const project = await createProject(body as NewProject, user?.id ?? "anon");
    return NextResponse.json(
      { project, persisted: supabaseEnabled },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Could not save the project." },
      { status: 500 }
    );
  }
}
