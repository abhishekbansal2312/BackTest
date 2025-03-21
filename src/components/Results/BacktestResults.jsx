import React from "react";
import { useBacktest } from "../../contexts/BacktestContext";
import PerformanceMetrics from "./PerformanceMetrics";
import TradesTable from "./TradesTable";
import BacktestChart from "../Charts/BacktestChart";

const BacktestResults = () => {
  const { isLoading, results, metrics, trades } = useBacktest();

  if (isLoading) {
    return (
      <div className="glass-panel p-6 flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-300">Running backtest...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="glass-panel p-6 text-center h-64 flex items-center justify-center">
        <div>
          <p className="text-gray-300 mb-2">
            Configure your backtest and click "Run Backtest" to see results.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6">
      <h2 className="text-xl font-semibold mb-6">Backtest Results</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PerformanceMetrics metrics={metrics} />
        <BacktestChart trades={trades} />
      </div>

      <TradesTable trades={trades} />
    </div>
  );
};

export default BacktestResults;
