import React from "react";
import { useBacktest } from "../../contexts/BacktestContext";

const ConfigSummary = () => {
  const {
    underlyingSymbol,
    optionExpiry,
    expiryDay,
    tradingDays,
    entryTime,
    exitTime,
    capital,
    startDate,
    endDate,
    optionLegs,
    buildConfig,
    config,
  } = useBacktest();

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Build config for display - FIX: Use empty dependency array
  React.useEffect(() => {
    buildConfig();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        Backtest Configuration Summary
      </h2>

      {/* Rest of the component unchanged... */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* General Settings */}
        <div className="glass-card p-4 border border-gray-700 rounded-lg">
          <h3 className="text-lg font-medium mb-3">General Settings</h3>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="text-gray-400 py-1">Underlying</td>
                <td className="text-white text-right">{underlyingSymbol}</td>
              </tr>
              <tr>
                <td className="text-gray-400 py-1">Option Expiry</td>
                <td className="text-white text-right">{optionExpiry}</td>
              </tr>
              <tr>
                <td className="text-gray-400 py-1">Expiry Day</td>
                <td className="text-white text-right">{expiryDay}</td>
              </tr>
              <tr>
                <td className="text-gray-400 py-1">Trading Days</td>
                <td className="text-white text-right">
                  {tradingDays.join(", ")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Time & Capital */}
        <div className="glass-card p-4 border border-gray-700 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Time & Capital</h3>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="text-gray-400 py-1">Entry Time</td>
                <td className="text-white text-right">{entryTime}</td>
              </tr>
              <tr>
                <td className="text-gray-400 py-1">Exit Time</td>
                <td className="text-white text-right">{exitTime}</td>
              </tr>
              <tr>
                <td className="text-gray-400 py-1">Initial Capital</td>
                <td className="text-white text-right">
                  ₹{capital.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="text-gray-400 py-1">Date Range</td>
                <td className="text-white text-right">
                  {formatDate(startDate)} - {formatDate(endDate)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Option Legs */}
      <div className="glass-card p-4 border border-gray-700 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-3">Option Strategy</h3>
        {optionLegs.length > 0 ? (
          <div className="space-y-2">
            {optionLegs.map((leg, index) => (
              <div
                key={index}
                className="flex items-center bg-dark p-2 rounded-lg"
              >
                <div className="w-16 text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs text-white ${
                      leg.action === "BUY" ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {leg.action}
                  </span>
                </div>
                <div className="flex-grow text-white">
                  {leg.lots} {leg.lots > 1 ? "lots" : "lot"} of{" "}
                  {underlyingSymbol} {leg.strike_selection.method} {leg.type}
                  {leg.strike_selection.value &&
                    ` (${leg.strike_selection.value} points)`}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-center py-3">
            No option legs configured. Default ATM Call will be used.
          </div>
        )}
      </div>

      {/* JSON Config */}
      <div className="glass-card p-4 border border-gray-700 rounded-lg">
        <h3 className="text-lg font-medium mb-2 flex justify-between items-center">
          <span>Raw Configuration</span>
          <span className="text-xs text-gray-400">(For Advanced Users)</span>
        </h3>
        <div className="bg-dark p-3 rounded-md overflow-auto max-h-60">
          <pre className="text-gray-300 text-sm">
            {config ? JSON.stringify(config, null, 2) : "{}"}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ConfigSummary;
