-- 1. Storage Setup
-- Create buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('achievements', 'achievements', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects if not already enabled (it usually is)
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY; -- Commented out to avoid permission errors

-- Policies for Avatars
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'avatars' );

DROP POLICY IF EXISTS "Authenticated users can upload avatars" ON storage.objects;
CREATE POLICY "Authenticated users can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'avatars' AND auth.role() = 'authenticated' );

DROP POLICY IF EXISTS "Users can update their own avatars" ON storage.objects;
CREATE POLICY "Users can update their own avatars"
  ON storage.objects FOR UPDATE
  USING ( bucket_id = 'avatars' AND auth.uid() = owner );

DROP POLICY IF EXISTS "Users can delete their own avatars" ON storage.objects;
CREATE POLICY "Users can delete their own avatars"
  ON storage.objects FOR DELETE
  USING ( bucket_id = 'avatars' AND auth.uid() = owner );

-- Policies for Achievements
DROP POLICY IF EXISTS "Achievement images are publicly accessible" ON storage.objects;
CREATE POLICY "Achievement images are publicly accessible"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'achievements' );

DROP POLICY IF EXISTS "Authenticated users can upload achievement images" ON storage.objects;
CREATE POLICY "Authenticated users can upload achievement images"
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'achievements' AND auth.role() = 'authenticated' );

DROP POLICY IF EXISTS "Users can update their own achievement images" ON storage.objects;
CREATE POLICY "Users can update their own achievement images"
  ON storage.objects FOR UPDATE
  USING ( bucket_id = 'achievements' AND auth.uid() = owner );

DROP POLICY IF EXISTS "Users can delete their own achievement images" ON storage.objects;
CREATE POLICY "Users can delete their own achievement images"
  ON storage.objects FOR DELETE
  USING ( bucket_id = 'achievements' AND auth.uid() = owner );


-- 2. Database Schema Updates
-- Add avatar_url to player_cards
ALTER TABLE player_cards ADD COLUMN IF NOT EXISTS avatar_url text;

-- Update achievements to support rich data (JSONB)
-- First, drop the default value which causes the casting error
ALTER TABLE player_cards ALTER COLUMN achievements DROP DEFAULT;

-- Now alter the type
ALTER TABLE player_cards
ALTER COLUMN achievements TYPE jsonb
USING to_jsonb(achievements);

-- Set the new default for jsonb
ALTER TABLE player_cards ALTER COLUMN achievements SET DEFAULT '[]'::jsonb;
