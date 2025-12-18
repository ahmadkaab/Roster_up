"use client";

import { BoostModal } from "@/components/scout/BoostModal";
import { PlayerCard } from "@/components/scout/PlayerCard";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";

// Reuse the type or import it if centralized
type Player = {
  player_id: string; 
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

export default function ScoutPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const supabase = createClient();

  useEffect(() => {
    async function fetchPlayers() {
      try {
        // Fetch players joined with profile data
        // Note: 'achievements' is in player_cards. 'avatar_url' is in profiles.
        // Use the RPC for the Fair Shuffle Algorithm
        const { data, error } = await supabase
          .rpc('get_scout_feed');

        if (error) throw error;

        // Fetch profiles for these cards (Manual Join for now to avoid complex SQL types)
        // In production, we'd make a view.
        if (data) {
            const playerIds = data.map((p: any) => p.player_id);
            const { data: profiles } = await supabase.from('profiles').select('id, full_name, avatar_url').in('id', playerIds);
            
            // Merge
            const merged = data.map((p: any) => ({
                ...p,
                profile: profiles?.find((prof: any) => prof.id === p.player_id) || { full_name: 'Unknown', avatar_url: null }
            }));
            setPlayers(merged);
        }
      } catch (error) {
        console.error("Error scouting players:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayers();
  }, [supabase]);

  // Client-side filtering for simplicity for now
  const filteredPlayers = players.filter((p) => 
    p.ign.toLowerCase().includes(search.toLowerCase()) || 
    p.primary_role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Talent Scout</h1>
          <p className="text-muted-foreground flex items-center gap-2">
             Find and recruit top-tier talent. <span className="hidden md:inline"> | </span> 
             <span className="md:hidden"><br/></span>
             <BoostModal />
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by IGN or Role..."
            className="pl-9 bg-white/5 border-white/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
           {filteredPlayers.length > 0 ? (
             filteredPlayers.map((player) => (
               <PlayerCard key={player.player_id} player={player} />
             ))
           ) : (
             <div className="col-span-full text-center text-muted-foreground py-12">
                No players found matching your criteria.
             </div>
           )}
        </div>
      )}
    </div>
  );
}
