"use client";

import { ImageUpload } from "@/components/ui/image-upload";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const teamTiers = ["T1", "T2", "T3", "T4", "Amateur"] as const;

const formSchema = z.object({
  name: z.string().min(3, "Team name must be at least 3 characters"),
  tier: z.enum(teamTiers),
  region: z.string().min(2, "Region is required"),
  logo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

export function TeamSetupForm({ initialData }: { initialData?: any }) {
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      tier: initialData?.tier || "Amateur",
      region: initialData?.region || "India",
      logo_url: initialData?.logo_url || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user) return;
    setLoading(true);

    try {
      const payload = {
        owner_id: user.id,
        name: data.name,
        tier: data.tier,
        region: data.region,
        logo_url: data.logo_url || null,
      };

      let error;

      if (initialData?.id) {
        // Update existing team
        const { error: updateError } = await supabase
          .from("teams")
          .update(payload)
          .eq("id", initialData.id);
        error = updateError;
      } else {
        // Create new team
        // Create new team
        const { error: insertError } = await supabase
          .from("teams")
          .insert(payload);
        error = insertError;

        // Upgrade user to team_admin if not already
        if (!error) {
          const { error: profileError } = await supabase
            .from("profiles")
            .update({ user_type: "team_admin" })
            .eq("id", user.id);
          
          if (profileError) console.error("Error upgrading user role:", profileError);
        }
      }

      if (error) throw error;

      toast(
        initialData
          ? "Team updated successfully!"
          : "Team created successfully!",
        "success"
      );
      await refreshProfile();
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      console.error("Error saving team:", error);
      toast(error.message || "Failed to save team", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-md">
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit Team Profile" : "Team Registration"}
        </CardTitle>
        <CardDescription>
          {initialData
            ? "Update your team details."
            : "Register your organization to start recruiting players."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Team Name</label>
            <Input
              {...form.register("name")}
              placeholder="e.g. GodLike Esports"
            />
            {form.formState.errors.name && (
              <p className="text-xs text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tier</label>
              <select
                {...form.register("tier")}
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
              <label className="text-sm font-medium">Region</label>
              <Input {...form.register("region")} placeholder="e.g. India" />
              {form.formState.errors.region && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.region.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Team Logo</label>
            <ImageUpload
              bucket="avatars"
              value={form.watch("logo_url") || ""}
              onChange={(url) => form.setValue("logo_url", url)}
              onRemove={() => form.setValue("logo_url", "")}
              className="h-32 w-32 rounded-full"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {initialData ? "Updating..." : "Creating Team..."}
                </>
              ) : (
                <>
                  <Users className="mr-2 h-4 w-4" />
                  {initialData ? "Save Changes" : "Register Team"}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
