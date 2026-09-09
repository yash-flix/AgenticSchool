export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

/**
 * Supabase is retiring the legacy JWT `anon` key in favour of publishable keys
 * (`sb_publishable_...`). Accept either so an existing .env keeps working.
 */
export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";

export const supabaseEnabled = Boolean(
  SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY
);

/** The `abcdefgh` in `https://abcdefgh.supabase.co`. */
export function projectRef() {
  return SUPABASE_URL.replace(/^https?:\/\//, "").split(".")[0] ?? "";
}

export function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000"
  );
}
