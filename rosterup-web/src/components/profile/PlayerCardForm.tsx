"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

const games = ["BGMI", "Valorant", "CS2", "Dota 2", "Pokemon Unite", "Free Fire", "COD Mobile"];
const gameRoles = ["IGL", "Entry Fragger", "Support", "Sniper", "Assaulter", "Lurker", "Coach"];

const formSchema = z.object({
  ign: z.string().min(2, "IGN must be at least 2 characters"),
  game: z.string().min(1, "Please select a game"),
  primary_role: z.string().min(1, "Please select a primary role"),
  secondary_role: z.string().optional(),
  kd_ratio: z.coerce.number().min(0).max(100).default(0),
  avg_damage: z.coerce.number().min(0).default(0),
  device_model: z.string().optional(),
  availability: z.string().optional(),
  experience_years: z.coerce.number().min(0).max(20).default(0),
  avatar_url: z.string().optional(),
  achievements: z.array(z.object({ 
    value: z.string().min(1, "Achievement title is required"),
    image: z.string().optional() 
  })).optional(),
  socials: z.object({
    discord: z.string().optional(),
    instagram: z.string().optional(),
    youtube: z.string().optional(),
  }).optional(),
});

type FormData = z.infer<typeof formSchema>;

export function PlayerCardForm({ initialData }: { initialData?: any }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      ign: initialData?.ign || "",
      game: initialData?.game || "BGMI",
      primary_role: initialData?.primary_role || "Entry Fragger",
      secondary_role: initialData?.secondary_role || undefined,
      kd_ratio: initialData?.kd_ratio || 0,
      avg_damage: initialData?.avg_damage || 0,
      device_model: initialData?.device_model || "",
      availability: initialData?.availability || "",
      experience_years: initialData?.experience_years || 0,
      avatar_url: initialData?.avatar_url || "",
      achievements: initialData?.achievements?.map((a: any) => 
        typeof a === 'string' ? { value: a, image: "" } : { value: a.value, image: a.image }
      ) || [],
      socials: initialData?.socials || { discord: "", instagram: "", youtube: "" },
    } as any,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "achievements",
  });

  const onSubmit = async (data: FormData) => {
    if (!user) return;
    setLoading(true);
    setError("");

    try {
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
        experience_years: data.experience_years,
        avatar_url: data.avatar_url,
        achievements: data.achievements || [],
        socials: data.socials,
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Avatar Upload */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <label className="text-sm font-medium">Profile Picture</label>
            <ImageUpload
              bucket="avatars"
              value={form.watch("avatar_url")}
              onChange={(url) => form.setValue("avatar_url", url)}
              onRemove={() => form.setValue("avatar_url", "")}
              className="rounded-full"
            />
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Info</h3>
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
            </div>
          </div>

          {/* Stats & Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stats & Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">K/D Ratio</label>
                <Input
                  type="number"
                  step="0.01"
                  {...form.register("kd_ratio")}
                  placeholder="e.g. 3.5"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Avg Damage</label>
                <Input
                  type="number"
                  {...form.register("avg_damage")}
                  placeholder="e.g. 800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Experience (Years)</label>
                <Input
                  type="number"
                  {...form.register("experience_years")}
                  placeholder="e.g. 2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Device Model</label>
                <Input {...form.register("device_model")} placeholder="e.g. iPhone 14 Pro" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Availability</label>
                <Input {...form.register("availability")} placeholder="e.g. 6pm - 10pm IST" />
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Achievements</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ value: "", image: "" })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-2 rounded-lg border border-white/5 bg-white/5 p-4">
                  <div className="flex gap-2">
                    <Input
                      {...form.register(`achievements.${index}.value`)}
                      placeholder="e.g. PMCO Finalist 2023"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">Proof (Optional):</span>
                    <ImageUpload
                      bucket="achievements"
                      value={form.watch(`achievements.${index}.image`)}
                      onChange={(url) => form.setValue(`achievements.${index}.image`, url)}
                      onRemove={() => form.setValue(`achievements.${index}.image`, "")}
                      className="h-20 w-20"
                    />
                  </div>
                </div>
              ))}
              {fields.length === 0 && (
                <p className="text-sm text-muted-foreground italic">
                  No achievements added yet.
                </p>
              )}
            </div>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Socials</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Discord ID</label>
                <Input {...form.register("socials.discord")} placeholder="username#1234" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Instagram</label>
                <Input {...form.register("socials.instagram")} placeholder="@username" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">YouTube</label>
                <Input {...form.register("socials.youtube")} placeholder="Channel Link" />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
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
