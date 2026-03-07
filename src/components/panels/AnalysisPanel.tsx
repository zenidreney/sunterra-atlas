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

  const [isDataLoading, setIsDataLoading] = useState<boolean>(false)

  useEffect(() => {
    if (lat == null || lng == null) return;
    const currentLat = lat;
    const currentLng = lng;
    setLocationName(null);

    async function getLocationName() {
      try {
        const data = await getReverseGeocode(currentLat, currentLng);

        if (!data?.display_name) {
          // alert("Oh seems like no people living there!!!");
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
        setIsDataLoading(true)
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
      } finally {
        setIsDataLoading(false)
      }
    }
    fetchData();
  }, [lat, lng]);

  return (
    <section className="flex flex-col gap-1 md:gap-2. w-full bg-orange-100 rounded-xl shadow-2xl p-1 md:p-3 border border-gray-400">
      <h2 className="text-xl text-bold text-orange-600">Solar Analysis</h2>
      {isDataLoading && <p>Loading..</p>}

      {solarData && (
        <>
          <p className="text-sm">Location:</p>{" "}
          {locationName ? <p>{locationName}</p> : "Somewhere in the ocean"}
          <div className=" text-sm flex gap-1">
            <p>Latitude: {lat?.toFixed(2)}</p>
            <p>Longitude: {lng?.toFixed(2)}</p>
          </div>
          <div className="flex flex-col space-y-1 md:space-y-3">
            <div className="flex flex-col border rounded-xl px-1 py-2 shadow-xl bg-orange-100">
              <p className="text-sm text-bold text-gray-600">
                Annual Solar Radiation:{" "}
              </p>
              <p className="text-xl md:text-3xl font-bold text-orange-500">
                {solarData.annualSolarRadiation}
              </p>
              <p>{solarData.units} </p>
            </div>
            <div className="flex flex-col text-sm space-y-1">
              <p>
                <span className="font-medium">Data from:</span>{" "}
                {solarData.dataSource}{" "}
              </p>
              <p>
                <span className="font-medium">Period:</span>{" "}
                {solarData.dataRange}{" "}
              </p>
              <p>
                <span className="font-medium">Data Type:</span>{" "}
                {solarData.dataType}
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
