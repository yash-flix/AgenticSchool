"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { CONTINUITY_SPRING } from "@/lib/motion";
import type { CrmUser } from "@/lib/crm";

type Key = "name" | "createdAt" | "completed" | "projects";

const COLUMNS: { key: Key; label: string; numeric?: boolean }[] = [
  { key: "name", label: "Member" },
  { key: "createdAt", label: "Joined" },
  { key: "completed", label: "Progress" },
  { key: "projects", label: "Projects", numeric: true },
];

export default function UsersTable({
  users,
  totalCourses,
}: {
  users: CrmUser[];
  totalCourses: number;
}) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Key>("createdAt");
  const [asc, setAsc] = useState(false);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const found = needle
      ? users.filter((u) =>
          [u.name, u.handle, u.email].some((f) =>
            f?.toLowerCase().includes(needle)
          )
        )
      : users;

    return [...found].sort((a, b) => {
      const dir = asc ? 1 : -1;
      if (sort === "name") return dir * a.name.localeCompare(b.name);
      if (sort === "createdAt") return dir * a.createdAt.localeCompare(b.createdAt);
      return dir * (a[sort] - b[sort]);
    });
  }, [users, q, sort, asc]);

  function toggle(key: Key) {
    if (key === sort) setAsc((v) => !v);
    else {
      setSort(key);
      setAsc(key === "name");
    }
  }

  return (
    <div className="card overflow-hidden p-0 hover:translate-y-0 hover:shadow-[var(--shadow-card)]">
      <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, handle or email"
          className="min-w-0 flex-1 rounded-[9px] border border-line-2 bg-canvas px-3 py-2 text-[13.5px] outline-none focus:border-ink"
        />
        <span className="label whitespace-nowrap">
          {rows.length} of {users.length}
        </span>
      </div>

      {rows.length === 0 ? (
        <p className="px-5 py-16 text-center text-[14px] text-muted">
          {users.length === 0
            ? "Nobody has signed in yet."
            : "No member matches that search."}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                {COLUMNS.map((c) => (
                  <th
                    key={c.key}
                    className={`px-5 py-3 ${c.numeric ? "text-right" : ""}`}
                  >
                    <button
                      onClick={() => toggle(c.key)}
                      className="label transition-colors hover:text-ink"
                    >
                      {c.label}
                      <span
                        aria-hidden
                        className={`ml-1.5 inline-block ${
                          sort === c.key ? "text-flame" : "text-line-2"
                        }`}
                      >
                        {sort === c.key ? (asc ? "↑" : "↓") : "↕"}
                      </span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id} className="border-b border-line last:border-b-0">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-panel font-mono text-[10px] text-ink-2">
                        {u.name.slice(0, 1).toUpperCase()}
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-[14px]">{u.name}</span>
                          {u.role === "admin" && (
                            <span className="rounded-full bg-flame/12 px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] text-flame uppercase">
                              Admin
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block truncate font-mono text-[10.5px] text-muted">
                          {u.email ?? (u.handle ? `@${u.handle}` : "—")}
                        </span>
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 align-middle">
                    <span className="text-[13px] text-ink-2">
                      {new Date(u.createdAt).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    {u.provider && (
                      <span className="mt-0.5 block font-mono text-[10px] text-muted capitalize">
                        via {u.provider}
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-3.5 align-middle">
                    <div className="flex items-center gap-2.5">
                      <span className="h-[3px] w-[74px] shrink-0 rounded-full bg-line-2">
                        <motion.span
                          initial={false}
                          animate={{ width: `${(u.completed / totalCourses) * 100}%` }}
                          transition={CONTINUITY_SPRING}
                          className="block h-full rounded-full bg-ink"
                        />
                      </span>
                      <span className="font-mono text-[11px] text-ink-2 tabular-nums">
                        {u.completed}/{totalCourses}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 text-right align-middle font-mono text-[12px] text-ink-2 tabular-nums">
                    {u.projects || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
