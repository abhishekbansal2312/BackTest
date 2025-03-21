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

  const handleTradingDayChange = (day) => {
    if (tradingDays.includes(day)) {
      setTradingDays(tradingDays.filter((d) => d !== day));
    } else {
      setTradingDays([...tradingDays, day]);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">General Configuration</h3>

      <div className="form-group">
        <label className="form-label">Underlying Symbol</label>
        <input
          type="text"
          className="input-field"
          value={underlyingSymbol}
          onChange={(e) => setUnderlyingSymbol(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Option Expiry</label>
        <select
          className="select-field"
          value={optionExpiry}
          onChange={(e) => setOptionExpiry(e.target.value)}
        >
          <option value="WEEKLY">WEEKLY</option>
          <option value="MONTHLY">MONTHLY</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Expiry Day</label>
        <select
          className="select-field"
          value={expiryDay}
          onChange={(e) => setExpiryDay(e.target.value)}
        >
          <option value="MON">MON</option>
          <option value="TUE">TUE</option>
          <option value="WED">WED</option>
          <option value="THU">THU</option>
          <option value="FRI">FRI</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Trading Days</label>
        <div className="flex flex-wrap gap-2">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
            (day) => (
              <label key={day} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-1"
                  checked={tradingDays.includes(day)}
                  onChange={() => handleTradingDayChange(day)}
                />
                <span className="text-sm">{day}</span>
              </label>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralConfig;
