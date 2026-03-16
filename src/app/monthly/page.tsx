import MonthlyBarChart from "@/components/charts/MonthlyBarChart";
import MonthlyAnalysisPanel from "@/components/panels/MonthlyAnalysisPanel";

export default function Monthly() {
  return <MonthlyAnalysisPanel Chart={MonthlyBarChart} />;
}
