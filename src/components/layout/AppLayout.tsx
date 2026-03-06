import MapView from "../map/MapView";
import AnalysisPanel from "../panels/AnalysisPanel";
import TopBar from "./TopBar";

export default function AppLayout() {
  return (
    <div className="flex flex-col h-screen justify-items-center">
      <TopBar />
      <div className="flex flex-col md:flex-row-reverse flex-1 my-3">
          <AnalysisPanel />
          <div className="w-full lg:w-2/3 h-[50vh] lg:h-auto rounded-xl overflow-hidden shadow-lg">
            <MapView />
          </div>
      </div>
    </div>
  );
}
