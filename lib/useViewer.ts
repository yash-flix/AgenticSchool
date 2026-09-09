"use client";

import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { browserSupabase } from "./supabase/client";
import { supabaseEnabled } from "./supabase/config";

export type Viewer = {
  id: string;
  name: string;
  handle: string | null;
  avatar: string | null;
} | null;

/**
 * Client-side session. Reading it here rather than on the server keeps the
 * marketing pages statically rendered while still showing a real account state.
 */
export function useViewer() {
  const [viewer, setViewer] = useState<Viewer>(null);
  const [checked, setChecked] = useState(!supabaseEnabled);

  useEffect(() => {
    const supabase = browserSupabase();
    if (!supabase) return;

    // Fires immediately with the stored session, then on every change.
    const { data } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
      const u = session?.user;
      setViewer(
        u
          ? {
              id: u.id,
              name:
                (u.user_metadata?.full_name as string) ??
                (u.user_metadata?.name as string) ??
                u.email ??
                "Member",
              handle:
                (u.user_metadata?.user_name as string) ??
                (u.user_metadata?.preferred_username as string) ??
                null,
              avatar: (u.user_metadata?.avatar_url as string) ?? null,
            }
          : null
      );
        setChecked(true);
      }
    );

    return () => data.subscription.unsubscribe();
  }, []);

  return { viewer, checked, enabled: supabaseEnabled };
}
