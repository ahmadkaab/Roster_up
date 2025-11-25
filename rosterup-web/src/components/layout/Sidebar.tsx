"use client";

import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { ClipboardList, LayoutDashboard, MessageSquare, PlusCircle, Swords, UserCircle, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NotificationsPopover } from "@/components/notifications/NotificationsPopover";

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useAuth();

  const playerNav = [
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
      name: "My Applications",
      href: "/applications",
      icon: ClipboardList,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: UserCircle,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: MessageSquare,
    },
  ];

  const teamNav = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Team",
      href: "/team/setup",
      icon: Users,
    },
    {
      name: "Post Recruitment",
      href: "/recruitments/new",
      icon: PlusCircle,
    },
    {
      name: "Applicants",
      href: "/recruitments/manage",
      icon: ClipboardList,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: MessageSquare,
    },
  ];

  const navItems = profile?.user_type === "team_admin" ? teamNav : playerNav;

  return (
    <div className="hidden border-r border-white/10 bg-white/5 backdrop-blur-md lg:block lg:w-64 lg:flex-col">
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
        <h1 className="text-xl font-bold text-primary">RosterUp</h1>
        <NotificationsPopover />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
