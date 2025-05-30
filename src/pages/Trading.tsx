
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { TradeEntryForm, TradeDetails } from "@/components/trading/TradeEntryForm";
import { PortfolioSummary, StockHolding } from "@/components/portfolio/PortfolioSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, RefreshCcw, MoreHorizontal } from "lucide-react";

// Sample portfolio data
const initialHoldings: StockHolding[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: 10,
    averagePrice: 170.25,
    currentPrice: 175.40,
    value: 1754.00,
    gainLoss: 51.50,
    gainLossPercent: 3.03,
    color: "#8884d8"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    quantity: 5,
    averagePrice: 401.75,
    currentPrice: 406.32,
    value: 2031.60,
    gainLoss: 22.85,
    gainLossPercent: 1.14,
    color: "#82ca9d"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    quantity: 8,
    averagePrice: 156.22,
    currentPrice: 154.56,
    value: 1236.48,
    gainLoss: -13.28,
    gainLossPercent: -1.06,
    color: "#ffc658"
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    quantity: 12,
    averagePrice: 180.50,
    currentPrice: 182.30,
    value: 2187.60,
    gainLoss: 21.60,
    gainLossPercent: 1.00,
    color: "#ff8042"
  },
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    quantity: 15,
    averagePrice: 2400.25,
    currentPrice: 2431.55,
    value: 36473.25,
    gainLoss: 469.50,
    gainLossPercent: 1.30,
    color: "#0088FE"
  },
  {
    symbol: "INFY",
    name: "Infosys Ltd.",
    quantity: 25,
    averagePrice: 17.25,
    currentPrice: 17.62,
    value: 440.50,
    gainLoss: 9.25,
    gainLossPercent: 2.14,
    color: "#00C49F"
  }
];

// Sample transactions history
const initialTransactions: TradeDetails[] = [
  {
    symbol: "AAPL",
    quantity: 10,
    price: 170.25,
    type: "buy",
    orderType: "market",
    total: 1702.50
  },
  {
    symbol: "MSFT",
    quantity: 5,
    price: 401.75,
    type: "buy",
    orderType: "limit",
    limitPrice: 401.75,
    total: 2008.75
  },
  {
    symbol: "GOOGL",
    quantity: 8,
    price: 156.22,
    type: "buy",
    orderType: "market",
    total: 1249.76
  }
];

// Color palette for portfolio visualization
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Trading = () => {
  const { toast } = useToast();
  const [holdings, setHoldings] = useState<StockHolding[]>(initialHoldings);
  const [transactions, setTransactions] = useState<TradeDetails[]>(initialTransactions);
  const [cashBalance, setCashBalance] = useState<number>(25000);

  // Calculate portfolio metrics
  const totalInvested = holdings.reduce((sum, holding) => sum + (holding.quantity * holding.averagePrice), 0);
  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0) + cashBalance;
  const totalGainLoss = holdings.reduce((sum, holding) => sum + holding.gainLoss, 0);
  const totalGainLossPercent = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;
  
  const handleTradeSubmit = (trade: TradeDetails) => {
    // Add the transaction to history
    setTransactions([trade, ...transactions]);
    
    // Update cash balance
    if (trade.type === "buy") {
      setCashBalance(prev => prev - trade.total);
    } else {
      setCashBalance(prev => prev + trade.total);
    }

    // Update portfolio holdings
    const existingHolding = holdings.find(h => h.symbol === trade.symbol);
    
    if (trade.type === "buy") {
      if (existingHolding) {
        // Update existing holding
        const updatedHoldings = holdings.map(h => {
          if (h.symbol === trade.symbol) {
            const newQuantity = h.quantity + trade.quantity;
            const newAveragePrice = ((h.quantity * h.averagePrice) + (trade.quantity * trade.price)) / newQuantity;
            const newValue = newQuantity * h.currentPrice;
            const newGainLoss = newValue - (newQuantity * newAveragePrice);
            const newGainLossPercent = (newGainLoss / (newQuantity * newAveragePrice)) * 100;
            
            return {
              ...h,
              quantity: newQuantity,
              averagePrice: newAveragePrice,
              value: newValue,
              gainLoss: newGainLoss,
              gainLossPercent: newGainLossPercent
            };
          }
          return h;
        });
        
        setHoldings(updatedHoldings);
      } else {
        // Add new holding
        const newHolding: StockHolding = {
          symbol: trade.symbol,
          name: trade.symbol, // We would get the full name from an API in a real app
          quantity: trade.quantity,
          averagePrice: trade.price,
          currentPrice: trade.price,
          value: trade.quantity * trade.price,
          gainLoss: 0,
          gainLossPercent: 0,
          color: COLORS[holdings.length % COLORS.length]
        };
        
        setHoldings([...holdings, newHolding]);
      }
    } else if (trade.type === "sell") {
      if (existingHolding) {
        // Check if selling entire position
        if (trade.quantity >= existingHolding.quantity) {
          setHoldings(holdings.filter(h => h.symbol !== trade.symbol));
        } else {
          // Update existing holding after partial sell
          const updatedHoldings = holdings.map(h => {
            if (h.symbol === trade.symbol) {
              const newQuantity = h.quantity - trade.quantity;
              const newValue = newQuantity * h.currentPrice;
              const newGainLoss = newValue - (newQuantity * h.averagePrice);
              const newGainLossPercent = (newGainLoss / (newQuantity * h.averagePrice)) * 100;
              
              return {
                ...h,
                quantity: newQuantity,
                value: newValue,
                gainLoss: newGainLoss,
                gainLossPercent: newGainLossPercent
              };
            }
            return h;
          });
          
          setHoldings(updatedHoldings);
        }
      } else {
        toast({
          title: "Error",
          description: "You do not own any shares of this stock",
          variant: "destructive"
        });
      }
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Trading</h1>
            <p className="text-muted-foreground">Manage your portfolio and execute trades</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <RefreshCcw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
            <Select defaultValue="today">
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="portfolio">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="trade">Trade</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio" className="space-y-4">
            <PortfolioSummary
              holdings={holdings}
              totalValue={totalValue}
              cashBalance={cashBalance}
              totalGainLoss={totalGainLoss}
              totalGainLossPercent={totalGainLossPercent}
            />
          </TabsContent>
          
          <TabsContent value="trade" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7">
                <TradeEntryForm 
                  onTradeSubmit={handleTradeSubmit}
                  availableCash={cashBalance}
                />
              </div>
              <div className="md:col-span-5">
                <Card>
                  <CardHeader>
                    <CardTitle>Trading Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-muted-foreground">Available Cash</span>
                        <span className="font-medium">${cashBalance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-muted-foreground">Invested Value</span>
                        <span className="font-medium">${totalInvested.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-muted-foreground">Total Portfolio Value</span>
                        <span className="font-medium">${totalValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Gain/Loss</span>
                        <span className={`font-medium ${totalGainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          ${totalGainLoss.toLocaleString()} ({totalGainLossPercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No transaction history found.</p>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge className={transaction.type === "buy" ? "bg-blue-100 text-blue-800" : "bg-rose-100 text-rose-800"}>
                              {transaction.type.toUpperCase()}
                            </Badge>
                            <span className="font-medium">{transaction.symbol}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <CalendarDays className="h-3 w-3 mr-1" />
                            <span>Today</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${transaction.total.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.quantity} shares @ ${transaction.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Trading;
