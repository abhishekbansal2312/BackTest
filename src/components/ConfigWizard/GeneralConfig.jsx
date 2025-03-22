import React from "react";
import { useBacktest } from "../../contexts/BacktestContext";

const GeneralConfig = () => {
  const {
    underlyingSymbol,
    setUnderlyingSymbol,
    optionExpiry,
    setOptionExpiry,
    expiryDay,
    setExpiryDay,
    tradingDays,
    setTradingDays,
  } = useBacktest();

  // Common stock/index options in India
  const commonSymbols = [
    "NIFTY",
    "BANKNIFTY",
    "FINNIFTY",
    "RELIANCE",
    "TCS",
    "HDFCBANK",
    "INFY",
  ];
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Basic Setup</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Underlying Symbol */}
        <div className="glass-card p-4 border border-gray-700 rounded-lg">
          <label className="block text-gray-300 mb-2">Underlying Symbol</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {commonSymbols.map((symbol) => (
              <button
                key={symbol}
                className={`px-3 py-1 rounded-md text-sm ${
                  underlyingSymbol === symbol
                    ? "bg-primary text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                onClick={() => setUnderlyingSymbol(symbol)}
              >
                {symbol}
              </button>
            ))}
          </div>
          <input
            type="text"
            className="w-full bg-dark rounded p-2 mt-2"
            placeholder="Or enter custom symbol..."
            value={
              !commonSymbols.includes(underlyingSymbol) ? underlyingSymbol : ""
            }
            onChange={(e) => setUnderlyingSymbol(e.target.value)}
          />
        </div>

        {/* Option Expiry */}
        <div className="glass-card p-4 border border-gray-700 rounded-lg">
          <label className="block text-gray-300 mb-2">Option Expiry</label>
          <div className="flex gap-2">
            <button
              className={`flex-1 px-3 py-2 rounded-md ${
                optionExpiry === "WEEKLY"
                  ? "bg-primary text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setOptionExpiry("WEEKLY")}
            >
              Weekly
            </button>
            <button
              className={`flex-1 px-3 py-2 rounded-md ${
                optionExpiry === "MONTHLY"
                  ? "bg-primary text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setOptionExpiry("MONTHLY")}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Expiry Day */}
        <div className="glass-card p-4 border border-gray-700 rounded-lg">
          <label className="block text-gray-300 mb-2">Expiry Day</label>
          <div className="grid grid-cols-3 gap-2">
            {["MON", "TUE", "WED", "THU", "FRI"].map((day) => (
              <button
                key={day}
                className={`px-3 py-2 rounded-md ${
                  expiryDay === day
                    ? "bg-primary text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                onClick={() => setExpiryDay(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Trading Days */}
        <div className="glass-card p-4 border border-gray-700 rounded-lg">
          <label className="block text-gray-300 mb-2">Trading Days</label>
          <div className="space-y-2">
            {weekdays.map((day) => (
              <div key={day} className="flex items-center">
                <input
                  type="checkbox"
                  id={`day-${day}`}
                  className="w-4 h-4 mr-2 accent-primary"
                  checked={tradingDays.includes(day)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTradingDays([...tradingDays, day]);
                    } else {
                      setTradingDays(tradingDays.filter((d) => d !== day));
                    }
                  }}
                />
                <label htmlFor={`day-${day}`} className="text-gray-300">
                  {day}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralConfig;
