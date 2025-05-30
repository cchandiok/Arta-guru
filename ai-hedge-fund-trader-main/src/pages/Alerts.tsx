
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bell, Plus, Trash2, Edit2, Eye, LineChart, ArrowUpRight, ArrowDownRight, Settings, BellOff, Filter, Clock, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Sample price alerts
const priceAlerts = [
  { id: 1, symbol: "AAPL", type: "Price", condition: "Above", value: "$180.00", created: "Apr 15, 2025", status: "Active", triggered: false },
  { id: 2, symbol: "MSFT", type: "Price", condition: "Below", value: "$380.00", created: "Apr 14, 2025", status: "Active", triggered: false },
  { id: 3, symbol: "NVDA", type: "Price Change", condition: "Above", value: "5%", created: "Apr 13, 2025", status: "Active", triggered: false },
  { id: 4, symbol: "TSLA", type: "Price", condition: "Above", value: "$200.00", created: "Apr 12, 2025", status: "Triggered", triggered: true },
  { id: 5, symbol: "AMZN", type: "Price Change", condition: "Below", value: "-3%", created: "Apr 11, 2025", status: "Active", triggered: false }
];

// Sample news alerts
const newsAlerts = [
  { id: 1, symbol: "AAPL", keywords: ["earnings", "iPhone", "revenue"], created: "Apr 15, 2025", status: "Active" },
  { id: 2, symbol: "MSFT", keywords: ["cloud", "Azure", "AI"], created: "Apr 14, 2025", status: "Active" },
  { id: 3, symbol: "META", keywords: ["metaverse", "advertising", "users"], created: "Apr 13, 2025", status: "Active" }
];

// Sample event alerts
const eventAlerts = [
  { id: 1, symbol: "AAPL", event: "Earnings", date: "Apr 30, 2025", reminder: "1 day before", status: "Active" },
  { id: 2, symbol: "MSFT", event: "Dividend", date: "May 15, 2025", reminder: "2 days before", status: "Active" },
  { id: 3, symbol: "NVDA", event: "Conference Call", date: "May 22, 2025", reminder: "1 hour before", status: "Active" }
];

// Sample AI insights alerts
const insightAlerts = [
  { id: 1, type: "Pattern Detection", description: "Alert when AI detects bullish pattern formation", status: "Active" },
  { id: 2, type: "Sentiment Analysis", description: "Alert on significant changes in market sentiment", status: "Active" },
  { id: 3, type: "Unusual Activity", description: "Alert on abnormal trading volume or price movement", status: "Active" }
];

