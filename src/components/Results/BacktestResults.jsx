import React, { useState } from "react";
import { useBacktest } from "../../contexts/BacktestContext";
import PerformanceMetrics from "./PerformanceMetrics";
import TradesTable from "./TradesTable";
import BacktestChart from "../Charts/BacktestChart";

const BacktestResults = () => {
  const { isLoading, results, metrics, trades } = useBacktest();
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return (
      <div className="glass-panel p-6  flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg mb-2">Running Backtest...</p>
          <p className="text-gray-400">This may take a few moments</p>
        </div>
      </div>
    );
  }

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
    <div className="glass-panel p-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "overview"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "performance"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("performance")}
        >
          Performance
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "trades"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("trades")}
        >
          Trades
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <BacktestChart trades={trades} />
            </div>
            <div>
              <PerformanceMetrics metrics={metrics} />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Strategy Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-dark p-4 rounded-lg">
                <h4 className="text-gray-300 mb-2 font-medium">
                  Winning Trades
                </h4>
                <div className="text-2xl font-bold text-green-500 mb-1">
                  {metrics?.win_rate ? `${metrics.win_rate}%` : "N/A"}
                </div>
                <div className="text-gray-400 text-sm">
                  {metrics?.winning_trades} out of {metrics?.total_trades}{" "}
                  trades
                </div>
              </div>

              <div className="bg-dark p-4 rounded-lg">
                <h4 className="text-gray-300 mb-2 font-medium">
                  Average Trade Return
                </h4>
                <div className="text-2xl font-bold text-white mb-1">
                  {metrics?.avg_return
                    ? `₹${parseInt(metrics.avg_return).toLocaleString()}`
                    : "N/A"}
                </div>
                <div className="text-gray-400 text-sm">Per trade average</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Recent Trades</h3>
            <TradesTable trades={trades?.slice(0, 5)} showPagination={false} />
            <div className="mt-2 text-right">
              <button
                className="text-primary hover:text-primary-light text-sm"
                onClick={() => setActiveTab("trades")}
              >
                View All Trades →
              </button>
            </div>
          </div>
        </>
      )}

      {activeTab === "performance" && (
        <div className="space-y-6">
          <PerformanceMetrics metrics={metrics} expanded={true} />

          <div>
            <h3 className="text-lg font-medium mb-3">Performance Chart</h3>
            <BacktestChart trades={trades} height={400} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark p-4 rounded-lg">
              <h4 className="text-gray-300 mb-3 font-medium">
                Monthly Performance
              </h4>
              {/* This would be a monthly bar chart component */}
              <div className="h-60 flex items-center justify-center">
                <div className="text-gray-400">
                  Monthly breakdown chart would go here
                </div>
              </div>
            </div>

            <div className="bg-dark p-4 rounded-lg">
              <h4 className="text-gray-300 mb-3 font-medium">
                Drawdown Analysis
              </h4>
              {/* This would be a drawdown chart component */}
              <div className="h-60 flex items-center justify-center">
                <div className="text-gray-400">
                  Drawdown analysis chart would go here
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "trades" && (
        <div>
          <h3 className="text-lg font-medium mb-4">All Trades</h3>
          <TradesTable trades={trades} showPagination={true} />
        </div>
      )}
    </div>
  );
};

export default BacktestResults;
