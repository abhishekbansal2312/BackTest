import React, { useState } from "react";
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

  const [isCustomSymbol, setIsCustomSymbol] = useState(false);

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
    <div className="bg-gradient-to-br  p-6 rounded-2xl shadow-2xl border border-indigo-800/50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tight">
            Backtest Configuration
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Configure your trading strategy parameters
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-400">Status:</span>
          <span className="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-xs font-medium animate-pulse">
            Ready to Backtest
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Underlying Symbol */}
        <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-5 border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 group">
          <label className="block text-sm font-semibold text-gray-300 mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-cyan-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            Underlying Symbol
          </label>

          <div className="flex flex-wrap gap-2 mb-3">
            {commonSymbols.map((symbol) => (
              <button
                key={symbol}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 ${
                  underlyingSymbol === symbol
                    ? "bg-cyan-500 text-white ring-2 ring-cyan-500/50"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white"
                }`}
                onClick={() => {
                  setUnderlyingSymbol(symbol);
                  setIsCustomSymbol(false);
                }}
              >
                {symbol}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              className={`w-full bg-slate-900/50 border ${
                isCustomSymbol ? "border-cyan-500/50" : "border-slate-700"
              } rounded-md p-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300`}
              placeholder="Custom symbol..."
              value={
                !commonSymbols.includes(underlyingSymbol)
                  ? underlyingSymbol
                  : ""
              }
              onFocus={() => setIsCustomSymbol(true)}
              onChange={(e) => {
                setUnderlyingSymbol(e.target.value);
                setIsCustomSymbol(true);
              }}
            />
            {isCustomSymbol && (
              <span className="absolute right-2 top-3 text-cyan-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </div>
        </div>

        {/* Option Expiry */}
        <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-5 border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300">
          <label className="block text-sm font-semibold text-gray-300 mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-cyan-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            Option Expiry Type
          </label>
          <div className="flex gap-2">
            {["WEEKLY", "MONTHLY"].map((type) => (
              <button
                key={type}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                  optionExpiry === type
                    ? "bg-cyan-500 text-white ring-2 ring-cyan-500/50"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white"
                }`}
                onClick={() => setOptionExpiry(type)}
              >
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Expiry Day */}
        <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-5 border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300">
          <label className="block text-sm font-semibold text-gray-300 mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-cyan-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            Expiry Day
          </label>
          <div className="grid grid-cols-5 gap-2">
            {["MON", "TUE", "WED", "THU", "FRI"].map((day) => (
              <button
                key={day}
                className={`px-2 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                  expiryDay === day
                    ? "bg-cyan-500 text-white ring-2 ring-cyan-500/50"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white"
                }`}
                onClick={() => setExpiryDay(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Trading Days */}
        <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-5 border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300">
          <label className="block text-sm font-semibold text-gray-300 mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-cyan-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            Active Trading Days
          </label>
          <div className="space-y-2">
            {weekdays.map((day) => (
              <div
                key={day}
                className="flex items-center hover:bg-slate-700 rounded-md p-1.5 transition-all duration-200"
              >
                <input
                  type="checkbox"
                  id={`day-${day}`}
                  className="w-4 h-4 mr-3 text-cyan-500 bg-slate-900 border-slate-700 rounded focus:ring-cyan-500/50"
                  checked={tradingDays.includes(day)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTradingDays([...tradingDays, day]);
                    } else {
                      setTradingDays(tradingDays.filter((d) => d !== day));
                    }
                  }}
                />
                <label
                  htmlFor={`day-${day}`}
                  className="text-gray-300 text-sm select-none"
                >
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
