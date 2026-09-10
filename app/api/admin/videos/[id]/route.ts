import { NextResponse } from "next/server";
import { adminOrNull } from "@/lib/admin";
import { serverSupabase } from "@/lib/supabase/server";
import { VIDEO_CATEGORIES } from "@/lib/youtube";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const admin = await adminOrNull();
  if (!admin) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as {
    published?: boolean;
    category?: string;
    note?: string;
    title?: string;
    position?: number;
  };

  // Whitelist: the client never gets to name a column.
  const patch: Record<string, unknown> = {};
  if (typeof body.published === "boolean") patch.published = body.published;
  if (typeof body.position === "number") patch.position = body.position;
  if (typeof body.title === "string" && body.title.trim()) {
    patch.title = body.title.trim();
  }
  if (typeof body.note === "string") patch.note = body.note.trim() || null;
  if (typeof body.category === "string") {
    if (!VIDEO_CATEGORIES.includes(body.category as (typeof VIDEO_CATEGORIES)[number])) {
      return NextResponse.json({ error: "Unknown category." }, { status: 422 });
    }
    patch.category = body.category;
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "Nothing to change." }, { status: 400 });
  }

  const supabase = await serverSupabase();
  const { error } = await supabase!.from("curated_videos").update(patch).eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  const admin = await adminOrNull();
  if (!admin) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  const { id } = await params;
  const supabase = await serverSupabase();
  const { error } = await supabase!.from("curated_videos").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
