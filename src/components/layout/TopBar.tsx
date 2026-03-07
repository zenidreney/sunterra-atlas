"use client";

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
  const [isSearchLoading, setIsSearchLoading] = useState(false)

  const { setLocation } = useLocationContext();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLocationSubmitted(true);

    const locationQuery = mapInputRef.current?.value
      ? mapInputRef.current.value.trim()
      : "";

    if (!locationQuery) {
      alert("Enter a valid city or town!")
      return
    };

    try {
      setIsSearchLoading(true)
      const data = await getCoordinates(locationQuery);
      setIsSearchLoading(false)

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
        className="px-4 py-3 border border-orange-900 rounded-lg hover:cursor-pointer font-semibold bg-orange-300 text-orange-950 hover:bg-amber-500"
      >
        {loc.display_name}
      </button>
    );
  });

  return (
    <header
      className="flex flex-col items-center gap-3 p-3 
    bg-linear-to-b from-yellow-50 to-orange-200 shadow-md"
    >
      <h1 className="text-xl md:text-2xl font-bold text-orange-700 ">
        SunTerra Atlas
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
        <input
          ref={mapInputRef}
          id="map-input"
          type="text"
          placeholder="Enter city or address"
          className="px-3 py-2 border rounded-lg border-orange-300"
        />
        <button type="submit" className="px-4 py-3 border border-orange-900 rounded-lg hover:cursor-pointer font-semibold bg-orange-300 text-orange-950 hover:bg-amber-500">
          Search
        </button>
        {isSearchLoading && <p className="px-4 py-3 border border-orange-900 rounded-lg  bg-orange-900 text-orange-200">Searching...</p>}
      </form>
      {isLocationSubmitted && (
        <div className="flex flex-col rounded-xl p-1 md:p-2 gap-2 w-full max-w-3xl shadow">{searchLocationOptions}</div>
      )}
    </header>
  );
}
