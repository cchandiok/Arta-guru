
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Search, ArrowUpRight, ArrowDownRight, Clock, ListFilter, Info, CircleCheck, CircleAlert, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

// Sample stock price history data
const stockPriceData = [
  { date: "Apr 10", price: 165.00 },
  { date: "Apr 11", price: 168.25 },
  { date: "Apr 12", price: 167.50 },
  { date: "Apr 13", price: 169.75 },
  { date: "Apr 14", price: 171.25 },
  { date: "Apr 15", price: 170.50 },
  { date: "Apr 16", price: 173.25 },
  { date: "Apr 17", price: 175.40 },
];

// Sample key metrics data
const keyMetricsData = [
  { metric: "Market Cap", value: "$2.86T" },
  { metric: "P/E Ratio", value: "32.45" },
  { metric: "Dividend Yield", value: "0.53%" },
  { metric: "52 Week Range", value: "$159.61 - $199.62" },
  { metric: "Volume", value: "42.3M" },
  { metric: "Avg Volume", value: "56.8M" },
];

// Sample top stocks data
const topStocksData = [
  { rank: 1, name: "Apple Inc.", symbol: "AAPL", price: 172.45, change: 3.28, percentage: 1.94, score: 98 },
  { rank: 2, name: "Microsoft Corp.", symbol: "MSFT", price: 406.32, change: 2.95, percentage: 0.73, score: 95 },
  { rank: 3, name: "Nvidia Corp.", symbol: "NVDA", price: 881.86, change: 27.43, percentage: 3.21, score: 94 },
  { rank: 4, name: "Amazon.com Inc.", symbol: "AMZN", price: 182.30, change: 1.15, percentage: 0.63, score: 93 },
  { rank: 5, name: "Alphabet Inc.", symbol: "GOOGL", price: 154.56, change: -0.32, percentage: -0.21, score: 91 },
  { rank: 6, name: "Reliance Industries", symbol: "RELIANCE", price: 2431.55, change: 41.20, percentage: 1.72, score: 89 },
  { rank: 7, name: "Infosys Ltd.", symbol: "INFY", price: 17.62, change: 0.54, percentage: 3.16, score: 88 },
  { rank: 8, name: "HDFC Bank", symbol: "HDFCBANK", price: 1487.60, change: -18.25, percentage: -1.21, score: 86 },
];

// Sample recommendation data
const recommendationsData = [
  { type: "Strong Buy", value: 18 },
  { type: "Buy", value: 12 },
  { type: "Hold", value: 8 },
  { type: "Sell", value: 2 },
  { type: "Strong Sell", value: 0 },
];

// Sample AI insights data
const aiInsightsData = [
  {
    title: "Strong Growth Potential",
    description: "Projected to outperform sector by 15% in next quarter based on product pipeline and market expansion.",
    sentiment: "positive"
  },
  {
    title: "Supply Chain Concerns",
    description: "Potential component shortages could impact production targets in Q3 2025.",
    sentiment: "negative"
  },
  {
    title: "Services Division Strength",
    description: "Services revenue expected to continue double-digit growth through 2025.",
    sentiment: "positive"
  }
];

const Stocks = () => {
  const navigate = useNavigate();
  
  const handleTradeClick = () => {
    navigate('/trading');
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Stocks</h1>
          <p className="text-muted-foreground">Stock analysis and trading</p>
        </div>
        
        <Card>
          <CardContent className="py-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search stocks by name or symbol..." className="pl-10" />
              </div>
              <Button className="md:w-32">Search</Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Apple Inc. (AAPL)</h2>
            <Badge variant="outline">NASDAQ</Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Last updated: April 17, 2025 11:32:45 EDT</span>
            </div>
            <Button className="flex items-center gap-2" onClick={handleTradeClick}>
              <ShoppingCart className="h-4 w-4" />
              <span>Trade</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-4">
          {/* Stock price card */}
          <Card className="col-span-12 md:col-span-8">
            <CardHeader className="pb-0">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">Stock Price</CardTitle>
                  <CardDescription>AAPL price history</CardDescription>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-3xl font-bold">$175.40</div>
                  <div className="flex items-center text-green-500">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span>+2.15 (1.24%)</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stockPriceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="price"
                      name="Stock Price ($)"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">1D</Button>
                <Button variant="outline" size="sm">5D</Button>
                <Button variant="outline" size="sm">1M</Button>
                <Button variant="outline" size="sm">3M</Button>
                <Button variant="outline" size="sm">6M</Button>
                <Button variant="outline" size="sm">1Y</Button>
                <Button variant="outline" size="sm">5Y</Button>
                <Button variant="outline" size="sm">Max</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Key metrics card */}
          <Card className="col-span-12 md:col-span-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keyMetricsData.map((metric, index) => (
                  <div key={index} className="flex justify-between pb-2 border-b last:border-0 last:pb-0">
                    <span className="text-muted-foreground">{metric.metric}</span>
                    <span className="font-medium">{metric.value}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Analyst Recommendations</h4>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">75%</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Sell</span>
                  <span>Hold</span>
                  <span>Buy</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {recommendationsData.map((rec, index) => (
                    <div key={index} className="text-xs">
                      <span className="font-medium">{rec.type}:</span>
                      <span className="ml-1">{rec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <Button className="w-full" onClick={handleTradeClick}>Trade</Button>
                <Button variant="outline" className="w-full">Add to Watchlist</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, 
                  and accessories worldwide. The company offers iPhone, iPad, Mac, Apple Watch, and services such 
                  as Apple Music, iCloud, and Apple TV. Apple was founded in 1976 and is headquartered in 
                  Cupertino, California.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">CEO</h4>
                    <p>Tim Cook</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Employees</h4>
                    <p>164,000</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Industry</h4>
                    <p>Consumer Electronics</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Founded</h4>
                    <p>1976</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Stocks</CardTitle>
                <CardDescription>Rankings based on AI score and market performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Change</TableHead>
                      <TableHead className="text-right">AI Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topStocksData.map((stock) => (
                      <TableRow key={stock.symbol}>
                        <TableCell>{stock.rank}</TableCell>
                        <TableCell className="font-medium">{stock.symbol}</TableCell>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell className="text-right">${stock.price}</TableCell>
                        <TableCell className={`text-right ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.percentage}%)
                        </TableCell>
                        <TableCell className="text-right">{stock.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="financials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Statements</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Financial statements would be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
                <CardDescription>Machine learning based analysis of AAPL</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsightsData.map((insight, index) => (
                    <div key={index} className="flex gap-3 p-3 border rounded-md">
                      {insight.sentiment === "positive" ? (
                        <CircleCheck className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <CircleAlert className="h-5 w-5 text-amber-500 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-medium">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-md flex gap-3">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">AI Recommendation</h4>
                    <p className="text-sm">Our AI model suggests a <span className="font-medium text-green-600">BUY</span> recommendation for AAPL with a confidence score of 87%. Price target: $195-205 within the next 12 months.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="news" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent News</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Company news would be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Stocks;
