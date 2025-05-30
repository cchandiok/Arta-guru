
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompanyProfile {
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  ceo: string;
  employees: number;
  founded: number;
  headquarters: string;
  description: string;
  marketCap: string;
  peRatio: number;
  dividendYield: number;
  beta: number;
  yearHigh: number;
  yearLow: number;
  avgVolume: string;
  website: string;
}

// Example company profile - would be replaced with real API data
const exampleProfile: CompanyProfile = {
  symbol: "AAPL",
  name: "Apple Inc.",
  sector: "Technology",
  industry: "Consumer Electronics",
  ceo: "Tim Cook",
  employees: 154000,
  founded: 1976,
  headquarters: "Cupertino, California",
  description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, and wearables, home, and accessories.",
  marketCap: "2.9T",
  peRatio: 28.5,
  dividendYield: 0.58,
  beta: 1.2,
  yearHigh: 198.23,
  yearLow: 124.17,
  avgVolume: "72.4M",
  website: "https://www.apple.com"
};

export function CompanyProfileCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center text-lg">
          <BookOpen className="mr-2 h-5 w-5 text-terminal-accent" />
          Company Profile
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{exampleProfile.sector}</Badge>
          <Button variant="ghost" size="sm" className="gap-1">
            <ExternalLink className="h-4 w-4" />
            Website
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold">{exampleProfile.name}</h2>
              <span className="text-xl text-terminal-muted-foreground ml-2">({exampleProfile.symbol})</span>
            </div>
            <p className="text-terminal-muted-foreground mb-4">{exampleProfile.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-terminal-muted-foreground">Company Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-terminal-muted-foreground">CEO</span>
                  <span className="font-medium">{exampleProfile.ceo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-terminal-muted-foreground">Employees</span>
                  <span className="font-medium">{exampleProfile.employees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-terminal-muted-foreground">Founded</span>
                  <span className="font-medium">{exampleProfile.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-terminal-muted-foreground">Headquarters</span>
                  <span className="font-medium">{exampleProfile.headquarters}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-terminal-muted-foreground">Industry</span>
                  <span className="font-medium">{exampleProfile.industry}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-terminal-muted-foreground">Financial Metrics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-terminal-muted-foreground">Market Cap</span>
                  <span className="font-medium">${exampleProfile.marketCap}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-terminal-muted-foreground">P/E Ratio</span>
                  <span className="font-medium">{exampleProfile.peRatio.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-terminal-muted-foreground">Dividend Yield</span>
                  <span className="font-medium">{exampleProfile.dividendYield.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-terminal-muted-foreground">Beta</span>
                  <span className="font-medium">{exampleProfile.beta.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-terminal-muted-foreground">Avg Volume</span>
                  <span className="font-medium">{exampleProfile.avgVolume}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-terminal-muted rounded-lg">
              <div>
                <div className="text-sm text-terminal-muted-foreground">52-Week High</div>
                <div className="font-semibold">${exampleProfile.yearHigh.toFixed(2)}</div>
              </div>
              <TrendingUp className="h-6 w-6 text-terminal-accent" />
            </div>
            <div className="flex items-center justify-between p-4 bg-terminal-muted rounded-lg">
              <div>
                <div className="text-sm text-terminal-muted-foreground">52-Week Low</div>
                <div className="font-semibold">${exampleProfile.yearLow.toFixed(2)}</div>
              </div>
              <TrendingDown className="h-6 w-6 text-terminal-negative" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
