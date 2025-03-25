import React from "react";
import { useBacktest } from "../../contexts/BacktestContext";
import GeneralConfig from "./GeneralConfig";
import EntryExitConfig from "./EntryExitConfig";
import BacktestSettings from "./BacktestSettings";
import OptionLegConfig from "./OptionLegConfig";

const ConfigPanel = () => {
  const { runBacktest, isLoading, config } = useBacktest();

  return (
    <div className="glass-panel p-6 w-full">
      <h2 className="text-xl font-semibold mb-4">Configuration</h2>

      <GeneralConfig />
      <EntryExitConfig />
      <BacktestSettings />
      <OptionLegConfig />

      {/* Current Config */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Current Config</h3>
        <div className="bg-black p-3 rounded-md overflow-auto max-h-48">
          <pre className="text-gray-300 text-sm">
            {config ? JSON.stringify(config, null, 2) : "{}"}
          </pre>
        </div>
      </div>

      {/* Run Backtest Button */}
      <button
        className="btn-primary w-full mt-6"
        onClick={runBacktest}
        disabled={isLoading}
      >
        {isLoading ? "Running..." : "Run Backtest"}
      </button>
    </div>
  );
};

export default ConfigPanel;
