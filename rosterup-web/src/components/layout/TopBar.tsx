"use client";

import { NotificationsPopover } from "@/components/notifications/NotificationsPopover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { ClipboardList, LayoutDashboard, Menu, MessageSquare, PlusCircle, Search, Swords, UserCircle, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

export function TopBar() {
  const pathname = usePathname();
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const navItems = profile?.user_type === "team_admin" ? teamNav : playerNav;
  const supabase = createClient();

  useEffect(() => {
    async function getAvatar() {
      if (!profile?.id) return;
      
      const { data } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', profile.id)
        .single();
        
      if (data?.avatar_url) {
        setAvatarUrl(data.avatar_url);
      }
    }
    getAvatar();
  }, [profile, supabase]);

  return (
    <div className="flex h-16 items-center justify-between border-b border-white/10 bg-white/5 px-6 backdrop-blur-md">
      {/* Mobile Menu Trigger */}
      <div className="flex items-center gap-4 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="-ml-2">
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
      </div>

      {/* Desktop Search */}
      <div className="hidden flex-1 items-center gap-4 lg:flex">
        <div className="relative w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tryouts, teams, players..."
            className="pl-9 bg-black/20 border-white/10"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <NotificationsPopover />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent transition-all hover:ring-primary">
              <AvatarImage src={avatarUrl || "https://github.com/shadcn.png"} />
              <AvatarFallback>{profile?.full_name?.slice(0, 2).toUpperCase() || "CN"}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border-white/10 bg-black/90 backdrop-blur-xl">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/10">
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/10">
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              className="cursor-pointer text-red-500 hover:bg-red-500/10 hover:text-red-500 focus:bg-red-500/10 focus:text-red-500"
              onClick={async () => {
                const supabase = createClient();
                await supabase.auth.signOut();
                window.location.href = "/login";
              }}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
