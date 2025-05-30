
import { Search, Bell, ChevronDown, UserCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  username?: string;
}

const Header = ({ username = "User" }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="h-16 border-b border-terminal-border bg-white px-4 flex items-center justify-between">
      <div className="w-[320px]">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-terminal-muted-foreground" />
          <Input
            placeholder="Search stocks, markets, news..."
            className="pl-9 bg-terminal-muted border-none h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="text-xs">
          US Market <span className="text-terminal-accent ml-1">OPEN</span>
        </Button>
        <Button variant="outline" size="sm" className="text-xs">
          EUR Market <span className="text-terminal-accent ml-1">OPEN</span>
        </Button>
        <Button variant="outline" size="sm" className="text-xs">
          ASIA Market <span className="text-terminal-muted-foreground ml-1">CLOSED</span>
        </Button>
        
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="ml-2 relative">
          <Bell className="h-5 w-5 text-terminal-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-terminal-accent rounded-full" />
        </Button>
        
        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-2 flex items-center gap-2">
              <UserCircle className="h-6 w-6 text-terminal-muted-foreground" />
              <span className="text-sm font-medium">{username}</span>
              <ChevronDown className="h-4 w-4 text-terminal-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-terminal-negative">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
