import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

const ForecastChart = ({ data }) => {
  return (
    <LineChart width={700} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
      <XAxis dataKey="timestamp" stroke="#aaa" />
      <YAxis stroke="#aaa" />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="value"
        stroke="rgb(0, 255, 204)"
        strokeWidth={3}
        dot={{ fill: "#00ffcc" }}
      />
    </LineChart>
  );
};

export default ForecastChart;