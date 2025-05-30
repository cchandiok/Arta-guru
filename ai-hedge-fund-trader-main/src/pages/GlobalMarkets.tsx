
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, TrendingUp, TrendingDown, BarChart2, Clock, ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MarketData {
  index: string;
  region: string;
  value: number;
  change: number;
  percentage: number;
  status: "open" | "closed";
  lastUpdate: string;
}

const marketData: MarketData[] = [
  {
    index: "S&P 500",
    region: "US",
    value: 5123.25,
    change: 15.23,
    percentage: 0.30,
    status: "open",
    lastUpdate: "Live"
  },
  {
    index: "Dow Jones",
    region: "US",
    value: 38090.78,
    change: 112.35,
    percentage: 0.29,
    status: "open",
    lastUpdate: "Live"
  },
  {
    index: "NASDAQ",
    region: "US",
    value: 16772.51,
    change: 65.62,
    percentage: 0.39,
    status: "open",
    lastUpdate: "Live"
  },
  {
    index: "Russell 2000",
    region: "US",
    value: 2063.79,
    change: 9.45,
    percentage: 0.46,
    status: "open",
    lastUpdate: "Live"
  },
  {
    index: "FTSE 100",
    region: "Europe",
    value: 7958.32,
    change: -15.37,
    percentage: -0.19,
    status: "open",
    lastUpdate: "Live"
  },
  {
    index: "DAX",
    region: "Europe",
    value: 18260.45,
    change: 42.68,
    percentage: 0.23,
    status: "open",
    lastUpdate: "Live"
  },
  {
    index: "CAC 40",
    region: "Europe",
    value: 8094.97,
    change: -23.15,
    percentage: -0.29,
    status: "open",
    lastUpdate: "Live"
  },
  {
    index: "NIKKEI 225",
    region: "Asia",
    value: 38547.50,
    change: 125.93,
    percentage: 0.33,
    status: "closed",
    lastUpdate: "Closed: 05:00 AM EDT"
  },
  {
    index: "Hang Seng",
    region: "Asia",
    value: 17151.89,
    change: -235.78,
    percentage: -1.36,
    status: "closed",
    lastUpdate: "Closed: 04:15 AM EDT"
  },
  {
    index: "Shanghai Composite",
    region: "Asia",
    value: 3015.88,
    change: -12.75,
    percentage: -0.42,
    status: "closed",
    lastUpdate: "Closed: 03:00 AM EDT"
  },
  {
    index: "SENSEX",
    region: "Asia",
    value: 73876.58,
    change: 465.73,
    percentage: 0.63,
    status: "closed",
    lastUpdate: "Closed: 06:30 AM EDT"
  },
  {
    index: "ASX 200",
    region: "Asia",
    value: 7849.40,
    change: 34.26,
    percentage: 0.44,
    status: "closed",
    lastUpdate: "Closed: 02:15 AM EDT"
  }
];

