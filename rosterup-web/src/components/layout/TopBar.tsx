import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";

export function TopBar() {
  return (
    <div className="flex h-16 items-center justify-between border-b border-white/10 bg-white/5 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4 lg:hidden">
        <h1 className="text-lg font-bold text-primary">RosterUp</h1>
      </div>
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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent transition-all hover:ring-primary">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
