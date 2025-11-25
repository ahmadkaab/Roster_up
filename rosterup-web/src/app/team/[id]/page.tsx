"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Gamepad2, Globe, MapPin, Shield, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Team = {
  id: string;
  name: string;
  tier: string;
  region: string;
  logo_url: string | null;
};

type RosterPlayer = {
  player_id: string;
  ign: string;
  primary_role: string;
  kd_ratio: number;
  avg_damage: number;
  game_name: string;
};

export default function PublicTeamPage() {
  const params = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [rosterByGame, setRosterByGame] = useState<Record<string, RosterPlayer[]>>({});
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTeamData() {
      if (!params.id) return;

      try {
        // 1. Fetch Team Details
        const { data: teamData, error: teamError } = await supabase
          .from("teams")
          .select("*")
          .eq("id", params.id)
          .single();

        if (teamError) throw teamError;
        setTeam(teamData);

        // 2. Fetch Accepted Applications with Game Info
        // We need to join: applications -> recruitments -> games
        const { data: apps, error: appsError } = await supabase
          .from("recruitment_applications")
          .select(`
            player_cards (
              player_id,
              ign,
              primary_role,
              kd_ratio,
              avg_damage
            ),
            recruitments (
              games (
                name
              )
            )
          `)
          .eq("status", "accepted")
          // We can't directly filter by team_id on applications, so we rely on the join or 
          // we fetch recruitments for this team first. 
          // A better approach with current schema:
          // Get recruitments for this team -> Get accepted apps for those recruitments.
        
        // Let's retry the query strategy to be safe with Supabase constraints
        const { data: recruitments } = await supabase
          .from("recruitments")
          .select("id, games(name)")
          .eq("team_id", params.id);

        if (recruitments && recruitments.length > 0) {
          const recruitmentIds = recruitments.map(r => r.id);
          const { data: acceptedApps } = await supabase
            .from("recruitment_applications")
            .select("*, player_cards(*)")
            .in("recruitment_id", recruitmentIds)
            .eq("status", "accepted");

          if (acceptedApps) {
            const grouped: Record<string, RosterPlayer[]> = {};
            
            acceptedApps.forEach(app => {
              // Find the game for this application
              const recruitment = recruitments.find(r => r.id === app.recruitment_id);
              // Supabase returns an array for joined tables if not using !inner or single()
              // In this case, games is likely an object because it's a foreign key relation, but let's be safe
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

      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTeamData();
  }, [params.id, supabase]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse space-y-4">
          <div className="h-32 w-96 rounded-xl bg-white/5" />
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <h1 className="text-2xl font-bold text-destructive">Team Not Found</h1>
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Team Profile Header */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/10 via-background to-accent/5 p-8 md:p-12">
          <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:items-start">
            {/* Logo */}
            <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/10 bg-black/40 shadow-2xl">
              {team.logo_url ? (
                <img src={team.logo_url} alt={team.name} className="h-full w-full object-cover" />
              ) : (
                <Shield className="h-16 w-16 text-primary" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">{team.name}</h1>
                <div className="mt-2 flex flex-wrap justify-center gap-3 md:justify-start">
                  <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
                    <Trophy className="mr-1 h-3 w-3" />
                    {team.tier}
                  </Badge>
                  <Badge variant="outline" className="border-white/20">
                    <MapPin className="mr-1 h-3 w-3" />
                    {team.region}
                  </Badge>
                  <Badge variant="outline" className="border-white/20">
                    <Globe className="mr-1 h-3 w-3" />
                    Global Rank #--
                  </Badge>
                </div>
              </div>
              <p className="max-w-2xl text-muted-foreground">
                Professional esports organization competing at the highest level. 
                Always looking for top-tier talent to join our ranks.
              </p>
            </div>

            {/* Stats/Actions */}
            <div className="flex flex-col gap-3">
               <Button className="w-full md:w-auto">Apply to Join</Button>
               <Button variant="outline" className="w-full md:w-auto">Contact Manager</Button>
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        </div>

        {/* Rosters Section */}
        <div className="space-y-10">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Active Rosters</h2>
          </div>

          {Object.keys(rosterByGame).length > 0 ? (
            Object.entries(rosterByGame).map(([game, players]) => (
              <div key={game} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                    <Gamepad2 className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{game} Roster</h3>
                  <Badge variant="secondary" className="ml-2">{players.length} Players</Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {players.map((player) => (
                    <Link href={`/player/${player.player_id}`} key={player.player_id}>
                      <Card className="group h-full cursor-pointer border-white/10 bg-white/5 transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-white/10">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{player.ign}</CardTitle>
                            <Badge variant="outline" className="border-white/10 bg-black/20">
                              {player.primary_role}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="rounded-md bg-black/20 p-2 text-center">
                              <div className="text-xs text-muted-foreground">K/D</div>
                              <div className="font-bold text-primary">{player.kd_ratio}</div>
                            </div>
                            <div className="rounded-md bg-black/20 p-2 text-center">
                              <div className="text-xs text-muted-foreground">DMG</div>
                              <div className="font-bold text-accent">{player.avg_damage}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 p-12 text-center">
              <Users className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="text-xl font-semibold">No Active Roster</h3>
              <p className="text-muted-foreground">This team hasn't added any players yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
