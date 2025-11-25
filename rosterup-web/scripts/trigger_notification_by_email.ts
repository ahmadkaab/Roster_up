
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const email = process.argv[2];

if (!email) {
  console.error('Please provide an email address as an argument.');
  process.exit(1);
}

async function triggerNotification() {
  // 1. Get User ID by Email (using RPC or just listing users if we had service role, but we don't)
  // Wait, we can't fetch users by email with anon key usually.
  // BUT, we can fetch the PLAYER PROFILE by email if we joined it? No.
  // We can fetch `player_cards`? No, `player_cards` doesn't have email.
  
  // Workaround: We will use the `scripts/test_notification.ts` logic but we need the ID.
  // Since I can't easily get the ID by email with anon key, I will rely on the Browser Subagent to *tell me* the ID? No.
  
  // Alternative: The Browser Subagent can *create* the user, and I can use the *same* credentials in a script to login and get the ID.
  // Yes!
  
  const password = 'password123'; // We will use a fixed password for the test
  
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    console.error('Error signing in to fetch ID:', authError);
    return;
  }

  const userId = authData.user.id;
  console.log(`Found User ID: ${userId}`);

  // 2. Insert Notification
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      type: 'system_test',
      title: 'Welcome to RosterUp! 🚀',
      message: 'Your account has been successfully created. This is a test notification.',
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

triggerNotification();
