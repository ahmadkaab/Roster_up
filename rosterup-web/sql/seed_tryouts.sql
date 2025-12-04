-- Seed Dummy Team and Tryout
-- Run this in Supabase SQL Editor

-- 1. Create a dummy team owner profile (if not exists)
-- Note: In real app, this would be a real user. For seeding, we'll assume a user exists or just insert into teams directly if RLS allows (it won't).
-- So we'll just insert a team linked to the current user (YOU) for testing.
-- REPLACE 'YOUR_USER_ID' with your actual Supabase User ID from the Authentication tab!

-- Actually, easier way: Just insert a team and tryout. 
-- Since we are running this as SQL admin, RLS is bypassed.

DO $$
DECLARE
  v_owner_id uuid;
  v_team_id uuid;
  v_game_id uuid;
BEGIN
  -- Get the first user from auth.users to be the owner (or use a specific ID)
  SELECT id INTO v_owner_id FROM auth.users LIMIT 1;
  
  -- Get BGMI game ID
  SELECT id INTO v_game_id FROM public.games WHERE name = 'BGMI' LIMIT 1;

  IF v_owner_id IS NOT NULL AND v_game_id IS NOT NULL THEN
    -- Create Team
    INSERT INTO public.teams (owner_id, name, tier, region, logo_url)
    VALUES (v_owner_id, 'GodLike Esports', 'T1', 'India', 'https://api.dicebear.com/7.x/initials/svg?seed=GL')
    RETURNING id INTO v_team_id;

    -- Create Recruitment (Tryout)
    INSERT INTO public.recruitments (team_id, game_id, role_needed, tier_target, description, min_kd, tryout_date, status)
    VALUES (
      v_team_id, 
      v_game_id, 
      'Sniper', 
      'T1', 
      'Looking for a dedicated sniper with T1 experience. Must be available for evening scrims.', 
      4.5, 
      NOW() + INTERVAL '7 days', 
      'open'
    );
    
    RAISE NOTICE 'Seeded Team and Tryout successfully!';
  ELSE
    RAISE NOTICE 'Could not find user or game. Make sure you have at least one user and games seeded.';
  END IF;
END $$;
