import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, ArrowDownRight, BarChart2, PieChart, Activity, TrendingUp, TrendingDown, Globe, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, PieChart as RechartPieChart, Pie, Cell 
} from "recharts";
import BarChartWithCustomColors from "@/components/charts/BarChartWithCustomColors";

const marketOverview = {
  "Market Cap": "$2.5T",
  "Trading Volume": "$500B",
  "Active Traders": "10M",
  "Listed Companies": "500",
};

const sectorPerformance = [
  { name: "Technology", performance: 12.5 },
  { name: "Financial", performance: 8.3 },
  { name: "Healthcare", performance: 15.1 },
  { name: "Consumer", performance: -3.2 },
  { name: "Energy", performance: 5.8 },
  { name: "Utilities", performance: 2.1 },
  { name: "Materials", performance: 9.7 },
  { name: "Industrials", performance: 7.2 },
  { name: "IT", performance: 13.8 },
  { name: "Telecom", performance: 4.5 },
  { name: "Real Estate", performance: -1.8 },
  { name: "Auto", performance: 6.3 },
  { name: "Pharma", performance: 10.2 },
];

const topGainers = [
  { symbol: "AAPL", name: "Apple Inc.", price: 172.45, change: 3.28, changePercent: 1.94 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 406.32, change: 2.95, changePercent: 0.73 },
  { symbol: "NVDA", name: "Nvidia Corp.", price: 881.86, change: 27.43, changePercent: 3.21 },
  { symbol: "INFY", name: "Infosys Ltd.", price: 17.62, change: 0.54, changePercent: 3.16 },
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2431.55, change: 41.20, changePercent: 1.72 },
];

const topLosers = [
  { symbol: "TSLA", name: "Tesla Inc.", price: 171.05, change: -4.25, changePercent: -2.42 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 182.30, change: -1.15, changePercent: -0.63 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 154.56, change: -0.32, changePercent: -0.21 },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3802.15, change: -54.35, changePercent: -1.41 },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1487.60, change: -18.25, changePercent: -1.21 },
];

const tradingVolumeData = [
  { time: "09:30", volume: 1500 },
  { time: "10:00", volume: 1800 },
  { time: "10:30", volume: 2200 },
  { time: "11:00", volume: 2000 },
  { time: "11:30", volume: 2500 },
  { time: "12:00", volume: 2300 },
];

const sentimentData = [
  { name: "Positive", value: 65 },
  { name: "Negative", value: 35 },
];

const COLORS = ['#0088FE', '#FF8042'];

const globalIndices = [
  { name: "S&P 500", region: "US", value: 5234.18, change: 0.35 },
  { name: "Dow Jones", region: "US", value: 39127.14, change: 0.28 },
  { name: "NASDAQ", region: "US", value: 16340.87, change: 0.68 },
  { name: "FTSE 100", region: "Europe", value: 8242.35, change: -0.12 },
  { name: "DAX", region: "Europe", value: 18384.35, change: 0.15 },
  { name: "CAC 40", region: "Europe", value: 8137.58, change: -0.22 },
  { name: "Nikkei 225", region: "Asia", value: 38387.24, change: 0.61 },
  { name: "Shanghai Composite", region: "Asia", value: 3074.86, change: -0.87 },
  { name: "Hang Seng", region: "Asia", value: 16512.92, change: -0.54 },
  { name: "SENSEX", region: "India", value: 73648.62, change: 0.72 },
  { name: "NIFTY 50", region: "India", value: 22452.18, change: 0.68 },
  { name: "NIFTY Bank", region: "India", value: 48375.45, change: 0.42 },
];

const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

const Markets = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Market Overview</h1>
          <p className="text-muted-foreground">Real-time market data and insights</p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sectors">Sectors</TabsTrigger>
            <TabsTrigger value="gainers-losers">Gainers/Losers</TabsTrigger>
            <TabsTrigger value="global">Global Markets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(marketOverview).map(([key, value]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle>{key}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-semibold">{value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-terminal-accent" />
                    <span>Trading Volume</span>
                  </CardTitle>
                  <CardDescription>Real-time trading activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={tradingVolumeData}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Line type="monotone" dataKey="volume" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-terminal-accent" />
                    <span>Market Sentiment</span>
                  </CardTitle>
                  <CardDescription>Overall market sentiment</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartPieChart>
                      <Pie
                        data={sentimentData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {
                          sentimentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))
                        }
                      </Pie>
                      <Tooltip formatter={(value: number) => `${value}%`} />
                      <Legend />
                    </RechartPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-terminal-accent" />
                  <span>Sector Performance</span>
                </CardTitle>
                <CardDescription>Performance by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChartWithCustomColors data={sectorPerformance} dataKey="performance" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gainers-losers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>Top Gainers</span>
                  </CardTitle>
                  <CardDescription>Top performing stocks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topGainers.map((stock) => (
                      <div key={stock.symbol} className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{stock.symbol}</div>
                          <div className="text-sm text-muted-foreground">{stock.name}</div>
                        </div>
                        <div className="text-green-500">
                          <ArrowUpRight className="inline-block w-4 h-4 mr-1" />
                          {stock.change} ({formatPercentage(stock.changePercent)})
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span>Top Losers</span>
                  </CardTitle>
                  <CardDescription>Worst performing stocks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topLosers.map((stock) => (
                      <div key={stock.symbol} className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{stock.symbol}</div>
                          <div className="text-sm text-muted-foreground">{stock.name}</div>
                        </div>
                        <div className="text-red-500">
                          <ArrowDownRight className="inline-block w-4 h-4 mr-1" />
                          {stock.change} ({formatPercentage(stock.changePercent)})
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="global" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-terminal-accent" />
                  <span>Global Market Indices</span>
                </CardTitle>
                <CardDescription>Key global market performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="india">India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {globalIndices.map((index) => (
                    <div key={index.name} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <div className="font-medium">{index.name}</div>
                        <div className="text-xs text-muted-foreground">{index.region}</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="font-semibold">{index.value.toLocaleString()}</div>
                        <div className={`text-xs flex items-center ${index.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {index.change >= 0 ? (
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 mr-1" />
                          )}
                          {index.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Markets;
