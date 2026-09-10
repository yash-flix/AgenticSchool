import { NextResponse } from "next/server";
import { serverSupabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await serverSupabase();
  await supabase?.auth.signOut();

  // Only ever a same-site path, so this cannot be turned into an open redirect.
  const form = await request.formData().catch(() => null);
  const next = String(form?.get("next") ?? "");
  const target = /^\/[^/\\]/.test(next) ? next : "/community";

  return NextResponse.redirect(new URL(target, request.url), { status: 303 });
}
