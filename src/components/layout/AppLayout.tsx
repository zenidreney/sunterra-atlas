import MapView from "../map/MapView";
import AnalysisPanel from "../panels/AnalysisPanel";
import TopBar from "./TopBar";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-b from-yellow-50 to-orange-200">
      <TopBar />
      <main className="flex flex-col gap-3 p-1 md:p-4 md:flex-row-reverse">
          <div className="w-full md:w-1/3 bg-white/90 px-1 md:px-4 rounded-xl">
            <AnalysisPanel />
          </div>
          <div className="w-full md:w-2/3 h-auto rounded-xl overflow-hidden shadow-lg ">
            <MapView />
          </div>
      </main>
    </div>
  );
}
