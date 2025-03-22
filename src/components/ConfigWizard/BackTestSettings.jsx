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
    <div>
      <h2 className="text-xl font-semibold mb-6">Backtest Settings</h2>

      <div className="grid grid-cols-1 gap-6">
        {/* Capital */}
        <div className="glass-card p-4 border border-gray-700 rounded-lg">
          <label className="block text-gray-300 mb-2">
            Initial Capital (₹)
          </label>
          <input
            type="number"
            className="w-full bg-dark rounded p-2 mb-3"
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
            min="10000"
            step="10000"
          />
          <div className="flex flex-wrap gap-2">
            {capitalPresets.map((preset) => (
              <button
                key={`capital-${preset}`}
                className={`px-3 py-1 rounded-md text-sm ${
                  capital === preset
                    ? "bg-primary text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                onClick={() => setCapital(preset)}
              >
                ₹{preset / 1000}K
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="glass-card p-4 border border-gray-700 rounded-lg">
          <label className="block text-gray-300 mb-2">Date Range</label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="w-full bg-dark rounded p-2"
                value={formatDate(startDate)}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                max={formatDate(endDate)}
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">
                End Date
              </label>
              <input
                type="date"
                className="w-full bg-dark rounded p-2"
                value={formatDate(endDate)}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                min={formatDate(startDate)}
              />
            </div>
          </div>

          <label className="block text-gray-400 text-sm mb-1">
            Preset Ranges
          </label>
          <div className="flex flex-wrap gap-2">
            {dateRanges.map((range) => (
              <button
                key={range.label}
                className="px-3 py-1 rounded-md text-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
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
