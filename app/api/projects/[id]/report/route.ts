import { NextResponse } from "next/server";
import { reportProject } from "@/lib/projectStore";
import { supabaseEnabled } from "@/lib/supabase/config";
import { currentUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await currentUser();

  if (supabaseEnabled && !user) {
    return NextResponse.json(
      { error: "Sign in to report a project." },
      { status: 401 }
    );
  }

  try {
    const result = await reportProject(id, user?.id ?? "anon");
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Could not file the report." },
      { status: 500 }
    );
  }
}
