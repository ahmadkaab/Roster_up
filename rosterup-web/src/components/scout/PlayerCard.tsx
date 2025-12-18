"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { Mail, Medal, Smartphone, Trophy } from "lucide-react";
import { useState } from "react";

type Player = {
  player_id: string; // The Profile ID
  ign: string;
  primary_role: string;
  secondary_role: string | null;
  kd_ratio: number;
  avg_damage: number;
  device_model: string | null;
  achievements: string[];
  is_verified: boolean;
  boosted_until: string | null;
  profile: {
    avatar_url: string | null;
    full_name: string | null;
  }
};

export function PlayerCard({ player }: { player: Player }) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  // Helper to get initials
  const initials = player.ign.substring(0, 2).toUpperCase();

  const handleInvite = () => {
    // Placeholder invite logic
    alert(`Invite sent to ${player.ign}`);
  };

  return (
    <Card className="flex flex-col border-white/10 bg-white/5 backdrop-blur-md transition-all hover:scale-[1.02] hover:border-primary/50 hover:bg-white/10 overflow-hidden">
      {/* Header with Avatar and IGN */}
      <div className={`bg-gradient-to-r from-primary/20 to-transparent p-4 flex items-center gap-4 ${player.boosted_until && new Date(player.boosted_until) > new Date() ? 'ring-2 ring-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]' : ''}`}>
        <Avatar className="h-16 w-16 border-2 border-primary">
          <AvatarImage src={player.profile?.avatar_url || ""} />
          <AvatarFallback className="text-lg font-bold bg-primary/20 text-primary">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-1">
            <h3 className="font-bold text-xl text-white">{player.ign}</h3>
            {player.is_verified && <Medal className="h-4 w-4 text-blue-400 fill-blue-400" />} 
          </div>
          <div className="flex items-center gap-2 text-primary text-sm">
            <Trophy className="h-3 w-3" />
            <span className="font-bold">{player.primary_role}</span>
          </div>
        </div>
      </div>

      <CardContent className="flex-1 space-y-4 pt-4">
        {/* Key Stats Row */}
        <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-black/20 rounded p-2">
                <p className="text-xs text-muted-foreground uppercase">K/D Ratio</p>
                <p className="font-mono font-bold text-lg text-green-400">{player.kd_ratio}</p>
            </div>
             <div className="bg-black/20 rounded p-2">
                <p className="text-xs text-muted-foreground uppercase">Avg DMG</p>
                <p className="font-mono font-bold text-lg text-yellow-400">{player.avg_damage}</p>
            </div>
        </div>

        {/* Device Info */}
        {player.device_model && (
           <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
             <Smartphone className="h-3 w-3" />
             <span>{player.device_model}</span>
           </div>
        )}

        {/* Achievements Section - The Feature Highlight */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
            <Medal className="h-3 w-3" />
            ACHIEVEMENTS
          </p>
          <div className="flex flex-wrap gap-2">
            {player.achievements && player.achievements.length > 0 ? (
               player.achievements.map((achievement, idx) => (
                 <Badge key={idx} variant="secondary" className="bg-purple-500/10 text-purple-300 border-purple-500/20 text-[10px]">
                    {achievement}
                 </Badge>
               ))
            ) : (
                <span className="text-xs text-muted-foreground italic">No verified achievements yet.</span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button className="w-full gap-2" size="sm" onClick={handleInvite}>
          <Mail className="h-4 w-4" />
          Scout Player
        </Button>
      </CardFooter>
    </Card>
  );
}
