import type { ReactNode } from "react";

/**
 * An aside a note can drop in with `<Callout label="Try it">…</Callout>`.
 * Available in every MDX file through mdx-components.tsx, no import needed.
 */
export default function Callout({
  label = "Note",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <aside className="card my-8 p-6 hover:translate-y-0 hover:shadow-[var(--shadow-card)]">
      <span className="label text-flame">{label}</span>
      <div className="mt-3 [&_p]:my-0 [&_p]:text-[15.5px] [&_p+p]:mt-3">
        {children}
      </div>
    </aside>
  );
}
