# Agent School

A curated path through ten free YouTube courses on agentic AI, ordered so each
one builds on the last. Roughly 65 hours across four stages: Ground,
Orchestrate, Context, Ship.

Design language is borrowed from cofounder.co: warm off-white canvas, hairline
rules, mono microlabels, numbered chapter sections, and a UI-mockup panel in the
hero.

## Run it

```bash
npm install
npm run dev
```

## Stack

- Next.js 16 (App Router, Turbopack) + React 19
- Tailwind CSS v4, tokens declared in `app/globals.css` under `@theme`
- Instrument Sans + IBM Plex Mono via `next/font/google`

## Changing the courses

Everything lives in `lib/courses.ts`. Each entry needs a YouTube `videoId`;
thumbnails and embeds are derived from it. `stages` controls the four sections
and the `stage` field on a course assigns it to one.

Course metadata (durations, channels, view counts) was read from YouTube in
September 2026.

## Notes

- Progress tracking is `localStorage` only, keyed `agent-school.progress.v1`.
- Course detail pages are statically generated from `generateStaticParams`.
