# Daily Habit Tracker

A full-stack habit tracking app built with **React**, **Tailwind**, **Supabase**, and **Headless UI**. Users can create daily habits, check them off, view stats and streaks, and manage them across devices with a secure login system.  

Guest mode is also available for quick demos.

---

## Features

- **Authentication**
  - Email + password login (Supabase Auth)
  - Guest mode (localStorage only, no server sync)
- **Habit Management**
  - Add, edit, delete habits
  - Customize active days for each habit
- **Daily Tracking**
  - Check off habits for today or past days
  - Visual heatmap of completions
- **Stats**
  - Progress bars, longest streaks, and activity summaries
- **Responsive UI**
  - Built with React, Tailwind CSS, and Headless UI

---

## Security

This project uses **Supabase Row Level Security (RLS)** to ensure each user can only access their own data.  

### Key points:
- Only `auth.users` (managed by Supabase) stores user accounts.  
- Custom tables:
  - `habits` → owned by `user_id`
  - `habit_history` → linked to habits  
- RLS enabled on all tables.  
- Policies use `(select auth.uid())` for performance.  
- No exposed views of `auth.users`.  
- Frontend uses **anon key only** (service role never shipped to client).  

Result: no Supabase dashboard security warnings.

---

## Getting Started

### 1. Clone and install
```bash
git clone https://github.com/YOUR_USERNAME/habit-tracker.git
cd habit-tracker
npm install
```

### 2. Environment variables
Create a `.env.local` file:
```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Database setup
Run the following SQL in the Supabase SQL editor:

```sql
-- Drop old tables if they exist
drop table if exists profiles cascade;
drop table if exists habit_history cascade;
drop table if exists habits cascade;

-- Habits
create table public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  active_days smallint[] not null default '{0,1,2,3,4,5,6}',
  created_at timestamptz not null default now()
);

-- Habit history
create table public.habit_history (
  id uuid primary key default gen_random_uuid(),
  habit_id uuid not null references public.habits(id) on delete cascade,
  date date not null,
  completed boolean not null default false,
  unique (habit_id, date)
);

-- Enable RLS
alter table public.habits enable row level security;
alter table public.habit_history enable row level security;

-- Policies for habits
create policy "habits_select_own"
on public.habits for select
using (user_id = (select auth.uid()));

create policy "habits_insert_own"
on public.habits for insert
with check (user_id = (select auth.uid()));

create policy "habits_update_own"
on public.habits for update
using (user_id = (select auth.uid()));

create policy "habits_delete_own"
on public.habits for delete
using (user_id = (select auth.uid()));

-- Policies for habit history
create policy "history_select_own"
on public.habit_history for select
using (exists (
  select 1 from public.habits h
  where h.id = habit_history.habit_id
    and h.user_id = (select auth.uid())
));

create policy "history_insert_own"
on public.habit_history for insert
with check (exists (
  select 1 from public.habits h
  where h.id = habit_history.habit_id
    and h.user_id = (select auth.uid())
));

create policy "history_update_own"
on public.habit_history for update
using (exists (
  select 1 from public.habits h
  where h.id = habit_history.habit_id
    and h.user_id = (select auth.uid())
));

create policy "history_delete_own"
on public.habit_history for delete
using (exists (
  select 1 from public.habits h
  where h.id = habit_history.habit_id
    and h.user_id = (select auth.uid())
));

-- Helpful indexes
create index if not exists idx_habits_user_id on public.habits(user_id);
create index if not exists idx_history_habit_id on public.habit_history(habit_id);
create index if not exists idx_history_habit_id_date on public.habit_history(habit_id, date);
```

### 4. Run locally
```bash
npm run dev
```

---

## Demo Accounts

- **Guest mode** → No signup, just click "Continue as Guest". Data stored in localStorage only.  
- **Registered user** → Sign up with email + password. (If confirmations are enabled, check your email.)  

---

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Headless UI  
- Backend: Supabase (Postgres, Auth, RLS)  
- Icons: React Icons  
- Tooling: ESLint, Prettier, Vitest + React Testing Library

---

## License

MIT License. Feel free to fork and build on this.
