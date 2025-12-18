"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function DebugPage() {
  const { user, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const supabase = createClient();

  const connectAsTeamAdmin = async () => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({ user_type: "team_admin" })
      .eq("id", user.id);
    
    if (error) setMsg("Error: " + error.message);
    else {
        setMsg("Success! You are now a Team Admin.");
        await refreshProfile();
    }
    setLoading(false);
  };

  const seedProfile = async () => {
    if (!user) return;
    setLoading(true);
    
    // Check if game exists
    const { data: game } = await supabase.from("games").select("id").eq("name", "Valorant").single();
    
    if (!game) {
        setMsg("Error: Valorant game not found in DB");
        setLoading(false);
        return;
    }

    const payload = {
        player_id: user.id,
        ign: "DebugPlayer",
        primary_game_id: game.id,
        primary_role: "IGL",
        kd_ratio: 1.5,
        avg_damage: 500,
        experience_years: 1,
        device_model: "PC"
    };

    const { error } = await supabase
      .from("player_cards")
      .upsert(payload, { onConflict: "player_id" });

    if (error) setMsg("Error seeding profile: " + error.message);
    else setMsg("Success! Profile seeded.");
    
    setLoading(false);
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Debug Tools</h1>
      <div className="flex gap-4">
        <Button onClick={connectAsTeamAdmin} disabled={loading}>
            Make me Team Admin
        </Button>
        <Button onClick={seedProfile} disabled={loading} variant="secondary">
            Seed Player Profile
        </Button>
      </div>
      {msg && <p className="mt-4 font-mono">{msg}</p>}
    </div>
  );
}
