
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
  // 1. Get a user (player)
  const { data: player, error: playerError } = await supabase
    .from('player_cards')
    .select('player_id')
    .limit(1)
    .single();

  if (playerError || !player) {
    console.error('Error fetching player:', playerError);
    return;
  }

  console.log(`Sending notification to player: ${player.player_id}`);

  // 2. Insert Notification
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id: player.player_id,
      type: 'system_test',
      title: 'Test Notification 🔔',
      message: 'This is a test notification from the verification script.',
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
