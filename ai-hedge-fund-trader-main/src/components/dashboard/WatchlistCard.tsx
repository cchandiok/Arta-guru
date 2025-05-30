
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ChevronRight, ArrowDown, ArrowUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WatchlistStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

// Example watchlist stocks - would be replaced with real API data
const watchlistStocks: WatchlistStock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 185.92,
    change: 2.45,
    changePercent: 1.34
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 420.45,
    change: 1.85,
    changePercent: 0.44
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 180.05,
    change: -3.20,
    changePercent: -1.75
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 876.30,
    change: 4.85,
    changePercent: 0.56
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 178.75,
    change: -0.95,
    changePercent: -0.53
  }
];

export function WatchlistCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center text-lg">
          <Star className="mr-2 h-5 w-5 text-terminal-accent" />
          My Watchlist
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="grid grid-cols-12 text-xs text-terminal-muted-foreground py-2 border-b border-terminal-border">
            <div className="col-span-5">Symbol</div>
            <div className="col-span-4 text-right">Price</div>
            <div className="col-span-3 text-right">Change</div>
          </div>
          {watchlistStocks.map((stock) => (
            <div 
              key={stock.symbol}
              className="grid grid-cols-12 py-3 hover:bg-terminal-muted cursor-pointer transition-colors rounded-md px-2"
            >
              <div className="col-span-5">
                <div className="font-medium">{stock.symbol}</div>
                <div className="text-xs text-terminal-muted-foreground">{stock.name}</div>
              </div>
              <div className="col-span-4 text-right font-medium">
                ${stock.price}
              </div>
              <div 
                className={cn(
                  "col-span-3 text-right flex items-center justify-end",
                  stock.change >= 0 ? "text-terminal-accent" : "text-terminal-negative"
                )}
              >
                {stock.change >= 0 ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                <span>{Math.abs(stock.changePercent).toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
