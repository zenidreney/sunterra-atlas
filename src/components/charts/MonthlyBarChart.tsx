"use client";

import {
  Bar,
  BarChart,
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
    <YAxis width="auto" stroke="#78716c" tickLine={false} axisLine={false} />
    <Tooltip
      contentStyle={{
        backgroundColor: "#ffffff",
        borderColor: "#e7e5e4",
        borderRadius: "12px",
        boxShadow: "0 12px 30px rgba(28, 25, 23, 0.12)",
      }}
      cursor={{ fill: "#fef3c7", fillOpacity: 0.55 }}
    />
  </>
);

export default function MonthlyBarChart({
  data,
  annualRadiation,
}: {
  data: { month: string; solarRadiation: number }[];
  annualRadiation: number;
}) {
  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        height: "260px",
      }}
      responsive
      data={data}
      margin={{
        top: 16,
        right: 14,
        left: 4,
        bottom: 8,
      }}
    >
      {common}

      <Bar
        dataKey="solarRadiation"
        name="Solar radiation"
        fill="#f59e0b"
        activeBar={{ fill: "#fbbf24", stroke: "#b45309" }}
        radius={[6, 6, 0, 0]}
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
    </BarChart>
  );
}
