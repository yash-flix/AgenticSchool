import { readFile } from "node:fs/promises";
import path from "node:path";

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

/**
 * Reading time from the raw MDX, so nobody maintains it by hand. Imports,
 * exports and JSX tags are stripped before counting; code blocks count, since
 * people do read them.
 */
export async function readingMinutes(slug: string): Promise<number> {
  try {
    const raw = await readFile(path.join(NOTES_DIR, `${slug}.mdx`), "utf8");
    const prose = raw
      .replace(/^(import|export)\s.*$/gm, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/[#*_`>|-]+/g, " ");
    const words = prose.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 210));
  } catch {
    return 1;
  }
}
