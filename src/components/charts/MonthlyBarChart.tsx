"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const common = (
  <>
    <CartesianGrid strokeDasharray="4 4" stroke="#ffc400" />
    <XAxis dataKey="month" stroke="#92400e" />
    <YAxis width="auto" stroke="#92400e" />
    <Tooltip
      contentStyle={{
        backgroundColor: "#fffbeb",
        borderColor: "#ff8f00",
        borderRadius: "16px",
      }}
    />
    <Legend />
  </>
);

export default function MonthlyBarChart({
  data,
}: {
  data: { month: string; solarRadiation: number }[];
}) {
  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      {common}

      <Bar
        dataKey="solarRadiation"
        fill="#d97706"
        activeBar={{ fill: "#fde68a", stroke: "#d97706", fillOpacity: 0.8 }}
        radius={[10, 10, 0, 0]}
      />
    </BarChart>
  );
}
