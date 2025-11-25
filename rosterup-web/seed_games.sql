-- Seed Games Data
-- Run this in Supabase SQL Editor

INSERT INTO public.games (name, category)
VALUES 
  ('BGMI', 'Mobile'),
  ('Valorant', 'PC'),
  ('Free Fire', 'Mobile'),
  ('COD Mobile', 'Mobile')
ON CONFLICT (name) DO NOTHING;
