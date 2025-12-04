"use client";

import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileRedirectPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function checkProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile, error } = await supabase
        .from("player_cards")
        .select("player_id")
        .eq("player_id", user.id)
        .single();

      if (profile) {
        router.push(`/player/${profile.player_id}`);
      } else {
        router.push("/profile/create");
      }
    }

    checkProfile();
  }, [router, supabase]);

  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
