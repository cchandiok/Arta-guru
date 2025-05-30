
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

// Sample data - would be replaced with real API data
const generateChartData = (days: number, trend: "up" | "down" | "volatile") => {
  const data = [];
  let value = 150 + Math.random() * 50;
  
  for (let i = 0; i < days; i++) {
    let change;
    
    if (trend === "up") {
      change = (Math.random() * 5) - 1; // Mostly positive
    } else if (trend === "down") {
      change = (Math.random() * 5) - 4; // Mostly negative
    } else {
      change = (Math.random() * 10) - 5; // Volatile
    }
    
    value += change;
    value = Math.max(value, 100); // Don't go below 100
    
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      value: parseFloat(value.toFixed(2))
    });
  }
  
  return data;
};

const timeRanges = [
  { label: "1D", days: 1 },
  { label: "1W", days: 7 },
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
  { label: "1Y", days: 365 },
  { label: "ALL", days: 1825 }
];

interface StockChartProps {
  title: string;
  symbol: string;
  trend?: "up" | "down" | "volatile";
  className?: string;
  compact?: boolean;
}

export function StockChart({ title, symbol, trend = "volatile", className, compact = false }: StockChartProps) {
  const [selectedRange, setSelectedRange] = useState(timeRanges[2]); // Default to 1M
  const data = generateChartData(selectedRange.days, trend);
  
  const startValue = data[0].value;
  const endValue = data[data.length - 1].value;
  const change = endValue - startValue;
  const percentageChange = (change / startValue) * 100;
  const isPositive = change >= 0;
  
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-terminal-border rounded-md shadow-md">
          <p className="text-sm text-terminal-muted-foreground">{data.date}</p>
          <p className="text-base font-medium">${data.value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className={cn("flex flex-row items-center justify-between", compact ? "p-4" : "")}>
        <div>
          <CardTitle className={cn(compact ? "text-base" : "text-xl")}>{title}</CardTitle>
          <CardDescription className="text-terminal-muted-foreground">{symbol}</CardDescription>
        </div>
        <div className={cn(
          "flex items-center",
          isPositive ? "text-terminal-accent" : "text-terminal-negative"
        )}>
          <span className={cn("text-xl font-bold", compact ? "text-base" : "text-xl")}>${endValue.toLocaleString()}</span>
          <div className="ml-2 flex items-center">
            {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            <span className="ml-1">${Math.abs(change).toFixed(2)}</span>
            <span className="ml-1">({Math.abs(percentageChange).toFixed(2)}%)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className={cn(compact ? "p-4 pt-0" : "")}>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={isPositive ? "#00C805" : "#FF5000"} 
                    stopOpacity={0.3}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={isPositive ? "#00C805" : "#FF5000"} 
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#787878" }}
                tickFormatter={(value) => {
                  if (selectedRange.days <= 1) {
                    return value; // For 1D, show hours
                  } else if (selectedRange.days <= 7) {
                    // For 1W, show day abbreviation
                    return value;
                  } else if (selectedRange.days <= 30) {
                    // For 1M, show dates partially
                    return value.split("-")[2];
                  } else if (selectedRange.days <= 90) {
                    // For 3M, show month/day
                    const parts = value.split("-");
                    return `${parts[1]}/${parts[2]}`;
                  } else {
                    // For 1Y and ALL, show month/year
                    const parts = value.split("-");
                    return `${parts[1]}/${parts[0].substring(2)}`;
                  }
                }}
              />
              <YAxis 
                domain={['auto', 'auto']}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#787878" }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={isPositive ? "#00C805" : "#FF5000"}
                strokeWidth={2}
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {!compact && (
          <div className="flex justify-center mt-4">
            <div className="inline-flex rounded-md border border-terminal-border overflow-hidden">
              {timeRanges.map((range) => (
                <Button
                  key={range.label}
                  onClick={() => setSelectedRange(range)}
                  variant={selectedRange.label === range.label ? "default" : "ghost"}
                  className={cn(
                    "h-8 px-3 text-xs rounded-none",
                    selectedRange.label === range.label 
                      ? "bg-terminal-accent text-white" 
                      : "text-terminal-foreground"
                  )}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
