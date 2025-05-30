
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Filing {
  id: string;
  form: string;
  company: string;
  symbol: string;
  filed: string;
  description: string;
}

const filings: Filing[] = [
  {
    id: "1",
    form: "10-K",
    company: "Apple Inc.",
    symbol: "AAPL",
    filed: "2024-03-15",
    description: "Annual report for the fiscal year ending December 31, 2023"
  },
  {
    id: "2",
    form: "10-Q",
    company: "Microsoft Corporation",
    symbol: "MSFT",
    filed: "2024-04-05",
    description: "Quarterly report for the period ending March 31, 2024"
  },
  {
    id: "3",
    form: "8-K",
    company: "Amazon.com, Inc.",
    symbol: "AMZN",
    filed: "2024-04-02",
    description: "Current report announcing executive changes"
  },
  {
    id: "4",
    form: "S-1",
    company: "Stripe, Inc.",
    symbol: "N/A",
    filed: "2024-03-28",
    description: "Registration statement for initial public offering"
  },
  {
    id: "5",
    form: "10-K",
    company: "Tesla, Inc.",
    symbol: "TSLA",
    filed: "2024-03-10",
    description: "Annual report for the fiscal year ending December 31, 2023"
  },
  {
    id: "6",
    form: "DEF 14A",
    company: "Alphabet Inc.",
    symbol: "GOOG",
    filed: "2024-03-25",
    description: "Proxy statement for annual shareholder meeting"
  },
  {
    id: "7",
    form: "8-K",
    company: "Meta Platforms, Inc.",
    symbol: "META",
    filed: "2024-04-01",
    description: "Current report announcing acquisition"
  }
];

const SecFilings = () => {
  const getFormColor = (form: string) => {
    switch (form) {
      case "10-K":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "10-Q":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "8-K":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "S-1":
        return "bg-green-100 text-green-800 border-green-200";
      case "DEF 14A":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">SEC Filings</h1>
          <p className="text-muted-foreground">Search and analyze company filings</p>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Filing Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search company or ticker..."
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Form Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Forms</SelectItem>
                  <SelectItem value="10-K">10-K</SelectItem>
                  <SelectItem value="10-Q">10-Q</SelectItem>
                  <SelectItem value="8-K">8-K</SelectItem>
                  <SelectItem value="S-1">S-1</SelectItem>
                  <SelectItem value="DEF 14A">DEF 14A</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              <Button className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter Results</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Filings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filings.map((filing) => (
                <div
                  key={filing.id}
                  className="p-4 rounded-md hover:bg-terminal-muted cursor-pointer transition-colors border"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <div className="flex items-center flex-wrap gap-2">
                      <Badge className={getFormColor(filing.form)}>
                        {filing.form}
                      </Badge>
                      <span className="font-medium">{filing.symbol}</span>
                      <span className="text-terminal-muted-foreground">{filing.company}</span>
                    </div>
                    <div className="text-sm text-terminal-muted-foreground">
                      Filed: {filing.filed}
                    </div>
                  </div>
                  <p className="text-sm text-terminal-muted-foreground">{filing.description}</p>
                  <div className="mt-2 flex items-center gap-1 text-terminal-accent text-sm">
                    <FileText className="h-3 w-3" />
                    <span>View document</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SecFilings;
