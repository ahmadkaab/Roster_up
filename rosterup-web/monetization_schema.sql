-- Add Monetization Columns (Idempotent)
alter table public.player_cards 
add column if not exists is_verified boolean default false,
add column if not exists boosted_until timestamp with time zone;

-- Index for performance (optional but good)
create index if not exists idx_player_cards_boost_sort 
on public.player_cards (boosted_until desc nulls last);

-- RPC Function for Fair Shuffle Feed
-- Drops existing function if any to facilitate updates
drop function if exists get_scout_feed;

create or replace function get_scout_feed()
returns setof public.player_cards
language sql
as $$
  select *
  from public.player_cards
  order by 
    -- Priority 1: Active Boosts (boosted_until in future)
    (case when boosted_until > now() then 1 else 0 end) desc,
    -- Priority 2: Random Shuffle (Fairness)
    random();
$$;
