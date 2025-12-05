"use client";

import { FriendsList } from "@/components/friends/FriendsList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Crosshair, Edit, Gamepad2, Instagram, Swords, Trophy, User, Youtube } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function PlayerDashboard() {
  const { user } = useAuth();
  const [playerCard, setPlayerCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchPlayerCard() {
      if (!user) return;
      const { data: cardData, error: cardError } = await supabase
        .from("player_cards")
        .select("*, games(name)")
        .eq("player_id", user.id)
        .single();
      
      if (cardData) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .single();
          
        setPlayerCard({ ...cardData, avatar_url: profileData?.avatar_url });
      }
      setLoading(false);
    }
    fetchPlayerCard();
  }, [user, supabase]);

  if (loading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-32 rounded-xl bg-white/5" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-40 rounded-xl bg-white/5" />
        <div className="h-40 rounded-xl bg-white/5" />
      </div>
    </div>;
  }

  if (!playerCard) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
        <div className="rounded-full bg-primary/10 p-4">
          <Gamepad2 className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-xl font-bold">Create Your Player Card</h2>
        <p className="max-w-md text-muted-foreground">
          To start applying for teams, you need to set up your player profile with your stats and roles.
        </p>
        <Link href="/profile/create">
          <Button>Create Profile</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-gradient-to-r from-primary/20 to-accent/20 p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white/20">
            <AvatarImage src={playerCard.avatar_url} />
            <AvatarFallback className="text-lg">{playerCard.ign?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, {playerCard.ign}!</h1>
            <p className="text-white/80">Ready to find your next team?</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/player/${user?.id}`}>
            <Button variant="outline" className="border-white/20 bg-white/10 hover:bg-white/20">
              <User className="mr-2 h-4 w-4" />
              Public Profile
            </Button>
          </Link>
          <Link href="/profile/create">
            <Button variant="outline" className="border-white/20 bg-white/10 hover:bg-white/20">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">K/D Ratio</CardTitle>
            <Swords className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{playerCard.kd_ratio}</div>
            <p className="text-xs text-muted-foreground">Lifetime stats</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Damage</CardTitle>
            <Crosshair className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{playerCard.avg_damage}</div>
            <p className="text-xs text-muted-foreground">Per match</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Primary Role</CardTitle>
            <Gamepad2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{playerCard.primary_role}</div>
            <p className="text-xs text-muted-foreground">
              {playerCard.secondary_role ? `+ ${playerCard.secondary_role}` : "No secondary"}
            </p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Experience</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{playerCard.experience_years || 0} Years</div>
            <p className="text-xs text-muted-foreground">Competitive play</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Achievements */}
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {playerCard.achievements && playerCard.achievements.length > 0 ? (
                playerCard.achievements.map((achievement: any, i: number) => (
                  <Badge key={i} variant="secondary" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
                    <Trophy className="mr-1 h-3 w-3" />
                    {typeof achievement === 'string' ? achievement : achievement.value}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No achievements added yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Socials & Info */}
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Socials & Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              {playerCard.socials?.discord && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="rounded-full bg-[#5865F2]/20 p-2 text-[#5865F2]">
                    <Gamepad2 className="h-4 w-4" />
                  </div>
                  <span>{playerCard.socials.discord}</span>
                </div>
              )}
              {playerCard.socials?.instagram && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="rounded-full bg-[#E1306C]/20 p-2 text-[#E1306C]">
                    <Instagram className="h-4 w-4" />
                  </div>
                  <span>{playerCard.socials.instagram}</span>
                </div>
              )}
              {playerCard.socials?.youtube && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="rounded-full bg-[#FF0000]/20 p-2 text-[#FF0000]">
                    <Youtube className="h-4 w-4" />
                  </div>
                  <a href={playerCard.socials.youtube} target="_blank" rel="noreferrer" className="hover:underline">
                    Channel
                  </a>
                </div>
              )}
            </div>
            <div className="border-t border-white/10 pt-4">
               <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Device:</span>
                  <span>{playerCard.device_model || "Not specified"}</span>
               </div>
               <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Availability:</span>
                  <span>{playerCard.availability || "Not specified"}</span>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>



      {/* Friends Section */}
      <FriendsList />

      {/* Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/tryouts">
          <Card className="group cursor-pointer border-white/10 bg-gradient-to-br from-primary/10 to-transparent transition-all hover:border-primary/50">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="font-semibold text-primary group-hover:underline">Browse Tryouts</h3>
                <p className="text-sm text-muted-foreground">Find teams looking for players like you.</p>
              </div>
              <Swords className="h-8 w-8 text-primary opacity-50 transition-opacity group-hover:opacity-100" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/applications">
          <Card className="group cursor-pointer border-white/10 bg-gradient-to-br from-accent/10 to-transparent transition-all hover:border-accent/50">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="font-semibold text-accent group-hover:underline">My Applications</h3>
                <p className="text-sm text-muted-foreground">Check the status of your applications.</p>
              </div>
              <div className="relative">
                <div className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-accent opacity-50" />
                <div className="h-3 w-3 rounded-full bg-accent" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
