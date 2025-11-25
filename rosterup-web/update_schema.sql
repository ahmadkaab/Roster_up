-- Add new columns to player_cards table
-- Run this in Supabase SQL Editor

ALTER TABLE public.player_cards
ADD COLUMN IF NOT EXISTS achievements text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS experience_years integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS socials jsonb DEFAULT '{"discord": "", "instagram": "", "youtube": ""}';

-- Comment on columns
COMMENT ON COLUMN public.player_cards.achievements IS 'List of player achievements (e.g. Tournament wins)';
COMMENT ON COLUMN public.player_cards.experience_years IS 'Years of competitive experience';
COMMENT ON COLUMN public.player_cards.socials IS 'Social media links and handles';
