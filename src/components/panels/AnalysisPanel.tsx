import { useEffect, useState } from "react";
import { useLocationContext } from "@/context/LocationContext";
import getReverseGeocode from "@/utils/getReverseGeocode";
import getSolarData from "@/utils/getSolarData";

type SolarData = {
  annualSolarRadiation: number | null;
  dataType: string | null;
  units: string | null;
  dataSource: string | null;
  dataRange: string | null;
};

export default function AnalysisPanel() {
  const { lat, lng } = useLocationContext();
  const [solarData, setSolarData] = useState<SolarData | null>(null);

  const [locationName, setLocationName] = useState<string | null>(
    null,
  );

  useEffect(() => {
    async function getLocationName() {
      if (lat == null || lng == null) return;

      try {
        const data = await getReverseGeocode(lat, lng);
        console.log(typeof data?.display_name);
        setLocationName(data?.display_name ?? null);
      } catch (error) {
        alert(`Seem like nobody lives there: ${error}`)
        console.log(error)
      }
    }
    getLocationName();
  }, [lat, lng]);

  useEffect(() => {
    if (lat == null || lng == null) return;

    async function fetchData() {
      const data = await getSolarData(lat, lng);

      setSolarData({
        annualSolarRadiation: data.properties.parameter.ALLSKY_SFC_SW_DWN.ANN,
        dataType: data.parameters.ALLSKY_SFC_SW_DWN.longname,
        units: data.parameters.ALLSKY_SFC_SW_DWN.units,
        dataSource: data.header.title,
        dataRange: data.header.range,
      });
    }
    fetchData();
  }, [lat, lng]);

  return (
    <div>
      <p>ANALYSIS PANEL</p>
      
      {locationName && <p>Analyzing: {locationName}</p>}
      <div className="flex">
        <p>Latitude: {lat?.toFixed(2)}</p>
        <p>Longitude: {lng?.toFixed(2)}</p>
      </div>

      {solarData && (
        <div>
          <p>Data from: {solarData.dataSource} </p>
          <p>{solarData.dataRange} </p>
          <p>Data Type: {solarData.dataType}</p>

          <p>Annual Solar Radiation: {solarData.annualSolarRadiation}</p>

          <p>{solarData.units} </p>
        </div>
      )}
    </div>
  );
}
