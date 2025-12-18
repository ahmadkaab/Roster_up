"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Gamepad2, Trophy, Users } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl filter" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl filter" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl space-y-8"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md"
        >
          <Trophy className="h-4 w-4" />
          <span>The #1 Esports Management Platform</span>
        </motion.div>

        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl">
          Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Dream Team</span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Connect with elite players, manage your roster, and dominate the competition. 
          RosterUp is the ultimate ecosystem for esports organizations and aspiring pros.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg" className="h-12 min-w-[160px] text-base gap-2 shadow-lg shadow-primary/25">
            <Link href="/login?role=team">
              Create Team <Users className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 min-w-[160px] text-base gap-2 border-white/10 bg-white/5 hover:bg-white/10">
            <Link href="/login?role=player">
              Join as Player <Gamepad2 className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Floating Stats/Cards (Decorative) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute left-10 top-1/4 hidden lg:block"
      >
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-500">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Active Players</p>
            <p className="text-xs text-muted-foreground">1,200+ Online</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute right-10 bottom-1/3 hidden lg:block"
      >
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Contracts Signed</p>
            <p className="text-xs text-muted-foreground">$50k+ processed</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
