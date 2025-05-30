
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SecFiling {
  id: string;
  form: string;
  company: string;
  symbol: string;
  filed: string;
  description: string;
}

// Example SEC filings - would be replaced with real API data
const secFilings: SecFiling[] = [
  {
    id: "1",
    form: "10-Q",
    company: "Apple Inc.",
    symbol: "AAPL",
    filed: "2024-04-05",
    description: "Quarterly report for the period ending March 31, 2024"
  },
  {
    id: "2",
    form: "8-K",
    company: "Microsoft Corporation",
    symbol: "MSFT",
    filed: "2024-04-04",
    description: "Report of unscheduled material events or corporate event"
  },
  {
    id: "3",
    form: "10-K",
    company: "Tesla, Inc.",
    symbol: "TSLA",
    filed: "2024-04-02",
    description: "Annual report for fiscal year ending December 31, 2023"
  },
  {
    id: "4",
    form: "8-K",
    company: "Nvidia Corporation",
    symbol: "NVDA",
    filed: "2024-04-01",
    description: "Report of unscheduled material events or corporate event"
  }
];

export function SecFilingsCard() {
  const getFormColor = (form: string) => {
    switch (form) {
      case "10-K":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "10-Q":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "8-K":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center text-lg">
          <FileText className="mr-2 h-5 w-5 text-terminal-accent" />
          Recent SEC Filings
        </CardTitle>
        <Button variant="ghost" size="sm" className="gap-1">
          View all <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {secFilings.map((filing) => (
            <div 
              key={filing.id}
              className="p-3 rounded-md hover:bg-terminal-muted cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Badge
                    className={getFormColor(filing.form)}
                  >
                    {filing.form}
                  </Badge>
                  <span className="ml-2 font-medium">{filing.symbol}</span>
                  <span className="ml-2 text-terminal-muted-foreground">{filing.company}</span>
                </div>
                <div className="text-sm text-terminal-muted-foreground">
                  Filed: {filing.filed}
                </div>
              </div>
              <p className="text-sm text-terminal-muted-foreground">{filing.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
