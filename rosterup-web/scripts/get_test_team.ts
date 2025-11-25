
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

async function getTeam() {
  const { data, error } = await supabase
    .from('teams')
    .select('id')
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching team:', error);
    return;
  }

  if (data) {
    console.log(`TEAM_ID=${data.id}`);
  } else {
    console.log('No teams found');
  }
}

getTeam();
