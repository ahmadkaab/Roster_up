-- Drop Scrims Table
drop table if exists public.scrims cascade;

-- Create Contracts Table
create table if not exists public.contracts (
  id uuid default uuid_generate_v4() primary key,
  team_id uuid references public.teams(id) on delete cascade not null,
  player_id uuid references public.profiles(id) on delete cascade not null,
  salary_amount numeric(10, 2) default 0,
  currency text default 'INR',
  prize_split_percentage integer check (prize_split_percentage >= 0 and prize_split_percentage <= 100),
  start_date date default current_date,
  end_date date,
  status text default 'active', -- active, terminated, expired
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.contracts enable row level security;

-- Policies
create policy "Team owners can manage contracts" 
  on public.contracts for all
  using (
    exists (
      select 1 from public.teams 
      where id = contracts.team_id 
      and owner_id = auth.uid()
    )
  );

create policy "Players can view own contracts" 
  on public.contracts for select 
  using (auth.uid() = player_id);
