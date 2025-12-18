"use client";

import { AddFriendButton } from "@/components/friends/AddFriendButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Crosshair, Gamepad2, Instagram, MessageSquare, Swords, Trophy, Youtube } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PublicProfilePage() {
  const params = useParams();
  const router = useRouter();

  const { user } = useAuth();
  const [playerCard, setPlayerCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchPlayerCard() {
      if (!params.id) return;
      
      // We assume the ID in the URL is the player_id (user_id)
      const { data, error } = await supabase
        .from("player_cards")
        .select("*, games(name)")
        .eq("player_id", params.id)
        .single();
      
      if (data) setPlayerCard(data);
      if (error) console.error("Error fetching player:", error);
      setLoading(false);
    }
    fetchPlayerCard();
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

  if (!playerCard) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <h1 className="text-2xl font-bold text-destructive">Player Not Found</h1>
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-gradient-to-b from-primary/10 to-transparent p-8 text-center md:flex-row md:text-left">
          <div className="relative h-24 w-24">
            <Avatar className="h-24 w-24 border-4 border-primary/10">
              <AvatarImage src={playerCard.avatar_url} />
              <AvatarFallback className="bg-primary/20 text-2xl text-primary">
                {playerCard.ign?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-white">{playerCard.ign}</h1>
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              <Badge variant="outline" className="border-primary/50 text-primary">
                {playerCard.games?.name || "Gamer"}
              </Badge>
              <Badge variant="secondary">{playerCard.primary_role}</Badge>
              {playerCard.secondary_role && (
                <Badge variant="outline">{playerCard.secondary_role}</Badge>
              )}
            </div>
          </div>


          <div className="flex gap-4">
            {user && user.id !== playerCard.player_id && (
              <>
                <AddFriendButton friendId={playerCard.player_id} />
                <Button 
                  onClick={async () => {
                  try {
                    // 1. Check if conversation exists
                    // We need to check both combinations: (me, them) or (them, me)
                    const { data: existingConvs } = await supabase
                      .from("conversations")
                      .select("id")
                      .or(`and(user1_id.eq.${user.id},user2_id.eq.${playerCard.player_id}),and(user1_id.eq.${playerCard.player_id},user2_id.eq.${user.id})`);
                    
                    let conversationId;

                    if (existingConvs && existingConvs.length > 0) {
                      conversationId = existingConvs[0].id;
                    } else {
                      // 2. Create new conversation
                      const { data: newConv, error } = await supabase
                        .from("conversations")
                        .insert({
                          user1_id: user.id,
                          user2_id: playerCard.player_id,
                        })
                        .select()
                        .single();
                      
                      if (error) throw error;
                      conversationId = newConv.id;
                    }

                    // 3. Redirect to chat
                    router.push(`/messages?c=${conversationId}`);
                  } catch (error) {
                    console.error("Error starting conversation:", error);
                  }
                }}
                className="gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Message
              </Button>
              </>
              </>
            )}
            {user && user.id === playerCard.player_id && (
              <Link href="/profile/edit">
                <Button variant="outline" className="gap-2">
                  <Gamepad2 className="h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
            )}
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
              <div className="text-3xl font-bold">{playerCard.kd_ratio}</div>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Damage</CardTitle>
              <Crosshair className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{playerCard.avg_damage}</div>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Experience</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{playerCard.experience_years || 0} Yrs</div>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Device</CardTitle>
              <Gamepad2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium truncate" title={playerCard.device_model}>
                {playerCard.device_model || "Unknown"}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Achievements */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-md md:col-span-2">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {playerCard.achievements && playerCard.achievements.length > 0 ? (
                  playerCard.achievements.map((achievement: any, i: number) => (
                    <Badge key={i} className="bg-yellow-500/10 px-3 py-1 text-base text-yellow-500 hover:bg-yellow-500/20">
                      <Trophy className="mr-2 h-4 w-4" />
                      {typeof achievement === 'string' ? achievement : achievement.value}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground">No achievements listed.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Socials & Availability */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Connect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {playerCard.socials?.discord && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5865F2]/20 text-[#5865F2]">
                      <Gamepad2 className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{playerCard.socials.discord}</span>
                  </div>
                )}
                {playerCard.socials?.instagram && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E1306C]/20 text-[#E1306C]">
                      <Instagram className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{playerCard.socials.instagram}</span>
                  </div>
                )}
                {playerCard.socials?.youtube && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF0000]/20 text-[#FF0000]">
                      <Youtube className="h-4 w-4" />
                    </div>
                    <a 
                      href={playerCard.socials.youtube} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="font-medium hover:underline hover:text-primary transition-colors"
                    >
                      View Channel
                    </a>
                  </div>
                )}
                {!playerCard.socials?.discord && !playerCard.socials?.instagram && !playerCard.socials?.youtube && (
                  <p className="text-sm text-muted-foreground">No social links added.</p>
                )}
              </div>

              <div className="rounded-lg bg-white/5 p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Availability</p>
                <p className="mt-1 font-medium">{playerCard.availability || "Not specified"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
