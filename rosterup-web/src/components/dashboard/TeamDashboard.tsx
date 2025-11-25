"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, ClipboardList, Gamepad2, Plus, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Team = {
  id: string;
  name: string;
  tier: string;
  region: string;
  logo_url: string | null;
};

type TeamStats = {
  activeRecruitments: number;
  pendingApplications: number;
};

type RosterPlayer = {
  player_id: string;
  ign: string;
  primary_role: string;
  kd_ratio: number;
  avg_damage: number;
  game_name: string;
};

export function TeamDashboard() {
  const { user } = useAuth();
  const [team, setTeam] = useState<Team | null>(null);
  const [stats, setStats] = useState<TeamStats>({ activeRecruitments: 0, pendingApplications: 0 });
  const [rosterByGame, setRosterByGame] = useState<Record<string, RosterPlayer[]>>({});
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTeamData() {
      if (!user) return;

      try {
        // Fetch Team
        const { data: teamData, error: teamError } = await supabase
          .from("teams")
          .select("*")
          .eq("owner_id", user.id)
          .single();

        if (teamError && teamError.code !== "PGRST116") {
          console.error("Error fetching team:", teamError);
        }

        if (teamData) {
          setTeam(teamData);

          // Fetch Stats
          const { count: recruitmentCount } = await supabase
            .from("recruitments")
            .select("*", { count: "exact", head: true })
            .eq("team_id", teamData.id)
            .eq("status", "open");

          // Fetch Recruitments to get IDs and Game Names
          const { data: recruitments } = await supabase
            .from("recruitments")
            .select("id, games(name)")
            .eq("team_id", teamData.id);
            
          let applicationCount = 0;
          
          if (recruitments && recruitments.length > 0) {
            const ids = recruitments.map(r => r.id);
            
            // Get Pending Applications Count
            const { count } = await supabase
              .from("recruitment_applications")
              .select("*", { count: "exact", head: true })
              .in("recruitment_id", ids)
              .eq("status", "pending");
            applicationCount = count || 0;

            // Get Accepted Applications (Roster)
            const { data: acceptedApps } = await supabase
              .from("recruitment_applications")
              .select("*, player_cards(*)")
              .in("recruitment_id", ids)
              .eq("status", "accepted");

            if (acceptedApps) {
              const grouped: Record<string, RosterPlayer[]> = {};
              
              acceptedApps.forEach(app => {
                const recruitment = recruitments.find(r => r.id === app.recruitment_id);
                const gameName = (recruitment?.games as any)?.name || "Unknown Game";
                
                if (!grouped[gameName]) {
                  grouped[gameName] = [];
                }

                if (app.player_cards) {
                  grouped[gameName].push({
                    player_id: app.player_cards.player_id,
                    ign: app.player_cards.ign,
                    primary_role: app.player_cards.primary_role,
                    kd_ratio: app.player_cards.kd_ratio,
                    avg_damage: app.player_cards.avg_damage,
                    game_name: gameName,
                  });
                }
              });
              setRosterByGame(grouped);
            }
          }

          setStats({
            activeRecruitments: recruitmentCount || 0,
            pendingApplications: applicationCount,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTeamData();
  }, [user, supabase]);

  if (loading) {
    return <div className="text-muted-foreground">Loading team data...</div>;
  }

  if (!team) {
    return (
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-primary">Register Your Team</CardTitle>
          <CardDescription>
            Create your team profile to start recruiting players.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full gap-2">
            <Link href="/team/setup">
              Register Team <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            {team.name} Dashboard 🏆
          </h2>
          <p className="text-muted-foreground">
            Manage your roster and find the best talent.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="gap-2">
            <Link href={`/team/${team.id}`}>
              <Users className="h-4 w-4" />
              Public Page
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/team/settings">
              Edit Team
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Recruitments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {stats.activeRecruitments}
            </div>
            <p className="text-xs text-muted-foreground">Open positions</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {stats.pendingApplications}
            </div>
            <p className="text-xs text-muted-foreground">Waiting for review</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Tier</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {team.tier}
            </div>
            <p className="text-xs text-muted-foreground">{team.region}</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Roster */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">Active Roster</h3>
        
        {Object.keys(rosterByGame).length > 0 ? (
          Object.entries(rosterByGame).map(([game, players]) => (
            <div key={game} className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  <Gamepad2 className="mr-1 h-3 w-3" />
                  {game}
                </Badge>
                <span className="text-sm text-muted-foreground">{players.length} Players</span>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {players.map((player) => (
                  <Card key={player.player_id} className="border-white/10 bg-white/5 backdrop-blur-md">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{player.ign}</CardTitle>
                        <CardDescription>{player.primary_role}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">K/D: {player.kd_ratio}</span>
                        <Link href={`/player/${player.player_id}`} className="text-primary hover:underline">
                          View Profile
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        ) : (
          <Card className="border-dashed border-white/10 bg-white/5">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <Users className="mb-4 h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">No players in your roster yet.</p>
              <Button asChild variant="link" className="mt-2 text-primary">
                <Link href="/recruitments/manage">Review Applications</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Action Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Post New Recruitment</CardTitle>
            <CardDescription>
              Create a new listing to find players for your roster.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full gap-2">
              <Link href="/recruitments/new">
                <Plus className="h-4 w-4" />
                Post Recruitment
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Manage Applications</CardTitle>
            <CardDescription>
              Review and shortlist applicants for your open roles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" className="w-full gap-2">
              <Link href="/recruitments/manage">
                View Applications <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
