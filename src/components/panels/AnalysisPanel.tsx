import { useEffect, useState } from "react";
import { useLocationContext } from "@/context/LocationContext";
import getSolarData from "@/utils/getSolarData";

export default function AnalysisPanel() {
  const [annualSolarRadiation, setAnnualSolarRadiation] = useState<
    number | null
  >(null);
  const [dataType, setDataType] = useState<string | null>(null);
  const [units, setUnits] = useState<string | null>(null)
  const [dataSource, setDataSource] = useState<string | null>(null)
  const [dataRange, setDataRange] = useState<string | null>(null)


  const { lat, lng } = useLocationContext();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchData() {
      const data = await getSolarData(lat, lng);
      console.log(data);
      setAnnualSolarRadiation(data.properties.parameter.ALLSKY_SFC_SW_DWN.ANN);
      setDataType(data.parameters.ALLSKY_SFC_SW_DWN.longname);
      setUnits(data.parameters.ALLSKY_SFC_SW_DWN.units)
      setDataSource(data.header.title)
      setDataRange(data.header.range)
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

      <div>
        {dataSource && <p>{dataSource} </p>}
        {dataRange && <p>{dataRange} </p>}
        {dataType && <p>Data Type: {dataType} </p>}
        {annualSolarRadiation && <p>Annual Solar Radiation: {annualSolarRadiation}</p>}
        {units && <p>{units} </p>}
      </div>
    </div>
  );
}
