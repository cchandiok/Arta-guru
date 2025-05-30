import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LineChart, BrainCircuit, Globe } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        onLogin();
        toast({
          title: "Login successful",
          description: "Welcome to Arta.Guru!",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: data.message || "Invalid credentials",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Network error. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-terminal-muted">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-md bg-terminal-accent flex items-center justify-center text-white font-bold">
                AG
              </div>
              <h2 className="text-2xl font-bold">Arta.Guru</h2>
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username or Email</Label>
                  <input
                    id="username"
                    placeholder="Enter your username"
                    required
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-terminal-accent hover:bg-terminal-accent/90"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
            <div className="text-center text-sm">
              <Link to="/forgot-password" className="text-terminal-accent hover:underline">
                Forgot your password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 border-t border-terminal-border pt-4">
            <div className="text-center text-sm">
              <span className="text-terminal-muted-foreground">Don't have an account?</span>{" "}
              <Link to="/register" className="text-terminal-accent hover:underline">
                Sign up
              </Link>
            </div>
            <div className="text-center text-sm pt-2">
              <Link to="/" className="text-terminal-accent hover:underline">
                Back to Home
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-terminal-accent to-blue-600 opacity-90"></div>
        <div className="relative z-10 flex flex-col justify-center p-12 text-white h-full">
          <h1 className="text-5xl font-bold mb-8">AI-Powered Trading Intelligence</h1>
          <p className="text-xl mb-12">
            Access real-time market data, AI-driven insights, and comprehensive analytics across global markets.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <LineChart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Advanced Market Data</h3>
                <p className="text-white/80">
                  Real-time quotes, charts, and analytics for US, European, Asian, and Indian markets.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">AI-Powered Insights</h3>
                <p className="text-white/80">
                  Machine learning algorithms provide trade recommendations and sentiment analysis.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Global Coverage</h3>
                <p className="text-white/80">
                  Comprehensive coverage of equities, indices, commodities, and currencies worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
