"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { createClient } from "@/lib/supabase/client";
import { Loader2, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Define form types manually or via Zod
type FormData = {
  player_id: string;
  salary_amount: string;
  prize_split: string;
  start_date: string;
  end_date: string;
};

export function CreateContractModal({ onContractCreated }: { onContractCreated: () => void }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const supabase = createClient();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [selectedPlayer, setSelectedPlayer] = useState("");

  // Fetch team members to contract
  useEffect(() => {
    async function fetchMembers() {
      if (!user) return;
      // Get owner's team first
      const { data: team } = await supabase.from("teams").select("id").eq("owner_id", user.id).single();
      if (!team) return;

      const { data: members } = await supabase
        .from("team_members")
        .select(`
            player_id,
            player:profiles!player_id (full_name, avatar_url)
        `)
        .eq("team_id", team.id);
      
      if (members) setTeamMembers(members);
    }
    if (open) fetchMembers();
  }, [user, open]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
       const { data: team } = await supabase.from("teams").select("id").eq("owner_id", user?.id).single();
       if (!team) throw new Error("Team not found");

       const { error } = await supabase.from("contracts").insert({
         team_id: team.id,
         player_id: selectedPlayer,
         salary_amount: parseFloat(data.salary_amount),
         currency: "INR",
         prize_split_percentage: parseInt(data.prize_split),
         start_date: new Date(data.start_date).toISOString(),
         end_date: data.end_date ? new Date(data.end_date).toISOString() : null,
         status: "active"
       });

       if (error) throw error;
       
       toast("Contract Signed!", "success");
       setOpen(false);
       reset();
       onContractCreated();
    } catch (error: any) {
        toast(error.message, "error");
    } finally {
        setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
            <PlusCircle className="h-4 w-4" /> New Contract
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black/90 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Draft New Contract</DialogTitle>
          <DialogDescription>
            Set financial terms for your player.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          
          <div className="space-y-2">
            <Label>Player</Label>
            <Select onValueChange={setSelectedPlayer} required>
                <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                    {teamMembers.map((m) => (
                        <SelectItem key={m.player_id} value={m.player_id}>
                            {m.player.full_name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Monthly Salary (₹)</Label>
                <Input {...register("salary_amount", { required: true })} type="number" placeholder="25000" className="bg-white/5" />
            </div>
            <div className="space-y-2">
                <Label>Prize Split (%)</Label>
                <Input {...register("prize_split")} type="number" placeholder="20" className="bg-white/5" />
            </div>
          </div>

          <div className="space-y-2">
             <Label>Start Date</Label>
             <Input {...register("start_date", { required: true })} type="date" className="bg-white/5" />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Sign Contract"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
