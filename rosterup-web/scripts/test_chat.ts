
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

async function testChatSystem() {
  // 1. Create Two Users
  const email1 = `user1_${Date.now()}@test.com`;
  const email2 = `user2_${Date.now()}@test.com`;
  const password = 'password123';

  console.log('Creating User 1...');
  const { data: auth1, error: err1 } = await supabase.auth.signUp({ email: email1, password });
  if (err1) { console.error(err1); return; }
  const user1Id = auth1.user?.id;

  console.log('Creating User 2...');
  const { data: auth2, error: err2 } = await supabase.auth.signUp({ email: email2, password });
  if (err2) { console.error(err2); return; }
  const user2Id = auth2.user?.id;

  if (!user1Id || !user2Id) {
    console.error('Failed to create users');
    return;
  }

  console.log(`User 1: ${user1Id}`);
  console.log(`User 2: ${user2Id}`);

  // 2. Create Conversation (User 1 initiates)
  console.log('User 1 creating conversation...');
  // We need to sign in as User 1 to respect RLS? 
  // Yes, but we are using anon key. RLS will block if we don't have a session.
  // We can use signInWithPassword to get a session for the client.
  
  // Client for User 1
  const { data: session1 } = await supabase.auth.signInWithPassword({ email: email1, password });
  const client1 = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${session1.session?.access_token}` } }
  });

  const { data: conv, error: convError } = await client1
    .from('conversations')
    .insert({ user1_id: user1Id, user2_id: user2Id })
    .select()
    .single();

  if (convError) {
    console.error('Error creating conversation:', convError);
    return;
  }
  console.log('Conversation created:', conv.id);

  // 3. Send Message (User 1 sends)
  console.log('User 1 sending message...');
  const { data: msg1, error: msgError1 } = await client1
    .from('messages')
    .insert({
      conversation_id: conv.id,
      sender_id: user1Id,
      content: 'Hello from User 1!'
    })
    .select()
    .single();

  if (msgError1) {
    console.error('Error sending message 1:', msgError1);
    return;
  }
  console.log('Message 1 sent:', msg1.content);

  // 4. Reply (User 2 replies)
  console.log('User 2 replying...');
  const { data: session2 } = await supabase.auth.signInWithPassword({ email: email2, password });
  const client2 = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${session2.session?.access_token}` } }
  });

  const { data: msg2, error: msgError2 } = await client2
    .from('messages')
    .insert({
      conversation_id: conv.id,
      sender_id: user2Id,
      content: 'Hi User 1! Message received.'
    })
    .select()
    .single();

  if (msgError2) {
    console.error('Error sending reply:', msgError2);
    return;
  }
  console.log('Reply sent:', msg2.content);

  // 5. Verify User 1 can see the reply
  console.log('User 1 fetching messages...');
  const { data: messages, error: fetchError } = await client1
    .from('messages')
    .select('*')
    .eq('conversation_id', conv.id);

  if (fetchError) {
    console.error('Error fetching messages:', fetchError);
    return;
  }
  console.log(`User 1 sees ${messages.length} messages.`);
  
  if (messages.length === 2) {
    console.log('SUCCESS: Chat system verified!');
  } else {
    console.error('FAILURE: Message count mismatch.');
  }
}

testChatSystem();
