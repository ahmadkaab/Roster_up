
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function setupE2E() {
  const timestamp = Date.now();
  const teamEmail = `team_e2e_${timestamp}@test.com`;
  const playerEmail = `player_e2e_${timestamp}@test.com`;
  const password = 'password123';

  console.log(`Setting up E2E data with timestamp: ${timestamp}`);

  // 1. Create Team User
  console.log('Creating Team User...');
  const { data: teamAuth, error: teamAuthError } = await supabase.auth.signUp({
    email: teamEmail,
    password: password,
    options: { data: { full_name: 'E2E Team Owner' } }
  });
  if (teamAuthError) throw teamAuthError;
  const teamUserId = teamAuth.user?.id;
  if (!teamUserId) throw new Error('Failed to create team user');

  // 2. Create Team Profile (via Client to respect RLS or just direct insert if policy allows)
  // We need a session to insert into 'teams' usually.
  const { data: teamSession } = await supabase.auth.signInWithPassword({ email: teamEmail, password });
  const teamClient = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${teamSession.session?.access_token}` } }
  });

  console.log('Creating Team...');
  const { data: team, error: teamError } = await teamClient
    .from('teams')
    .insert({
      owner_id: teamUserId,
      name: `E2E Team ${timestamp}`,
      tier: 'T1',
      region: 'NA'
    })
    .select()
    .single();
  if (teamError) throw teamError;

  // 3. Post Recruitment
  console.log('Posting Recruitment...');
  // Need Game ID first
  const { data: game } = await supabase.from('games').select('id').eq('name', 'Valorant').single();
  
  const { data: recruitment, error: recError } = await teamClient
    .from('recruitments')
    .insert({
      team_id: team.id,
      game_id: game?.id,
      role_needed: 'Sniper',
      tier_target: 'T1',
      min_kd: 1.5,
      description: 'E2E Test Recruitment',
      tryout_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      status: 'open'
    })
    .select()
    .single();
  if (recError) throw recError;

  // 4. Create Player User
  console.log('Creating Player User...');
  const { data: playerAuth, error: playerAuthError } = await supabase.auth.signUp({
    email: playerEmail,
    password: password,
    options: { data: { full_name: 'E2E Player' } }
  });
  if (playerAuthError) throw playerAuthError;
  const playerUserId = playerAuth.user?.id;

  // 5. Create Player Card
  const { data: playerSession } = await supabase.auth.signInWithPassword({ email: playerEmail, password });
  const playerClient = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${playerSession.session?.access_token}` } }
  });

  console.log('Creating Player Card...');
  const { error: cardError } = await playerClient
    .from('player_cards')
    .insert({
      player_id: playerUserId,
      ign: `E2E_Player_${timestamp}`,
      primary_role: 'Sniper',
      kd_ratio: 2.5,
      avg_damage: 150,
      primary_game_id: game?.id
    });
  if (cardError) throw cardError;

  console.log('--- E2E SETUP COMPLETE ---');
  console.log(`Team Email: ${teamEmail}`);
  console.log(`Player Email: ${playerEmail}`);
  console.log(`Password: ${password}`);
  console.log(`Recruitment ID: ${recruitment.id}`);
  console.log(`Team ID: ${team.id}`);
}

setupE2E().catch(console.error);
