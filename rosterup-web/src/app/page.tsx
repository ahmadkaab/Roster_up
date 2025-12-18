import { FeatureCard } from "@/components/landing/FeatureCard";
import { HeroSection } from "@/components/landing/HeroSection";
import { ClipboardList, Gamepad2, Search, Shield, Swords, Users } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Talent Scout",
      description: "Actively hunt for top-tier players. Filter by roles, achievements, and verified stats.",
      icon: <Search className="h-6 w-6" />,
    },
    {
      title: "Roster Command",
      description: "Manage your active lineup. Assign roles, handle benchings, and build a cohesive unit.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Financial Contracts",
      description: "Professionalize your team. Track player salaries, prize splits, and contract duration.",
      icon: <ClipboardList className="h-6 w-6" />, /* Changed icon */
    },
    {
      title: "Player Profiles",
      description: "Showcase your stats, achievements, and highlights. Let your performance speak for itself.",
      icon: <Gamepad2 className="h-6 w-6" />,
    },
    {
      title: "BGMI Focused",
      description: "Built specifically for the BGMI ecosystem. No clutter, just tools for the game you play.",
      icon: <Swords className="h-6 w-6" />, /* Reusing Swords for 'Battle' context */
    },
    {
      title: "Verified & Secure",
      description: "Trust and safety first. Verified organizations and secure data handling for peace of mind.",
      icon: <Shield className="h-6 w-6" />,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <HeroSection />

      <section className="container mx-auto px-4 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything You Need to <span className="text-primary">Go Pro</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful tools designed for the next generation of esports athletes and organizations.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/5 py-24 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-8 text-3xl font-bold text-white">Ready to Start Your Journey?</h2>
          <p className="mb-8 mx-auto max-w-2xl text-muted-foreground">
            Join thousands of players and teams already using RosterUp to elevate their game.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
             {/* Reusing buttons from Hero for consistency, or could be a single primary CTA */}
          </div>
        </div>
      </section>
    </main>
  );
}
