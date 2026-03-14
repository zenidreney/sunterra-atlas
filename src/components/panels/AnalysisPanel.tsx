"use client";

import Link from "next/link";
import { useReverseGeoCode, useSolarData } from "@/app/providers/QueryProvider";
import { useLocationContext } from "@/context/LocationContext";

export default function AnalysisPanel() {
  const { lat, lng } = useLocationContext();
  const { data, isLoading, status } = useSolarData(lat, lng);

  console.log(data, isLoading, status)
  const { data: locationData } = useReverseGeoCode(lat, lng);

  if (isLoading) {
    return (
      <p className="px-4 py-3 border border-orange-900 rounded-lg  bg-orange-900 text-orange-200">
        Searching...
      </p>
    );
  }

  if (!data) {
    return (
      <p className="text-sm shadow-xl bg-orange-200 p-2 rounded-xl">
        Enter a location above or simply click on the map to start
      </p>
    );
  }

  const solarRadiation = data.properties.parameter.ALLSKY_SFC_SW_DWN.ANN;
  const dataType = data.parameters.ALLSKY_SFC_SW_DWN.longname;
  const units = data.parameters.ALLSKY_SFC_SW_DWN.units;
  const dataSource = data.header.title;
  const dataRange = data.header.range;

  const locationName = locationData?.display_name ?? "Somewhere in the OCEAN";

  return (
    <section className="flex flex-col gap-1 md:gap-2. w-full bg-orange-100 rounded-xl shadow-2xl p-1 md:p-3 border border-gray-400">
      <h2 className="text-xl font-bold text-orange-600">Solar Analysis</h2>
      <p className="text-sm font-bold">Location:</p> {locationName}
      <div className=" text-sm flex gap-1">
        <p>Latitude: {lat?.toFixed(2)}</p>
        <p>Longitude: {lng?.toFixed(2)}</p>
      </div>
      <div className="flex flex-col space-y-1 md:space-y-3">
        <div className="flex flex-col border rounded-xl px-1 py-2 shadow-xl bg-orange-100">
          <p className="text-sm font-bold text-gray-600">
            Annual Solar Radiation:{" "}
          </p>
          <p className="text-xl md:text-3xl font-bold text-orange-500">
            {solarRadiation}
          </p>
          <p>{units} </p>
          <Link
            href={`/monthly`}
            className="w-1/2 bg-orange-500 text-white px-4 py-2 rounded-xl shadow hover:underline"
          >
            Monthly Details
          </Link>
        </div>
        <div className="flex flex-col text-sm space-y-1">
          <p>
            <span className="font-medium">Data from: </span> {dataSource}
          </p>
          <p>
            <span className="font-medium">Period: </span> {dataRange}
          </p>
          <p>
            <span className="font-medium">Data Type: </span> {dataType}
          </p>
        </div>
      </div>
    </section>
  );
}
