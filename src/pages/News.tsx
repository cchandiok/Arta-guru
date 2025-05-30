
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Clock, ArrowUpRight, Newspaper, LineChart, BarChart2, Bookmark, Share, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Sample news data
const newsArticles = [
  {
    id: 1,
    title: "Fed signals potential rate cuts as inflation cools",
    source: "Financial Times",
    category: "Economy",
    time: "2 hours ago",
    summary: "Federal Reserve officials indicated they are prepared to cut interest rates if inflation continues its downward trend, according to meeting minutes released today.",
    impact: "high",
    sentiment: "positive",
    related: ["SPY", "QQQ", "TLT"]
  },
  {
    id: 2,
    title: "Apple unveils next-generation AI features for iPhone",
    source: "CNBC",
    category: "Technology",
    time: "4 hours ago",
    summary: "Apple announced a suite of AI-powered features coming to iPhone later this year, including advanced image generation and natural language processing capabilities.",
    impact: "medium",
    sentiment: "positive",
    related: ["AAPL", "NVDA", "MSFT"]
  },
  {
    id: 3,
    title: "Oil prices spike amid Middle East tensions",
    source: "Reuters",
    category: "Energy",
    time: "6 hours ago",
    summary: "Crude oil prices surged more than 3% today as geopolitical tensions in the Middle East intensified, raising concerns about potential supply disruptions.",
    impact: "high",
    sentiment: "negative",
    related: ["XOM", "CVX", "USO"]
  },
  {
    id: 4,
    title: "Tesla announces expansion of Gigafactory Texas",
    source: "Bloomberg",
    category: "Automotive",
    time: "8 hours ago",
    summary: "Tesla revealed plans to significantly expand its Texas manufacturing facility, aiming to increase production capacity by 50% and add 5,000 new jobs by 2026.",
    impact: "medium",
    sentiment: "positive",
    related: ["TSLA", "RIVN", "F"]
  },
  {
    id: 5,
    title: "Microsoft faces antitrust scrutiny over cloud business",
    source: "Wall Street Journal",
    category: "Technology",
    time: "10 hours ago",
    summary: "European regulators launched an investigation into Microsoft's cloud computing practices, examining whether the company is unfairly leveraging its market position.",
    impact: "medium",
    sentiment: "negative",
    related: ["MSFT", "AMZN", "GOOGL"]
  },
  {
    id: 6,
    title: "Pfizer announces breakthrough in cancer treatment research",
    source: "Healthcare Daily",
    category: "Healthcare",
    time: "12 hours ago",
    summary: "Pfizer reported promising results from Phase 3 trials of its new oncology drug, showing significant improvement in survival rates for certain types of lung cancer.",
    impact: "high",
    sentiment: "positive",
    related: ["PFE", "MRK", "JNJ"]
  }
];

// Sample market insights
const marketInsights = [
  {
    title: "Market Overview",
    content: "Markets are showing mixed signals today with technology stocks outperforming while energy and utilities lag. The S&P 500 is up marginally, maintaining its position near all-time highs."
  },
  {
    title: "Economic Indicators",
    content: "Recent economic data points to a resilient economy with moderate growth. Consumer spending remains strong despite elevated interest rates, and inflation is showing signs of moderating."
  },
  {
    title: "Sector Performance",
    content: "Technology and healthcare sectors are leading today's gains, while energy is the worst performing sector amid profit-taking after recent rallies.  Defensive sectors are mixed."
  }
];

// Sample trending topics
const trendingTopics = ["Interest Rates", "Artificial Intelligence", "Semiconductors", "Energy Prices", "Healthcare Innovation", "Banking Regulations"];

const News = () => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 border-green-200";
      case "negative":
        return "bg-red-100 text-red-800 border-red-200";
      case "neutral":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Market News</h1>
          <p className="text-muted-foreground">Latest market news and updates</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main news content */}
          <div className="md:col-span-9 space-y-6">
            <Card>
              <CardContent className="py-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search news..." className="pl-10" />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                  <Select defaultValue="latest">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest First</SelectItem>
                      <SelectItem value="impact">Highest Impact</SelectItem>
                      <SelectItem value="relevance">Most Relevant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="topStories">
              <TabsList className="grid w-full md:w-auto grid-cols-4">
                <TabsTrigger value="topStories">Top Stories</TabsTrigger>
                <TabsTrigger value="markets">Markets</TabsTrigger>
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="economy">Economy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="topStories" className="pt-4 space-y-4">
                {newsArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                        <div>
                          <CardTitle className="text-lg hover:text-terminal-accent cursor-pointer transition-colors">
                            {article.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <CardDescription className="flex items-center gap-1">
                              <Newspaper className="h-3 w-3" />
                              <span>{article.source}</span>
                            </CardDescription>
                            <CardDescription className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{article.time}</span>
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getImpactColor(article.impact)}>
                            {article.impact} impact
                          </Badge>
                          <Badge className={getSentimentColor(article.sentiment)}>
                            {article.sentiment}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{article.summary}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {article.related.map((symbol) => (
                          <Badge key={symbol} variant="outline" className="hover:bg-terminal-highlight cursor-pointer transition-colors">
                            {symbol}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-between">
                      <Badge className="bg-terminal-muted text-terminal-muted-foreground hover:bg-terminal-highlight cursor-pointer transition-colors">
                        {article.category}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="markets" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Markets News</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Market-specific news would be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="stocks" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Stock News</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Stock-specific news would be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="economy" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Economic News</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Economic news and indicators would be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-center">
              <Button variant="outline" className="w-full max-w-md">Load More</Button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ArrowUpRight className="h-4 w-4 text-terminal-accent" />
                  <span>Market Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketInsights.map((insight, index) => (
                  <div key={index} className="pb-3 border-b last:border-0 last:pb-0">
                    <h3 className="font-medium mb-1">{insight.title}</h3>
                    <p className="text-xs text-muted-foreground">{insight.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-terminal-accent" />
                  <span>Market Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>S&P 500</span>
                    <span className="text-green-500">+0.35%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100">
                    <div className="h-1.5 rounded-full bg-green-500" style={{ width: '70%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>NASDAQ</span>
                    <span className="text-green-500">+0.58%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100">
                    <div className="h-1.5 rounded-full bg-green-500" style={{ width: '85%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>10-Yr Treasury</span>
                    <span className="text-red-500">-0.24%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100">
                    <div className="h-1.5 rounded-full bg-red-500" style={{ width: '40%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="economy" />
                    <Label htmlFor="economy">Economy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="technology" defaultChecked />
                    <Label htmlFor="technology">Technology</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="energy" />
                    <Label htmlFor="energy">Energy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="healthcare" defaultChecked />
                    <Label htmlFor="healthcare">Healthcare</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="financial" />
                    <Label htmlFor="financial">Financial</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="markets" defaultChecked />
                    <Label htmlFor="markets">Markets</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Trending Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-terminal-highlight transition-colors">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default News;
