"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const gameRoles = ['IGL', 'Scout', 'Sniper', 'Support', 'Flex', 'Entry Fragger'] as const;
const games = ['BGMI', 'Valorant', 'Free Fire', 'COD Mobile'] as const;

const formSchema = z.object({
  ign: z.string().min(2, "IGN must be at least 2 characters"),
  game: z.enum(games).default('BGMI'),
  primary_role: z.enum(gameRoles),
  secondary_role: z.enum(gameRoles).optional(),
  kd_ratio: z.coerce.number().min(0, "K/D must be positive").max(100, "K/D seems too high"),
  avg_damage: z.coerce.number().min(0, "Damage must be positive"),
  device_model: z.string().optional(),
  availability: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function PlayerCardForm({ initialData }: { initialData?: any }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ign: initialData?.ign || "",
      game: initialData?.game || "BGMI",
      primary_role: initialData?.primary_role || "Entry Fragger",
      secondary_role: initialData?.secondary_role || undefined,
      kd_ratio: initialData?.kd_ratio || 0,
      avg_damage: initialData?.avg_damage || 0,
      device_model: initialData?.device_model || "",
      availability: initialData?.availability || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user) return;
    setLoading(true);
    setError("");

    try {
      // First get the game ID (simplified: assuming we know the ID or just storing the name if schema allowed, 
      // but schema requires UUID. For MVP, let's fetch the game ID first)
      
      const { data: gameData, error: gameError } = await supabase
        .from("games")
        .select("id")
        .eq("name", data.game)
        .single();

      if (gameError) throw new Error("Game not found");

      const payload = {
        player_id: user.id,
        ign: data.ign,
        primary_game_id: gameData.id,
        primary_role: data.primary_role,
        secondary_role: data.secondary_role || null,
        kd_ratio: data.kd_ratio,
        avg_damage: data.avg_damage,
        device_model: data.device_model,
        availability: data.availability,
      };

      const { error: upsertError } = await supabase
        .from("player_cards")
        .upsert(payload, { onConflict: "player_id" });

      if (upsertError) throw upsertError;

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-md">
      <CardHeader>
        <CardTitle>Player Profile</CardTitle>
        <CardDescription>
          Create your player card to showcase your stats and find a team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">In-Game Name (IGN)</label>
              <Input {...form.register("ign")} placeholder="e.g. Jonathan" />
              {form.formState.errors.ign && (
                <p className="text-xs text-destructive">{form.formState.errors.ign.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Game</label>
              <select
                {...form.register("game")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {games.map((game) => (
                  <option key={game} value={game}>
                    {game}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Role</label>
              <select
                {...form.register("primary_role")}
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
              <label className="text-sm font-medium">Secondary Role (Optional)</label>
              <select
                {...form.register("secondary_role")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">None</option>
                {gameRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">K/D Ratio</label>
              <Input
                type="number"
                step="0.01"
                {...form.register("kd_ratio")}
                placeholder="e.g. 3.5"
              />
              {form.formState.errors.kd_ratio && (
                <p className="text-xs text-destructive">{form.formState.errors.kd_ratio.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Avg Damage</label>
              <Input
                type="number"
                {...form.register("avg_damage")}
                placeholder="e.g. 800"
              />
              {form.formState.errors.avg_damage && (
                <p className="text-xs text-destructive">{form.formState.errors.avg_damage.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Device Model</label>
              <Input {...form.register("device_model")} placeholder="e.g. iPhone 14 Pro" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Availability</label>
              <Input {...form.register("availability")} placeholder="e.g. 6pm - 10pm IST" />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading} className="w-full md:w-auto">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
