import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useBacktest } from "../../contexts/BacktestContext";

const BacktestSettings = () => {
  const { capital, setCapital, startDate, setStartDate, endDate, setEndDate } =
    useBacktest();

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Backtest Settings</h3>

      <div className="form-group">
        <label className="form-label">Capital</label>
        <input
          type="number"
          className="input-field"
          value={capital}
          onChange={(e) => setCapital(Number(e.target.value))}
          min="1000"
          step="1000"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="input-field"
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className="form-group">
        <label className="form-label">End Date</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="input-field"
          dateFormat="yyyy-MM-dd"
          minDate={startDate}
        />
      </div>
    </div>
  );
};

export default BacktestSettings;
