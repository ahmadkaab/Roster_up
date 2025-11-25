
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

async function sendTestNotification() {
  // 1. Sign Up a Test User
  const email = `tester_${Date.now()}@example.com`;
  const password = 'password123';

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    console.error('Error authenticating:', authError);
    return;
  }

  const userId = authData.user?.id;
  if (!userId) {
    console.error('No user ID returned');
    return;
  }

  console.log(`CREATED_USER_EMAIL: ${email}`);
  console.log(`CREATED_USER_PASSWORD: ${password}`);
  console.log(`Authenticated as temp user: ${userId}`);

  // 2. Create Player Profile (Bypass Onboarding)
  const { error: profileError } = await supabase
    .from('player_cards')
    .insert({
      player_id: userId,
      ign: `Tester${Date.now().toString().slice(-4)}`,
      primary_game_id: '123e4567-e89b-12d3-a456-426614174000', // Assuming this exists or we can fetch one
      primary_role: 'Duelist',
      kd_ratio: 1.5,
      avg_damage: 150,
      availability: 'evening',
      device_model: 'PC'
    });
  
  // Note: If game_id constraint fails, we might need to fetch a valid game first.
  // Let's fetch a valid game ID first to be safe.
  const { data: game } = await supabase.from('games').select('id').limit(1).single();
  if (game) {
     await supabase
    .from('player_cards')
    .upsert({ // upsert in case it was created by trigger
      player_id: userId,
      ign: `Tester${Date.now().toString().slice(-4)}`,
      primary_game_id: game.id,
      primary_role: 'Duelist',
      kd_ratio: 1.5,
      avg_damage: 150,
      availability: 'evening',
      device_model: 'PC'
    });
  }

  // 3. Insert Notification
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      type: 'system_test',
      title: 'Test Notification 🔔',
      message: 'This is a verified test notification.',
      link: '/dashboard',
    })
    .select()
    .single();

  if (error) {
    console.error('Error sending notification:', error);
  } else {
    console.log('Notification sent successfully:', data);
  }
}

sendTestNotification();
