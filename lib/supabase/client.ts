"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, supabaseEnabled } from "./config";

let cached: ReturnType<typeof createBrowserClient> | null = null;

export function browserSupabase() {
  if (!supabaseEnabled) return null;
  cached ??= createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  return cached;
}
