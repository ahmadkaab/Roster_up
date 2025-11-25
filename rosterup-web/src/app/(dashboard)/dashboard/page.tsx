"use client";

import { PlayerDashboard } from "@/components/dashboard/PlayerDashboard";
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
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
          <h2 className="text-2xl font-bold">Team Dashboard Coming Soon! 🏆</h2>
          <p className="text-muted-foreground">
            We're building the ultimate recruitment tools for you.
          </p>
        </div>
      )}
    </div>
  );
}
