import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function MonthlyChart({
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
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />

      <Bar
        dataKey="solarRadiation"
        fill="#f59e0b"
        activeBar={{ fill: "red", stroke: "orange" }}
        radius={[10, 10, 0, 0]}
      />
    </BarChart>
  );
}
