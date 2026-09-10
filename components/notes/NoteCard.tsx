import Link from "next/link";
import { fmtNoteDate, kindLabel, type Note } from "@/lib/notes";
import KindGlyph from "./KindGlyph";
import NoteFigure from "./NoteFigure";

export default function NoteCard({
  note,
  minutes,
  index,
}: {
  note: Note;
  minutes: number;
  index: number;
}) {
  return (
    <Link href={`/notes/${note.slug}`} className="card group flex h-full flex-col overflow-hidden">
      {/* cover */}
      <div className="relative border-b border-line bg-panel/50">
        <NoteFigure slug={note.slug} className="h-[132px] w-full" />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/90 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.15em] text-ink uppercase backdrop-blur">
          <KindGlyph kind={note.kind} className="h-3.5 w-3.5" />
          {kindLabel(note.kind)}
        </span>
        <span aria-hidden className="ghost-num absolute top-2 right-3 text-[30px]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className="label">{minutes} min read</span>
          <span className="label">{fmtNoteDate(note.date)}</span>
        </div>
        <h3 className="display-4 mt-3.5 max-w-[22ch] transition-colors group-hover:text-flame">
          {note.title}
        </h3>
        <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-2">{note.summary}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
          {note.topics.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
