-- Create friendships table
CREATE TABLE IF NOT EXISTS friendships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  friend_id UUID REFERENCES auth.users(id) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected', 'blocked')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

-- Enable RLS
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;

-- Policies

-- View: Users can see friendships they are part of
CREATE POLICY "Users can view their own friendships"
  ON friendships FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- Insert: Users can send friend requests (they are the user_id)
CREATE POLICY "Users can send friend requests"
  ON friendships FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Update: Users can accept/reject requests sent to them, or update their own requests
CREATE POLICY "Users can update their own friendships"
  ON friendships FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- Delete: Users can remove friends or cancel requests
CREATE POLICY "Users can delete their own friendships"
  ON friendships FOR DELETE
  USING (auth.uid() = user_id OR auth.uid() = friend_id);
