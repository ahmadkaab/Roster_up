export type ChatUser = {
  id: string;
  name: string;
  avatar_url?: string;
  type: 'player' | 'team';
};

export type Conversation = {
  id: string;
  user1_id: string;
  user2_id: string;
  last_message_at: string;
  created_at: string;
  other_user?: ChatUser; // Enriched data for display
};

export type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
};
