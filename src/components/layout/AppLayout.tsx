import MapView from "../map/MapView"
import AnalysisPanel from "../panels/AnalysisPanel"
import TopBar from "./TopBar"

export default function AppLayout() {
    return(
        <>
            <TopBar />
            <MapView />
            <AnalysisPanel />
        
        </>
    )
}