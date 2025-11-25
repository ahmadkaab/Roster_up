"use client";

import { PlayerDashboard } from "@/components/dashboard/PlayerDashboard";
import { TeamDashboard } from "@/components/dashboard/TeamDashboard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, profile, signOut, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Top Bar Actions */}
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-muted-foreground hover:text-destructive">
          Sign Out
        </Button>
      </div>

      {profile?.user_type === "player" ? (
        <PlayerDashboard />
      ) : (
        <TeamDashboard />
      )}
    </div>
  );
}
