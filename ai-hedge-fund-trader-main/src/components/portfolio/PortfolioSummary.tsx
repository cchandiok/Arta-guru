
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet, TrendingUp } from "lucide-react";

export interface StockHolding {
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  value: number;
  gainLoss: number;
  gainLossPercent: number;
  color: string;
}

interface PortfolioSummaryProps {
  holdings: StockHolding[];
  totalValue: number;
  cashBalance: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
}

export function PortfolioSummary({ 
  holdings,
  totalValue,
  cashBalance,
  totalGainLoss,
  totalGainLossPercent
}: PortfolioSummaryProps) {
  
  const portfolioData = holdings.map(holding => ({
    name: holding.symbol,
    value: holding.value,
    color: holding.color
  }));
  
  if (cashBalance > 0) {
    portfolioData.push({
      name: "Cash",
      value: cashBalance,
      color: "#94A3B8"
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Wallet className="h-5 w-5 text-terminal-accent mr-2" />
              <span className="text-2xl font-bold">${totalValue.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cash Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-2xl font-bold">${cashBalance.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Gain/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {totalGainLoss >= 0 ? (
                <ArrowUpRight className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <ArrowDownRight className="h-5 w-5 text-red-500 mr-2" />
              )}
              <span className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${Math.abs(totalGainLoss).toLocaleString()} ({totalGainLossPercent.toFixed(2)}%)
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-terminal-accent" />
              Portfolio Allocation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-7">
          <CardHeader>
            <CardTitle>Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {holdings.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No holdings found. Start trading to build your portfolio.</p>
              ) : (
                holdings.map((holding) => (
                  <div key={holding.symbol} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: holding.color }}></div>
                        <div className="font-medium">{holding.symbol}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{holding.name}</div>
                      <div className="text-xs mt-1">{holding.quantity} shares @ ${holding.averagePrice.toFixed(2)}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${holding.value.toLocaleString()}</div>
                      <div className={`text-xs flex items-center justify-end ${holding.gainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {holding.gainLoss >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        ${Math.abs(holding.gainLoss).toFixed(2)} ({holding.gainLossPercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
