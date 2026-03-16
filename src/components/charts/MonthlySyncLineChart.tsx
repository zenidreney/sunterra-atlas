"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const common = (
  <>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" stroke="black" />
    <YAxis stroke="black" width="auto" />
    <Tooltip
      cursor={{ stroke: "black" }}
      contentStyle={{ backgroundColor: "#f59e0b", borderColor: "black" }}
    />
  </>
);

export default function MonthlySyncLineChart({
  data,
}: {
  data: { month: string; solarRadiation: number }[];
}) {
  return (
    <AreaChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "20vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      syncId="anyId"
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      {common}
      <Area
        type="monotone"
        dataKey="solarRadiation"
        stroke="red"
        fill="red"
        activeDot={{
          stroke: "red",
        }}
      />
    </AreaChart>
  );
}
