import { NextResponse } from "next/server";
import { courses } from "@/lib/courses";
import { supabaseEnabled } from "@/lib/supabase/config";
import { currentUser, serverSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const valid = new Set(courses.map((c) => c.slug));
const clean = (v: unknown) =>
  Array.isArray(v) ? v.filter((s): s is string => valid.has(s as string)) : [];

export async function GET() {
  const user = await currentUser();
  if (!supabaseEnabled || !user) {
    return NextResponse.json({ done: [], signedIn: false });
  }

  const supabase = await serverSupabase();
  const { data, error } = await supabase!
    .from("course_progress")
    .select("course_slug")
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ done: [], signedIn: true, error: error.message });
  }
  return NextResponse.json({
    done: data.map((r) => r.course_slug as string),
    signedIn: true,
  });
}

export async function POST(request: Request) {
  const user = await currentUser();
  if (!supabaseEnabled || !user) {
    return NextResponse.json({ signedIn: false }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    add?: unknown;
    remove?: unknown;
  };
  const add = clean(body.add);
  const remove = clean(body.remove);
  const supabase = await serverSupabase();

  if (add.length > 0) {
    const { error } = await supabase!
      .from("course_progress")
      .upsert(
        add.map((slug) => ({ user_id: user.id, course_slug: slug })),
        { onConflict: "user_id,course_slug" }
      );
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  if (remove.length > 0) {
    const { error } = await supabase!
      .from("course_progress")
      .delete()
      .eq("user_id", user.id)
      .in("course_slug", remove);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ signedIn: true, ok: true });
}
