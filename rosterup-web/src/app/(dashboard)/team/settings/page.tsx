"use client";

import { TeamSetupForm } from "@/components/team/TeamSetupForm";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function TeamSettingsPage() {
  const { user } = useAuth();
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTeam() {
      if (!user) return;
      const { data, error } = await supabase
        .from("teams")
        .select("*")
        .eq("owner_id", user.id)
        .single();
      
      if (data) setTeam(data);
      if (error) console.error("Error fetching team:", error);
      setLoading(false);
    }
    fetchTeam();
  }, [user, supabase]);

  if (loading) {
    return <div className="text-muted-foreground">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Team Settings</h1>
        <p className="text-muted-foreground">Update your team profile and details.</p>
      </div>
      <TeamSetupForm initialData={team} />
    </div>
  );
}
