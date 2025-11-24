"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, Swords, UserCircle, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Tryouts",
    href: "/tryouts",
    icon: Swords,
  },
  {
    name: "My Team",
    href: "/team",
    icon: Users,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: UserCircle,
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-white/10 bg-background/80 backdrop-blur-lg lg:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
