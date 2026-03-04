"use client";

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

  const [locationName, setLocationName] = useState<string | null>(null);

  useEffect(() => {
    if (lat == null || lng == null) return;
    const currentLat = lat
    const currentLng = lng
    setLocationName(null);
    
    async function getLocationName() {
      try {
        const data = await getReverseGeocode(currentLat, currentLng);

        if (!data?.display_name) {
          alert("Oh seems like no people living there!!!");
          return;
        }

        setLocationName(data.display_name);
      } catch (error) {
        alert(`Cannot find location: ${error}`);
        console.log(error);
      }
    }
    getLocationName();
  }, [lat, lng]);

  useEffect(() => {
    if (lat == null || lng == null) return;
    setSolarData(null);

    async function fetchData() {
      try {
        const data = await getSolarData(lat, lng);

        setSolarData({
          annualSolarRadiation: data.properties.parameter.ALLSKY_SFC_SW_DWN.ANN,
          dataType: data.parameters.ALLSKY_SFC_SW_DWN.longname,
          units: data.parameters.ALLSKY_SFC_SW_DWN.units,
          dataSource: data.header.title,
          dataRange: data.header.range,
        });
      } catch (error) {
        alert(`Somethings off error: ${error}`);
      }
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
