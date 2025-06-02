import DashboardLayout from "@/components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Stocks = () => {
  const navigate = useNavigate();
  const [ticker, setTicker] = useState("AAPL");
  const [stockInfo, setStockInfo] = useState<any | null>(null);
  const [apiError, setApiError] = useState<string>("");

  const fetchStockData = () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API}/api/stock?ticker=${ticker}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setApiError(data.error);
          setStockInfo(null);
        } else {
          setStockInfo(data);
          setApiError("");
        }
      })
      .catch(() => {
        setApiError("Failed to fetch data from backend");
        setStockInfo(null);
      });
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  const handleTradeClick = () => {
    navigate("/trading");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">📈 Stock Overview</h1>

        <div className="flex space-x-4 items-center">
          <label htmlFor="ticker">Enter Ticker Symbol:</label>
          <Input
            id="ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="e.g. TSLA"
            className="w-40"
          />
          <Button onClick={fetchStockData}>View</Button>
        </div>

        {apiError && <p className="text-red-500">❌ {apiError}</p>}

        {stockInfo && (
          <div className="space-y-2 mt-4">
            <p><strong>Name:</strong> {stockInfo.name}</p>
            <p><strong>Ticker:</strong> {stockInfo.ticker}</p>
            <p><strong>Market:</strong> {stockInfo.market}</p>
            <p><strong>Exchange:</strong> {stockInfo.primary_exchange}</p>
            <p><strong>Locale:</strong> {stockInfo.locale}</p>
            <p><strong>Last Updated:</strong> {stockInfo.updated || "N/A"}</p>
          </div>
        )}

        <Button onClick={handleTradeClick} className="mt-6">Go to Trading</Button>
      </div>
    </DashboardLayout>
  );
};

export default Stocks;
