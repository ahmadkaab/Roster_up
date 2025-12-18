"use client";

import { ContractCard } from "@/components/contracts/ContractCard";
import { CreateContractModal } from "@/components/contracts/CreateContractModal";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

export default function ContractsPage() {
  const { user } = useAuth();
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchContracts = async () => {
    if (!user) return;
    
    // Get Team ID first (or join)
    // Simplifying query for brevity
    const { data, error } = await supabase
      .from("contracts")
      .select(`
          *,
          player:profiles!player_id (
              full_name,
              avatar_url
          )
      `)
      .order("created_at", { ascending: false });

    if (data) setContracts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchContracts();
  }, [user]);

  // Calculate totals
  const totalPayroll = contracts.reduce((acc, curr) => acc + (Number(curr.salary_amount) || 0), 0);
  const formattedPayroll = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalPayroll);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Financial Contracts</h1>
          <p className="text-muted-foreground">
            Manage player salaries and legal agreements.
          </p>
        </div>
        <CreateContractModal onContractCreated={fetchContracts} />
      </div>

      {/* Financial Overview Card */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-900/10 border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-emerald-400 font-medium flex items-center gap-2">
                <Wallet className="h-4 w-4" /> Monthly Payroll
            </h3>
            <p className="text-4xl font-mono font-bold text-white mt-2">{formattedPayroll}</p>
            <p className="text-xs text-muted-foreground mt-1">Total active commitments</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        ) : contracts.length > 0 ? (
            contracts.map(c => <ContractCard key={c.id} contract={c} />)
        ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground bg-white/5 rounded-xl border border-white/10 border-dashed">
                No active contracts. Start by hiring a player.
            </div>
        )}
      </div>
    </div>
  );
}
