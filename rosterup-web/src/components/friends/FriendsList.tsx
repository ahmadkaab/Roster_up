"use client";

import { acceptFriendRequest, getFriends, getPendingRequests, rejectFriendRequest, removeFriend } from "@/actions/friends";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/contexts/ToastContext";
import { Check, User, UserMinus, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Friend = {
  player_id: string;
  ign: string;
  primary_role?: string;
  game?: string;
};

type Request = {
  id: string;
  user_id: string;
  friend_id: string;
  status: string;
  sender_profile?: { ign: string };
  recipient_profile?: { ign: string };
};

export function FriendsList() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<{ incoming: Request[]; outgoing: Request[] }>({ incoming: [], outgoing: [] });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const [friendsData, requestsData] = await Promise.all([
        getFriends(),
        getPendingRequests(),
      ]);
      setFriends(friendsData as any);
      setRequests(requestsData as any);
    } catch (error) {
      console.error("Error fetching friends:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAccept = async (id: string) => {
    try {
      await acceptFriendRequest(id);
      toast("Friend request accepted!", "success");
      fetchData();
    } catch (error) {
      toast("Failed to accept request", "error");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectFriendRequest(id);
      toast("Friend request rejected", "info");
      fetchData();
    } catch (error) {
      toast("Failed to reject request", "error");
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await removeFriend(id);
      toast("Friend removed", "info");
      fetchData();
    } catch (error) {
      toast("Failed to remove friend", "error");
    }
  };

  if (loading) {
    return <FriendsSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Pending Requests */}
      {requests.incoming.length > 0 && (
        <Card className="border-accent/20 bg-accent/5 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-lg text-accent">Friend Requests</CardTitle>
            <CardDescription>People who want to join your squad.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {requests.incoming.map((req) => (
              <div key={req.id} className="flex items-center justify-between rounded-lg bg-black/20 p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-accent/20">
                    <AvatarFallback className="bg-accent/10 text-accent">
                      {req.sender_profile?.ign?.slice(0, 2).toUpperCase() || "??"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">{req.sender_profile?.ign || "Unknown User"}</p>
                    <p className="text-xs text-muted-foreground">Wants to be friends</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleReject(req.id)} className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive">
                    <X className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={() => handleAccept(req.id)} className="h-8 w-8 p-0 bg-accent text-accent-foreground hover:bg-accent/90">
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Friends List */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>My Friends</span>
            <span className="text-sm font-normal text-muted-foreground">{friends.length} Friends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {friends.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {friends.map((friend) => (
                <div key={friend.player_id} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3 transition-colors hover:bg-white/10">
                  <Link href={`/player/${friend.player_id}`} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-primary/20">
                      <AvatarFallback>{friend.ign?.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white">{friend.ign}</p>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </Link>
                  <div className="flex gap-2">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/chat/${friend.player_id}`}>
                        <User className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleRemove(friend.player_id)} // Assuming we need friendship ID here, but using player_id for now as per previous context
                    >
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <User className="mb-2 h-8 w-8 opacity-50" />
              <p>No friends yet.</p>
              <p className="text-sm">Connect with players to build your network.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function FriendsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}
