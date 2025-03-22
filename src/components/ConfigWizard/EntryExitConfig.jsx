import React from "react";
import { useBacktest } from "../../contexts/BacktestContext";

const EntryExitConfig = () => {
  const { entryTime, setEntryTime, exitTime, setExitTime } = useBacktest();

  // Generate time options in 15-min intervals
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 15; hour++) {
      for (let min = 0; min < 60; min += 15) {
        if ((hour === 9 && min < 15) || (hour === 15 && min > 30)) continue;
        const timeStr = `${hour.toString().padStart(2, "0")}:${min
          .toString()
          .padStart(2, "0")}`;
        options.push(timeStr);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Entry & Exit Conditions</h2>

      <div className="grid grid-cols-1 gap-6">
        {/* Time Selection Visualization */}
        <div className="glass-card p-4 border border-gray-700 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="w-full h-12 bg-dark rounded-lg mb-4 relative">
              {/* Market hours visualization */}
              <div className="absolute top-0 left-[12.5%] w-[87.5%] h-full bg-gray-700 rounded-lg">
                <div className="h-full flex items-center justify-between px-4 text-xs text-gray-400">
                  <span>9:15</span>
                  <span>15:30</span>
                </div>
              </div>

              {/* Entry time marker */}
              {entryTime && (
                <div
                  className="absolute top-0 h-full w-1 bg-green-500"
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
                  <div className="absolute top-[-20px] left-[-20px] bg-green-500 text-xs px-2 py-1 rounded">
                    Entry: {entryTime}
                  </div>
                </div>
              )}

              {/* Exit time marker */}
              {exitTime && (
                <div
                  className="absolute top-0 h-full w-1 bg-red-500"
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
                  <div className="absolute top-[-20px] left-[-20px] bg-red-500 text-xs px-2 py-1 rounded">
                    Exit: {exitTime}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Time selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Entry Time */}
          <div className="glass-card p-4 border border-gray-700 rounded-lg">
            <label className="block text-gray-300 mb-2">Entry Time</label>
            <div className="grid grid-cols-4 gap-2">
              {["09:15", "09:30", "10:00", "10:15"].map((time) => (
                <button
                  key={`entry-${time}`}
                  className={`px-2 py-2 rounded-md text-sm ${
                    entryTime === time
                      ? "bg-green-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => setEntryTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
            <select
              className="w-full bg-dark rounded p-2 mt-3"
              value={entryTime}
              onChange={(e) => setEntryTime(e.target.value)}
            >
              {timeOptions.map((time) => (
                <option key={`entry-select-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Exit Time */}
          <div className="glass-card p-4 border border-gray-700 rounded-lg">
            <label className="block text-gray-300 mb-2">Exit Time</label>
            <div className="grid grid-cols-4 gap-2">
              {["14:45", "15:00", "15:15", "15:30"].map((time) => (
                <button
                  key={`exit-${time}`}
                  className={`px-2 py-2 rounded-md text-sm ${
                    exitTime === time
                      ? "bg-red-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => setExitTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
            <select
              className="w-full bg-dark rounded p-2 mt-3"
              value={exitTime}
              onChange={(e) => setExitTime(e.target.value)}
            >
              {timeOptions.map((time) => (
                <option key={`exit-select-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryExitConfig;
