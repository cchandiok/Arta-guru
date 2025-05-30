
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MarketCard } from "@/components/dashboard/MarketCard";
import { StockChart } from "@/components/dashboard/StockChart";
import { AiInsights } from "@/components/dashboard/AiInsights";
import { NewsCard } from "@/components/dashboard/NewsCard";
import { WatchlistCard } from "@/components/dashboard/WatchlistCard";
import { SecFilingsCard } from "@/components/dashboard/SecFilingsCard";
import { ScreenerCard } from "@/components/dashboard/ScreenerCard";

interface DashboardProps {
  onLogout?: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  return (
    <DashboardLayout onLogout={onLogout}>
      <div className="grid grid-cols-12 gap-4">
        {/* Market overview cards - row 1 */}
        <div className="col-span-3">
          <MarketCard
            title="S&P 500"
            symbol="US"
            value={5123.25}
            change={15.23}
            percentage={0.25}
          />
        </div>
        <div className="col-span-3">
          <MarketCard
            title="NASDAQ"
            symbol="US"
            value={16721.14}
            change={64.62}
            percentage={0.38}
          />
        </div>
        <div className="col-span-3">
          <MarketCard
            title="FTSE 100"
            symbol="UK"
            value={7878.85}
            change={-23.45}
            percentage={-0.30}
          />
        </div>
        <div className="col-span-3">
          <MarketCard
            title="NIKKEI 225"
            symbol="JP"
            value={38125.62}
            change={124.35}
            percentage={0.37}
          />
        </div>

        {/* Main chart - row 2 */}
        <div className="col-span-8">
          <StockChart
            title="S&P 500 Index"
            symbol="SPY"
            trend="up"
          />
        </div>
        <div className="col-span-4">
          <WatchlistCard />
        </div>

        {/* News and insights - row 3 */}
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <StockChart
                title="NASDAQ Composite"
                symbol="NASDAQ"
                trend="volatile"
                compact={true}
              />
            </div>
            <div className="col-span-1">
              <StockChart
                title="Dow Jones Industrial"
                symbol="DJI"
                trend="down"
                compact={true}
              />
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <NewsCard compact={true} />
        </div>

        {/* Additional content - row 4 */}
        <div className="col-span-6">
          <AiInsights />
        </div>
        <div className="col-span-6">
          <ScreenerCard />
        </div>

        {/* SEC Filings - row 5 */}
        <div className="col-span-12">
          <SecFilingsCard />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
