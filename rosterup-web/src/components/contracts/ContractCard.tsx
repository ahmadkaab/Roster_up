"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Banknote, Calendar, Percent, User } from "lucide-react";

type Contract = {
  id: string;
  salary_amount: number;
  currency: string;
  prize_split_percentage: number;
  start_date: string;
  status: string;
  player: {
    full_name: string;
    avatar_url: string | null;
  }
};

export function ContractCard({ contract }: { contract: Contract }) {
  // Format currency
  const formattedSalary = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: contract.currency || "INR",
    maximumFractionDigits: 0
  }).format(contract.salary_amount);

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all hover:bg-white/10">
      <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-emerald-500/10 to-transparent p-4">
        <Avatar className="h-12 w-12 border border-emerald-500/30">
          <AvatarImage src={contract.player.avatar_url || ""} />
          <AvatarFallback className="bg-emerald-500/20 text-emerald-400"><User /></AvatarFallback>
        </Avatar>
        <div className="flex-1">
            <h3 className="font-bold text-white text-lg">{contract.player.full_name}</h3>
            <Badge variant={contract.status === 'active' ? 'default' : 'secondary'} className="bg-emerald-500/20 text-emerald-300 border-0">
                {contract.status.toUpperCase()}
            </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Banknote className="h-3 w-3" /> Monthly Salary</span>
                <span className="font-mono text-xl font-bold text-white">{formattedSalary}</span>
            </div>
             <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Percent className="h-3 w-3" /> Prize Split</span>
                <span className="font-mono text-xl font-bold text-yellow-500">{contract.prize_split_percentage}%</span>
            </div>
        </div>
        
        <div className="text-xs text-muted-foreground flex items-center gap-1 bg-black/20 p-2 rounded">
            <Calendar className="h-3 w-3" />
            Started: {new Date(contract.start_date).toLocaleDateString()}
        </div>
      </CardContent>

      <CardFooter className="p-2 bg-black/10">
        <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-red-400">
            Terminate Contract
        </Button>
      </CardFooter>
    </Card>
  );
}
