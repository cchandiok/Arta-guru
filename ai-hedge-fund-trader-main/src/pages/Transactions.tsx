
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowDownUp, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Transaction {
  id: string;
  date: string;
  symbol: string;
  type: "buy" | "sell";
  quantity: number;
  price: number;
  total: number;
  status: "completed" | "pending" | "cancelled";
}

const transactions: Transaction[] = [
  {
    id: "1",
    date: "2024-04-15 09:32:45",
    symbol: "AAPL",
    type: "buy",
    quantity: 10,
    price: 172.45,
    total: 1724.50,
    status: "completed"
  },
  {
    id: "2",
    date: "2024-04-14 14:20:12",
    symbol: "MSFT",
    type: "buy",
    quantity: 5,
    price: 406.32,
    total: 2031.60,
    status: "completed"
  },
  {
    id: "3",
    date: "2024-04-13 11:15:30",
    symbol: "TSLA",
    type: "sell",
    quantity: 3,
    price: 172.50,
    total: 517.50,
    status: "completed"
  },
  {
    id: "4",
    date: "2024-04-12 15:45:22",
    symbol: "AMZN",
    type: "buy",
    quantity: 2,
    price: 182.30,
    total: 364.60,
    status: "completed"
  },
  {
    id: "5",
    date: "2024-04-11 10:05:18",
    symbol: "NVDA",
    type: "sell",
    quantity: 8,
    price: 88.75,
    total: 710.00,
    status: "completed"
  },
  {
    id: "6",
    date: "2024-04-10 13:22:07",
    symbol: "GOOG",
    type: "buy",
    quantity: 1,
    price: 148.20,
    total: 148.20,
    status: "completed"
  },
  {
    id: "7",
    date: "2024-04-09 11:10:35",
    symbol: "RELIANCE",
    type: "buy",
    quantity: 15,
    price: 2400.25,
    total: 36003.75,
    status: "completed"
  },
  {
    id: "8",
    date: "2024-04-08 15:48:22",
    symbol: "INFY",
    type: "buy",
    quantity: 25,
    price: 17.25,
    total: 431.25,
    status: "completed"
  },
  {
    id: "9",
    date: "2024-04-07 14:32:18",
    symbol: "TCS",
    type: "sell",
    quantity: 5,
    price: 3850.40,
    total: 19252.00,
    status: "completed"
  }
];

const Transactions = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "buy" 
      ? "bg-blue-100 text-blue-800 border-blue-200"
      : "bg-rose-100 text-rose-800 border-rose-200";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Track your trading activity</p>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="30">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Custom Range</span>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2 ml-auto">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowDownUp className="h-4 w-4" />
            <span>Sort</span>
          </Button>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="grid w-full md:w-auto grid-cols-4 mb-4">
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="buys">Buy Orders</TabsTrigger>
            <TabsTrigger value="sells">Sell Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Price ($)</TableHead>
                      <TableHead className="text-right">Total ($)</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.date}</TableCell>
                        <TableCell>{transaction.symbol}</TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(transaction.type)}>
                            {transaction.type.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{transaction.quantity}</TableCell>
                        <TableCell className="text-right">${transaction.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${transaction.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="buys">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Buy Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Price ($)</TableHead>
                      <TableHead className="text-right">Total ($)</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions
                      .filter((transaction) => transaction.type === "buy")
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.date}</TableCell>
                          <TableCell>{transaction.symbol}</TableCell>
                          <TableCell className="text-right">{transaction.quantity}</TableCell>
                          <TableCell className="text-right">${transaction.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${transaction.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sells">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Sell Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Price ($)</TableHead>
                      <TableHead className="text-right">Total ($)</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions
                      .filter((transaction) => transaction.type === "sell")
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.date}</TableCell>
                          <TableCell>{transaction.symbol}</TableCell>
                          <TableCell className="text-right">{transaction.quantity}</TableCell>
                          <TableCell className="text-right">${transaction.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${transaction.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Pending Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Price ($)</TableHead>
                      <TableHead className="text-right">Total ($)</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions
                      .filter((transaction) => transaction.status === "pending")
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.date}</TableCell>
                          <TableCell>{transaction.symbol}</TableCell>
                          <TableCell>
                            <Badge className={getTypeColor(transaction.type)}>
                              {transaction.type.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{transaction.quantity}</TableCell>
                          <TableCell className="text-right">${transaction.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${transaction.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    {!transactions.some((transaction) => transaction.status === "pending") && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No pending transactions found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
