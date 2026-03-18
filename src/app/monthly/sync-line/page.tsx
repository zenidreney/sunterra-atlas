import MonthlySyncLineChart from "@/components/charts/MonthlySyncLineChart";
import MonthlyAnalysisPanel from "@/components/panels/MonthlyAnalysisPanel";

export default function MonthlySyncLinePage() {
  return <MonthlyAnalysisPanel Chart={MonthlySyncLineChart} />;
}
