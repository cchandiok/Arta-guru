
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, BarChart3, BrainCircuit } from "lucide-react";

const AiInsights = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">AI Insights</h1>
          <p className="text-muted-foreground">AI-powered market analysis and recommendations</p>
        </div>
        
        <Tabs defaultValue="recommendations">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="signals">Signals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg font-medium">Apple Inc. (AAPL)</span>
                    <DollarSign className="h-5 w-5 text-green-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">AI sees strong potential based on new product lineup and services growth</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-500 font-medium">Strong Buy</span>
                    <span className="text-sm text-muted-foreground">Confidence: 87%</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-amber-500">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg font-medium">Microsoft Corp. (MSFT)</span>
                    <TrendingUp className="h-5 w-5 text-amber-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Cloud growth continues, AI integration promising for future earnings</p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-500 font-medium">Hold</span>
                    <span className="text-sm text-muted-foreground">Confidence: 72%</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg font-medium">Tesla Inc. (TSLA)</span>
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Production targets achievable, but margins under pressure</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-500 font-medium">Buy</span>
                    <span className="text-sm text-muted-foreground">Confidence: 64%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Strategy Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <BrainCircuit className="h-5 w-5 mt-0.5 text-terminal-accent" />
                  <div>
                    <h3 className="font-medium">Portfolio Recommendation</h3>
                    <p className="text-sm text-muted-foreground">
                      Based on market volatility and your risk profile, our AI suggests a 60/30/10 allocation 
                      across large-cap tech, value stocks, and select high-growth opportunities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <BrainCircuit className="h-5 w-5 mt-0.5 text-terminal-accent" />
                  <div>
                    <h3 className="font-medium">Sector Rotation</h3>
                    <p className="text-sm text-muted-foreground">
                      Economic indicators suggest rotating from consumer discretionary to healthcare and select tech 
                      in the next quarter. Watch for interest rate decisions to adjust timing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Market sentiment analysis content would be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Market trends analysis content would be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trading Signals</CardTitle>
              </CardHeader>
              <CardContent>
                <p>AI trading signals content would be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AiInsights;
