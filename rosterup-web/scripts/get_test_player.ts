
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function getPlayer() {
  const { data, error } = await supabase
    .from('player_cards')
    .select('player_id')
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching player:', error);
    return;
  }

  if (data) {
    console.log(`PLAYER_ID=${data.player_id}`);
  } else {
    console.log('No players found');
  }
}

getPlayer();
