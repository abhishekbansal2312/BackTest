import React, { useState } from "react";
import ConfigWizard from "../ConfigWizard/ConfigWizard";
import BacktestResults from "../Results/BacktestResults";
import { useBacktest } from "../../contexts/BacktestContext";

const MainLayout = () => {
  const { results, config, isLoading, runBacktest } = useBacktest();
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="container mx-auto pt-24  px-4 py-6">
      {!results ? (
        <ConfigWizard onComplete={runBacktest} isLoading={isLoading} />
      ) : (
        <div className="flex  flex-col">
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Backtest Results</h1>
            <div className="flex gap-3">
              <button
                className="btn-secondary text-sm px-4 py-2"
                onClick={() => setShowConfig(!showConfig)}
              >
                {showConfig ? "Hide Config" : "View Config"}
              </button>
              <button
                className="btn-primary text-sm px-4 py-2"
                onClick={() => runBacktest()}
                disabled={isLoading}
              >
                Run Again
              </button>
            </div>
          </div>

          {showConfig && (
            <div className="glass-panel p-4 mb-6 animate-fadeIn">
              <h3 className="text-lg font-medium mb-2">Configuration</h3>
              <div className="bg-dark p-3 rounded-md overflow-auto max-h-60">
                <pre className="text-gray-300 text-sm">
                  {JSON.stringify(config, null, 2)}
                </pre>
              </div>
            </div>
          )}

          <BacktestResults />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
