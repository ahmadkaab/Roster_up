"use client";

import { ApplicationCard } from "@/components/applications/ApplicationCard";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Application = {
  id: string;
  status: "pending" | "shortlisted" | "rejected" | "selected";
  created_at: string;
  recruitments: {
    role_needed: string;
    teams: {
      name: string;
      logo_url: string | null;
      tier: string;
    };
    games: {
      name: string;
    };
  };
};

export default function ApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchApplications() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("recruitment_applications")
          .select(`
            id,
            status,
            created_at,
            recruitments (
              role_needed,
              teams (name, logo_url, tier),
              games (name)
            )
          `)
          .eq("player_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setApplications(data as any);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, [supabase, user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">My Applications</h1>
        <p className="text-muted-foreground">
          Track the status of your team applications.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-[150px] rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : applications.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      ) : (
        <div className="flex h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 text-center">
          <FileText className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No applications yet</h3>
          <p className="text-muted-foreground mb-4">
            You haven't applied to any teams yet.
          </p>
          <Link 
            href="/tryouts" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Browse Tryouts
          </Link>
        </div>
      )}
    </div>
  );
}
