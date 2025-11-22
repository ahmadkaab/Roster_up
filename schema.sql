-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Enum Types
create type user_role as enum ('player', 'team_admin', 'admin');
create type team_tier as enum ('T1', 'T2', 'T3', 'T4', 'Amateur');
create type game_role as enum ('IGL', 'Scout', 'Sniper', 'Support', 'Flex', 'Entry Fragger');
create type application_status as enum ('pending', 'shortlisted', 'rejected', 'selected');

-- 1. Profiles Table (Extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  user_type user_role default 'player',
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Teams Table
create table public.teams (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) not null,
  name text not null,
  tier team_tier default 'Amateur',
  region text default 'India',
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Games Table (Static)
create table public.games (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  category text default 'Mobile'
);

-- Seed Games
insert into public.games (name, category) values 
('BGMI', 'Mobile'),
('Valorant', 'PC'),
('Free Fire', 'Mobile'),
('COD Mobile', 'Mobile');

-- 4. Player Cards Table
create table public.player_cards (
  id uuid default uuid_generate_v4() primary key,
  player_id uuid references public.profiles(id) not null unique,
  primary_game_id uuid references public.games(id),
  ign text not null,
  primary_role game_role not null,
  secondary_role game_role,
  kd_ratio numeric(4, 2),
  avg_damage integer,
  device_model text,
  availability text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Recruitments Table
create table public.recruitments (
  id uuid default uuid_generate_v4() primary key,
  team_id uuid references public.teams(id) not null,
  game_id uuid references public.games(id) not null,
  role_needed game_role not null,
  tier_target team_tier,
  description text,
  min_kd numeric(4, 2),
  tryout_date timestamp with time zone,
  status text default 'open', -- open, closed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Applications Table
create table public.recruitment_applications (
  id uuid default uuid_generate_v4() primary key,
  recruitment_id uuid references public.recruitments(id) not null,
  player_id uuid references public.profiles(id) not null,
  status application_status default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(recruitment_id, player_id)
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.teams enable row level security;
alter table public.games enable row level security;
alter table public.player_cards enable row level security;
alter table public.recruitments enable row level security;
alter table public.recruitment_applications enable row level security;

-- RLS Policies

-- Profiles: Everyone can read, User can update own
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Teams: Everyone can read, Owner can update
create policy "Teams are viewable by everyone" on public.teams for select using (true);
create policy "Team owners can insert" on public.teams for insert with check (auth.uid() = owner_id);
create policy "Team owners can update" on public.teams for update using (auth.uid() = owner_id);

-- Games: Public read only
create policy "Games are viewable by everyone" on public.games for select using (true);

-- Player Cards: Public read, Owner update
create policy "Player cards are viewable by everyone" on public.player_cards for select using (true);
create policy "Players can insert own card" on public.player_cards for insert with check (auth.uid() = player_id);
create policy "Players can update own card" on public.player_cards for update using (auth.uid() = player_id);

-- Recruitments: Public read, Team Owner update
create policy "Recruitments are viewable by everyone" on public.recruitments for select using (true);
create policy "Team owners can insert recruitments" on public.recruitments for insert 
with check (exists (select 1 from public.teams where id = team_id and owner_id = auth.uid()));
create policy "Team owners can update recruitments" on public.recruitments for update 
using (exists (select 1 from public.teams where id = team_id and owner_id = auth.uid()));

-- Applications: 
-- Player can see their own applications
-- Team owner can see applications for their recruitments
create policy "Players can view own applications" on public.recruitment_applications for select using (auth.uid() = player_id);
create policy "Team owners can view applications" on public.recruitment_applications for select 
using (exists (select 1 from public.recruitments r join public.teams t on r.team_id = t.id where r.id = recruitment_id and t.owner_id = auth.uid()));

create policy "Players can apply" on public.recruitment_applications for insert with check (auth.uid() = player_id);

-- Function to handle new user signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
