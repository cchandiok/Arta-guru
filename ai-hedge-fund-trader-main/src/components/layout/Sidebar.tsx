
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Home,
  PieChart,
  Newspaper,
  Bell,
  LineChart,
  Search,
  BookOpen,
  ListFilter,
  Star,
  DollarSign,
  FileText,
  Briefcase,
  Globe,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Navigation items for the sidebar
const mainNavItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: LineChart, label: "Markets", href: "/markets" },
  { icon: PieChart, label: "Stocks", href: "/stocks" },
  { icon: Search, label: "Screener", href: "/screener" },
  { icon: Star, label: "Watchlists", href: "/watchlists" },
  { icon: Newspaper, label: "News", href: "/news" },
  { icon: Bell, label: "Alerts", href: "/alerts" },
];

const insightsNavItems = [
  { icon: DollarSign, label: "AI Insights", href: "/ai-insights" },
  { icon: FileText, label: "SEC Filings", href: "/sec-filings" },
  { icon: BookOpen, label: "Company Profiles", href: "/companies" },
  { icon: Briefcase, label: "Transactions", href: "/transactions" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  // Check if the current path matches the nav item's href
  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <aside
      className={cn(
        "h-screen flex flex-col bg-white border-r border-terminal-border transition-all duration-300 shadow-sm",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      {/* Logo section */}
      <div className="p-4 border-b border-terminal-border flex items-center justify-between">
        {!collapsed && (
          <Link to="/dashboard" className="text-lg font-semibold text-terminal-foreground">
            Arta.Guru
          </Link>
        )}
        {collapsed && (
          <Link to="/dashboard" className="mx-auto">
            <div className="w-8 h-8 rounded-md bg-terminal-accent flex items-center justify-center text-white font-bold">
              AG
            </div>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Navigation section */}
      <div className="flex flex-col flex-1 overflow-y-auto py-4">
        <div className="px-3 mb-6">
          {!collapsed && <p className="text-xs font-medium text-terminal-muted-foreground mb-2 ml-2">MARKETS</p>}
          <nav className="flex flex-col gap-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-terminal-highlight text-terminal-accent"
                    : "text-terminal-muted-foreground hover:bg-terminal-muted hover:text-terminal-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive(item.href) ? "text-terminal-accent" : "")} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="px-3 mb-6">
          {!collapsed && <p className="text-xs font-medium text-terminal-muted-foreground mb-2 ml-2">INSIGHTS</p>}
          <nav className="flex flex-col gap-1">
            {insightsNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-terminal-highlight text-terminal-accent"
                    : "text-terminal-muted-foreground hover:bg-terminal-muted hover:text-terminal-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive(item.href) ? "text-terminal-accent" : "")} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="px-3 mt-auto">
          {!collapsed && <p className="text-xs font-medium text-terminal-muted-foreground mb-2 ml-2">PREFERENCES</p>}
          <nav className="flex flex-col gap-1">
            <Link
              to="/settings"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/settings")
                  ? "bg-terminal-highlight text-terminal-accent"
                  : "text-terminal-muted-foreground hover:bg-terminal-muted hover:text-terminal-foreground"
              )}
            >
              <Settings className={cn("h-5 w-5", isActive("/settings") ? "text-terminal-accent" : "")} />
              {!collapsed && <span>Settings</span>}
            </Link>
            <Link
              to="/global-markets"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/global-markets")
                  ? "bg-terminal-highlight text-terminal-accent"
                  : "text-terminal-muted-foreground hover:bg-terminal-muted hover:text-terminal-foreground"
              )}
            >
              <Globe className={cn("h-5 w-5", isActive("/global-markets") ? "text-terminal-accent" : "")} />
              {!collapsed && <span>Global Markets</span>}
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
