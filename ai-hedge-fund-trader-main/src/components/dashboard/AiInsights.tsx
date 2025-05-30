
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Brain, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AiRecommendation {
  symbol: string;
  name: string;
  price: number;
  confidence: number;
  change: number;
  recommendation: "Buy" | "Sell" | "Hold";
  timeframe: string;
  sector: string;
}

// Example AI recommendations - would be replaced with real API data
const aiRecommendations: AiRecommendation[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 185.92,
    confidence: 89,
    change: 2.45,
    recommendation: "Buy",
    timeframe: "Short-term",
    sector: "Technology"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 420.45,
    confidence: 92,
    change: 1.85,
    recommendation: "Buy",
    timeframe: "Long-term",
    sector: "Technology"
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 180.05,
    confidence: 75,
    change: -3.20,
    recommendation: "Hold",
    timeframe: "Mid-term",
    sector: "Automotive"
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 198.75,
    confidence: 82,
    change: 0.95,
    recommendation: "Buy",
    timeframe: "Long-term",
    sector: "Financial Services"
  },
];

export function AiInsights() {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "bg-green-100 text-green-800";
    if (confidence >= 75) return "bg-blue-100 text-blue-800";
    if (confidence >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center text-lg">
          <Brain className="mr-2 h-5 w-5 text-terminal-accent" />
          AI Stock Recommendations
        </CardTitle>
        <Button variant="ghost" size="sm" className="gap-1">
          View all <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {aiRecommendations.map((rec) => (
            <div 
              key={rec.symbol}
              className="flex items-center justify-between p-3 rounded-md hover:bg-terminal-muted cursor-pointer transition-colors"
            >
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="font-semibold text-terminal-foreground">{rec.symbol}</span>
                  <span className="ml-2 text-sm text-terminal-muted-foreground">{rec.name}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="mr-2 font-normal">
                    {rec.sector}
                  </Badge>
                  <Badge
                    className={cn(
                      "font-normal",
                      rec.recommendation === "Buy"
                        ? "bg-terminal-accent/10 text-terminal-accent border-terminal-accent/20"
                        : rec.recommendation === "Sell"
                        ? "bg-terminal-negative/10 text-terminal-negative border-terminal-negative/20"
                        : "bg-terminal-neutral/10 text-terminal-neutral border-terminal-neutral/20"
                    )}
                  >
                    {rec.recommendation} • {rec.timeframe}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="text-right mr-4">
                  <div className="font-medium">${rec.price}</div>
                  <div className={cn(
                    "text-sm",
                    rec.change >= 0 ? "text-terminal-accent" : "text-terminal-negative"
                  )}>
                    {rec.change >= 0 ? "+" : ""}{rec.change.toFixed(2)}%
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <div 
                    className={cn(
                      "h-12 w-12 rounded-full flex items-center justify-center text-sm font-medium",
                      getConfidenceColor(rec.confidence)
                    )}
                  >
                    {rec.confidence}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
