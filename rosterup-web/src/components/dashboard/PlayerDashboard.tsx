"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Edit, Swords, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type PlayerCard = {
  id: string;
  ign: string;
  primary_role: string;
  kd_ratio: number;
  avg_damage: number;
};

export function PlayerDashboard() {
  const { user } = useAuth();
  const [playerCard, setPlayerCard] = useState<PlayerCard | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchPlayerCard() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("player_cards")
          .select("*")
          .eq("player_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching player card:", error);
        }

        if (data) {
          setPlayerCard(data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayerCard();
  }, [user, supabase]);

  if (loading) {
    return <div className="text-muted-foreground">Loading player data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Welcome back, {playerCard?.ign || "Player"}! 👋
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your gaming career.
          </p>
        </div>
        {playerCard && (
          <Button asChild variant="outline" className="gap-2">
            <Link href="/profile/edit">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">K/D Ratio</CardTitle>
            <Swords className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {playerCard?.kd_ratio || "-"}
            </div>
            <p className="text-xs text-muted-foreground">Lifetime stats</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Damage</CardTitle>
            <Swords className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {playerCard?.avg_damage || "-"}
            </div>
            <p className="text-xs text-muted-foreground">Per match</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Role</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {playerCard?.primary_role || "-"}
            </div>
            <p className="text-xs text-muted-foreground">Primary role</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {!playerCard && (
          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-primary">
                Complete Your Profile
              </CardTitle>
              <CardDescription>
                Create your player card to start applying for teams.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full gap-2">
                <Link href="/profile/create">
                  Create Player Card <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Find Teams</CardTitle>
            <CardDescription>
              Browse active tryouts and find your next squad.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" className="w-full gap-2">
              <Link href="/tryouts">
                Browse Tryouts <Swords className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
