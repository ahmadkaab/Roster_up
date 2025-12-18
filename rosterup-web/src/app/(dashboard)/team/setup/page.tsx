"use client";

import { RosterGrid } from "@/components/team/RosterGrid";
import { TeamSetupForm } from "@/components/team/TeamSetupForm";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function TeamSetupPage() {
  const { user } = useAuth();
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTeam() {
      if (!user) return;
      
      const { data } = await supabase
        .from("teams")
        .select("*")
        .eq("owner_id", user.id)
        .single();
      
      setTeam(data);
      setLoading(false);
    }
    fetchTeam();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Team Command Center</h1>
        <p className="text-muted-foreground">
          Manage your organization profile and active roster.
        </p>
      </div>
      
      {/* Team Details Form */}
      <TeamSetupForm initialData={team} />

      {/* Roster Grid (Only if team exists) */}
      {team && (
        <RosterGrid teamId={team.id} />
      )}
    </div>
  );
}
