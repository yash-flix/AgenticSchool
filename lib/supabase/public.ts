import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, supabaseEnabled } from "./config";

let cached: ReturnType<typeof createClient> | null = null;

/**
 * Anonymous, cookie-free client for public reads. Reading through the
 * cookie-bound server client would mark the page dynamic; this one lets the
 * home page stay prerendered and refresh on a revalidate interval instead.
 */
export function publicSupabase() {
  if (!supabaseEnabled) return null;
  cached ??= createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
