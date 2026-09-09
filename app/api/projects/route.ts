import { NextResponse } from "next/server";
import { validateProject, type NewProject } from "@/lib/community";
import { projectStore } from "@/lib/projectStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await projectStore.list();
  return NextResponse.json({
    projects,
    // Until a database is wired up, say so plainly rather than pretending.
    persisted: false,
  });
}

export async function POST(request: Request) {
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

  // Replace with the signed-in user's id once auth exists. Anonymous
  // submissions are accepted for now so the flow can be exercised end to end.
  const authorId = "anon";
  const project = await projectStore.create(body as NewProject, authorId);

  return NextResponse.json({ project, persisted: false }, { status: 201 });
}
