export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * The whole app degrades gracefully when Supabase is not configured: progress
 * stays in localStorage and the wall uses an in-memory store. This lets the
 * site run from a fresh clone with no credentials.
 */
export const supabaseEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000"
  );
}
