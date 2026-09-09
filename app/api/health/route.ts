import { NextResponse } from "next/server";
import { projectRef, supabaseEnabled } from "@/lib/supabase/config";
import { serverSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const TABLES = ["profiles", "projects", "course_progress", "project_reports"];

/** Diagnostic for setup: is Supabase reachable, and has the schema been run? */
export async function GET() {
  if (!supabaseEnabled) {
    return NextResponse.json({
      configured: false,
      hint: "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local",
    });
  }

  const supabase = await serverSupabase();
  const tables: Record<string, string> = {};

  for (const table of TABLES) {
    const { error } = await supabase!
      .from(table)
      .select("*", { count: "exact", head: true });
    tables[table] = error ? error.message : "ok";
  }

  const schemaReady = Object.values(tables).every((v) => v === "ok");

  return NextResponse.json({
    configured: true,
    projectRef: projectRef(),
    schemaReady,
    tables,
    callbackUrl: `https://${projectRef()}.supabase.co/auth/v1/callback`,
  });
}
