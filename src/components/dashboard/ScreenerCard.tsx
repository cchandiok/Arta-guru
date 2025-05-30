
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ScreenerResult {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  marketCap: string;
  peRatio: number | null;
  dividend: number | null;
  dayChange: number;
}

// Example screener results - would be replaced with real API data
const screenerResults: ScreenerResult[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    sector: "Technology",
    price: 185.92,
    marketCap: "2.9T",
    peRatio: 28.5,
    dividend: 0.58,
    dayChange: 1.34
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    sector: "Technology",
    price: 420.45,
    marketCap: "3.1T",
    peRatio: 35.2,
    dividend: 0.92,
    dayChange: 0.44
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    sector: "Automotive",
    price: 180.05,
    marketCap: "574B",
    peRatio: 45.8,
    dividend: null,
    dayChange: -1.75
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    sector: "Technology",
    price: 876.30,
    marketCap: "2.16T",
    peRatio: 68.4,
    dividend: 0.04,
    dayChange: 0.56
  }
];

export function ScreenerCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center text-lg">
          <Search className="mr-2 h-5 w-5 text-terminal-accent" />
          Stock Screener
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="grid grid-cols-12 text-xs text-terminal-muted-foreground py-2 border-b border-terminal-border">
            <div className="col-span-4">Symbol</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Day</div>
            <div className="col-span-2">Market Cap</div>
            <div className="col-span-2">P/E</div>
          </div>
          {screenerResults.map((stock) => (
            <div 
              key={stock.symbol}
              className="grid grid-cols-12 py-3 hover:bg-terminal-muted cursor-pointer transition-colors rounded-md px-2 items-center"
            >
              <div className="col-span-4">
                <div className="font-medium">{stock.symbol}</div>
                <div className="text-xs flex items-center">
                  <span className="text-terminal-muted-foreground mr-2">{stock.name}</span>
                  <Badge variant="outline" className="text-xs h-5 px-1">
                    {stock.sector}
                  </Badge>
                </div>
              </div>
              <div className="col-span-2 font-medium">
                ${stock.price}
              </div>
              <div 
                className={cn(
                  "col-span-2",
                  stock.dayChange >= 0 ? "text-terminal-accent" : "text-terminal-negative"
                )}
              >
                {stock.dayChange >= 0 ? "+" : ""}{stock.dayChange.toFixed(2)}%
              </div>
              <div className="col-span-2 text-terminal-muted-foreground">
                {stock.marketCap}
              </div>
              <div className="col-span-2 text-terminal-muted-foreground">
                {stock.peRatio ? stock.peRatio.toFixed(1) : "N/A"}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
