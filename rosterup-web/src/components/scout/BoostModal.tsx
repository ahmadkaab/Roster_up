"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Rocket } from "lucide-react";
import { useState } from "react";

export function BoostModal() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState("IN"); // Default India
  const [duration, setDuration] = useState("24"); // Default 24h

  const supabase = createClient();

  // Pricing Logic
  const getPrice = () => {
    if (region === "IN") {
        return duration === "24" ? "₹99" : "₹50";
    } else {
        return duration === "24" ? "$5.00" : "$2.50"; // Higher for global
    }
  };

  /* 
   * PAYMENT INTEGRATION GUIDE
   * 1. Create a Razorpay Account
   * 2. Replace 'YOUR_RAZORPAY_KEY' with your actual public key
   * 3. Uncomment the Razorpay logic below
   */
  const handleBoost = async () => {
    setLoading(true);
    try {
        if (!user) throw new Error("Login required");

        const amount = region === "IN" 
            ? (duration === "24" ? 99 : 50) 
            : (duration === "24" ? 5 : 2.5); // USD logic needed for real gateway
        
        // --- REAL PAYMENT LOGIC START ---
        // const options = {
        //   key: "YOUR_RAZORPAY_KEY",
        //   amount: amount * 100, // Amount in paise
        //   currency: "INR",
        //   name: "RosterUp Boost",
        //   description: `${duration}h Profile Boost`,
        //   handler: async function (response: any) {
        //      // Call backend to verify payment, then:
        //      await activateBoost();
        //   }
        // };
        // const rzp = new (window as any).Razorpay(options);
        // rzp.open();
        // --- REAL PAYMENT LOGIC END ---

        // --- MOCK PAYMENT (CURRENT) ---
        // Simulating network delay for bank processing
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        await activateBoost(); // Directly activate for now
        // -----------------------------

    } catch (error: any) {
        toast("Failed to boost: " + error.message, "error");
        setLoading(false);
    } 
  };

  const activateBoost = async () => {
    try {
        const hoursToAdd = parseInt(duration);
        const boostExpiry = new Date();
        boostExpiry.setHours(boostExpiry.getHours() + hoursToAdd);

        // Update DB
        const { error } = await supabase
            .from("player_cards")
            .update({ boosted_until: boostExpiry.toISOString() })
            .eq("player_id", user?.id);

        if (error) throw error;

        toast(`Profile Boosted!`, "success");
        setOpen(false);
        window.location.reload(); 
    } catch (e: any) {
        toast(e.message, "error");
    } finally {
        setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold border-0">
          <Rocket className="h-4 w-4" /> Boost Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black/90 border-yellow-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-yellow-400 flex items-center gap-2">
            <Rocket className="h-5 w-5" /> Boost Your Visibility
          </DialogTitle>
          <DialogDescription>
            Get seen by top recruiters. Updates instantly.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
            
            {/* Region Selector */}
            <div className="space-y-2">
                <Label>Your Region</Label>
                <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="IN">India (BGMI)</SelectItem>
                        <SelectItem value="GLOBAL">Global (PUBGM)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Duration Selector */}
            <div className="space-y-3">
                <Label>Duration</Label>
                <RadioGroup value={duration} onValueChange={setDuration} className="grid grid-cols-2 gap-4">
                    <div>
                        <RadioGroupItem value="10" id="10h" className="peer sr-only" />
                        <Label
                            htmlFor="10h"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-dashed border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-500/10 [&:has([data-state=checked])]:border-primary"
                        >
                            <span className="mb-1 font-bold">10 Hours</span>
                            <span className="text-xs text-muted-foreground">{region === 'IN' ? '₹50' : '$2.50'}</span>
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="24" id="24h" className="peer sr-only" />
                        <Label
                            htmlFor="24h"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-500/10 [&:has([data-state=checked])]:border-primary"
                        >
                            <span className="mb-1 font-bold">24 Hours</span>
                            <span className="text-xs text-muted-foreground">{region === 'IN' ? '₹99' : '$5.00'}</span>
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <span className="text-muted-foreground">Total to Pay:</span>
                <span className="text-2xl font-bold text-yellow-400">{getPrice()}</span>
            </div>
        </div>

        <Button onClick={handleBoost} disabled={loading} className="w-full bg-yellow-500 text-black hover:bg-yellow-400">
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Confirm Payment"}
        </Button>

      </DialogContent>
    </Dialog>
  );
}
