import React, { useState } from "react";
import { useBacktest } from "../../contexts/BacktestContext";

const OptionLegConfig = () => {
  const { optionLegs, addOptionLeg, removeOptionLeg } = useBacktest();
  const [newLeg, setNewLeg] = useState({
    type: "CE",
    action: "BUY",
    strike_selection: { method: "ATM", value: "" },
    lots: 1,
  });

  // Option types
  const optionTypes = [
    { id: "CE", label: "Call" },
    { id: "PE", label: "Put" },
  ];

  // Action types
  const actionTypes = [
    { id: "BUY", label: "Buy" },
    { id: "SELL", label: "Sell" },
  ];

  // Strike selection methods
  const strikeSelectionMethods = [
    { id: "ATM", label: "At The Money" },
    { id: "ITM", label: "In The Money" },
    { id: "OTM", label: "Out of The Money" },
    { id: "POINTS", label: "Points Away" },
  ];

  const handleAdd = () => {
    addOptionLeg({ ...newLeg });
    // Reset for next leg
    setNewLeg({
      type: "CE",
      action: "BUY",
      strike_selection: { method: "ATM", value: "" },
      lots: 1,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Option Legs Configuration</h2>

      {/* Existing Legs */}
      {optionLegs.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Current Option Legs</h3>
          <div className="space-y-3">
            {optionLegs.map((leg, index) => (
              <div
                key={index}
                className="glass-card p-3 border border-gray-700 rounded-lg flex justify-between items-center"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`px-2 py-1 rounded text-white text-sm ${
                      leg.action === "BUY" ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {leg.action}
                  </div>
                  <div className="px-2 py-1 bg-gray-700 rounded text-white text-sm">
                    {leg.type}
                  </div>
                  <div className="text-gray-300">
                    {leg.strike_selection.method}
                    {leg.strike_selection.value &&
                      ` (${leg.strike_selection.value})`}
                  </div>
                  <div className="text-gray-300">
                    {leg.lots} {leg.lots > 1 ? "lots" : "lot"}
                  </div>
                </div>
                <button
                  className="text-red-400 hover:text-red-300"
                  onClick={() => removeOptionLeg(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Leg */}
      <div className="glass-card p-4 border border-gray-700 rounded-lg">
        <h3 className="text-lg font-medium mb-3">Add Option Leg</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Option Type */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Option Type
            </label>
            <div className="flex gap-2">
              {optionTypes.map((type) => (
                <button
                  key={type.id}
                  className={`flex-1 px-3 py-2 rounded-md ${
                    newLeg.type === type.id
                      ? "bg-primary text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => setNewLeg({ ...newLeg, type: type.id })}
                >
                  {type.label} ({type.id})
                </button>
              ))}
            </div>
          </div>

          {/* Action */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">Action</label>
            <div className="flex gap-2">
              {actionTypes.map((action) => (
                <button
                  key={action.id}
                  className={`flex-1 px-3 py-2 rounded-md ${
                    newLeg.action === action.id
                      ? (action.id === "BUY" ? "bg-green-600" : "bg-red-600") +
                        " text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => setNewLeg({ ...newLeg, action: action.id })}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Strike Selection */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Strike Selection
            </label>
            <select
              className="w-full bg-dark rounded p-2"
              value={newLeg.strike_selection.method}
              onChange={(e) =>
                setNewLeg({
                  ...newLeg,
                  strike_selection: {
                    ...newLeg.strike_selection,
                    method: e.target.value,
                  },
                })
              }
            >
              {strikeSelectionMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.label}
                </option>
              ))}
            </select>

            {/* Show value input only if POINTS is selected */}
            {newLeg.strike_selection.method === "POINTS" && (
              <div className="mt-2">
                <label className="block text-gray-400 text-sm mb-1">
                  Points Away
                </label>
                <input
                  type="number"
                  className="w-full bg-dark rounded p-2"
                  value={newLeg.strike_selection.value}
                  onChange={(e) =>
                    setNewLeg({
                      ...newLeg,
                      strike_selection: {
                        ...newLeg.strike_selection,
                        value: e.target.value,
                      },
                    })
                  }
                  placeholder="Example: 500"
                />
              </div>
            )}
          </div>

          {/* Lots */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Number of Lots
            </label>
            <div className="flex items-center">
              <button
                className="bg-gray-700 text-white px-3 py-2 rounded-l-md"
                onClick={() =>
                  setNewLeg({ ...newLeg, lots: Math.max(1, newLeg.lots - 1) })
                }
              >
                -
              </button>
              <input
                type="number"
                className="bg-dark border-t border-b border-gray-700 py-2 text-center w-16"
                value={newLeg.lots}
                onChange={(e) =>
                  setNewLeg({
                    ...newLeg,
                    lots: Math.max(1, parseInt(e.target.value) || 1),
                  })
                }
              />
              <button
                className="bg-gray-700 text-white px-3 py-2 rounded-r-md"
                onClick={() => setNewLeg({ ...newLeg, lots: newLeg.lots + 1 })}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Visual representation of the option */}
        <div className="bg-dark p-4 rounded-lg mb-4">
          <h4 className="text-gray-300 text-sm mb-2">Preview</h4>
          <div className="flex items-center space-x-3">
            <div
              className={`px-3 py-1 rounded text-white ${
                newLeg.action === "BUY" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {newLeg.action}
            </div>
            <div className="text-white">
              {newLeg.lots} {newLeg.lots > 1 ? "lots" : "lot"} of
            </div>
            <div className="text-white">
              {newLeg.strike_selection.method}
              {newLeg.strike_selection.value &&
                ` (${newLeg.strike_selection.value})`}
            </div>
            <div
              className={`px-2 py-1 rounded text-white ${
                newLeg.type === "CE" ? "bg-blue-600" : "bg-purple-600"
              }`}
            >
              {newLeg.type === "CE" ? "Call" : "Put"}
            </div>
          </div>
        </div>

        <button className="btn-primary w-full py-2" onClick={handleAdd}>
          Add Leg to Strategy
        </button>

        {/* Quick Strategies Templates */}
        {optionLegs.length === 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-medium mb-2">
              Quick Strategy Templates
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-md text-sm"
                onClick={() => {
                  addOptionLeg({
                    type: "CE",
                    action: "BUY",
                    strike_selection: { method: "ATM", value: "" },
                    lots: 1,
                  });
                }}
              >
                Long Call
              </button>
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-md text-sm"
                onClick={() => {
                  addOptionLeg({
                    type: "PE",
                    action: "BUY",
                    strike_selection: { method: "ATM", value: "" },
                    lots: 1,
                  });
                }}
              >
                Long Put
              </button>
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-md text-sm"
                onClick={() => {
                  addOptionLeg({
                    type: "CE",
                    action: "SELL",
                    strike_selection: { method: "ATM", value: "" },
                    lots: 1,
                  });
                  addOptionLeg({
                    type: "PE",
                    action: "SELL",
                    strike_selection: { method: "ATM", value: "" },
                    lots: 1,
                  });
                }}
              >
                Short Straddle
              </button>
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-md text-sm"
                onClick={() => {
                  addOptionLeg({
                    type: "CE",
                    action: "BUY",
                    strike_selection: { method: "ATM", value: "" },
                    lots: 1,
                  });
                  addOptionLeg({
                    type: "PE",
                    action: "BUY",
                    strike_selection: { method: "ATM", value: "" },
                    lots: 1,
                  });
                }}
              >
                Long Straddle
              </button>
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-md text-sm"
                onClick={() => {
                  addOptionLeg({
                    type: "CE",
                    action: "BUY",
                    strike_selection: { method: "OTM", value: "" },
                    lots: 1,
                  });
                  addOptionLeg({
                    type: "PE",
                    action: "BUY",
                    strike_selection: { method: "OTM", value: "" },
                    lots: 1,
                  });
                }}
              >
                Long Strangle
              </button>
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-md text-sm"
                onClick={() => {
                  addOptionLeg({
                    type: "CE",
                    action: "BUY",
                    strike_selection: { method: "ATM", value: "" },
                    lots: 1,
                  });
                  addOptionLeg({
                    type: "CE",
                    action: "SELL",
                    strike_selection: { method: "OTM", value: "" },
                    lots: 1,
                  });
                }}
              >
                Bull Call Spread
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionLegConfig;
