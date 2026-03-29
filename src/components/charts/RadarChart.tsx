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
      cursor={{ stroke: "#ffc400", strokeWidth: 2.5 }}
      contentStyle={{
        backgroundColor: "#fffbeb",
        borderColor: "#ff8f00",
        borderRadius: "16px",
      }}
    />
  );

  return (
    <RadarChart
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "500px",
        maxHeight: "80vh",
        aspectRatio: 1,
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
      <PolarGrid />
      <PolarAngleAxis dataKey="month" />
      <PolarRadiusAxis angle={30} stroke="#f59e0b" tick={{ fill: "#92400e" }} />
      <PolarRadiusAxis
        angle={300}
        stroke="#f59e0b"
        tick={{ fill: "#92400e" }}
      />
      {common}
      <Radar
        name="Solar Radiation"
        dataKey="solarRadiation"
        stroke="#92400e"
        fill="#f59e0b"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
}
