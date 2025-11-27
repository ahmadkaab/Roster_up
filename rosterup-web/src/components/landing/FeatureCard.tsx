"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

export function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full border-white/10 bg-white/5 backdrop-blur-md transition-colors hover:border-primary/50 hover:bg-white/10">
        <CardHeader>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <CardTitle className="text-xl text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
