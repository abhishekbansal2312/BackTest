import React, { useState, useMemo } from "react";
import { useBacktest } from "../../contexts/BacktestContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TradesTable from "./TradesTable";

// Advanced Metrics Calculation
const calculateAdvancedMetrics = (trades) => {
  const totalTrades = trades.length;
  const totalProfit = trades.reduce((sum, trade) => sum + trade.profit, 0);
  const winningTrades = trades.filter((trade) => trade.profit > 0);
  const losingTrades = trades.filter((trade) => trade.profit <= 0);

  // Profit by underlying price movement
  const profitByPriceMovement = trades.map((trade) => ({
    priceChange: trade.exit_underlying_price - trade.entry_underlying_price,
    profit: trade.profit,
  }));

  // Leg type performance
  const legTypePerformance = trades.reduce((acc, trade) => {
    trade.legs.forEach((leg) => {
      if (!acc[leg.leg_type]) {
        acc[leg.leg_type] = {
          totalPnl: 0,
          trades: 0,
          avgPnl: 0,
        };
      }
      acc[leg.leg_type].totalPnl += leg.pnl;
      acc[leg.leg_type].trades++;
    });

    Object.keys(acc).forEach((key) => {
      acc[key].avgPnl = acc[key].totalPnl / acc[key].trades;
    });

    return acc;
  }, {});

  // Trade duration analysis
  const tradeDurations = trades.map((trade) => {
    const duration =
      new Date(trade.exit_date).getTime() -
      new Date(trade.entry_date).getTime();
    return {
      durationHours: duration / (1000 * 60 * 60),
      profit: trade.profit,
    };
  });

  // Strike price impact
  const strikeImpactData = trades.map((trade) => {
    const avgStrike =
      trade.legs.reduce((sum, leg) => sum + leg.strike, 0) / trade.legs.length;
    return {
      avgStrike,
      profit: trade.profit,
    };
  });

  return {
    totalTrades,
    totalProfit,
    winningTradesCount: winningTrades.length,
    losingTradesCount: losingTrades.length,
    winRate: winningTrades.length / totalTrades,
    profitByPriceMovement,
    legTypePerformance,
    tradeDurations,
    strikeImpactData,
  };
};

const BacktestResults = () => {
  const { isLoading, results, metrics, trades } = useBacktest();
  const [activeTab, setActiveTab] = useState("overview");

  // Compute advanced metrics
  const advancedMetrics = useMemo(
    () => calculateAdvancedMetrics(trades || []),
    [trades]
  );

  // Graph color palette
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#FF6384",
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="glass-panel p-6 flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg mb-2">Running Backtest...</p>
          <p className="text-gray-400">This may take a few moments</p>
        </div>
      </div>
    );
  }

  // No results state
  if (!results) {
    return (
      <div className="glass-panel p-8 text-center min-h-[600px] flex flex-col items-center justify-center">
        <div className="mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <p className="text-gray-300 text-lg mb-2">
            Ready to Run Your Strategy
          </p>
          <p className="text-gray-400 max-w-md mx-auto">
            Configure your options strategy using the wizard and click "Run
            Backtest" to see how it would have performed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel bg-amber-50 p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex border-b border-gray-700 mb-6">
          <TabsTrigger
            value="overview"
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "overview"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "performance"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Performance
          </TabsTrigger>
          <TabsTrigger
            value="trades"
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "trades"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Trades
          </TabsTrigger>
        </TabsList>

        {activeTab === "overview" && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <Card className="bg-black border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-300">
                      Performance Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={trades}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="entry_date" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="profit"
                          stroke="#8884d8"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div>
                <div className="grid grid-cols-1 gap-4">
                  <Card className="bg-black border-gray-700">
                    <CardContent className="p-4">
                      <div className="text-gray-400 text-sm mb-1">Win Rate</div>
                      <div className="text-2xl font-bold text-green-500">
                        {metrics?.win_rate ? `${metrics.win_rate}%` : "N/A"}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black border-gray-700">
                    <CardContent className="p-4">
                      <div className="text-gray-400 text-sm mb-1">
                        Total Profit
                      </div>
                      <div className="text-2xl font-bold text-white">
                        ₹
                        {parseInt(advancedMetrics.totalProfit).toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-300">
                    Win/Loss Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Winning Trades",
                            value: advancedMetrics.winningTradesCount,
                          },
                          {
                            name: "Losing Trades",
                            value: advancedMetrics.losingTradesCount,
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          {
                            name: "Winning Trades",
                            value: advancedMetrics.winningTradesCount,
                          },
                          {
                            name: "Losing Trades",
                            value: advancedMetrics.losingTradesCount,
                          },
                        ].map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-black border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-300">
                    Profit by Price Movement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart>
                      <CartesianGrid />
                      <XAxis
                        type="number"
                        dataKey="priceChange"
                        name="Price Change"
                        unit="₹"
                        stroke="#888"
                      />
                      <YAxis
                        type="number"
                        dataKey="profit"
                        name="Profit"
                        unit="₹"
                        stroke="#888"
                      />
                      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                      <Scatter
                        name="Trades"
                        data={advancedMetrics.profitByPriceMovement}
                        fill={COLORS[0]}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-black border-gray-700">
                <CardContent className="p-4">
                  <div className="text-gray-400 text-sm mb-1">Total Profit</div>
                  <div className="text-white text-2xl font-bold">
                    ₹{advancedMetrics.totalProfit.toFixed(2)}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-black border-gray-700">
                <CardContent className="p-4">
                  <div className="text-gray-400 text-sm mb-1">Win Rate</div>
                  <div className="text-white text-2xl font-bold">
                    {(advancedMetrics.winRate * 100).toFixed(2)}%
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-black border-gray-700">
                <CardContent className="p-4">
                  <div className="text-gray-400 text-sm mb-1">Sharpe Ratio</div>
                  <div className="text-white text-2xl font-bold">
                    {metrics.sharpe_ratio.toFixed(4)}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-300">
                    Leg Type Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={Object.entries(
                        advancedMetrics.legTypePerformance
                      ).map(([legType, data]) => ({
                        legType,
                        totalPnl: data.totalPnl,
                        avgPnl: data.avgPnl,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="legType" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip />
                      <Bar dataKey="totalPnl" fill="#00C49F" name="Total PnL" />
                      <Bar dataKey="avgPnl" fill="#FFBB28" name="Avg PnL" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-black border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-300">
                    Trade Duration vs Profit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart>
                      <CartesianGrid />
                      <XAxis
                        type="number"
                        dataKey="durationHours"
                        name="Duration"
                        unit="hrs"
                        stroke="#888"
                      />
                      <YAxis
                        type="number"
                        dataKey="profit"
                        name="Profit"
                        unit="₹"
                        stroke="#888"
                      />
                      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                      <Scatter
                        name="Trades"
                        data={advancedMetrics.tradeDurations}
                        fill="#FF8042"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "trades" && <TradesTable trades={trades} />}
      </Tabs>
    </div>
  );
};

export default BacktestResults;
