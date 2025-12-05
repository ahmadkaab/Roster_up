"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function sendFriendRequest(friendId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // Check if request already exists (in either direction)
  const { data: existing } = await supabase
    .from("friendships")
    .select("*")
    .or(`and(user_id.eq.${user.id},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${user.id})`)
    .single();

  if (existing) {
    if (existing.status === 'accepted') throw new Error("Already friends");
    if (existing.status === 'pending') throw new Error("Request already pending");
    if (existing.status === 'blocked') throw new Error("Cannot send request");
  }

  const { error } = await supabase
    .from("friendships")
    .insert({
      user_id: user.id,
      friend_id: friendId,
      status: "pending",
    });

  if (error) throw error;
  revalidatePath("/dashboard");
  revalidatePath(`/player/${friendId}`);
}

export async function acceptFriendRequest(friendshipId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("friendships")
    .update({ status: "accepted", updated_at: new Date().toISOString() })
    .eq("id", friendshipId)
    .eq("friend_id", user.id); // Only the recipient can accept

  if (error) throw error;
  revalidatePath("/dashboard");
}

export async function rejectFriendRequest(friendshipId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("friendships")
    .update({ status: "rejected", updated_at: new Date().toISOString() })
    .eq("id", friendshipId)
    .eq("friend_id", user.id);

  if (error) throw error;
  revalidatePath("/dashboard");
}

export async function removeFriend(friendshipId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("friendships")
    .delete()
    .eq("id", friendshipId)
    // Ensure user is part of the friendship
    .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`);

  if (error) throw error;
  revalidatePath("/dashboard");
}

export async function getFriends() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: friendships } = await supabase
    .from("friendships")
    .select(`
      id,
      user_id,
      friend_id,
      status,
      friend:friend_id(email), 
      user:user_id(email)
    `) // Note: This assumes we can fetch email, but ideally we fetch profiles
    .eq("status", "accepted")
    .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`);

  // We need to fetch profiles manually or via join if profiles table is linked
  // For now, let's assume we need to fetch profiles separately or rely on what we have.
  // A better approach is to fetch the profile of the "other" person.
  
  if (!friendships) return [];

  const friendIds = friendships.map(f => f.user_id === user.id ? f.friend_id : f.user_id);
  const friendshipMap = new Map(friendships.map(f => [
    f.user_id === user.id ? f.friend_id : f.user_id, 
    f.id
  ]));
  
  const { data: profiles } = await supabase
    .from("player_cards")
    .select("player_id, ign, primary_role, game")
    .in("player_id", friendIds);

  return profiles?.map(p => ({
    ...p,
    friendship_id: friendshipMap.get(p.player_id)
  })) || [];
}

export async function getPendingRequests() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { incoming: [], outgoing: [] };

  const { data: incoming } = await supabase
    .from("friendships")
    .select("*, user:user_id(email)") // Sender info
    .eq("friend_id", user.id)
    .eq("status", "pending");

  const { data: outgoing } = await supabase
    .from("friendships")
    .select("*, friend:friend_id(email)") // Recipient info
    .eq("user_id", user.id)
    .eq("status", "pending");

    // Fetch profiles for better display
    const incomingIds = incoming?.map(f => f.user_id) || [];
    const outgoingIds = outgoing?.map(f => f.friend_id) || [];

    const { data: profiles } = await supabase
        .from("player_cards")
        .select("player_id, ign")
        .in("player_id", [...incomingIds, ...outgoingIds]);

    const profileMap = new Map(profiles?.map(p => [p.player_id, p]));

    const incomingWithProfiles = incoming?.map(req => ({
        ...req,
        sender_profile: profileMap.get(req.user_id)
    }));

    const outgoingWithProfiles = outgoing?.map(req => ({
        ...req,
        recipient_profile: profileMap.get(req.friend_id)
    }));

  return { incoming: incomingWithProfiles || [], outgoing: outgoingWithProfiles || [] };
}
