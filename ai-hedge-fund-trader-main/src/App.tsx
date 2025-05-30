
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import Stocks from "./pages/Stocks";
import Screener from "./pages/Screener";
import Watchlists from "./pages/Watchlists";
import News from "./pages/News";
import Alerts from "./pages/Alerts";
import AiInsights from "./pages/AiInsights";
import SecFilings from "./pages/SecFilings";
import Companies from "./pages/Companies";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import GlobalMarkets from "./pages/GlobalMarkets";
import Trading from "./pages/Trading";
import NotFound from "./pages/NotFound";
import { useState } from "react";

function App() {
  // Simple auth state for demo
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  // Function to handle login
  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
  };

  return (
    <>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/markets"
            element={isAuthenticated ? <Markets /> : <Navigate to="/login" />}
          />
          <Route
            path="/stocks"
            element={isAuthenticated ? <Stocks /> : <Navigate to="/login" />}
          />
          <Route
            path="/screener"
            element={isAuthenticated ? <Screener /> : <Navigate to="/login" />}
          />
          <Route
            path="/watchlists"
            element={isAuthenticated ? <Watchlists /> : <Navigate to="/login" />}
          />
          <Route
            path="/news"
            element={isAuthenticated ? <News /> : <Navigate to="/login" />}
          />
          <Route
            path="/alerts"
            element={isAuthenticated ? <Alerts /> : <Navigate to="/login" />}
          />
          <Route
            path="/ai-insights"
            element={isAuthenticated ? <AiInsights /> : <Navigate to="/login" />}
          />
          <Route
            path="/sec-filings"
            element={isAuthenticated ? <SecFilings /> : <Navigate to="/login" />}
          />
          <Route
            path="/companies"
            element={isAuthenticated ? <Companies /> : <Navigate to="/login" />}
          />
          <Route
            path="/transactions"
            element={isAuthenticated ? <Transactions /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
          />
          <Route
            path="/global-markets"
            element={isAuthenticated ? <GlobalMarkets /> : <Navigate to="/login" />}
          />
          <Route
            path="/trading"
            element={isAuthenticated ? <Trading /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
