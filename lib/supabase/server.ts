import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, supabaseEnabled } from "./config";

/** Server-side client bound to the request cookies, so RLS sees the user. */
export async function serverSupabase() {
  if (!supabaseEnabled) return null;
  const store = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll: () => store.getAll(),
      setAll(list) {
        try {
          list.forEach(({ name, value, options }) =>
            store.set(name, value, options)
          );
        } catch {
          // Called from a Server Component: middleware refreshes the session.
        }
      },
    },
  });
}

export async function currentUser() {
  const supabase = await serverSupabase();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
