"use client";

import { sendFriendRequest } from "@/actions/friends";
import { Button } from "@/components/ui/button";
import { useToast } from "@/contexts/ToastContext";
import { Loader2, UserPlus } from "lucide-react";
import { useState } from "react";

export function AddFriendButton({ friendId }: { friendId: string }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAddFriend = async () => {
    setLoading(true);
    try {
      await sendFriendRequest(friendId);
      toast("Friend request sent!", "success");
    } catch (error: any) {
      toast(error.message || "Failed to send request", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleAddFriend} 
      disabled={loading}
      variant="outline"
      className="gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <UserPlus className="h-4 w-4" />
      )}
      Add Friend
    </Button>
  );
}
