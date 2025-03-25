import React, { useState, useMemo } from "react";
import { useBacktest } from "../../contexts/BacktestContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { OverviewTab } from "./OverviewTab";
import { PerformanceTab } from "./PerformanceTab";
import { TradesTable } from "./TradesTable";
import { calculateAdvancedMetrics } from "./utils/metricsCalculation";

const BacktestResults = () => {
  const { isLoading, results, metrics, trades } = useBacktest();
  const [activeTab, setActiveTab] = useState("overview");

  const advancedMetrics = useMemo(
    () => calculateAdvancedMetrics(trades || []),
    [trades]
  );

  if (isLoading) {
    return (
      <div className="glass-panel p-6 flex items-center justify-center min-h-[600px]">
        {/* Loading state UI */}
      </div>
    );
  }

  if (!results) {
    return (
      <div className="glass-panel p-8 text-center min-h-[600px] flex flex-col items-center justify-center">
        {/* No results state UI */}
      </div>
    );
  }

  return (
    <div className="glass-panel bg-amber-50 p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex border-b border-gray-700 mb-6">
          <TabsTrigger
            value="overview"
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "overview"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "performance"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Performance
          </TabsTrigger>
          <TabsTrigger
            value="trades"
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "trades"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Trades
          </TabsTrigger>
        </TabsList>

        {activeTab === "overview" && (
          <OverviewTab
            trades={trades}
            metrics={metrics}
            advancedMetrics={advancedMetrics}
          />
        )}

        {activeTab === "performance" && (
          <PerformanceTab advancedMetrics={advancedMetrics} metrics={metrics} />
        )}

        {activeTab === "trades" && <TradesTable trades={trades} />}
      </Tabs>
    </div>
  );
};

export default BacktestResults;
