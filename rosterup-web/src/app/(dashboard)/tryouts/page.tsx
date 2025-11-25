"use client";

import { TryoutCard } from "@/components/tryouts/TryoutCard";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";

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

export default function TryoutsPage() {
  const { user } = useAuth();
  const [tryouts, setTryouts] = useState<Tryout[]>([]);
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Tryouts
        const { data: tryoutsData, error: tryoutsError } = await supabase
          .from("recruitments")
          .select(`
            *,
            teams (name, logo_url, tier),
            games (name)
          `)
          .eq("status", "open")
          .order("created_at", { ascending: false });

        if (tryoutsError) throw tryoutsError;
        setTryouts(tryoutsData as any);

        // Fetch User Applications
        if (user) {
          const { data: applicationsData, error: applicationsError } = await supabase
            .from("recruitment_applications")
            .select("recruitment_id")
            .eq("player_id", user.id);

          if (applicationsError) throw applicationsError;
          
          const ids = new Set(applicationsData.map((app) => app.recruitment_id));
          setAppliedIds(ids);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [supabase, user]);

  const filteredTryouts = tryouts.filter((tryout) =>
    tryout.teams.name.toLowerCase().includes(search.toLowerCase()) ||
    tryout.role_needed.toLowerCase().includes(search.toLowerCase()) ||
    tryout.games.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Tryout Marketplace</h1>
          <p className="text-muted-foreground">
            Find your dream team and start your esports journey.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search teams, roles, games..."
            className="pl-9 bg-white/5 border-white/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[300px] rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : filteredTryouts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTryouts.map((tryout) => (
            <TryoutCard 
              key={tryout.id} 
              tryout={tryout} 
              isApplied={appliedIds.has(tryout.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 text-center">
          <h3 className="text-lg font-semibold">No tryouts found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or check back later.
          </p>
        </div>
      )}
    </div>
  );
}
