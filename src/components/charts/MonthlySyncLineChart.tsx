"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const common = (
  <>
    <CartesianGrid strokeDasharray="4 4" stroke="#ffc400" />
    <XAxis dataKey="month" stroke="#92400e" />
    <YAxis stroke="#92400e" width="auto" />
    <Tooltip
      cursor={{ stroke: "#ffc400", strokeWidth: 2.5 }}
      contentStyle={{
        backgroundColor: "#fffbeb",
        borderColor: "#ff8f00",
        borderRadius: "16px",
      }}
    />
  </>
);

export default function MonthlySyncLineChart({
  data,
  annualRadiation,
}: {
  data: { month: string; solarRadiation: number }[];
  annualRadiation: number;
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
        stroke="#d97706"
        fill="#fde68a"
        fillOpacity={0.5}
        activeDot={{
          stroke: "#92400e",
          fill: "#f59e0b",
          r: 4,
        }}
      />
      <ReferenceLine
        y={annualRadiation}
        label={{
          value: "Average",
          fill: "#92400e",
          position: "insideBottomRight",
        }}
        stroke="red"
        strokeDasharray="4 4"
      />
    </AreaChart>
  );
}
