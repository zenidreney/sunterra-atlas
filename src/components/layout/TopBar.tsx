"use client"

import { useRef, useState } from "react";
import { useLocationContext } from "@/context/LocationContext";
import getCoordinates, {
  type GetCoordinatesResult,
} from "@/utils/getCoordinates";

export default function TopBar() {
  const [locationData, setLocationData] = useState<
    GetCoordinatesResult[] | null
  >(null);
  const [isLocationSubmitted, setIsLocationSubmitted] =
    useState<boolean>(false);

  const mapInputRef = useRef<HTMLInputElement>(null);

  const { setLocation } = useLocationContext();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLocationSubmitted(true);

    const locationQuery = mapInputRef.current?.value
      ? mapInputRef.current.value.trim()
      : "";

    if (!locationQuery) return;

    try {
      const data = await getCoordinates(locationQuery);

      if (!data || data.length === 0) {
        setIsLocationSubmitted(false);
        alert("Please enter a valid city or town in the text box");

      } else {
        setLocationData(data);
        setLocation(Number(data[0].lat), Number(data[0].lon));
      }
    } catch (error) {
      alert(`Cannot fetch coordinates beacuse of ${error}`);
    }
  }

  function handleLocationOptionButton(location: GetCoordinatesResult) {
    setLocation(Number(location.lat), Number(location.lon));
    setIsLocationSubmitted(false);
    setLocationData(null);
  }

  const searchLocationOptions = locationData?.map((loc) => {
    return (
      <button
        type="button"
        key={loc.osm_id}
        onClick={() => handleLocationOptionButton(loc)}
        className=""
      >
        {loc.display_name}
      </button>
    );
  });

  return (
    <div
      className="flex flex-col items-center"
    >
      <h1
        className="mb-3 bg-blue-200 text-centerpx-3 py-4 rounded-lgshadow-lg"
      >
        SunTerra Atlas
      </h1>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={mapInputRef}
          id="map-input"
          type="text"
          placeholder="Enter lat,lng or address"
          className=""
        />
        <button
          type="submit"
          className=""
        >
          Get Location
        </button>
      </form>
      {isLocationSubmitted && (
        <div className="flex-col">{searchLocationOptions}</div>
      )}
    </div>
  );
}
