# Agent School

A free, ordered path through YouTube courses on agentic AI, plus a field track
of engineers running agents in production and a community wall for what people
build afterwards.

Design language borrows from cofounder.co: warm paper canvas, hairline rules,
mono microlabels, numbered chapter sections, and dark inset panels.

## Run it

```bash
npm install
npm run dev
```

It runs with no configuration. Progress is kept in `localStorage` and the
community wall uses an in-memory store, so nothing is lost except persistence.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19
- Tailwind CSS v4, tokens declared in `app/globals.css` under `@theme`
- Geist + Geist Mono + Instrument Serif via `next/font/google`
- Supabase for auth and Postgres, optional

## Accounts and persistence

Accounts are optional. Configure Supabase and the app switches on GitHub and
Google sign-in, cross-device progress sync, and a durable community wall.

```bash
./scripts/setup-supabase.sh
```

That wizard opens each dashboard page in turn, tells you exactly what to click,
writes `.env.local` for you, and finishes by checking every table over
`/api/health`. It is safe to re-run; it offers your saved values as defaults.

If you would rather do it by hand, the same four steps are:

1. Run `supabase/schema.sql` in the SQL editor. It creates the tables, the
   row-level security policies, and the two triggers.
2. Authentication → URL Configuration: set Site URL to your origin, and add
   `http://localhost:3000/**` to Redirect URLs. The double asterisk matters,
   because the app returns to `/auth/callback?next=...` with a query string.
3. Create a GitHub OAuth app and a Google OAuth client. Both take the same
   authorization callback URL, and it is **Supabase's**, not your app's:
   `https://<project-ref>.supabase.co/auth/v1/callback`. Paste each client ID
   and secret into Authentication → Sign In / Providers.
4. Copy the project URL and publishable key into `.env.local`.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`GET /api/health` reports whether the keys are picked up and whether every
table exists, which is the fastest way to find out what is missing.

Legacy `anon` JWT keys still work: the app reads
`NEXT_PUBLIC_SUPABASE_ANON_KEY` as a fallback. Supabase is retiring them, so
prefer the publishable key.

### How progress sync works

Progress is written to `localStorage` first, so the site works signed out and
offline. On load, `ProgressSync` pulls the account's rows, unions them with
whatever this browser has, and pushes anything the server was missing. Signing
in therefore never costs someone the ticks they already had.

### Moderation

Projects publish immediately. Any signed-in person can report one, reports are
unique per person per project, and a database trigger hides a project once it
reaches three. Restoring one is a manual status update, which is the right
amount of friction.

## Changing the courses

Everything lives in `lib/courses.ts`. Each entry needs a YouTube `videoId`;
thumbnails and embeds are derived from it. `stages` controls the four sections
and the `stage` field on a course assigns it to one. The field track and its
playlist link are in the same file.

The community page's reference library is in `lib/community.ts`.

Course metadata (durations, channels, view counts) and the reference repository
counts were read in September 2026.
