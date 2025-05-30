
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Briefcase, TrendingUp, Users, GanttChart, LineChart, Building2, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Companies = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Company Profiles</h1>
          <p className="text-muted-foreground">Detailed company information and analysis</p>
        </div>
        
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search companies..." className="pl-10" />
              </div>
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5 text-terminal-accent" />
          <h2 className="text-xl font-bold">Apple Inc. (AAPL)</h2>
          <Badge variant="outline" className="ml-2">
            NASDAQ
          </Badge>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full md:w-auto grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    <span>Company Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">About</h3>
                    <p className="text-sm text-muted-foreground">
                      Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.
                      The company offers iPhone, iPad, Mac, Apple Watch, and services such as Apple Music, iCloud, and Apple TV.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Sector</h4>
                      <p className="text-sm">Technology</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Industry</h4>
                      <p className="text-sm">Consumer Electronics</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">CEO</h4>
                      <p className="text-sm">Tim Cook</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Founded</h4>
                      <p className="text-sm">1976</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm">Apple Park, Cupertino, California, United States</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    <span>Key Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Market Cap</p>
                        <p className="text-lg font-medium">$2.86T</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">P/E Ratio</p>
                        <p className="text-lg font-medium">32.45</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Revenue (TTM)</p>
                        <p className="text-lg font-medium">$387.54B</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">EPS</p>
                        <p className="text-lg font-medium">$6.14</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Dividend Yield</p>
                        <p className="text-lg font-medium">0.53%</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">52-Week Range</p>
                        <p className="text-lg font-medium">$159.61 - $199.62</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GanttChart className="h-5 w-5" />
                    <span>Business Segments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">iPhone</p>
                          <p className="text-sm font-medium">52%</p>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 mt-1">
                          <div className="h-2 rounded-full bg-blue-500" style={{ width: '52%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Services</p>
                          <p className="text-sm font-medium">22%</p>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 mt-1">
                          <div className="h-2 rounded-full bg-purple-500" style={{ width: '22%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Mac</p>
                          <p className="text-sm font-medium">10%</p>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 mt-1">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">iPad</p>
                          <p className="text-sm font-medium">8%</p>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 mt-1">
                          <div className="h-2 rounded-full bg-amber-500" style={{ width: '8%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Wearables & Home</p>
                          <p className="text-sm font-medium">8%</p>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 mt-1">
                          <div className="h-2 rounded-full bg-red-500" style={{ width: '8%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>Management Team</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Tim Cook</p>
                        <p className="text-sm text-muted-foreground">Chief Executive Officer</p>
                      </div>
                      <Button variant="ghost" size="sm">View Profile</Button>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Luca Maestri</p>
                        <p className="text-sm text-muted-foreground">Chief Financial Officer</p>
                      </div>
                      <Button variant="ghost" size="sm">View Profile</Button>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Craig Federighi</p>
                        <p className="text-sm text-muted-foreground">SVP Software Engineering</p>
                      </div>
                      <Button variant="ghost" size="sm">View Profile</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Katherine Adams</p>
                        <p className="text-sm text-muted-foreground">General Counsel</p>
                      </div>
                      <Button variant="ghost" size="sm">View Profile</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="financials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Income Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Financial statements would be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analyst Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Analyst recommendations and price targets would be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="news" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent News</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Company-specific news would be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Companies;