const Alerts = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Alerts</h1>
            <p className="text-muted-foreground">Manage your price and news alerts</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Create Alert</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Alert</DialogTitle>
                <DialogDescription>Set up a new alert to monitor stocks or market events.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Alert Type</Label>
                  <Select defaultValue="price">
                    <SelectTrigger>
                      <SelectValue placeholder="Select alert type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">Price Alert</SelectItem>
                      <SelectItem value="news">News Alert</SelectItem>
                      <SelectItem value="event">Event Alert</SelectItem>
                      <SelectItem value="insight">AI Insight Alert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="symbol">Stock Symbol</Label>
                  <Input id="symbol" placeholder="Enter stock symbol" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Condition</Label>
                    <Select defaultValue="above">
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="above">Price Above</SelectItem>
                        <SelectItem value="below">Price Below</SelectItem>
                        <SelectItem value="change-above">Change Above %</SelectItem>
                        <SelectItem value="change-below">Change Below %</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="value">Value</Label>
                    <Input id="value" placeholder="Enter value" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="repeat" />
                  <Label htmlFor="repeat">Repeat Alert</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Alert</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="price">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="price">Price Alerts</TabsTrigger>
            <TabsTrigger value="news">News Alerts</TabsTrigger>
            <TabsTrigger value="events">Event Alerts</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="price" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <CardTitle>Price Alerts</CardTitle>
                    <CardDescription>Get notified when stocks hit target prices</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <RefreshCw className="h-4 w-4" />
                      <span>Refresh</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {priceAlerts.map((alert) => (
                      <TableRow key={alert.id} className={alert.triggered ? "bg-terminal-highlight/10" : ""}>
                        <TableCell className="font-medium">{alert.symbol}</TableCell>
                        <TableCell>{alert.type}</TableCell>
                        <TableCell>{alert.condition}</TableCell>
                        <TableCell>{alert.value}</TableCell>
                        <TableCell>{alert.created}</TableCell>
                        <TableCell>
                          <Badge 
                            className={alert.status === "Active" ? "bg-green-100 text-green-800 border-green-200" : "bg-blue-100 text-blue-800 border-blue-200"}
                          >
                            {alert.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit2 className="h-4 w-4" />
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
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Alert History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 border rounded-md">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Bell className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">TSLA price alert triggered</h3>
                        <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-200">Triggered</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">TSLA price reached above $200.00</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Apr 12, 2025 at 10:32 AM</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 border rounded-md">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <BellOff className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">GOOGL price alert expired</h3>
                        <Badge className="ml-2 bg-amber-100 text-amber-800 border-amber-200">Expired</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">GOOGL price alert below $140.00 expired</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Apr 10, 2025 at 04:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All History</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="news" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <CardTitle>News Alerts</CardTitle>
                    <CardDescription>Get notified about important news for your stocks</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 md:mt-0 gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Add News Alert</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Keywords</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newsAlerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-medium">{alert.symbol}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {alert.keywords.map((keyword, idx) => (
                              <Badge key={idx} variant="outline">{keyword}</Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{alert.created}</TableCell>
                        <TableCell>
                          <Badge 
                            className="bg-green-100 text-green-800 border-green-200"
                          >
                            {alert.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit2 className="h-4 w-4" />
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
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent News Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 text-center border rounded-md bg-gray-50">
                  <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <h3 className="font-medium">No recent news alerts</h3>
                  <p className="text-sm text-muted-foreground">You'll see your news alerts here when they're triggered.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <CardTitle>Event Alerts</CardTitle>
                    <CardDescription>Get notified about important market events</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 md:mt-0 gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Event Alert</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Reminder</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eventAlerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-medium">{alert.symbol}</TableCell>
                        <TableCell>{alert.event}</TableCell>
                        <TableCell>{alert.date}</TableCell>
                        <TableCell>{alert.reminder}</TableCell>
                        <TableCell>
                          <Badge 
                            className="bg-green-100 text-green-800 border-green-200"
                          >
                            {alert.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit2 className="h-4 w-4" />
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
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                  <span>Showing 3 of 3 events</span>
                  <span>Updated just now</span>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <CardTitle>AI Insight Alerts</CardTitle>
                    <CardDescription>Advanced AI-powered alerts based on market patterns</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 md:mt-0 gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Add AI Alert</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 mb-4 border rounded-md bg-blue-50">
                  <div className="flex gap-2">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <LineChart className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm">
                        AI Insight Alerts use advanced machine learning algorithms to detect patterns, sentiment shifts, 
                        and market anomalies that may impact your portfolio. These alerts go beyond traditional 
                        price triggers to provide deeper market intelligence.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alert Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {insightAlerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-medium">{alert.type}</TableCell>
                        <TableCell>{alert.description}</TableCell>
                        <TableCell>
                          <Badge 
                            className="bg-green-100 text-green-800 border-green-200"
                          >
                            {alert.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500">
                              <BellOff className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 border rounded-md">
                    <div className="w-8 h-8 rounded-full bg-terminal-highlight flex items-center justify-center">
                      <ArrowUpRight className="h-4 w-4 text-terminal-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium">Bullish pattern detected on NVDA</h3>
                      <p className="text-sm text-muted-foreground">Cup and handle pattern forming, suggesting potential upward movement</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Today, 11:23 AM</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 border rounded-md">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Unusual volume detected on XYZ sector</h3>
                      <p className="text-sm text-muted-foreground">Significant increase in trading volume across multiple financial stocks</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Yesterday, 3:42 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Insights</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
