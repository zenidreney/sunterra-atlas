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
    <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="#e7e5e4" />
    <XAxis dataKey="month" stroke="#78716c" tickLine={false} axisLine={false} />
    <YAxis stroke="#78716c" width="auto" tickLine={false} axisLine={false} />
    <Tooltip
      cursor={{ stroke: "#f59e0b", strokeWidth: 1.5 }}
      contentStyle={{
        backgroundColor: "#ffffff",
        borderColor: "#e7e5e4",
        borderRadius: "12px",
        boxShadow: "0 12px 30px rgba(28, 25, 23, 0.12)",
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
        height: "260px",
      }}
      responsive
      data={data}
      syncId="anyId"
      margin={{
        top: 16,
        right: 18,
        left: 4,
        bottom: 8,
      }}
    >
      {common}
      <Area
        type="monotone"
        dataKey="solarRadiation"
        name="Solar radiation"
        stroke="#d97706"
        strokeWidth={2.5}
        fill="#fbbf24"
        fillOpacity={0.28}
        activeDot={{
          stroke: "#ffffff",
          strokeWidth: 2,
          fill: "#d97706",
          r: 5,
        }}
      />
      <ReferenceLine
        y={annualRadiation}
        label={{
          value: "Average",
          fill: "#15803d",
          position: "insideBottomRight",
        }}
        stroke="#15803d"
        strokeDasharray="4 4"
      />
    </AreaChart>
  );
}
