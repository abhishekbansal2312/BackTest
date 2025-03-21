import React from "react";
import { useBacktest } from "../../contexts/BacktestContext";

const EntryExitConfig = () => {
  const { entryTime, setEntryTime, exitTime, setExitTime } = useBacktest();

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-3">Entry Conditions</h3>
        <div className="form-group">
          <label className="form-label">Entry Time</label>
          <input
            type="text"
            className="input-field"
            value={entryTime}
            onChange={(e) => setEntryTime(e.target.value)}
            placeholder="HH:MM"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Exit Conditions</h3>
        <div className="form-group">
          <label className="form-label">Exit Time</label>
          <input
            type="text"
            className="input-field"
            value={exitTime}
            onChange={(e) => setExitTime(e.target.value)}
            placeholder="HH:MM"
          />
        </div>
      </div>
    </div>
  );
};

export default EntryExitConfig;
