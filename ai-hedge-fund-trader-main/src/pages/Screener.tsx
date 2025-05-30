import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Filter, Save, Share, Download, BarChart2, ArrowUpRight, ArrowDownRight, 
  Star, TrendingUp, TrendingDown, BookOpen, Info, DollarSign 
} from "lucide-react";

const demoStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 172.45, change: 3.28, changePercent: 1.94, marketCap: "2.86T", pe: 32.45, volume: "42.5M", aiScore: 98 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 406.32, change: 2.95, changePercent: 0.73, marketCap: "3.02T", pe: 37.28, volume: "17.8M", aiScore: 95 },
  { symbol: "NVDA", name: "Nvidia Corp.", price: 881.86, change: 27.43, changePercent: 3.21, marketCap: "2.18T", pe: 73.92, volume: "50.2M", aiScore: 94 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 171.05, change: -4.25, changePercent: -2.42, marketCap: "544.8B", pe: 47.65, volume: "60.1M", aiScore: 78 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 182.30, change: 1.15, changePercent: 0.63, marketCap: "1.89T", pe: 59.24, volume: "28.7M", aiScore: 93 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 154.56, change: -0.32, changePercent: -0.21, marketCap: "1.94T", pe: 26.82, volume: "22.3M", aiScore: 91 },
  { symbol: "META", name: "Meta Platforms Inc.", price: 502.30, change: 3.89, changePercent: 0.78, marketCap: "1.28T", pe: 34.05, volume: "14.2M", aiScore: 89 },
  { symbol: "BRK.B", name: "Berkshire Hathaway", price: 408.79, change: 0.56, changePercent: 0.14, marketCap: "892.4B", pe: 20.63, volume: "3.6M", aiScore: 88 },
];

const savedScreeners = [
  { name: "High Growth Tech", description: "Technology stocks with high growth potential", count: 32 },
  { name: "Dividend Champions", description: "Stocks with consistent dividend increases", count: 47 },
  { name: "Undervalued Small Caps", description: "Small-cap stocks with low P/E ratios", count: 24 },
  { name: "AI and ML Leaders", description: "Companies focused on artificial intelligence", count: 18 },
];

