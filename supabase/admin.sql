-- Agent School — admin, CRM and curated video schema
-- Paste into the Supabase SQL editor and press Run. Safe to run repeatedly.
--
-- Design notes:
--   * Admin access is enforced by row-level security, not by application code.
--     There is no service-role key anywhere in the app, so a bug in a route
--     handler cannot leak another user's rows.
--   * is_admin() is SECURITY DEFINER on purpose: a policy on `profiles` that
--     queried `profiles` directly would recurse forever.

-- ------------------------------------------------------------------- roles --

alter table public.profiles
  add column if not exists role  text not null default 'member';

-- Emails are useful in a CRM and must never be public. They live on profiles,
-- which is why the read policy below is tightened at the same time.
alter table public.profiles
  add column if not exists email text;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

grant execute on function public.is_admin() to authenticated, anon;

-- ------------------------------------------------------- tighten  profiles --

-- Previously every profile row was world-readable. Nothing in the app relied on
-- that (the project wall stores its own author string), and it would have made
-- the email column above public.
drop policy if exists "profiles are readable by everyone" on public.profiles;

drop policy if exists "a user reads their own profile" on public.profiles;
create policy "a user reads their own profile"
  on public.profiles for select using (auth.uid() = id or public.is_admin());

drop policy if exists "admins update any profile" on public.profiles;
create policy "admins update any profile"
  on public.profiles for update using (public.is_admin());

-- Keep the signup trigger in step with the new columns.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, handle, display_name, avatar_url, provider, email)
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
    new.raw_app_meta_data ->> 'provider',
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Backfill anyone who signed up before this ran.
update public.profiles p
   set email = u.email
  from auth.users u
 where u.id = p.id and p.email is distinct from u.email;

-- --------------------------------------------------------- admin  reading --

drop policy if exists "admins read all progress" on public.course_progress;
create policy "admins read all progress"
  on public.course_progress for select using (public.is_admin());

drop policy if exists "admins read all projects" on public.projects;
create policy "admins read all projects"
  on public.projects for select using (public.is_admin());

drop policy if exists "admins moderate projects" on public.projects;
create policy "admins moderate projects"
  on public.projects for update using (public.is_admin());

drop policy if exists "admins read all reports" on public.project_reports;
create policy "admins read all reports"
  on public.project_reports for select using (public.is_admin());

-- -------------------------------------------------------- curated  videos --

create table if not exists public.curated_videos (
  id         uuid primary key default gen_random_uuid(),
  video_id   text not null,
  url        text not null,
  title      text not null,
  channel    text,
  category   text not null,
  note       text,
  position   int  not null default 0,
  published  boolean not null default true,
  created_by uuid references auth.users on delete set null,
  created_at timestamptz not null default now()
);

create unique index if not exists curated_videos_video_idx
  on public.curated_videos (video_id);
create index if not exists curated_videos_order_idx
  on public.curated_videos (category, position, created_at desc);

alter table public.curated_videos enable row level security;

drop policy if exists "published videos are readable by everyone" on public.curated_videos;
create policy "published videos are readable by everyone"
  on public.curated_videos for select
  using (published or public.is_admin());

drop policy if exists "admins add videos" on public.curated_videos;
create policy "admins add videos"
  on public.curated_videos for insert with check (public.is_admin());

drop policy if exists "admins edit videos" on public.curated_videos;
create policy "admins edit videos"
  on public.curated_videos for update using (public.is_admin());

drop policy if exists "admins remove videos" on public.curated_videos;
create policy "admins remove videos"
  on public.curated_videos for delete using (public.is_admin());

-- ------------------------------------------------------------------ finish --

notify pgrst, 'reload schema';

select
  (select count(*) from public.curated_videos)                    as curated_videos,
  (select count(*) from public.profiles where role = 'admin')     as admins,
  (select count(*) from public.profiles)                          as profiles;
