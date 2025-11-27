"use client";

import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="relative mb-8">
        <div className="absolute -inset-4 animate-pulse rounded-full bg-primary/20 blur-xl" />
        <div className="relative rounded-full bg-white/5 p-8 backdrop-blur-md border border-white/10">
          <Ghost className="h-16 w-16 text-primary" />
        </div>
      </div>
      
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-white lg:text-5xl">
        404 - Lost in the Void
      </h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you are looking for has been eliminated or never existed. 
        Let's get you back to the lobby.
      </p>

      <div className="flex gap-4">
        <Link href="/dashboard">
          <Button size="lg" className="gap-2">
            Return to Dashboard
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="lg" className="bg-white/5 border-white/10 hover:bg-white/10">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