const GlobalMarkets = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Global Markets</h1>
            <p className="text-muted-foreground">Worldwide market indices and performance</p>
          </div>
          <div className="text-right">
            <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
            <p className="text-lg flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>April 17, 2025 11:32:45 EDT</span>
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="all">All Markets</TabsTrigger>
            <TabsTrigger value="us">United States</TabsTrigger>
            <TabsTrigger value="europe">Europe</TabsTrigger>
            <TabsTrigger value="asia">Asia-Pacific</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {marketData.map((market) => (
                <Card key={market.index} className="overflow-hidden border hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        <span>{market.index}</span>
                      </div>
                      <Badge 
                        variant={market.status === "open" ? "default" : "outline"}
                        className={market.status === "open" ? "bg-green-500" : ""}
                      >
                        {market.status === "open" ? "OPEN" : "CLOSED"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-2xl font-bold">{market.value.toLocaleString()}</p>
                      <div className={`flex items-center ${market.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {market.change >= 0 ? (
                          <ArrowUpRight className="h-5 w-5 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5 mr-1" />
                        )}
                        <span className="text-lg font-medium">
                          {market.change >= 0 ? '+' : ''}{market.change.toFixed(2)} ({market.percentage.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{market.region}</span>
                      <span>{market.lastUpdate}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="us">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {marketData
                .filter(market => market.region === "US")
                .map((market) => (
                  <Card key={market.index} className="overflow-hidden border hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5" />
                          <span>{market.index}</span>
                        </div>
                        <Badge 
                          variant={market.status === "open" ? "default" : "outline"}
                          className={market.status === "open" ? "bg-green-500" : ""}
                        >
                          {market.status === "open" ? "OPEN" : "CLOSED"}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-2xl font-bold">{market.value.toLocaleString()}</p>
                        <div className={`flex items-center ${market.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {market.change >= 0 ? (
                            <ArrowUpRight className="h-5 w-5 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-5 w-5 mr-1" />
                          )}
                          <span className="text-lg font-medium">
                            {market.change >= 0 ? '+' : ''}{market.change.toFixed(2)} ({market.percentage.toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{market.region}</span>
                        <span>{market.lastUpdate}</span>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="europe">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {marketData
                .filter(market => market.region === "Europe")
                .map((market) => (
                  <Card key={market.index} className="overflow-hidden border hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5" />
                          <span>{market.index}</span>
                        </div>
                        <Badge 
                          variant={market.status === "open" ? "default" : "outline"}
                          className={market.status === "open" ? "bg-green-500" : ""}
                        >
                          {market.status === "open" ? "OPEN" : "CLOSED"}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-2xl font-bold">{market.value.toLocaleString()}</p>
                        <div className={`flex items-center ${market.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {market.change >= 0 ? (
                            <ArrowUpRight className="h-5 w-5 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-5 w-5 mr-1" />
                          )}
                          <span className="text-lg font-medium">
                            {market.change >= 0 ? '+' : ''}{market.change.toFixed(2)} ({market.percentage.toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{market.region}</span>
                        <span>{market.lastUpdate}</span>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="asia">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {marketData
                .filter(market => market.region === "Asia")
                .map((market) => (
                  <Card key={market.index} className="overflow-hidden border hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5" />
                          <span>{market.index}</span>
                        </div>
                        <Badge 
                          variant={market.status === "open" ? "default" : "outline"}
                          className={market.status === "open" ? "bg-green-500" : ""}
                        >
                          {market.status === "open" ? "OPEN" : "CLOSED"}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-2xl font-bold">{market.value.toLocaleString()}</p>
                        <div className={`flex items-center ${market.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {market.change >= 0 ? (
                            <ArrowUpRight className="h-5 w-5 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-5 w-5 mr-1" />
                          )}
                          <span className="text-lg font-medium">
                            {market.change >= 0 ? '+' : ''}{market.change.toFixed(2)} ({market.percentage.toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{market.region}</span>
                        <span>{market.lastUpdate}</span>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-terminal-accent" />
                <span>Currencies</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 border-b">
                  <span>EUR/USD</span>
                  <div className="flex items-center gap-2">
                    <span>1.0876</span>
                    <span className="text-green-500">+0.15%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 border-b">
                  <span>USD/JPY</span>
                  <div className="flex items-center gap-2">
                    <span>151.72</span>
                    <span className="text-red-500">-0.28%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 border-b">
                  <span>GBP/USD</span>
                  <div className="flex items-center gap-2">
                    <span>1.2654</span>
                    <span className="text-green-500">+0.11%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2">
                  <span>USD/CNY</span>
                  <div className="flex items-center gap-2">
                    <span>7.2064</span>
                    <span className="text-red-500">-0.04%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-terminal-accent" />
                <span>Commodities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 border-b">
                  <span>Crude Oil (WTI)</span>
                  <div className="flex items-center gap-2">
                    <span>$78.25</span>
                    <span className="text-green-500">+1.87%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 border-b">
                  <span>Gold</span>
                  <div className="flex items-center gap-2">
                    <span>$2,387.30</span>
                    <span className="text-green-500">+0.43%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 border-b">
                  <span>Silver</span>
                  <div className="flex items-center gap-2">
                    <span>$28.96</span>
                    <span className="text-green-500">+0.65%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2">
                  <span>Natural Gas</span>
                  <div className="flex items-center gap-2">
                    <span>$1.75</span>
                    <span className="text-red-500">-2.23%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GlobalMarkets;
