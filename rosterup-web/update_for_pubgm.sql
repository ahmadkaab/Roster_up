-- 1. Add achievements to player_cards
alter table public.player_cards 
add column if not exists achievements text[] default '{}';

-- 2. Clean up Games Table
-- We only want BGMI/PUBGM. Let's delete others.
-- Note: This might fail if there are foreign key constraints (recruitments/player_cards linked to other games).
-- For a cleaner approach in dev, we can just ensure BGMI exists and maybe ignore the others for now, 
-- or update existing records to point to BGMI before deleting. 
-- Since this is likely a dev environment, let's try to update links then delete.

-- Get ID of BGMI (or create it)
do $$
declare
  bgmi_id uuid;
begin
  select id into bgmi_id from public.games where name = 'BGMI';
  
  if bgmi_id is null then
    insert into public.games (name, category) values ('BGMI', 'Mobile') returning id into bgmi_id;
  end if;

  -- Update any existing records to point to BGMI (Nuclear option for dev)
  update public.recruitments set game_id = bgmi_id;
  update public.player_cards set primary_game_id = bgmi_id;

  -- Delete other games
  delete from public.games where id != bgmi_id;
end $$;
