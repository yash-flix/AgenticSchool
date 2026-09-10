/**
 * The notes registry. One entry per file in content/notes/<slug>.mdx.
 *
 * To add a note: drop the MDX file in content/notes and add an entry here.
 * The listing, the note page, and the home-page teaser all read from this
 * array, so nothing else needs touching. Newest first by `date`.
 */
export type NoteKind = "note" | "article" | "doc";

export type Note = {
  slug: string;
  title: string;
  /** One or two sentences. Shown on the index card and as the note's lede. */
  summary: string;
  kind: NoteKind;
  /** ISO date, YYYY-MM-DD. Drives ordering and the "written" line. */
  date: string;
  topics: string[];
  /** Course slugs from lib/courses.ts this note stands in for or pairs with. */
  courses: string[];
};

export const noteKinds: { id: NoteKind; label: string; plural: string; blurb: string }[] = [
  {
    id: "note",
    label: "Note",
    plural: "Notes",
    blurb: "One idea from the path, written down in the time it takes to make coffee.",
  },
  {
    id: "article",
    label: "Article",
    plural: "Articles",
    blurb: "Longer pieces on how to learn this well, and what to skip.",
  },
  {
    id: "doc",
    label: "Doc",
    plural: "Docs",
    blurb: "Reference you come back to: APIs, patterns, checklists.",
  },
];

export const notes: Note[] = [
  {
    slug: "tutorial-hell-and-the-way-out",
    title: "Tutorial hell, and the way out of it",
    summary:
      "Sixty-five hours of video is the slow road. Here is what the courses are actually teaching, so you can read it, build it, and only watch the parts you need.",
    kind: "article",
    date: "2026-09-10",
    topics: ["How to learn", "The path"],
    courses: ["ai-agents-pure-python", "langgraph-complete-course", "mcp-full-course"],
  },
  {
    slug: "the-agent-loop-in-one-page",
    title: "The agent loop in one page",
    summary:
      "Every framework on the path is a wrapper around forty lines of Python. Read them once and the frameworks stop being magic.",
    kind: "note",
    date: "2026-09-10",
    topics: ["Fundamentals", "Python", "Tools"],
    courses: ["ai-agents-pure-python", "agentic-ai-complete-course"],
  },
  {
    slug: "what-a-framework-does-for-you",
    title: "What a framework actually does for you",
    summary:
      "LangGraph, CrewAI and the OpenAI SDK solve the same three problems in three different shapes. Know the problems and picking one takes ten minutes.",
    kind: "note",
    date: "2026-09-10",
    topics: ["LangGraph", "CrewAI", "Orchestration"],
    courses: ["langgraph-complete-course", "crewai-multi-agent", "openai-agents-sdk"],
  },
];

/** Newest first. Same-day notes keep registry order. */
export const sortedNotes = [...notes].sort((a, b) =>
  a.date === b.date ? 0 : a.date < b.date ? 1 : -1
);

export const findNote = (slug: string) => notes.find((n) => n.slug === slug);

export const kindLabel = (kind: NoteKind) =>
  noteKinds.find((k) => k.id === kind)?.label ?? kind;

export function fmtNoteDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
