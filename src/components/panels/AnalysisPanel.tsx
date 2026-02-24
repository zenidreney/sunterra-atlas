import { useLocationContext } from "@/context/LocationContext";

export default function AnalysisPanel() {
  const { lat, lng } = useLocationContext();

  return (
    <div>
      <p>ANALYSIS PANEL</p>
      <div className="flex">
        <p>Latitude: {lat?.toFixed(2)}</p>
        <p>Longitude: {lng?.toFixed(2)}</p>
      </div>
    </div>
  );
}
