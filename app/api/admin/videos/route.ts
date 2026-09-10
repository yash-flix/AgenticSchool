import { NextResponse } from "next/server";
import { adminOrNull } from "@/lib/admin";
import { serverSupabase } from "@/lib/supabase/server";
import { fetchYouTubeMeta, parseYouTubeId, VIDEO_CATEGORIES } from "@/lib/youtube";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const admin = await adminOrNull();
  if (!admin) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    url?: string;
    category?: string;
    title?: string;
    note?: string;
  };

  const videoId = parseYouTubeId(body.url ?? "");
  if (!videoId) {
    return NextResponse.json(
      { error: "That does not look like a YouTube link." },
      { status: 422 }
    );
  }

  const category = (body.category ?? "").trim();
  if (!VIDEO_CATEGORIES.includes(category as (typeof VIDEO_CATEGORIES)[number])) {
    return NextResponse.json({ error: "Pick a category." }, { status: 422 });
  }

  // Paste a bare link and the title fills itself in; typing one wins over it.
  const typed = (body.title ?? "").trim();
  const meta = typed ? { title: typed, channel: null } : await fetchYouTubeMeta(videoId);
  const title = typed || meta.title;
  if (!title) {
    return NextResponse.json(
      { error: "YouTube did not return a title. Type one and try again." },
      { status: 422 }
    );
  }

  const supabase = await serverSupabase();
  const { data, error } = await supabase!
    .from("curated_videos")
    .insert({
      video_id: videoId,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      title,
      channel: meta.channel,
      category,
      note: (body.note ?? "").trim() || null,
      created_by: admin.id,
    })
    .select("id")
    .single();

  if (error) {
    const duplicate = error.code === "23505";
    return NextResponse.json(
      { error: duplicate ? "That video is already on the list." : error.message },
      { status: duplicate ? 409 : 500 }
    );
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}
