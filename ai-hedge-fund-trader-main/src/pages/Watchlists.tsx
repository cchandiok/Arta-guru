
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Eye, ArrowUpRight, ArrowDownRight, Star, LineChart, Filter, Bell, Share, Save, Download, MoreHorizontal, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Sample watchlist data
const watchlists = [
  { id: 1, name: "Tech Giants", description: "Major technology companies", stockCount: 8 },
  { id: 2, name: "Dividend Growth", description: "Stocks with consistent dividend growth", stockCount: 12 },
  { id: 3, name: "AI & Machine Learning", description: "Companies in artificial intelligence", stockCount: 6 },
  { id: 4, name: "Healthcare Innovations", description: "Innovative healthcare and biotech", stockCount: 10 }
];

// Sample watchlist stocks
const watchlistStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 172.45, change: 3.28, changePercent: 1.94, marketCap: "2.86T", aiScore: 98 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 406.32, change: 2.95, changePercent: 0.73, marketCap: "3.02T", aiScore: 95 },
  { symbol: "NVDA", name: "Nvidia Corp.", price: 881.86, change: 27.43, changePercent: 3.21, marketCap: "2.18T", aiScore: 94 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 182.30, change: 1.15, changePercent: 0.63, marketCap: "1.89T", aiScore: 93 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 154.56, change: -0.32, changePercent: -0.21, marketCap: "1.94T", aiScore: 91 },
  { symbol: "META", name: "Meta Platforms Inc.", price: 502.30, change: 3.89, changePercent: 0.78, marketCap: "1.28T", aiScore: 89 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 171.05, change: -4.25, changePercent: -2.42, marketCap: "544.8B", aiScore: 78 },
  { symbol: "INTC", name: "Intel Corp.", price: 35.72, change: -0.58, changePercent: -1.60, marketCap: "151.2B", aiScore: 72 }
];

// Sample custom alerts
const customAlerts = [
  { symbol: "AAPL", type: "Price", condition: "Above", value: "$180.00", status: "Active" },
  { symbol: "MSFT", type: "Price", condition: "Below", value: "$380.00", status: "Active" },
  { symbol: "NVDA", type: "Price Change", condition: "Above", value: "5%", status: "Active" }
];

const Watchlists = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Watchlists</h1>
            <p className="text-muted-foreground">Track your favorite stocks</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Create Watchlist</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Watchlist</DialogTitle>
                <DialogDescription>Create a new watchlist to track your favorite stocks.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Watchlist Name</Label>
                  <Input id="name" placeholder="Enter watchlist name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Enter a description" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Watchlist</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Watchlist selection column */}
          <div className="md:col-span-3 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">My Watchlists</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {watchlists.map((watchlist) => (
                  <div 
                    key={watchlist.id}
                    className={`p-3 rounded-md cursor-pointer hover:bg-terminal-muted transition-colors ${watchlist.id === 1 ? 'bg-terminal-highlight' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{watchlist.name}</h3>
                      <Badge variant="outline">{watchlist.stockCount}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{watchlist.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Custom Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {customAlerts.map((alert, index) => (
                  <div 
                    key={index}
                    className="p-2 border rounded-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{alert.symbol}</div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {alert.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {alert.type} {alert.condition} {alert.value}
                    </p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full flex items-center gap-2 mt-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Alert</span>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Watchlist content column */}
          <div className="md:col-span-9">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <CardTitle>Tech Giants</CardTitle>
                    <CardDescription>Major technology companies</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-grow md:w-64">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search stocks..." className="pl-10" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          <span>Rename</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="h-4 w-4 mr-2" />
                          <span>Share</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          <span>Export</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="list">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="list">List View</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="comparison">Comparison</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="list" className="pt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Symbol</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Change</TableHead>
                          <TableHead className="text-right">Market Cap</TableHead>
                          <TableHead className="text-right">AI Score</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {watchlistStocks.map((stock) => (
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
                            <TableCell className="text-right">{stock.marketCap}</TableCell>
                            <TableCell className="text-right">
                              <Badge className={`${stock.aiScore >= 90 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                {stock.aiScore}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <LineChart className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Bell className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-500">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="performance" className="pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Performance Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Performance analysis visualization would be displayed here.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="comparison" className="pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Stock Comparison</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Stock comparison visualization would be displayed here.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t pt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      <span>Add Stock</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Stock to Watchlist</DialogTitle>
                      <DialogDescription>Search for stocks to add to your watchlist.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search by symbol or company name" className="pl-10" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Stock</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <div className="text-sm text-muted-foreground">8 stocks · Last updated: Apr 17, 2025</div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Watchlists;
