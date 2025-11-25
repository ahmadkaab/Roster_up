"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { createClient } from "@/lib/supabase/client";
import { Calendar, Check, Crosshair, Loader2, Swords, Trophy, Users } from "lucide-react";
import { useEffect, useState } from "react";

type Tryout = {
  id: string;
  role_needed: string;
  tier_target: string;
  min_kd: number;
  description: string;
  tryout_date: string;
  teams: {
    name: string;
    logo_url: string | null;
    tier: string;
  };
  games: {
    name: string;
  };
};

export function TryoutCard({ tryout, isApplied = false }: { tryout: Tryout; isApplied?: boolean }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(isApplied);
  const supabase = createClient();

  useEffect(() => {
    setApplied(isApplied);
  }, [isApplied]);

  const handleApply = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Check if user has a player card first
      const { data: playerCard } = await supabase
        .from("player_cards")
        .select("id")
        .eq("player_id", user.id)
        .single();

      if (!playerCard) {
        toast("Please create a player card first!", "error");
        return;
      }

      const { error } = await supabase.from("recruitment_applications").insert({
        recruitment_id: tryout.id,
        player_id: user.id,
        status: "pending",
      });

      if (error) throw error;

      setApplied(true);
      toast("Application sent successfully!", "success");
    } catch (error: any) {
      console.error("Error applying:", JSON.stringify(error, null, 2));
      
      // Handle duplicate application (already applied)
      if (error.code === "23505") {
        setApplied(true);
        toast("You have already applied to this tryout!", "info");
        return;
      }

      toast(error.message || "Failed to apply", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-primary/50 hover:bg-white/10">
      <CardHeader className="flex-row gap-4 space-y-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xl">
          {tryout.teams.name.substring(0, 2).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{tryout.teams.name}</h3>
            <Badge variant="outline" className="text-xs">
              {tryout.games.name}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Trophy className="h-3 w-3" />
            <span>{tryout.teams.tier} Tier</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Crosshair className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Role:</span>
            <span className="font-medium">{tryout.role_needed}</span>
          </div>
          <div className="flex items-center gap-2">
            <Swords className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">Min K/D:</span>
            <span className="font-medium">{tryout.min_kd}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="text-muted-foreground">Target:</span>
            <span className="font-medium">{tryout.tier_target}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-400" />
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium">
              {new Date(tryout.tryout_date).toLocaleDateString()}
            </span>
          </div>
        </div>
        {tryout.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {tryout.description}
          </p>
        )}
      </CardContent>
      <CardFooter>
        {applied ? (
          <Button className="w-full gap-2" variant="secondary" disabled>
            <Check className="h-4 w-4" />
            Applied
          </Button>
        ) : (
          <Button className="w-full" onClick={handleApply} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Applying...
              </>
            ) : (
              "Apply Now"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
