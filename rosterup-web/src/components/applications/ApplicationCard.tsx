import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, CheckCircle2, Clock, Crosshair, XCircle } from "lucide-react";

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

const statusConfig = {
  pending: {
    label: "Pending",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    icon: Clock,
  },
  shortlisted: {
    label: "Shortlisted",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Rejected",
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    icon: XCircle,
  },
  selected: {
    label: "Selected",
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    icon: CheckCircle2,
  },
};

export function ApplicationCard({ application }: { application: Application }) {
  const status = statusConfig[application.status];
  const StatusIcon = status.icon;

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10">
      <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xl">
            {application.recruitments.teams.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              {application.recruitments.teams.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {application.recruitments.games.name}
              </Badge>
              <span>• {application.recruitments.teams.tier} Tier</span>
            </div>
          </div>
        </div>
        <div
          className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${status.color} ${status.bg} ${status.border}`}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          {status.label}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Crosshair className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Role:</span>
            <span className="font-medium">
              {application.recruitments.role_needed}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Applied:</span>
            <span className="font-medium">
              {new Date(application.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
