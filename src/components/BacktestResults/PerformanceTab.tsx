import React from "react";
import { Card } from "../ui/card";
import { LegTypePerformanceChart } from "./charts/LegTypePerformanceChart";
import { TradeDurationChart } from "./charts/TradeDurationChart";

export const PerformanceTab = ({ advancedMetrics, metrics }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-black border-gray-700">
        <div className="p-4">
          <div className="text-gray-400 text-sm mb-1">Total Profit</div>
          <div className="text-white text-2xl font-bold">
            ₹{advancedMetrics.totalProfit.toFixed(2)}
          </div>
        </div>
      </Card>
      <Card className="bg-black border-gray-700">
        <div className="p-4">
          <div className="text-gray-400 text-sm mb-1">Win Rate</div>
          <div className="text-white text-2xl font-bold">
            {(advancedMetrics.winRate * 100).toFixed(2)}%
          </div>
        </div>
      </Card>
      <Card className="bg-black border-gray-700">
        <div className="p-4">
          <div className="text-gray-400 text-sm mb-1">Sharpe Ratio</div>
          <div className="text-white text-2xl font-bold">
            {metrics.sharpe_ratio.toFixed(4)}
          </div>
        </div>
      </Card>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <LegTypePerformanceChart
        legTypePerformance={advancedMetrics.legTypePerformance}
      />
      <TradeDurationChart tradeDurations={advancedMetrics.tradeDurations} />
    </div>
  </div>
);
