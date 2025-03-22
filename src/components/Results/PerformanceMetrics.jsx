import React from "react";

const PerformanceMetrics = ({ metrics, expanded = false }) => {
  if (!metrics) {
    return (
      <div className="bg-dark p-4 rounded-lg">
        <div className="text-gray-400 text-center">No metrics available</div>
      </div>
    );
  }

  // Determine styling for positive/negative values
  const getValueStyle = (value) => {
    if (typeof value !== "number" && typeof value !== "string")
      return "text-white";

    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numValue)) return "text-white";

    return numValue >= 0 ? "text-green-500" : "text-red-500";
  };

  // Basic metrics for the compact view
  const basicMetrics = [
    {
      label: "Win Rate",
      value: metrics.win_rate + "%",
      style: getValueStyle(parseFloat(metrics.win_rate)),
    },
    {
      label: "Total Return",
      value: "₹" + parseInt(metrics.total_return).toLocaleString(),
      style: getValueStyle(metrics.total_return),
    },
    {
      label: "Profit Factor",
      value: metrics.profit_factor,
      style: getValueStyle(metrics.profit_factor - 1),
    },
    {
      label: "Max Drawdown",
      value: metrics.max_drawdown + "%",
      style: "text-red-500",
    },
  ];

  // Additional metrics for the expanded view
  const additionalMetrics = [
    {
      label: "Sharpe Ratio",
      value: metrics.sharpe_ratio,
      style: getValueStyle(metrics.sharpe_ratio),
    },
    {
      label: "Avg. Win",
      value: "₹" + parseInt(metrics.avg_win || 0).toLocaleString(),
      style: "text-green-500",
    },
    {
      label: "Avg. Loss",
      value: "₹" + parseInt(metrics.avg_loss || 0).toLocaleString(),
      style: "text-red-500",
    },
    { label: "Total Trades", value: metrics.total_trades, style: "text-white" },
    {
      label: "Winning Trades",
      value: metrics.winning_trades,
      style: "text-green-500",
    },
    {
      label: "Losing Trades",
      value: metrics.total_trades - metrics.winning_trades,
      style: "text-red-500",
    },
    {
      label: "Largest Win",
      value: "₹" + parseInt(metrics.largest_win || 0).toLocaleString(),
      style: "text-green-500",
    },
    {
      label: "Largest Loss",
      value: "₹" + parseInt(metrics.largest_loss || 0).toLocaleString(),
      style: "text-red-500",
    },
  ];

  // Show different layouts based on expanded flag
  if (expanded) {
    return (
      <div>
        <h3 className="text-lg font-medium mb-3">Performance Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...basicMetrics, ...additionalMetrics].map((metric, index) => (
            <div key={index} className="bg-dark p-3 rounded-lg">
              <div className="text-gray-400 text-sm mb-1">{metric.label}</div>
              <div className={`text-xl font-bold ${metric.style}`}>
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-3">Performance Metrics</h3>
      <div className="space-y-3">
        {basicMetrics.map((metric, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="text-gray-400">{metric.label}</div>
            <div className={`font-semibold ${metric.style}`}>
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMetrics;
