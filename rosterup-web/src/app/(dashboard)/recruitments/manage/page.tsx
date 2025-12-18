"use client";

import { ApplicantCard } from "@/components/recruitments/ApplicantCard";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

type Applicant = {
  id: string;
  player_id: string;
  status: "pending" | "shortlisted" | "rejected" | "selected";
  created_at: string;
  player: {
    ign: string;
    primary_role: string;
    secondary_role: string | null;
    kd_ratio: number;
    avg_damage: number;
    device_model: string | null;
  };
  recruitment: {
    role_needed: string;
    game: {
      name: string;
    };
  };
};

export default function ManageApplicationsPage() {
  const { user } = useAuth();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchApplicants = async () => {
    if (!user) return;
    
    try {
      // First get the team ID
      const { data: team } = await supabase
        .from("teams")
        .select("id")
        .eq("owner_id", user.id)
        .single();

      if (!team) return;

      // Get all recruitments for this team
      const { data: recruitments } = await supabase
        .from("recruitments")
        .select("id")
        .eq("team_id", team.id);

      if (!recruitments?.length) {
        setLoading(false);
        return;
      }

      const recruitmentIds = recruitments.map(r => r.id);

      // Fetch applications with nested data
      // Note: This query is a bit complex because we need to join multiple tables
      // We'll fetch applications and then join manually or use a complex select if relationships are set up perfectly
      // Let's try a direct join assuming relationships exist
      
      const { data, error } = await supabase
        .from("recruitment_applications")
        .select(`
          id,
          player_id,
          status,
          created_at,
          profile:profiles!player_id (
            player_card:player_cards (
              ign,
              primary_role,
              secondary_role,
              kd_ratio,
              avg_damage,
              device_model
            )
          ),
          recruitment:recruitments!recruitment_id (
            role_needed,
            game:games!game_id (
              name
            )
          )
        `)
        .in("recruitment_id", recruitmentIds)
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform data to match Applicant type
      const formattedApplicants = data.map((app: any) => ({
        id: app.id,
        player_id: app.player_id,
        status: app.status,
        created_at: app.created_at,
        player: app.profile?.player_card?.[0] || app.profile?.player_card || {
          ign: "Unknown",
          primary_role: "Unknown",
          secondary_role: null,
          kd_ratio: 0,
          avg_damage: 0,
          device_model: null,
        },
        recruitment: {
          role_needed: app.recruitment?.role_needed || "Unknown",
          game: {
            name: app.recruitment?.game?.name || "Unknown",
          },
        },
      }));
      
      setApplicants(formattedApplicants as Applicant[]);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [user, supabase]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Manage Applicants</h1>
        <p className="text-muted-foreground">
          Review and select players for your team.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[200px] rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : applicants.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {applicants.map((applicant) => (
            <ApplicantCard 
              key={applicant.id} 
              application={applicant} 
              onUpdate={fetchApplicants}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 text-center">
          <Users className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No pending applicants</h3>
          <p className="text-muted-foreground">
            Wait for players to apply to your recruitments.
          </p>
        </div>
      )}
    </div>
  );
}
