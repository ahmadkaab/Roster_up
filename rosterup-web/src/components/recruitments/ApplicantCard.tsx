"use client";

import { sendEmail } from "@/actions/email";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/contexts/ToastContext";
import { createClient } from "@/lib/supabase/client";
import { Check, Crosshair, Loader2, Swords, Trophy, X } from "lucide-react";
import { useState } from "react";

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

export function ApplicantCard({ 
  application, 
  onUpdate 
}: { 
  application: Applicant;
  onUpdate: () => void;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<"accept" | "reject" | null>(null);
  const supabase = createClient();

  const handleStatusUpdate = async (newStatus: "selected" | "rejected") => {
    setLoading(newStatus === "selected" ? "accept" : "reject");
    try {
      // 1. Update Application Status
      const { error } = await supabase
        .from("recruitment_applications")
        .update({ status: newStatus === "selected" ? "accepted" : "rejected" }) // Map 'selected' to 'accepted' if DB uses 'accepted'
        .eq("id", application.id);

      if (error) throw error;

      // 2. Send Notification to Player
      const notificationMsg = newStatus === "selected" 
        ? `Congratulations! You have been accepted to ${application.recruitment.game.name} roster.`
        : `Update: Your application for ${application.recruitment.game.name} was not selected.`;

      await supabase.from("notifications").insert({
        user_id: application.player_id,
        type: "application_status",
        title: newStatus === "selected" ? "Application Accepted! 🎉" : "Application Update",
        message: notificationMsg,
        link: "/applications",
      });

      // Send Email Notification to Player
      // We need to fetch player's email first.
      const { data: playerData } = await supabase
        .from("profiles")
        .select("email")
        .eq("id", application.player_id)
        .single();

      if (playerData?.email) {
        await sendEmail({
          to: playerData.email,
          subject: newStatus === "selected" ? "You're In! Application Accepted 🎉" : "Application Status Update",
          html: `
            <h1>Application Update</h1>
            <p>Hi ${application.player.ign},</p>
            <p>${notificationMsg}</p>
            <p>Check your dashboard for more details.</p>
          `
        });
      }

      toast(`Applicant ${newStatus === "selected" ? "accepted" : "rejected"} successfully`, "success");
      onUpdate();
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast("Failed to update status", "error");
    } finally {
      setLoading(null);
    }
  };

  if (application.status !== "pending") return null;

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-md">
      <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <h3 className="font-semibold text-lg">{application.player.ign}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {application.recruitment.game.name}
            </Badge>
            <span>• Applied for {application.recruitment.role_needed}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-red-500 hover:bg-red-500/10 hover:text-red-600"
            onClick={() => handleStatusUpdate("rejected")}
            disabled={!!loading}
          >
            {loading === "reject" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-green-500 hover:bg-green-500/10 hover:text-green-600"
            onClick={() => handleStatusUpdate("selected")}
            disabled={!!loading}
          >
            {loading === "accept" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Crosshair className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Role:</span>
            <span className="font-medium">{application.player.primary_role}</span>
          </div>
          <div className="flex items-center gap-2">
            <Swords className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">K/D:</span>
            <span className="font-medium">{application.player.kd_ratio}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-muted-foreground">Avg Dmg:</span>
            <span className="font-medium">{application.player.avg_damage}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Device:</span>
            <span className="font-medium">{application.player.device_model || "N/A"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
