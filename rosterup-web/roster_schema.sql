-- Create Team Members Table
create table if not exists public.team_members (
  id uuid default uuid_generate_v4() primary key,
  team_id uuid references public.teams(id) on delete cascade not null,
  player_id uuid references public.profiles(id) on delete cascade not null,
  role text default 'Member', -- e.g., 'IGL', 'Sniper', 'Assaulter'
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(team_id, player_id)
);

-- Enable RLS
alter table public.team_members enable row level security;

-- Policies

-- 1. Everyone can view rosters (Public)
create policy "Rosters are viewable by everyone" 
  on public.team_members for select 
  using (true);

-- 2. Team Owners can manage their roster
create policy "Team owners can manage roster" 
  on public.team_members for all
  using (
    exists (
      select 1 from public.teams 
      where id = team_members.team_id 
      and owner_id = auth.uid()
    )
  );

-- 3. Players can remove themselves (Leave team)
create policy "Players can leave team" 
  on public.team_members for delete
  using (auth.uid() = player_id);