const Screener = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Stock Screener</h1>
          <p className="text-muted-foreground">Find stocks matching your criteria</p>
        </div>
        
        <Tabs defaultValue="screener">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="screener">Screener</TabsTrigger>
            <TabsTrigger value="saved">Saved Screens</TabsTrigger>
            <TabsTrigger value="predefined">Predefined</TabsTrigger>
            <TabsTrigger value="ai">AI Screens</TabsTrigger>
          </TabsList>
          
          <TabsContent value="screener" className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
              {/* Screening criteria column */}
              <Card className="col-span-12 md:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Screening Criteria</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Market Cap filter */}
                  <div className="space-y-2">
                    <Label>Market Cap</Label>
                    <Select defaultValue="any">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Market Cap Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="mega">Mega ($200B+)</SelectItem>
                        <SelectItem value="large">Large ($10-200B)</SelectItem>
                        <SelectItem value="mid">Mid ($2-10B)</SelectItem>
                        <SelectItem value="small">Small ($300M-2B)</SelectItem>
                        <SelectItem value="micro">Micro (Under $300M)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Sector filter */}
                  <div className="space-y-2">
                    <Label>Sector</Label>
                    <Select defaultValue="any">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="finance">Financial</SelectItem>
                        <SelectItem value="health">Healthcare</SelectItem>
                        <SelectItem value="consumer">Consumer</SelectItem>
                        <SelectItem value="energy">Energy</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="materials">Materials</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* P/E ratio filter */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>P/E Ratio</Label>
                      <span className="text-sm text-muted-foreground">0 - 100</span>
                    </div>
                    <Slider defaultValue={[0, 100]} min={0} max={100} step={1} />
                  </div>
                  
                  {/* Dividend yield filter */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Dividend Yield (%)</Label>
                      <span className="text-sm text-muted-foreground">0 - 10%</span>
                    </div>
                    <Slider defaultValue={[0, 10]} min={0} max={10} step={0.1} />
                  </div>
                  
                  {/* Price change filter */}
                  <div className="space-y-2">
                    <Label>Price Change</Label>
                    <Select defaultValue="any">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Price Movement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="up5">Up 5%+</SelectItem>
                        <SelectItem value="up10">Up 10%+</SelectItem>
                        <SelectItem value="up20">Up 20%+</SelectItem>
                        <SelectItem value="down5">Down 5%+</SelectItem>
                        <SelectItem value="down10">Down 10%+</SelectItem>
                        <SelectItem value="down20">Down 20%+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Volume filter */}
                  <div className="space-y-2">
                    <Label>Average Volume</Label>
                    <Select defaultValue="any">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Volume Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="over100k">Over 100K</SelectItem>
                        <SelectItem value="over500k">Over 500K</SelectItem>
                        <SelectItem value="over1m">Over 1M</SelectItem>
                        <SelectItem value="over5m">Over 5M</SelectItem>
                        <SelectItem value="over10m">Over 10M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* AI Score filter */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>AI Score</Label>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">AI Feature</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Min Score: 75</span>
                    </div>
                    <Slider defaultValue={[75]} min={0} max={100} step={1} />
                  </div>
                  
                  {/* Apply filters button */}
                  <Button className="w-full">Apply Filters</Button>
                  
                  <div className="flex items-center pt-2">
                    <Button variant="outline" size="sm" className="mr-2">Reset</Button>
                    <Button variant="outline" size="sm" className="mr-2">Save</Button>
                    <Button variant="outline" size="sm">Share</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Results column */}
              <div className="col-span-12 md:col-span-9 space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <CardTitle>Screening Results</CardTitle>
                        <CardDescription>8 stocks match your criteria</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Save className="h-4 w-4" />
                          <span>Save</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Share className="h-4 w-4" />
                          <span>Share</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          <span>Export</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Symbol</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">Change</TableHead>
                            <TableHead className="text-right">Market Cap</TableHead>
                            <TableHead className="text-right">P/E</TableHead>
                            <TableHead className="text-right">Volume</TableHead>
                            <TableHead className="text-right">AI Score</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {demoStocks.map((stock) => (
                            <TableRow key={stock.symbol}>
                              <TableCell className="font-medium">{stock.symbol}</TableCell>
                              <TableCell>{stock.name}</TableCell>
                              <TableCell className="text-right">${stock.price}</TableCell>
                              <TableCell className="text-right">
                                <div className={`flex items-center justify-end ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                  {stock.change >= 0 ? (
                                    <ArrowUpRight className="h-4 w-4 mr-1" />
                                  ) : (
                                    <ArrowDownRight className="h-4 w-4 mr-1" />
                                  )}
                                  <span>
                                    {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent}%)
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">${stock.marketCap}</TableCell>
                              <TableCell className="text-right">{stock.pe}</TableCell>
                              <TableCell className="text-right">{stock.volume}</TableCell>
                              <TableCell className="text-right font-medium">
                                <Badge className={`${stock.aiScore >= 90 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                  {stock.aiScore}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon">
                                  <Star className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <div className="text-sm text-muted-foreground">Page 1 of 1</div>
                    <Button variant="outline" size="sm" disabled>Next</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart2 className="h-5 w-5 text-terminal-accent" />
                      <span>Sector Distribution</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Technology</p>
                          <p className="text-sm font-medium">5 stocks (62.5%)</p>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 mt-1">
                          <div className="h-2 rounded-full bg-blue-500" style={{ width: '62.5%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Consumer Discretionary</p>
                          <p className="text-sm font-medium">1 stock (12.5%)</p>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 mt-1">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: '12.5%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Financials</p>
                          <p className="text-sm font-medium">1 stock (12.5%)</p>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 mt-1">
                          <div className="h-2 rounded-full bg-purple-500" style={{ width: '12.5%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Communication Services</p>
                          <p className="text-sm font-medium">1 stock (12.5%)</p>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 mt-1">
                          <div className="h-2 rounded-full bg-amber-500" style={{ width: '12.5%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {savedScreeners.map((screener, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle>{screener.name}</CardTitle>
                    <CardDescription>{screener.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{screener.count} stocks</Badge>
                      <div className="text-sm text-muted-foreground">Last updated: Apr 15, 2025</div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>Load</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>Performance</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="predefined" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Predefined Screens</CardTitle>
                <CardDescription>Popular pre-configured stock screeners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="border p-4 rounded-md hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">High Growth</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Stocks with strong revenue and earnings growth</p>
                  </div>
                  
                  <div className="border p-4 rounded-md hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="h-5 w-5 text-blue-500" />
                      <h3 className="font-medium">Value Investing</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Undervalued stocks based on fundamentals</p>
                  </div>
                  
                  <div className="border p-4 rounded-md hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-amber-500" />
                      <h3 className="font-medium">Dividend Income</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">High dividend yield stocks with stability</p>
                  </div>
                  
                  <div className="border p-4 rounded-md hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart2 className="h-5 w-5 text-purple-500" />
                      <h3 className="font-medium">Momentum</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Stocks with strong price momentum</p>
                  </div>
                  
                  <div className="border p-4 rounded-md hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-rose-500" />
                      <h3 className="font-medium">Turnaround Candidates</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Stocks showing signs of recovery</p>
                  </div>
                  
                  <div className="border p-4 rounded-md hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-cyan-500" />
                      <h3 className="font-medium">Small Cap Growth</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Small companies with growth potential</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader className="pb-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>AI-Generated Screeners</CardTitle>
                  <CardDescription>Screens created using our proprietary AI models</CardDescription>
                </div>
                <Badge className="hidden md:flex mt-2 md:mt-0" variant="outline">
                  AI Powered
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-md bg-blue-50">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm">
                        AI-Generated Screeners analyze vast amounts of market data, fundamental metrics, 
                        technical patterns, and sentiment indicators to identify high-potential stocks that 
                        match specific investment strategies.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border p-4 rounded-md hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-terminal-accent" />
                        <h3 className="font-medium">Emerging Tech Leaders</h3>
                      </div>
                      <Badge variant="outline">42 stocks</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Companies positioned to benefit from AI, cloud computing, and quantum technologies
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Generated Apr 16, 2025</div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-md hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-5 w-5 text-terminal-accent" />
                        <h3 className="font-medium">Long-Term Value</h3>
                      </div>
                      <Badge variant="outline">38 stocks</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Undervalued stocks with strong fundamentals and long-term growth potential
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Generated Apr 15, 2025</div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-md hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-terminal-accent" />
                        <h3 className="font-medium">Sector Rotation</h3>
                      </div>
                      <Badge variant="outline">29 stocks</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Stocks poised to benefit from current economic cycle and sector rotation
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Generated Apr 14, 2025</div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-md hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-5 w-5 text-terminal-accent" />
                        <h3 className="font-medium">Defensive Portfolio</h3>
                      </div>
                      <Badge variant="outline">35 stocks</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Stable stocks with low volatility for market downturns and uncertainty
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Generated Apr 13, 2025</div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Screener;
