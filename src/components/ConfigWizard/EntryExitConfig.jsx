import React, { useMemo } from "react";
import { useBacktest } from "../../contexts/BacktestContext";

const EntryExitConfig = () => {
  const { entryTime, setEntryTime, exitTime, setExitTime } = useBacktest();

  // Generate valid time options in 15-min intervals
  const timeOptions = useMemo(() => {
    const validEntryTimes = [
      "09:15",
      "09:30",
      "10:00",
      "10:15",
      "10:30",
      "11:00",
      "11:15",
      "11:30",
      "12:00",
      "12:15",
      "12:30",
      "13:00",
      "13:15",
      "13:30",
      "14:00",
      "14:15",
      "14:30",
    ];
    const validExitTimes = ["14:45", "15:00", "15:15", "15:30"];

    return {
      entry: validEntryTimes,
      exit: validExitTimes,
    };
  }, []);

  // Validate and set entry time
  const handleEntryTimeChange = (time) => {
    // Ensure entry time is within valid options
    if (timeOptions.entry.includes(time)) {
      // If exit time exists, ensure new entry time is before exit time
      if (exitTime) {
        const [entryHour, entryMin] = time.split(":").map(Number);
        const [exitHour, exitMin] = exitTime.split(":").map(Number);

        if (
          entryHour < exitHour ||
          (entryHour === exitHour && entryMin < exitMin)
        ) {
          setEntryTime(time);
        } else {
          // If new entry time would be after exit time, reset both
          setEntryTime(null);
          setExitTime(null);
        }
      } else {
        setEntryTime(time);
      }
    }
  };

  // Validate and set exit time
  const handleExitTimeChange = (time) => {
    // Ensure exit time is within valid options
    if (timeOptions.exit.includes(time)) {
      // If entry time exists, ensure exit time is after entry time
      if (entryTime) {
        const [entryHour, entryMin] = entryTime.split(":").map(Number);
        const [exitHour, exitMin] = time.split(":").map(Number);

        if (
          exitHour > entryHour ||
          (exitHour === entryHour && exitMin > entryMin)
        ) {
          setExitTime(time);
        } else {
          // If new exit time would be before entry time, reset both
          setEntryTime(null);
          setExitTime(null);
        }
      } else {
        // If no entry time, suggest selecting entry time first
        alert("Please select an entry time first");
      }
    }
  };

  return (
    <div className="bg-gradient-to-br p-6 rounded-2xl shadow-2xl border border-indigo-800/50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tight">
            Entry & Exit Conditions
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Configure your trade entry and exit times
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-400">Status:</span>
          <span
            className={`px-4 py-1.5 rounded-full text-xs font-medium ${
              entryTime && exitTime
                ? "bg-green-500/20 text-green-400 animate-pulse"
                : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {entryTime && exitTime
              ? "Ready to Trade"
              : entryTime
              ? "Select Exit Time"
              : "Select Entry Time"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Entry Time Configuration */}
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
            Entry Time
          </label>

          {/* Quick Entry Time Buttons */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {timeOptions.entry.map((time) => (
              <button
                key={`entry-${time}`}
                className={`px-2 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                  entryTime === time
                    ? "bg-cyan-500 text-white ring-2 ring-cyan-500/50"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white"
                }`}
                onClick={() => handleEntryTimeChange(time)}
              >
                {time}
              </button>
            ))}
          </div>

          {/* Full Time Selector */}
          <select
            className="w-full bg-slate-900/50 border border-slate-700 rounded-md p-2 text-white 
              placeholder-gray-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 
              transition-all duration-300"
            value={entryTime || ""}
            onChange={(e) => handleEntryTimeChange(e.target.value)}
          >
            <option value="">Select Entry Time</option>
            {timeOptions.entry.map((time) => (
              <option key={`entry-select-${time}`} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Exit Time Configuration */}
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
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Exit Time
          </label>

          {/* Quick Exit Time Buttons */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {timeOptions.exit.map((time) => (
              <button
                key={`exit-${time}`}
                className={`px-2 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                  exitTime === time
                    ? "bg-cyan-500 text-white ring-2 ring-cyan-500/50"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white"
                } ${
                  !entryTime
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-slate-600 hover:text-white"
                }`}
                onClick={() => entryTime && handleExitTimeChange(time)}
                disabled={!entryTime}
              >
                {time}
              </button>
            ))}
          </div>

          {/* Full Time Selector */}
          <select
            className="w-full bg-slate-900/50 border border-slate-700 rounded-md p-2 text-white 
              placeholder-gray-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 
              transition-all duration-300"
            value={exitTime || ""}
            onChange={(e) => handleExitTimeChange(e.target.value)}
            disabled={!entryTime}
          >
            <option value="">
              {!entryTime ? "Select Entry Time First" : "Select Exit Time"}
            </option>
            {timeOptions.exit.map((time) => (
              <option key={`exit-select-${time}`} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Time Range Visualization */}
      <div className="mt-6 bg-slate-800/60 backdrop-blur-lg rounded-xl p-5 border border-indigo-500/20">
        <div className="w-full h-12 bg-slate-900 rounded-lg relative">
          {/* Market hours visualization */}
          <div className="absolute top-0 left-[12.5%] w-[87.5%] h-full bg-slate-700 rounded-lg">
            <div className="h-full flex items-center justify-between px-4 text-xs text-gray-400">
              <span>9:15</span>
              <span>15:30</span>
            </div>
          </div>

          {/* Entry time marker */}
          {entryTime && (
            <div
              className="absolute top-0 h-full w-1.5 bg-cyan-500 z-10"
              style={{
                left: `${
                  12.5 +
                  (((parseInt(entryTime.split(":")[0]) - 9) * 60 +
                    parseInt(entryTime.split(":")[1]) -
                    15) /
                    (6 * 60 + 15)) *
                    87.5
                }%`,
              }}
            >
              <div className="absolute top-[-25px] left-[-20px] bg-cyan-500 text-xs px-2 py-1 rounded">
                Entry: {entryTime}
              </div>
            </div>
          )}

          {/* Exit time marker */}
          {exitTime && (
            <div
              className="absolute top-0 h-full w-1.5 bg-red-500 z-10"
              style={{
                left: `${
                  12.5 +
                  (((parseInt(exitTime.split(":")[0]) - 9) * 60 +
                    parseInt(exitTime.split(":")[1]) -
                    15) /
                    (6 * 60 + 15)) *
                    87.5
                }%`,
              }}
            >
              <div className="absolute top-[-25px] left-[-20px] bg-red-500 text-xs px-2 py-1 rounded">
                Exit: {exitTime}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntryExitConfig;
