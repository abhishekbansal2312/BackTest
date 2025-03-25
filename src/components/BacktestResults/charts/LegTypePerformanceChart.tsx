import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

interface LegTypePerformance {
  [key: string]: {
    totalPnl: number;
    avgPnl: number;
  };
}

export const LegTypePerformanceChart = ({
  legTypePerformance,
}: {
  legTypePerformance: LegTypePerformance;
}) => {
  const chartData = Object.entries(legTypePerformance).map(
    ([legType, data]) => ({
      legType,
      totalPnl: data?.totalPnl,
      avgPnl: data?.avgPnl,
    })
  );

  return (
    <Card className="bg-black border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-300">Leg Type Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="legType" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Bar dataKey="totalPnl" fill="#00C49F" name="Total PnL" />
            <Bar dataKey="avgPnl" fill="#FFBB28" name="Avg PnL" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
