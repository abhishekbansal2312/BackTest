import React from "react";
import { Card } from "../ui/card";
import { ProfitLineChart } from "./charts/ProfitLineChart";
import { WinLossPieChart } from "./charts/WinLossPieChart";
import { ProfitByPriceMovementChart } from "./charts/ProfitByPriceMovementChart";

export const OverviewTab = ({ trades, metrics, advancedMetrics }) => (
  <div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div className="lg:col-span-2">
        <ProfitLineChart trades={trades} />
      </div>

      <div>
        <div className="grid grid-cols-1 gap-4">
          <Card className="bg-black border-gray-700">
            <div className="p-4">
              <div className="text-gray-400 text-sm mb-1">Win Rate</div>
              <div className="text-2xl font-bold text-green-500">
                {metrics?.win_rate ? `${metrics.win_rate}%` : "N/A"}
              </div>
            </div>
          </Card>

          <Card className="bg-black border-gray-700">
            <div className="p-4">
              <div className="text-gray-400 text-sm mb-1">Total Profit</div>
              <div className="text-2xl font-bold text-white">
                ₹{parseInt(advancedMetrics.totalProfit).toLocaleString()}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <WinLossPieChart
        winningTradesCount={advancedMetrics.winningTradesCount}
        losingTradesCount={advancedMetrics.losingTradesCount}
      />

      <ProfitByPriceMovementChart
        profitByPriceMovement={advancedMetrics.profitByPriceMovement}
      />
    </div>
  </div>
);
