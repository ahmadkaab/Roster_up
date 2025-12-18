"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { Crown, Plus, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner"; // Assuming sonner or useToast context

type TeamMember = {
  id: string; // relationship id
  role: string;
  player: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    ign?: string; // If we join with player_cards ideally
  }
};

export function RosterGrid({ teamId }: { teamId: string }) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const supabase = createClient();

  const fetchRoster = async () => {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select(`
          id,
          role,
          player:profiles!player_id (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq("team_id", teamId);

      if (error) throw error;
      setMembers(data as any);
    } catch (error) {
      console.error("Error fetching roster:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoster();
  }, [teamId]);

  const handleInvite = async () => {
    // For V1, we'll just simulate an invite or direct add if we had user search.
    // Since we don't have a robust "Invite System" yet, let's keep it visual.
    toast.info("Invite system coming next! (Check 'Talent Scout' to add players)");
    setInviteEmail("");
  };

  const removeMember = async (memberId: string) => {
    const { error } = await supabase.from("team_members").delete().eq("id", memberId);
    if (!error) {
        toast.success("Player removed from roster");
        fetchRoster();
    }
  };

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-md mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Active Roster
        </CardTitle>
        <div className="flex gap-2">
            <Input 
                placeholder="Invite by Email..." 
                className="w-[200px] h-9 bg-black/20"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
            />
            <Button size="sm" onClick={handleInvite} className="gap-1">
                <Plus className="h-4 w-4" /> Add
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Roster Slots */}
            {members.map((member) => (
                <div key={member.id} className="relative group bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col items-center gap-3 transition-all hover:border-primary/50">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-1 right-1 h-6 w-6 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeMember(member.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <Avatar className="h-20 w-20 border-2 border-primary/20">
                        <AvatarImage src={member.player.avatar_url || ""} />
                        <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <p className="font-bold text-white truncate max-w-[120px]">{member.player.full_name}</p>
                        <p className="text-xs text-primary font-mono uppercase">{member.role}</p>
                    </div>
                </div>
            ))}

            {/* Empty Slots to encourage recruitment */}
            {Array.from({ length: Math.max(0, 5 - members.length) }).map((_, i) => (
                <div key={`empty-${i}`} className="border-2 border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-muted-foreground min-h-[160px]">
                    <User className="h-10 w-10 opacity-20" />
                    <span className="text-xs">Empty Slot</span>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
