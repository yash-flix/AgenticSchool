"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTINUITY_SPRING } from "@/lib/motion";
import Logo from "../Logo";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/videos", label: "Videos" },
];

export default function AdminNav({
  admin,
}: {
  admin: { name: string; email: string | null };
}) {
  const path = usePathname();

  return (
    <aside className="shrink-0 border-line bg-canvas md:sticky md:top-0 md:h-dvh md:w-[236px] md:border-r">
      <div className="flex items-center gap-3 border-b border-line px-5 py-[18px] md:border-b-0 md:px-6 md:py-6">
        <Logo href="/" />
        <span className="font-mono text-[9.5px] tracking-[0.15em] text-muted uppercase">
          Admin
        </span>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-4 py-3 md:mt-2 md:flex-col md:px-3 md:py-0">
        {LINKS.map((l) => {
          // /admin must not light up for /admin/users.
          const active = l.href === "/admin" ? path === l.href : path.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`relative rounded-[9px] px-3.5 py-2 text-[14px] whitespace-nowrap transition-colors ${
                active ? "text-ink" : "text-ink-2 hover:text-ink"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="admin-nav-active"
                  transition={CONTINUITY_SPRING}
                  className="absolute inset-0 rounded-[9px] bg-panel"
                />
              )}
              <span className="relative z-10">{l.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="hidden border-t border-line px-6 py-5 md:block md:absolute md:inset-x-0 md:bottom-0">
        <p className="truncate text-[13px] text-ink-2">{admin.name}</p>
        <p className="mt-0.5 truncate font-mono text-[10.5px] text-muted">
          {admin.email}
        </p>
        <form action="/auth/signout" method="post" className="mt-3">
          <input type="hidden" name="next" value="/admin/login" />
          <button type="submit" className="label transition-colors hover:text-flame">
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
