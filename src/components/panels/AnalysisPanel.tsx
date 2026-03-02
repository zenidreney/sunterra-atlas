import { useEffect, useState } from "react";
import { useLocationContext } from "@/context/LocationContext";
import getSolarData from "@/utils/getSolarData";



export default function AnalysisPanel() {

  type SolarData = {
    annualSolarRadiation: number | null,
    dataType: string | null,
    units: string | null,
    dataSource: string | null,
    dataRange: string | null,
  }

  const [solarData, setSolarData] = useState<SolarData | null >(null);

  const { lat, lng } = useLocationContext();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchData() {
      const data = await getSolarData(lat, lng);
      console.log(data);

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
      <div className="flex">
        <p>Latitude: {lat?.toFixed(2)}</p>
        <p>Longitude: {lng?.toFixed(2)}</p>
      </div>

      {solarData && (
        <div>
          <p>{solarData.dataSource} </p>
          <p>{solarData.dataRange} </p>
          <p>Data Type: {solarData.dataType}</p>

          <p>Annual Solar Radiation: {solarData.annualSolarRadiation}</p>

          <p>{solarData.units} </p>
        </div>
      )}
    </div>
  );
}
