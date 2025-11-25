"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>

      <Card className="border-white/10 bg-white/5 backdrop-blur-md">
        <CardHeader>
          <CardTitle>Welcome to RosterUp! 🎮</CardTitle>
          <CardDescription>
            You're logged in as a {profile?.user_type || "user"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Email:</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">User Type:</p>
            <p className="font-medium capitalize">{profile?.user_type || "Not set"}</p>
          </div>
          <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
            <p className="text-sm text-primary">
              🚧 This is a placeholder dashboard. Phase 3 will add the full player/team experience!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
