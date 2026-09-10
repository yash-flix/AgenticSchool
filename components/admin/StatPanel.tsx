/** The hero's stat row, reused so the admin reads as the same product. */
export default function StatPanel({
  tiles,
}: {
  tiles: { k: string; v: string; note: string }[];
}) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-line bg-line shadow-[var(--shadow-card)] sm:grid-cols-4">
      {tiles.map((t) => (
        <div key={t.k} className="bg-paper p-5">
          <dt className="label">{t.k}</dt>
          <dd className="mt-3 text-[30px] leading-none font-medium tracking-[-0.04em] tabular-nums">
            {t.v}
          </dd>
          <dd className="mt-2.5 text-[12.5px] text-muted">{t.note}</dd>
        </div>
      ))}
    </dl>
  );
}
