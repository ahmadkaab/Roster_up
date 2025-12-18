-- Create Scrims Table
create table if not exists public.scrims (
  id uuid default uuid_generate_v4() primary key,
  team_id uuid references public.teams(id) not null,
  game_id uuid references public.games(id), -- Optional constraint if we want to enforce game selection
  date date not null,
  time time not null,
  region text not null,
  format text default '5v5',
  status text default 'open', -- 'open', 'filled'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.scrims enable row level security;

-- Policies
-- 1. Everyone can view open scrims
create policy "Scrims are viewable by everyone" 
  on public.scrims for select 
  using (true);

-- 2. Team owners can insert scrims
create policy "Team owners can post scrims" 
  on public.scrims for insert 
  with check (
    exists (
      select 1 from public.teams 
      where id = team_id 
      and owner_id = auth.uid()
    )
  );

-- 3. Team owners can update their own scrims
create policy "Team owners can update own scrims" 
  on public.scrims for update 
  using (
    exists (
      select 1 from public.teams 
      where id = team_id 
      and owner_id = auth.uid()
    )
  );
