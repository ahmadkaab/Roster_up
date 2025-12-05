"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function DebugPage() {
  const { user, profile, refreshProfile } = useAuth();
  const [status, setStatus] = useState("");
  const supabase = createClient();

  const handleUpgrade = async () => {
    if (!user) return;
    setStatus("Upgrading...");
    
    const { error } = await supabase
      .from("profiles")
      .update({ user_type: "team_admin" })
      .eq("id", user.id);

    if (error) {
      setStatus(`Error: ${error.message}`);
    } else {
      setStatus("Success! Refreshing profile...");
      await refreshProfile();
      setStatus("Profile refreshed. Check user_type below.");
    }
  };

  return (
    <div className="p-8 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Debug Role Upgrade</h1>
      <div>
        <p>User ID: {user?.id}</p>
        <p>User Type: {profile?.user_type}</p>
      </div>
      <Button onClick={handleUpgrade}>Upgrade to Team Admin</Button>
      <p className="font-mono bg-black/50 p-2 rounded">{status}</p>
    </div>
  );
}
