import { publicSupabase } from "./supabase/public";
import { serverSupabase } from "./supabase/server";
import { supabaseEnabled } from "./supabase/config";
import type { CuratedVideo } from "./youtube";

const COLUMNS =
  "id,video_id,url,title,channel,category,note,position,published,created_at";

type Row = {
  id: string;
  video_id: string;
  url: string;
  title: string;
  channel: string | null;
  category: string;
  note: string | null;
  position: number;
  published: boolean;
  created_at: string;
};

const fromRow = (r: Row): CuratedVideo => ({
  id: r.id,
  videoId: r.video_id,
  url: r.url,
  title: r.title,
  channel: r.channel,
  category: r.category,
  note: r.note,
  position: r.position,
  published: r.published,
  createdAt: r.created_at,
});

/**
 * Public read. RLS returns only published rows to everyone except an admin,
 * so this same call powers the admin list without a second code path.
 */
export async function listCurated(
  { includeDrafts = false } = {}
): Promise<CuratedVideo[]> {
  if (!supabaseEnabled) return [];

  const supabase = await serverSupabase();
  let query = supabase!
    .from("curated_videos")
    .select(COLUMNS)
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });

  if (!includeDrafts) query = query.eq("published", true);

  const { data, error } = await query;
  if (error) {
    console.error("listCurated failed:", error.message);
    return [];
  }
  return (data as Row[]).map(fromRow);
}

/**
 * Public read for the marketing pages. Anonymous and cookie-free, so the page
 * calling it stays statically prerenderable; RLS already limits this to
 * published rows.
 */
export async function listPublishedCurated(): Promise<CuratedVideo[]> {
  const supabase = publicSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("curated_videos")
    .select(COLUMNS)
    .eq("published", true)
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("listPublishedCurated failed:", error.message);
    return [];
  }
  return (data as unknown as Row[]).map(fromRow);
}

/** Groups into the category order the admin UI presents, empties dropped. */
export function groupByCategory(videos: CuratedVideo[]) {
  const map = new Map<string, CuratedVideo[]>();
  videos.forEach((v) => {
    const list = map.get(v.category) ?? [];
    list.push(v);
    map.set(v.category, list);
  });
  return map;
}
