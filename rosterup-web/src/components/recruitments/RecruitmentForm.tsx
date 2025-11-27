"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
  tryout_date: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Tryout date must be in the future",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function RecruitmentForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [teamId, setTeamId] = useState<string | null>(null);
  const supabase = createClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      game: "BGMI",
      role_needed: "Entry Fragger",
      tier_target: "T1",
      min_kd: 3.0,
      description: "",
      tryout_date: "",
    },
  });

  useEffect(() => {
    async function fetchTeam() {
      if (!user) return;
      const { data, error } = await supabase
        .from("teams")
        .select("id")
        .eq("owner_id", user.id)
        .single();
      
      if (data) setTeamId(data.id);
      if (error) console.error("Error fetching team:", error);
    }
    fetchTeam();
  }, [user, supabase]);

  const onSubmit = async (data: FormData) => {
    if (!user || !teamId) {
      toast("You must have a registered team to post recruitments", "error");
      return;
    }
    setLoading(true);

    try {
      // Get Game ID
      const { data: gameData, error: gameError } = await supabase
        .from("games")
        .select("id")
        .eq("name", data.game)
        .single();

      if (gameError) throw new Error("Game not found");

      const payload = {
        team_id: teamId,
        game_id: gameData.id,
        role_needed: data.role_needed,
        tier_target: data.tier_target,
        min_kd: data.min_kd,
        description: data.description,
        tryout_date: new Date(data.tryout_date).toISOString(),
        status: "open",
      };

      const { error } = await supabase
        .from("recruitments")
        .insert(payload);

      if (error) throw error;

      toast("Recruitment posted successfully!", "success");
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      console.error("Error posting recruitment:", error);
      toast(error.message || "Failed to post recruitment", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!teamId && !loading) {
    // Ideally show a loading state first, but if null after fetch, show error
  }

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-md">
      <CardHeader>
        <CardTitle>Post New Recruitment</CardTitle>
        <CardDescription>
          Find the perfect player for your roster.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Game</label>
              <select
                {...form.register("game")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {gamesList.map((game) => (
                  <option key={game} value={game}>
                    {game}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Role Needed</label>
              <select
                {...form.register("role_needed")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {gameRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Target Tier</label>
              <select
                {...form.register("tier_target")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {teamTiers.map((tier) => (
                  <option key={tier} value={tier}>
                    {tier}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum K/D</label>
              <Input
                type="number"
                step="0.1"
                {...form.register("min_kd")}
                placeholder="e.g. 3.0"
              />
              {form.formState.errors.min_kd && (
                <p className="text-xs text-destructive">{form.formState.errors.min_kd.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tryout Date</label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="date"
                className="pl-9"
                {...form.register("tryout_date")}
              />
            </div>
            {form.formState.errors.tryout_date && (
              <p className="text-xs text-destructive">{form.formState.errors.tryout_date.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              {...form.register("description")}
              placeholder="Describe what you are looking for..."
              className="min-h-[100px]"
            />
            {form.formState.errors.description && (
              <p className="text-xs text-destructive">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading} className="w-full md:w-auto">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Post Recruitment
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
