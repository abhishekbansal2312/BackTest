import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export const TradeDurationChart = ({ tradeDurations }) => (
  <Card className="bg-black border-gray-700">
    <CardHeader>
      <CardTitle className="text-gray-300">Trade Duration vs Profit</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="durationHours"
            name="Duration"
            unit="hrs"
            stroke="#888"
          />
          <YAxis
            type="number"
            dataKey="profit"
            name="Profit"
            unit="₹"
            stroke="#888"
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="Trades" data={tradeDurations} fill="#FF8042" />
        </ScatterChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
