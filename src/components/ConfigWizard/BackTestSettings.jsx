import React from "react";
import { useBacktest } from "../../contexts/BacktestContext";

const BacktestSettings = () => {
  const { capital, setCapital, startDate, setStartDate, endDate, setEndDate } =
    useBacktest();

  // Pre-defined date ranges
  const dateRanges = [
    { label: "Last Month", start: "2022-11-01", end: "2022-12-30" },
    { label: "Last Quarter", start: "2022-10-01", end: "2022-12-30" },
    { label: "Last 6 Months", start: "2022-07-01", end: "2022-12-30" },
    { label: "Year 2022", start: "2022-01-01", end: "2022-12-30" },
  ];

  // Capital presets
  const capitalPresets = [50000, 100000, 200000, 500000];

  // Format date for input
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="bg-gradient-to-br p-6 rounded-2xl shadow-2xl border border-indigo-800/50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tight">
            Backtest Settings
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Configure your backtest parameters
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-400">Status:</span>
          <span
            className={`px-4 py-1.5 rounded-full text-xs font-medium ${
              capital && startDate && endDate
                ? "bg-green-500/20 text-green-400 animate-pulse"
                : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {capital && startDate && endDate
              ? "Ready to Backtest"
              : "Complete Settings"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Capital Configuration */}
        <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-5 border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300">
          <label className="block text-sm font-semibold text-gray-300 mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-cyan-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8.433 7.418c.155-.439.39-.879.714-1.321C9.886 4.728 11.435 4 13.25 4c2.086 0 3.75 1.64 3.75 3.665 0 1.464-.507 2.824-1.36 3.919L8.433 7.418zM6 4a5 5 0 104.27 8H4.75c-.74 0-1.389-.357-1.846-.916l-.789-1.036z" />
              <path
                fillRule="evenodd"
                d="M4.284 14.456c-.508.565-.762 1.224-.762 1.869 0 1.585 1.359 2.865 3.125 2.865 1.686 0 2.972-1.08 3.078-2.424l-1.604-1.013a1.067 1.067 0 00-.97.595c-.117.238-.285.455-.616.455-.332 0-.504-.22-.616-.456a1.67 1.67 0 01-.127-.57c0-.363.216-.567.504-.734.107-.062.224-.11.344-.146l-1.408-.885z"
                clipRule="evenodd"
              />
            </svg>
            Initial Capital
          </label>

          <input
            type="number"
            className="w-full bg-slate-900/50 border border-slate-700 rounded-md p-2 text-white 
              placeholder-gray-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 
              transition-all duration-300 mb-3"
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
            min="10000"
            step="10000"
            placeholder="Enter capital amount"
          />

          <div className="flex flex-wrap gap-2">
            {capitalPresets.map((preset) => (
              <button
                key={`capital-${preset}`}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                  capital === preset
                    ? "bg-cyan-500 text-white ring-2 ring-cyan-500/50"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white"
                }`}
                onClick={() => setCapital(preset)}
              >
                ₹{preset / 1000}K
              </button>
            ))}
          </div>
        </div>

        {/* Date Range Configuration */}
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
            Backtest Date Range
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-md p-2 text-white 
                  placeholder-gray-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 
                  transition-all duration-300"
                value={formatDate(startDate)}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                max={formatDate(endDate)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                End Date
              </label>
              <input
                type="date"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-md p-2 text-white 
                  placeholder-gray-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 
                  transition-all duration-300"
                value={formatDate(endDate)}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                min={formatDate(startDate)}
              />
            </div>
          </div>

          <label className="block text-xs text-gray-400 mb-2">
            Preset Ranges
          </label>
          <div className="flex flex-wrap gap-2">
            {dateRanges.map((range) => (
              <button
                key={range.label}
                className="px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-700 text-gray-300 
                  hover:bg-slate-600 hover:text-white transition-all duration-200"
                onClick={() => {
                  setStartDate(new Date(range.start));
                  setEndDate(new Date(range.end));
                }}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BacktestSettings;
