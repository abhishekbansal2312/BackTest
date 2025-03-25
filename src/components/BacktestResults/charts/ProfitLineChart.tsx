import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export const ProfitLineChart = ({ trades }) => (
  <Card className="bg-black border-gray-700">
    <CardHeader>
      <CardTitle className="text-gray-300">Performance Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trades}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="entry_date" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Line type="monotone" dataKey="profit" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
