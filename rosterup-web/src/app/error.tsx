"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="relative mb-8">
        <div className="absolute -inset-4 animate-pulse rounded-full bg-destructive/20 blur-xl" />
        <div className="relative rounded-full bg-white/5 p-8 backdrop-blur-md border border-white/10">
          <AlertTriangle className="h-16 w-16 text-destructive" />
        </div>
      </div>

      <h1 className="mb-2 text-4xl font-bold tracking-tight text-white lg:text-5xl">
        System Failure
      </h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        Something went wrong on our end. We've logged the error and dispatched a repair drone.
      </p>

      <div className="flex gap-4">
        <Button onClick={reset} size="lg" className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="bg-white/5 border-white/10 hover:bg-white/10"
          onClick={() => window.location.href = "/dashboard"}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
