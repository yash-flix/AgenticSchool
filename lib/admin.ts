import { redirect } from "next/navigation";
import { supabaseEnabled } from "./supabase/config";
import { currentUser, serverSupabase } from "./supabase/server";

export type Admin = {
  id: string;
  email: string | null;
  name: string;
};

/**
 * Resolves the signed-in admin, or null. The role lives in the database and
 * every admin-only table is gated by an RLS policy calling is_admin(), so this
 * check decides what to *render* — it is not what protects the data.
 */
export async function adminOrNull(): Promise<Admin | null> {
  if (!supabaseEnabled) return null;

  const user = await currentUser();
  if (!user) return null;

  const supabase = await serverSupabase();
  const { data } = await supabase!
    .from("profiles")
    .select("role, email, display_name, handle")
    .eq("id", user.id)
    .maybeSingle();

  if (!data || data.role !== "admin") return null;

  return {
    id: user.id,
    email: (data.email as string) ?? user.email ?? null,
    name:
      (data.display_name as string) ||
      (data.handle as string) ||
      user.email ||
      "Admin",
  };
}

/**
 * For pages that must not render for anyone else. Signed in but not an admin
 * is a different situation from signed out, and saying so stops the login page
 * bouncing someone in a loop they cannot diagnose.
 */
export async function requireAdmin(): Promise<Admin> {
  const admin = await adminOrNull();
  if (admin) return admin;
  const user = supabaseEnabled ? await currentUser() : null;
  redirect(user ? "/admin/login?denied=1" : "/admin/login");
}
