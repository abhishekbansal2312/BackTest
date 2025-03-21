import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BacktestChart = ({ trades }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!trades || trades.length === 0) return;

    // Process trades data for chart
    const dates = [];
    const equity = [];
    let cumulativeProfit = 0;

    trades.forEach((trade) => {
      const date = trade.exit_date.split(" ")[0]; // Extract date only
      cumulativeProfit += trade.profit;

      dates.push(date);
      equity.push(cumulativeProfit);
    });

    // Create chart data
    setChartData({
      labels: dates,
      datasets: [
        {
          label: "Equity Curve",
          data: equity,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.1,
          fill: true,
        },
      ],
    });
  }, [trades]);

  if (!chartData)
    return (
      <div className="bg-dark rounded-lg p-4 flex items-center justify-center h-64">
        <p className="text-gray-400">No chart data available</p>
      </div>
    );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e0e0e0",
        },
      },
      title: {
        display: true,
        text: "Equity Curve",
        color: "#e0e0e0",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#9ca3af",
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "#9ca3af",
          callback: (value) => `₹${value.toLocaleString()}`,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className="bg-dark rounded-lg p-4">
      <div style={{ height: "250px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BacktestChart;
