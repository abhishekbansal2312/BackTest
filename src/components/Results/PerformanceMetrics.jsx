import React from "react";

const PerformanceMetrics = ({ metrics }) => {
  if (!metrics) return null;

  // Calculate additional metrics
  const winRate = (metrics.win_rate * 100).toFixed(2);
  const sharpeRatio = metrics.sharpe_ratio.toFixed(4);

  // For demo purposes, calculate some additional metrics
  const totalTrades = 102; // This would come from the API in a real app
  const profitFactor = (Math.random() * 2 + 0.5).toFixed(2); // Mock data
  const maxDrawdown = (Math.random() * 20).toFixed(2); // Mock data
  const averageWin = (Math.random() * 1000 + 500).toFixed(2); // Mock data
  const averageLoss = (Math.random() * 500 + 100).toFixed(2); // Mock data

  return (
    <div className="bg-dark rounded-lg p-4">
      <h3 className="text-lg font-medium mb-4 text-primary">
        Performance Metrics
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-3">
          <p className="text-gray-400 text-sm">Win Rate</p>
          <p className="text-xl font-semibold">{winRate}%</p>
        </div>

        <div className="mb-3">
          <p className="text-gray-400 text-sm">Sharpe Ratio</p>
          <p className="text-xl font-semibold">{sharpeRatio}</p>
        </div>

        <div className="mb-3">
          <p className="text-gray-400 text-sm">Total Trades</p>
          <p className="text-xl font-semibold">{totalTrades}</p>
        </div>

        <div className="mb-3">
          <p className="text-gray-400 text-sm">Profit Factor</p>
          <p className="text-xl font-semibold">{profitFactor}</p>
        </div>

        <div className="mb-3">
          <p className="text-gray-400 text-sm">Max Drawdown</p>
          <p className="text-xl font-semibold">{maxDrawdown}%</p>
        </div>

        <div className="mb-3">
          <p className="text-gray-400 text-sm">Avg Win / Avg Loss</p>
          <p className="text-xl font-semibold">
            ₹{averageWin} / ₹{averageLoss}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
