import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Scatter
} from "recharts";

const AnomalyChart = ({ data, anomalies }) => {

  // ✅ Combine data + anomaly flag
  const chartData = data.map((value, index) => ({
    index,
    value,
    anomaly: anomalies[index] === -1 ? value : null
  }));

  return (
    <LineChart
      width={700}
      height={300}
      data={chartData}
      style={{ marginTop: "20px" }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#444" />

      <XAxis dataKey="index" stroke="#aaa" />
      <YAxis stroke="#aaa" />
      <Tooltip />

      {/* ✅ Normal Line */}
      <Line
        type="monotone"
        dataKey="value"
        stroke="#00ffcc"
        strokeWidth={3}
        dot={{ fill: "#00ffcc" }}
      />

      {/* ✅ Highlight anomalies */}
      <Scatter
        dataKey="anomaly"
        fill="red"
        shape="circle"
      />
    </LineChart>
  );
};

export default AnomalyChart;