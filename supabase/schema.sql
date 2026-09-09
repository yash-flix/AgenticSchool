-- Agent School schema
-- Run this once in the Supabase SQL editor, or via `supabase db push`.
--
-- Design notes:
--   * Every table is protected by row-level security. Per-user data is scoped
--     by auth.uid() in the database, not in application code.
--   * Projects auto-publish. Moderation is reactive: anyone signed in can file
--     a report, and a project is hidden once it accumulates enough of them.

-- ---------------------------------------------------------------- profiles --

create table if not exists public.profiles (
  id           uuid primary key references auth.users on delete cascade,
  handle       text unique,
  display_name text,
  avatar_url   text,
  provider     text,
  created_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles are readable by everyone"
  on public.profiles for select using (true);

create policy "a user may update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Mirror new auth users into profiles, pulling whatever the provider gave us.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, handle, display_name, avatar_url, provider)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'user_name',
      new.raw_user_meta_data ->> 'preferred_username',
      split_part(coalesce(new.email, 'member'), '@', 1)
    ),
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name'
    ),
    new.raw_user_meta_data ->> 'avatar_url',
    new.raw_app_meta_data ->> 'provider'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- --------------------------------------------------------- course progress --

create table if not exists public.course_progress (
  user_id      uuid not null references auth.users on delete cascade,
  course_slug  text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, course_slug)
);

alter table public.course_progress enable row level security;

create policy "a user reads only their own progress"
  on public.course_progress for select using (auth.uid() = user_id);

create policy "a user writes only their own progress"
  on public.course_progress for insert with check (auth.uid() = user_id);

create policy "a user deletes only their own progress"
  on public.course_progress for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------- projects --

create type project_status as enum ('published', 'hidden');

create table if not exists public.projects (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users on delete cascade,
  title        text not null check (char_length(title) between 3 and 70),
  tagline      text not null check (char_length(tagline) between 12 and 180),
  author       text not null,
  repo_url     text not null,
  demo_url     text,
  stack        text[] not null default '{}',
  stage        text not null,
  status       project_status not null default 'published',
  report_count int not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists projects_created_idx
  on public.projects (created_at desc);

alter table public.projects enable row level security;

create policy "published projects are readable by everyone"
  on public.projects for select
  using (status = 'published' or auth.uid() = user_id);

create policy "a signed-in user may post their own project"
  on public.projects for insert with check (auth.uid() = user_id);

create policy "a user may edit their own project"
  on public.projects for update using (auth.uid() = user_id);

create policy "a user may delete their own project"
  on public.projects for delete using (auth.uid() = user_id);

-- ----------------------------------------------------------------- reports --

create table if not exists public.project_reports (
  project_id uuid not null references public.projects on delete cascade,
  user_id    uuid not null references auth.users on delete cascade,
  reason     text,
  created_at timestamptz not null default now(),
  primary key (project_id, user_id)
);

alter table public.project_reports enable row level security;

create policy "a signed-in user may file one report per project"
  on public.project_reports for insert with check (auth.uid() = user_id);

create policy "a user sees their own reports"
  on public.project_reports for select using (auth.uid() = user_id);

-- Hide a project once three distinct people have reported it. Reversing a
-- takedown is a manual update, which is the right amount of friction.
create or replace function public.bump_report_count()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update public.projects
     set report_count = report_count + 1,
         status = case when report_count + 1 >= 3 then 'hidden'::project_status
                       else status end
   where id = new.project_id;
  return new;
end;
$$;

drop trigger if exists on_project_reported on public.project_reports;
create trigger on_project_reported
  after insert on public.project_reports
  for each row execute function public.bump_report_count();
