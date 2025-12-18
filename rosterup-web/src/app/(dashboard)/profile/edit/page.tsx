"use client";

import { PlayerCardForm } from "@/components/profile/PlayerCardForm";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      const { data, error } = await supabase
        .from("player_cards")
        .select("*, games(name)")
        .eq("player_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        // If no profile found, redirect to create
        router.push("/profile/create");
        return;
      }

      if (data) {
        // Transform data if necessary to match form schema
        // The form expects 'game' name, but we might have game_id or joined game object
        // The form logic handles 'game' string lookup.
        // We need to map the joined game name back to 'game' field if possible, 
        // or ensure the form uses the correct field.
        // Looking at PlayerCardForm, it uses 'game' string and looks up ID.
        // So we should set 'game' to data.games.name
        
        setProfile({
            ...data,
            game: data.games?.name || "BGMI" // Default fallback
        });
      }
      setLoading(false);
    }

    fetchProfile();
  }, [user, supabase, router]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Edit Profile</h1>
        <p className="text-muted-foreground">
          Update your stats and details.
        </p>
      </div>
      <PlayerCardForm initialData={profile} />
    </div>
  );
}
