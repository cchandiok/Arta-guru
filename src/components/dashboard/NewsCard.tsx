
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Newspaper, ChevronRight, ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: "positive" | "negative" | "neutral";
  category: string;
  url: string;
}

// Example news items - would be replaced with real API data
const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Federal Reserve signals potential interest rate cuts in coming months",
    source: "Financial Times",
    time: "2h ago",
    sentiment: "positive",
    category: "Economy",
    url: "#"
  },
  {
    id: "2",
    title: "Tech giant announces breakthrough in AI computing capabilities",
    source: "Bloomberg",
    time: "3h ago",
    sentiment: "positive",
    category: "Technology",
    url: "#"
  },
  {
    id: "3",
    title: "Oil prices surge amid Middle East tensions",
    source: "Reuters",
    time: "4h ago",
    sentiment: "negative",
    category: "Commodities",
    url: "#"
  },
  {
    id: "4",
    title: "Major retailer reports disappointing quarterly earnings",
    source: "Wall Street Journal",
    time: "5h ago",
    sentiment: "negative",
    category: "Retail",
    url: "#"
  },
  {
    id: "5",
    title: "European markets remain stable despite political uncertainty",
    source: "CNBC",
    time: "7h ago",
    sentiment: "neutral",
    category: "Global Markets",
    url: "#"
  },
];

interface NewsCardProps {
  compact?: boolean;
}

export function NewsCard({ compact = false }: NewsCardProps) {
  const displayItems = compact ? newsItems.slice(0, 3) : newsItems;
  
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 border-green-200";
      case "negative":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center text-lg">
          <Newspaper className="mr-2 h-5 w-5 text-terminal-accent" />
          Market News
        </CardTitle>
        <Button variant="ghost" size="sm" className="gap-1">
          View all <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayItems.map((news) => (
            <div 
              key={news.id}
              className="p-3 rounded-md hover:bg-terminal-muted cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    {news.category}
                  </Badge>
                  <Badge
                    className={cn(
                      "font-normal",
                      getSentimentColor(news.sentiment)
                    )}
                  >
                    {news.sentiment.charAt(0).toUpperCase() + news.sentiment.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center text-terminal-muted-foreground text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {news.time}
                </div>
              </div>
              <h3 className="font-medium text-terminal-foreground mb-2">{news.title}</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-terminal-muted-foreground">{news.source}</span>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  <span className="text-xs">Read More</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
