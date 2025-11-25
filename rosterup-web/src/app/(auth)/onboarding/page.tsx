"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Swords, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user: contextUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  const handleRoleSelection = async (userType: "player" | "team_admin") => {
    setLoading(true);
    setError("");

    try {
      // Get current user directly from Supabase
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error("User error:", userError);
        throw new Error("Not authenticated");
      }

      console.log("Attempting to update profile for user:", user.id, "with type:", userType);

      // Update profile with user_type
      const { data, error: profileError } = await supabase
        .from("profiles")
        .update({
          user_type: userType,
        })
        .eq("id", user.id)
        .select(); // Add select to get the result

      console.log("Supabase update data:", data);
      console.log("Supabase update error:", profileError);

      if (profileError) {
        console.error("Supabase error:", profileError);
        throw profileError;
      }

      console.log("Profile updated, redirecting to dashboard...");
      // Redirect to dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      console.error("Caught error:", error);
      setError(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Choose Your Role</CardTitle>
        <CardDescription>
          Are you a player looking for a team, or a team looking for players?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        <div className="grid gap-4">
          <Button
            variant="outline"
            className="h-auto flex-col gap-3 p-6 border-white/10 bg-white/5 hover:bg-primary/10 hover:border-primary"
            onClick={() => handleRoleSelection("player")}
            disabled={loading}
          >
            <Swords className="h-12 w-12 text-primary" />
            <div className="space-y-1 text-center">
              <h3 className="font-semibold text-lg">I'm a Player</h3>
              <p className="text-sm text-muted-foreground">
                Looking for teams and tryout opportunities
              </p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex-col gap-3 p-6 border-white/10 bg-white/5 hover:bg-primary/10 hover:border-primary"
            onClick={() => handleRoleSelection("team_admin")}
            disabled={loading}
          >
            <Users className="h-12 w-12 text-primary" />
            <div className="space-y-1 text-center">
              <h3 className="font-semibold text-lg">I'm a Team/Org</h3>
              <p className="text-sm text-muted-foreground">
                Looking to recruit players for my team
              </p>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
