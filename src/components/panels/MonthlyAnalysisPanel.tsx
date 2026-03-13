"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocationContext } from "@/context/LocationContext";
import getReverseGeocode from "@/utils/getReverseGeocode";
import getSolarData from "@/utils/getSolarData";

import MonthlyChart from "../charts/MonthlyBarChart";
import { useSolarData, useReverseGeoCode } from "@/app/providers/QueryProvider";

export default function AnalysisPanel() {
  const { lat, lng } = useLocationContext();
  const { data, isLoading } = useSolarData(lat, lng);

  const { data: locationData } = useReverseGeoCode(lat, lng);

  if (isLoading) {
    return <p>Wait a little...</p>;
  }

  if (!data) {
    return <p> No Data pick a place!!</p>;
  }


  const solarRadiation = data.properties.parameter.ALLSKY_SFC_SW_DWN;
  const dataType = data.parameters.ALLSKY_SFC_SW_DWN.longname;
  const units = data.parameters.ALLSKY_SFC_SW_DWN.units;
  const dataSource = data.header.title;
  const dataRange = data.header.range;

  const locationName = locationData?.display_name ?? "Somewhere in the OCEAN";

  const detailedData = Object.entries(solarRadiation ?? {});

  const dataMap = detailedData
    .filter((data) => data[0] !== "ANN")
    .map(([month, value]) => {
      return {
        month: month,
        solarRadiation: value as number,
      };
    });

  return (
    <section className="flex flex-col gap-1 md:gap-2. w-full bg-orange-100 rounded-xl shadow-2xl p-1 md:p-3 border border-gray-400">
      <h2 className="text-xl font-bold text-orange-600">Solar Analysis</h2>

        
          <p className="text-sm font-bold">Location:</p>
          <p>{locationName}</p>
          <div className=" text-sm flex gap-1">
            <p>Latitude: {lat?.toFixed(2)}</p>
            <p>Longitude: {lng?.toFixed(2)}</p>
          </div>
          <div className="flex flex-col space-y-1 md:space-y-3">
            <div className="flex flex-col border rounded-xl px-1 py-2 shadow-xl bg-orange-100">
              <p className="text-sm font-bold text-gray-600">
                Monthly Solar Radiation:
              </p>

              <MonthlyChart data={dataMap} />
              <p className="text-sm font-bold text-gray-600">
                {units}
              </p>
              <Link
                href={"/"}
                className="w-1/2 bg-orange-500 text-white px-4 py-2 rounded-xl shadow hover:underline"
              >
                Back to summary
              </Link>
            </div>
            <div className="flex flex-col text-sm space-y-1">
              <p>
                <span className="font-medium">Data from:</span>
                {dataSource}
              </p>
              <p>
                <span className="font-medium">Period:</span>
                {dataRange}
              </p>
              <p>
                <span className="font-medium">Data Type:</span>
                {dataType}
              </p>
            </div>
          </div>
        
      
    </section>
  );
}
