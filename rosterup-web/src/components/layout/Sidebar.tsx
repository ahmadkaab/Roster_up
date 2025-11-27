"use client";

import { NotificationsPopover } from "@/components/notifications/NotificationsPopover";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { ClipboardList, LayoutDashboard, Menu, MessageSquare, PlusCircle, Swords, UserCircle, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const playerNav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Tryouts", href: "/tryouts", icon: Swords },
  { name: "My Applications", href: "/applications", icon: ClipboardList },
  { name: "Profile", href: "/profile", icon: UserCircle },
  { name: "Messages", href: "/messages", icon: MessageSquare },
];

const teamNav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Team", href: "/team/setup", icon: Users },
  { name: "Post Recruitment", href: "/recruitments/new", icon: PlusCircle },
  { name: "Applicants", href: "/recruitments/manage", icon: ClipboardList },
  { name: "Messages", href: "/messages", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useAuth();
  const navItems = profile?.user_type === "team_admin" ? teamNav : playerNav;

  return (
    <div className="hidden border-r border-white/10 bg-white/5 backdrop-blur-md lg:block lg:w-64 lg:flex-col">
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
        <h1 className="text-xl font-bold text-primary">RosterUp</h1>
        <NotificationsPopover />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const navItems = profile?.user_type === "team_admin" ? teamNav : playerNav;

  return (
    <div className="flex h-16 items-center justify-between border-b border-white/10 bg-white/5 px-4 backdrop-blur-md lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 border-white/10 bg-background/95 backdrop-blur-xl p-0">
          <div className="flex h-16 items-center border-b border-white/10 px-6">
            <h1 className="text-xl font-bold text-primary">RosterUp</h1>
          </div>
          <div className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <h1 className="text-lg font-bold text-primary">RosterUp</h1>
      <NotificationsPopover />
    </div>
  );
}
