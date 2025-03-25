import React, { useState } from "react";
import { useBacktest } from "../../contexts/BacktestContext";

const OptionLegConfig = () => {
  const { optionLegs, addOptionLeg, removeOptionLeg } = useBacktest();

  const [legType, setLegType] = useState("CE");
  const [legAction, setLegAction] = useState("BUY");
  const [strikeMethod, setStrikeMethod] = useState("ATM");
  const [strikeValue, setStrikeValue] = useState("");
  const [lots, setLots] = useState(1);

  const handleAddLeg = (e) => {
    e.preventDefault();

    const newLeg = {
      type: legType,
      action: legAction,
      strike_selection: {
        method: strikeMethod,
        value: strikeValue,
      },
      lots: lots,
    };

    addOptionLeg(newLeg);

    // Reset form
    setLegType("CE");
    setLegAction("BUY");
    setStrikeMethod("ATM");
    setStrikeValue("");
    setLots(1);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Option Leg Configuration</h3>

      {/* Add new leg form */}
      <div className="glass-panel p-4 mb-4">
        <h4 className="text-primary font-medium mb-3">Add a New Option Leg</h4>

        <form onSubmit={handleAddLeg}>
          <div className="form-group">
            <label className="form-label">Option Leg Type</label>
            <select
              className="select-field"
              value={legType}
              onChange={(e) => setLegType(e.target.value)}
            >
              <option value="CE">CE</option>
              <option value="PE">PE</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Option Leg Action</label>
            <select
              className="select-field"
              value={legAction}
              onChange={(e) => setLegAction(e.target.value)}
            >
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Strike Selection Method</label>
            <select
              className="select-field"
              value={strikeMethod}
              onChange={(e) => setStrikeMethod(e.target.value)}
            >
              <option value="ATM">ATM</option>
              <option value="offset">offset</option>
              <option value="delta">delta</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Strike Selection Value (if applicable)
            </label>
            <input
              type="text"
              className="input-field"
              value={strikeValue}
              onChange={(e) => setStrikeValue(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Lots</label>
            <input
              type="number"
              className="input-field"
              value={lots}
              onChange={(e) => setLots(Number(e.target.value))}
              min="1"
              step="1"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Add Leg
          </button>
        </form>
      </div>

      {/* Current option legs */}
      <h4 className="text-lg font-medium mb-2">Current Option Legs</h4>
      {optionLegs.length > 0 ? (
        <div className="bg-black p-3 rounded-md overflow-auto max-h-48">
          {optionLegs.map((leg, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-2 pb-2 border-b border-gray-700"
            >
              <div>
                <span
                  className={`font-medium ${
                    leg.action === "BUY" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {leg.action}
                </span>{" "}
                <span className="font-medium">{leg.type}</span>{" "}
                <span>
                  ({leg.strike_selection.method}
                  {leg.strike_selection.value &&
                    `: ${leg.strike_selection.value}`}
                  )
                </span>{" "}
                <span>{leg.lots} lot(s)</span>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeOptionLeg(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No option legs configured yet.</p>
      )}
    </div>
  );
};

export default OptionLegConfig;
