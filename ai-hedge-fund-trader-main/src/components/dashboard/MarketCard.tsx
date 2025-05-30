
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface MarketCardProps {
  title: string;
  symbol: string;
  value: number;
  change: number;
  percentage: number;
  className?: string;
}

export function MarketCard({ title, symbol, value, change, percentage, className }: MarketCardProps) {
  const isPositive = change >= 0;
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-terminal-muted-foreground">{title}</CardTitle>
        <CardDescription className="text-xs text-terminal-muted-foreground">{symbol}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-terminal-foreground">{value.toLocaleString()}</span>
          <div className={cn(
            "ml-2 flex items-center text-sm",
            isPositive ? "text-terminal-accent" : "text-terminal-negative"
          )}>
            {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            <span className="ml-1">{change.toFixed(2)}</span>
            <span className="ml-1">({percentage.toFixed(2)}%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
