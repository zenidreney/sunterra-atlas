import MonthlyAnalysisPanel from "@/components/panels/MonthlyAnalysisPanel";
import RadarChart from "@/components/charts/RadarChart";

export default function MonthlyBarPage() {
  return <MonthlyAnalysisPanel Chart={RadarChart} />;
}
