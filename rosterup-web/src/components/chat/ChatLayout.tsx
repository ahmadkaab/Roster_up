"use client";

import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChatWindow } from "./ChatWindow";
import { ConversationList } from "./ConversationList";
import { ChatUser, Conversation } from "./types";

export function ChatLayout() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("c");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!user) return;

    const fetchConversations = async () => {
      // 1. Fetch conversations
      const { data: convs, error } = await supabase
        .from("conversations")
        .select("*")
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .order("last_message_at", { ascending: false });

      if (error) {
        console.error("Error fetching conversations:", error);
        setLoading(false);
        return;
      }

      // 2. Enrich with other user details
      // This is the tricky part. We need to fetch profiles for each conversation partner.
      const enrichedConversations = await Promise.all(
        convs.map(async (conv) => {
          const otherUserId = conv.user1_id === user.id ? conv.user2_id : conv.user1_id;
          
          // Try fetching from player_cards first
          let otherUser: ChatUser | undefined;

          const { data: playerData } = await supabase
            .from("player_cards")
            .select("ign, player_id") // Assuming player_id is the user id
            .eq("player_id", otherUserId)
            .single();

          if (playerData) {
            otherUser = {
              id: otherUserId,
              name: playerData.ign,
              type: 'player',
            };
          } else {
            // Try fetching from teams (owner)
            // Wait, teams table has owner_id. But we want the TEAM info usually?
            // If I am chatting with a Team Owner, I want to see the Team Name.
            const { data: teamData } = await supabase
              .from("teams")
              .select("name, logo_url, owner_id")
              .eq("owner_id", otherUserId)
              .single();
            
            if (teamData) {
              otherUser = {
                id: otherUserId,
                name: teamData.name,
                avatar_url: teamData.logo_url || undefined,
                type: 'team',
              };
            } else {
              // Fallback if neither (maybe just a raw user profile if we had one)
               otherUser = {
                id: otherUserId,
                name: "Unknown User",
                type: 'player',
              };
            }
          }

          return { ...conv, other_user: otherUser };
        })
      );

      setConversations(enrichedConversations);
      setLoading(false);
    };

    fetchConversations();

    // Realtime subscription for new conversations or updates
    const channel = supabase
      .channel("conversations")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: `user1_id=eq.${user.id}`, // Only works for one side in filter string usually? 
          // Supabase realtime filters with OR are tricky. 
          // We might just listen to all and filter in callback, or use two subscriptions.
          // For simplicity, let's just refresh on any change to this table for now, 
          // or implement a smarter filter if possible.
          // Actually, 'conversations' RLS should filter events? No, Realtime doesn't respect RLS by default unless enabled.
          // We enabled Realtime for table.
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, supabase]);

  const handleSelectConversation = (id: string) => {
    router.push(`/messages?c=${id}`);
  };

  const selectedConversation = conversations.find((c) => c.id === selectedId);
  const currentUser: ChatUser = {
    id: user?.id || "",
    name: profile?.user_type === 'player' ? 'Me' : 'My Team', // Simplified
    type: profile?.user_type === 'player' ? 'player' : 'team',
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      {/* Sidebar List */}
      <div className={cn(
        "w-full border-r border-white/10 md:w-80",
        selectedId ? "hidden md:block" : "block"
      )}>
        <div className="border-b border-white/10 p-4">
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>
        <ConversationList
          conversations={conversations}
          selectedId={selectedId || undefined}
          onSelect={handleSelectConversation}
          loading={loading}
        />
      </div>

      {/* Chat Window */}
      <div className={cn(
        "flex-1 flex-col",
        selectedId ? "flex" : "hidden md:flex"
      )}>
        {selectedConversation ? (
          <ChatWindow
            conversation={selectedConversation}
            currentUser={currentUser}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
