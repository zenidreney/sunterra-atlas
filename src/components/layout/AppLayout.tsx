import MapView from "../map/MapView";
import AnalysisPanel from "../panels/AnalysisPanel";
import TopBar from "./TopBar";

export default function AppLayout() {
  return (
    <div className="flex flex-col h-screen justify-items-center">
      <TopBar />
      <div className="flex flex-col md:flex-row-reverse flex-1">
          <AnalysisPanel />
          <MapView />
      </div>
    </div>
  );
}
