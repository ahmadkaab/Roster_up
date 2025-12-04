-- RosterUp Web - Database Schema (Compatible with existing mobile app schema)
-- Run this in your Supabase SQL Editor
-- This assumes you already have the basic tables from the mobile app

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- The profiles, player_profiles, team_profiles tables should already exist from mobile app
-- We only need to ensure RLS policies are set up correctly for web access

-- Enable Row Level Security (if not already enabled)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can  insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

DROP POLICY IF EXISTS "Anyone can view player profiles" ON player_profiles;
DROP POLICY IF EXISTS "Players can insert their own profile" ON player_profiles;
DROP POLICY IF EXISTS "Players can update their own profile" ON player_profiles;

DROP POLICY IF EXISTS "Anyone can view team profiles" ON team_profiles;
DROP POLICY IF EXISTS "Teams can insert their own profile" ON team_profiles;
DROP POLICY IF EXISTS "Teams can update their own profile" ON team_profiles;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for player_profiles
CREATE POLICY "Anyone can view player profiles"
  ON player_profiles FOR SELECT
  USING (true);

CREATE POLICY "Players can insert their own profile"
  ON player_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Players can update their own profile"
  ON player_profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for team_profiles
CREATE POLICY "Anyone can view team profiles"
  ON team_profiles FOR SELECT
  USING (true);

CREATE POLICY "Teams can insert their own profile"
  ON team_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Teams can update their own profile"
  ON team_profiles FOR UPDATE
  USING (auth.uid() = id);

-- If tryouts and applications tables exist, set up their policies too
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'tryouts') THEN
    ALTER TABLE tryouts ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Anyone can view open tryouts" ON tryouts;
    DROP POLICY IF EXISTS "Teams can insert tryouts" ON tryouts;
    DROP POLICY IF EXISTS "Teams can update their own tryouts" ON tryouts;
    DROP POLICY IF EXISTS "Teams can delete their own tryouts" ON tryouts;
    
    CREATE POLICY "Anyone can view open tryouts"
      ON tryouts FOR SELECT
      USING (status = 'open');
    
    CREATE POLICY "Teams can insert tryouts"
      ON tryouts FOR INSERT
      WITH CHECK (auth.uid() = team_id);
    
    CREATE POLICY "Teams can update their own tryouts"
      ON tryouts FOR UPDATE
      USING (auth.uid() = team_id);
    
    CREATE POLICY "Teams can delete their own tryouts"
      ON tryouts FOR DELETE
      USING (auth.uid() = team_id);
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'applications') THEN
    ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Players can view their own applications" ON applications;
    DROP POLICY IF EXISTS "Teams can view applications for their tryouts" ON applications;
    DROP POLICY IF EXISTS "Players can insert applications" ON applications;
    DROP POLICY IF EXISTS "Teams can update applications for their tryouts" ON applications;
    
    CREATE POLICY "Players can view their own applications"
      ON applications FOR SELECT
      USING (auth.uid() = player_id);
    
    CREATE POLICY "Teams can view applications for their tryouts"
      ON applications FOR SELECT
      USING (
        auth.uid() IN (
          SELECT team_id FROM tryouts WHERE id = tryout_id
        )
      );
    
    CREATE POLICY "Players can insert applications"
      ON applications FOR INSERT
      WITH CHECK (auth.uid() = player_id);
    
    CREATE POLICY "Teams can update applications for their tryouts"
      ON applications FOR UPDATE
      USING (
        auth.uid() IN (
          SELECT team_id FROM tryouts WHERE id = tryout_id
        )
      );
  END IF;
END $$;
