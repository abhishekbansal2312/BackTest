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

export const ProfitByPriceMovementChart = ({ profitByPriceMovement }) => (
  <Card className="bg-black border-gray-700">
    <CardHeader>
      <CardTitle className="text-gray-300">Profit by Price Movement</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="priceChange"
            name="Price Change"
            unit="₹"
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
          <Scatter name="Trades" data={profitByPriceMovement} fill="#0088FE" />
        </ScatterChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
