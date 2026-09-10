import type { NoteKind } from "@/lib/notes";

const paths: Record<NoteKind, React.ReactNode> = {
  // an index card with a pinned corner
  note: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2.2" />
      <path d="M7.5 10h9M7.5 13.5h6" />
      <circle cx="17" cy="8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  // two columns of running text
  article: (
    <>
      <path d="M4 5.5h16" />
      <path d="M4 9.5h7M4 12.5h7M4 15.5h7M4 18.5h5" />
      <path d="M13.5 9.5h6.5M13.5 12.5h6.5M13.5 15.5h6.5M13.5 18.5h4" />
    </>
  ),
  // braces, the reference shape
  doc: (
    <>
      <path d="M9 4.5c-2 0-2.6.8-2.6 2.4v3c0 1.2-.6 1.9-1.9 2.1 1.3.2 1.9.9 1.9 2.1v3c0 1.6.6 2.4 2.6 2.4" />
      <path d="M15 4.5c2 0 2.6.8 2.6 2.4v3c0 1.2.6 1.9 1.9 2.1-1.3.2-1.9.9-1.9 2.1v3c0 1.6-.6 2.4-2.6 2.4" />
      <path d="M10.5 12h3" />
    </>
  ),
};

/** Line glyph for a note kind, drawn in the same stroke as the path tiles. */
export default function KindGlyph({
  kind,
  className = "h-5 w-5",
}: {
  kind: NoteKind;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[kind]}
    </svg>
  );
}
