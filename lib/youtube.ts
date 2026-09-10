/** The categories a curated video can be filed under. Order drives the UI. */
export const VIDEO_CATEGORIES = [
  "Fundamentals",
  "Frameworks",
  "Tools & MCP",
  "Retrieval & memory",
  "Production",
  "Build-alongs",
] as const;

export type VideoCategory = (typeof VIDEO_CATEGORIES)[number];

export type CuratedVideo = {
  id: string;
  videoId: string;
  url: string;
  title: string;
  channel: string | null;
  category: string;
  note: string | null;
  position: number;
  published: boolean;
  createdAt: string;
};

/**
 * Accepts every shape a person actually pastes: watch links, share links,
 * embeds, shorts, live, and any of them carrying playlist or timestamp noise.
 */
export function parseYouTubeId(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;

  // A bare id, pasted on its own.
  if (/^[\w-]{11}$/.test(raw)) return raw;

  let url: URL;
  try {
    url = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "");
  const seg = url.pathname.split("/").filter(Boolean);

  if (host === "youtu.be") return valid(seg[0]);
  if (!host.endsWith("youtube.com") && !host.endsWith("youtube-nocookie.com")) {
    return null;
  }
  if (url.searchParams.has("v")) return valid(url.searchParams.get("v"));
  if (["embed", "shorts", "live", "v"].includes(seg[0])) return valid(seg[1]);
  return null;
}

function valid(id: string | null | undefined) {
  return id && /^[\w-]{11}$/.test(id) ? id : null;
}

/**
 * oEmbed gives us the real title and channel with no API key and no quota,
 * so pasting a bare link is enough. A failure here is not fatal: the caller
 * falls back to whatever the admin typed.
 */
export async function fetchYouTubeMeta(videoId: string): Promise<{
  title: string | null;
  channel: string | null;
}> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      { signal: AbortSignal.timeout(6000) }
    );
    if (!res.ok) return { title: null, channel: null };
    const data = (await res.json()) as {
      title?: string;
      author_name?: string;
    };
    return { title: data.title ?? null, channel: data.author_name ?? null };
  } catch {
    return { title: null, channel: null };
  }
}
