
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

interface TradeEntryFormProps {
  onTradeSubmit: (trade: TradeDetails) => void;
  availableCash: number;
  symbol?: string;
  currentPrice?: number;
}

export interface TradeDetails {
  symbol: string;
  quantity: number;
  price: number;
  type: "buy" | "sell";
  orderType: "market" | "limit";
  limitPrice?: number;
  total: number;
}

export function TradeEntryForm({ onTradeSubmit, availableCash, symbol = "", currentPrice = 0 }: TradeEntryFormProps) {
  const { toast } = useToast();
  const [tradeDetails, setTradeDetails] = useState<TradeDetails>({
    symbol: symbol,
    quantity: 0,
    price: currentPrice,
    type: "buy",
    orderType: "market",
    total: 0,
  });

  const handleQuantityChange = (value: string) => {
    const quantity = parseInt(value) || 0;
    setTradeDetails({
      ...tradeDetails,
      quantity,
      total: quantity * (tradeDetails.orderType === "market" ? tradeDetails.price : (tradeDetails.limitPrice || 0)),
    });
  };

  const handleLimitPriceChange = (value: string) => {
    const limitPrice = parseFloat(value) || 0;
    setTradeDetails({
      ...tradeDetails,
      limitPrice,
      total: tradeDetails.quantity * limitPrice,
    });
  };

  const handleSymbolChange = (value: string) => {
    setTradeDetails({
      ...tradeDetails,
      symbol: value,
    });
  };

  const handleSubmit = () => {
    // Validation
    if (!tradeDetails.symbol) {
      toast({
        title: "Symbol is required",
        description: "Please enter a valid stock symbol",
        variant: "destructive",
      });
      return;
    }

    if (tradeDetails.quantity <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Quantity must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    if (tradeDetails.orderType === "limit" && (!tradeDetails.limitPrice || tradeDetails.limitPrice <= 0)) {
      toast({
        title: "Invalid limit price",
        description: "Please enter a valid limit price",
        variant: "destructive",
      });
      return;
    }

    // Check buying power
    if (tradeDetails.type === "buy" && tradeDetails.total > availableCash) {
      toast({
        title: "Insufficient funds",
        description: "You do not have enough cash to complete this transaction",
        variant: "destructive",
      });
      return;
    }

    onTradeSubmit(tradeDetails);

    toast({
      title: "Trade submitted",
      description: `${tradeDetails.type.toUpperCase()} ${tradeDetails.quantity} shares of ${tradeDetails.symbol} at ${tradeDetails.orderType === "market" ? "market price" : `$${tradeDetails.limitPrice}`}`,
      variant: "default",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {tradeDetails.type === "buy" ? (
            <TrendingUp className="h-5 w-5 text-blue-500" />
          ) : (
            <TrendingDown className="h-5 w-5 text-rose-500" />
          )}
          Place {tradeDetails.type === "buy" ? "Buy" : "Sell"} Order
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Tabs 
              defaultValue="buy" 
              onValueChange={(value) => setTradeDetails({...tradeDetails, type: value as "buy" | "sell"})}
              value={tradeDetails.type}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="symbol">Symbol</Label>
              <Input 
                id="symbol" 
                placeholder="Enter stock symbol" 
                value={tradeDetails.symbol} 
                onChange={(e) => handleSymbolChange(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input 
                id="quantity" 
                type="number" 
                min="1" 
                placeholder="Enter quantity" 
                value={tradeDetails.quantity || ''} 
                onChange={(e) => handleQuantityChange(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Order Type</Label>
              <RadioGroup 
                defaultValue="market" 
                value={tradeDetails.orderType} 
                onValueChange={(value) => setTradeDetails({...tradeDetails, orderType: value as "market" | "limit"})}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="market" id="market" />
                  <Label htmlFor="market">Market Order</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="limit" id="limit" />
                  <Label htmlFor="limit">Limit Order</Label>
                </div>
              </RadioGroup>
            </div>

            {tradeDetails.orderType === "limit" && (
              <div className="space-y-2">
                <Label htmlFor="limitPrice">Limit Price ($)</Label>
                <Input 
                  id="limitPrice" 
                  type="number" 
                  step="0.01" 
                  min="0.01" 
                  placeholder="Enter limit price"
                  value={tradeDetails.limitPrice || ''} 
                  onChange={(e) => handleLimitPriceChange(e.target.value)}
                />
              </div>
            )}

            <div className="pt-4 flex justify-between items-center border-t border-gray-100">
              <Label className="text-muted-foreground">Estimated Total:</Label>
              <div className="text-xl font-semibold flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                {tradeDetails.total.toFixed(2)}
              </div>
            </div>
            
            {tradeDetails.type === "buy" && (
              <div className="flex items-center justify-between text-sm">
                <span>Available Cash:</span>
                <span className="font-medium">${availableCash.toLocaleString()}</span>
              </div>
            )}

            {tradeDetails.orderType === "market" && (
              <div className="text-xs text-muted-foreground flex items-center bg-amber-50 p-2 rounded-md">
                <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                <span>Market orders execute immediately at the current market price.</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Preview {tradeDetails.type === "buy" ? "Buy" : "Sell"} Order
        </Button>
      </CardFooter>
    </Card>
  );
}
