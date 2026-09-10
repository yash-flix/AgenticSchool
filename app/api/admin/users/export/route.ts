import { NextResponse } from "next/server";
import { adminOrNull } from "@/lib/admin";
import { listUsers } from "@/lib/crm";

export const dynamic = "force-dynamic";

const HEADERS = [
  "name", "handle", "email", "provider", "role",
  "signed_up", "courses_completed", "projects_posted", "last_active",
];

/** RFC 4180: quote everything, double any embedded quote. */
function cell(value: unknown) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

export async function GET() {
  const admin = await adminOrNull();
  if (!admin) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  const users = await listUsers();
  const rows = users.map((u) =>
    [
      u.name, u.handle, u.email, u.provider, u.role,
      u.createdAt, u.completed, u.projects, u.lastActive,
    ].map(cell).join(",")
  );

  const csv = [HEADERS.join(","), ...rows].join("\r\n");
  const stamp = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="agent-school-users-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
