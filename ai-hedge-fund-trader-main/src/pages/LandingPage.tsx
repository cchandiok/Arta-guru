
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, LineChart, BarChart, PieChart, BrainCircuit, Globe, Search, Bell, CheckCircle } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="border-b border-terminal-border sticky top-0 bg-white z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-terminal-accent flex items-center justify-center text-white font-bold">
              AG
            </div>
            <span className="text-xl font-bold">Arta.Guru</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-terminal-muted-foreground hover:text-terminal-foreground transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#ai-insights" className="text-terminal-muted-foreground hover:text-terminal-foreground transition-colors text-sm font-medium">
              AI Insights
            </a>
            <a href="#markets" className="text-terminal-muted-foreground hover:text-terminal-foreground transition-colors text-sm font-medium">
              Markets
            </a>
            <a href="#pricing" className="text-terminal-muted-foreground hover:text-terminal-foreground transition-colors text-sm font-medium">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" size="sm">Log In</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-terminal-accent hover:bg-terminal-accent/90" size="sm">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              AI-Powered Market Intelligence Terminal
            </h1>
            <p className="text-xl text-terminal-muted-foreground mb-10 max-w-3xl mx-auto">
              Access institutional-grade trading insights powered by artificial intelligence. Real-time data, analytics, and recommendations across global markets.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button className="bg-terminal-accent hover:bg-terminal-accent/90 h-12 px-8 text-base">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="h-12 px-8 text-base">
                  Log In to Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Preview Image */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-terminal-border">
            <img 
              src="https://placehold.co/1200x675/F5F5F5/d5d5d5?text=Market+Terminal+Dashboard" 
              alt="Arta.Guru Dashboard Preview" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-terminal-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Market Intelligence</h2>
            <p className="text-terminal-muted-foreground max-w-2xl mx-auto">
              Everything you need to make informed investment decisions across global markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-terminal-border">
              <div className="h-12 w-12 rounded-lg bg-terminal-accent/10 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-terminal-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Charting</h3>
              <p className="text-terminal-muted-foreground">
                Interactive technical charts with multiple timeframes and drawing tools for thorough analysis.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-terminal-border">
              <div className="h-12 w-12 rounded-lg bg-terminal-accent/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-terminal-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Powerful Screener</h3>
              <p className="text-terminal-muted-foreground">
                Find investment opportunities that match your criteria with our customizable stock screener.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-terminal-border">
              <div className="h-12 w-12 rounded-lg bg-terminal-accent/10 flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-terminal-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Alerts</h3>
              <p className="text-terminal-muted-foreground">
                Get notified about price changes, news, and important events for the stocks you follow.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-terminal-border">
              <div className="h-12 w-12 rounded-lg bg-terminal-accent/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-terminal-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Markets</h3>
              <p className="text-terminal-muted-foreground">
                Coverage across US, European, Asian, and Indian markets with real-time data and insights.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-terminal-border">
              <div className="h-12 w-12 rounded-lg bg-terminal-accent/10 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-terminal-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fundamental Analysis</h3>
              <p className="text-terminal-muted-foreground">
                Access company financials, SEC filings, earnings reports, and key metrics for thorough research.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-terminal-border">
              <div className="h-12 w-12 rounded-lg bg-terminal-accent/10 flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-terminal-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Portfolio Tracking</h3>
              <p className="text-terminal-muted-foreground">
                Monitor your investments, create watchlists, and track performance over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Insights Section */}
      <section id="ai-insights" className="py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-terminal-accent/5 rounded-l-full z-0"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">AI-Powered Trading Insights</h2>
              <p className="text-terminal-muted-foreground mb-8">
                Our advanced machine learning algorithms analyze market data, news, and trends to provide actionable trading recommendations.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-terminal-accent/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-terminal-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Sentiment Analysis</h3>
                    <p className="text-terminal-muted-foreground text-sm">
                      Real-time analysis of news and social media to gauge market sentiment for stocks.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-terminal-accent/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-terminal-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Price Predictions</h3>
                    <p className="text-terminal-muted-foreground text-sm">
                      ML-based forecasts and trend predictions with confidence intervals.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-terminal-accent/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-terminal-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Pattern Recognition</h3>
                    <p className="text-terminal-muted-foreground text-sm">
                      Automatic detection of chart patterns and technical indicators.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-terminal-accent/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-terminal-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Risk Assessment</h3>
                    <p className="text-terminal-muted-foreground text-sm">
                      Evaluation of potential risks and volatility forecasts for informed decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-6 -left-6 h-24 w-24 bg-terminal-accent/10 rounded-full"></div>
              <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-terminal-accent/5 rounded-full"></div>
              
              <div className="relative bg-white rounded-xl border border-terminal-border p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <BrainCircuit className="h-6 w-6 text-terminal-accent mr-2" />
                  <h3 className="font-semibold">AI Recommendations</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border border-terminal-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-medium">AAPL</span>
                        <span className="text-sm text-terminal-muted-foreground ml-2">Apple Inc.</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Strong Buy</Badge>
                    </div>
                    <div className="text-sm text-terminal-muted-foreground">
                      Our AI predicts a 7.2% upside potential over the next 3 months based on technical indicators and positive earnings momentum.
                    </div>
                  </div>
                  
                  <div className="p-4 border border-terminal-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-medium">TSLA</span>
                        <span className="text-sm text-terminal-muted-foreground ml-2">Tesla Inc.</span>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">Hold</Badge>
                    </div>
                    <div className="text-sm text-terminal-muted-foreground">
                      Current volatility suggests waiting for clearer price action before making new positions. Watch for support at $175.
                    </div>
                  </div>
                  
                  <div className="p-4 border border-terminal-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-medium">NVDA</span>
                        <span className="text-sm text-terminal-muted-foreground ml-2">NVIDIA Corporation</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Buy</Badge>
                    </div>
                    <div className="text-sm text-terminal-muted-foreground">
                      Strong momentum and positive sentiment analysis indicate continued growth in the AI hardware sector.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Markets Coverage Section */}
      <section id="markets" className="py-20 px-6 bg-terminal-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Global Market Coverage</h2>
            <p className="text-terminal-muted-foreground max-w-2xl mx-auto">
              Comprehensive market intelligence across major financial markets worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-terminal-border text-center">
              <h3 className="text-xl font-semibold mb-4">US Markets</h3>
              <div className="space-y-2 text-terminal-muted-foreground">
                <p>NYSE</p>
                <p>NASDAQ</p>
                <p>S&P 500</p>
                <p>Dow Jones</p>
                <p>Russell 2000</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-terminal-border text-center">
              <h3 className="text-xl font-semibold mb-4">European Markets</h3>
              <div className="space-y-2 text-terminal-muted-foreground">
                <p>FTSE 100</p>
                <p>DAX</p>
                <p>CAC 40</p>
                <p>EURO STOXX 50</p>
                <p>IBEX 35</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-terminal-border text-center">
              <h3 className="text-xl font-semibold mb-4">Asian Markets</h3>
              <div className="space-y-2 text-terminal-muted-foreground">
                <p>Nikkei 225</p>
                <p>Hang Seng</p>
                <p>Shanghai Composite</p>
                <p>KOSPI</p>
                <p>TOPIX</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-terminal-border text-center">
              <h3 className="text-xl font-semibold mb-4">Indian Markets</h3>
              <div className="space-y-2 text-terminal-muted-foreground">
                <p>NIFTY 50</p>
                <p>BSE SENSEX</p>
                <p>NIFTY Bank</p>
                <p>NIFTY IT</p>
                <p>India VIX</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-terminal-accent to-blue-500 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Trading?</h2>
          <p className="text-white/90 text-lg mb-10">
            Join thousands of traders and investors who are leveraging AI-powered market intelligence to make better investment decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button className="bg-white text-terminal-accent hover:bg-white/90 h-12 px-8 text-base">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-white text-white hover:bg-white/20 h-12 px-8 text-base">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-terminal-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-terminal-muted-foreground">
                <li><a href="#" className="hover:text-terminal-foreground">Features</a></li>
                <li><a href="#" className="hover:text-terminal-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-terminal-foreground">AI Insights</a></li>
                <li><a href="#" className="hover:text-terminal-foreground">Market Data</a></li>
                <li><a href="#" className="hover:text-terminal-foreground">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-terminal-muted-foreground">
                <li><a href="#" className="hover:text-terminal-foreground">About</a></li>
                <li><a href="#" className="hover:text-terminal-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-terminal-foreground">Press</a></li>
                <li><a href="#" className="hover:text-terminal-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-terminal-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-terminal-muted-foreground">
                <li><a href="#" className="hover:text-terminal-foreground">Documentation</a></li>
                <li><a href="#" className="hover:text-terminal-foreground">API</a></li>
                <li><a href="#" className="hover:text-terminal-foreground">Guides</a></li>
                <li><a href="#" className="hover:text-terminal-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-terminal-foreground">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-terminal-muted-foreground">
                <li><a href="#" className="hover:text-terminal-foreground">Terms</a></li>
                <li><a href="#" className="hover:text-terminal-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-terminal-foreground">Cookies</a></li>
                <li><a href="#" className="hover:text-terminal-foreground">Licenses</a></li>
                <li><a href="#" className="hover:text-terminal-foreground">Settings</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-terminal-border">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-md bg-terminal-accent flex items-center justify-center text-white font-bold">
                AG
              </div>
              <span className="font-semibold">Arta.Guru</span>
            </div>
            <div className="text-sm text-terminal-muted-foreground">
              © 2025 Arta.Guru. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
