"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
} from "recharts";

export default function RadarChartComponent({
  data,
}: {
  data: { month: string; solarRadiation: number }[];
}) {
  const common = (
    <Tooltip
      cursor={{ stroke: "#f59e0b", strokeWidth: 1.5 }}
      contentStyle={{
        backgroundColor: "#ffffff",
        borderColor: "#e7e5e4",
        borderRadius: "12px",
        boxShadow: "0 12px 30px rgba(28, 25, 23, 0.12)",
      }}
    />
  );

  return (
    <RadarChart
      style={{
        width: "100%",
        height: "300px",
        maxWidth: "500px",
      }}
      responsive
      outerRadius="80%"
      data={data}
      margin={{
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
      }}
    >
      <PolarGrid stroke="#d6d3d1" />
      <PolarAngleAxis
        dataKey="month"
        tick={{ fill: "#57534e", fontSize: 12 }}
      />
      <PolarRadiusAxis
        angle={30}
        stroke="#d6d3d1"
        tick={{ fill: "#78716c", fontSize: 10 }}
      />
      {common}
      <Radar
        name="Solar Radiation"
        dataKey="solarRadiation"
        stroke="#d97706"
        strokeWidth={2.5}
        fill="#f59e0b"
        fillOpacity={0.3}
      />
    </RadarChart>
  );
}
