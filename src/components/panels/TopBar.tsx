"use client";

import type React from "react";
import { useRef, useState } from "react";
import { useLocationContext } from "@/context/LocationContext";
import getCoordinates, {
  type GetCoordinatesResult,
} from "@/utils/getCoordinates";

import NavLink from "../utils/NavLink";

export default function TopBar() {
  const [locationData, setLocationData] = useState<
    GetCoordinatesResult[] | null
  >(null);
  const [isLocationSubmitted, setIsLocationSubmitted] =
    useState<boolean>(false);

  const mapInputRef = useRef<HTMLInputElement>(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isDropOpen, setIsDropOpen] = useState(false);

  const { setLocation } = useLocationContext();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLocationSubmitted(true);

    const locationQuery = mapInputRef.current?.value
      ? mapInputRef.current.value.trim()
      : "";

    if (!locationQuery) {
      alert("Enter a valid city or town!");
      return;
    }

    try {
      setIsSearchLoading(true);
      const data = await getCoordinates(locationQuery);
      setIsSearchLoading(false);

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
        className="px-4 py-3 border rounded-lg hover:cursor-pointer font-semibold border-amber-600 bg-amber-100 text-amber-900 hover:bg-amber-200"
      >
        {loc.display_name}
      </button>
    );
  });

  return (
    <header
      className="flex flex-col items-center gap-3 p-3 
    bg-amber-100 border-b border-amber-800"
    >
      <div className="flex flex-col items-center">
        <h1 className="text-xl md:text-2xl font-bold text-amber-800">
          SunTerra Atlas
        </h1>
        <a
          href="https://github.com/zenidreney/sunterra-atlas"
          className="flex gap-1 text-xs hover:underline hover:font-bold"
        >
          Source Code
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-github"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
          </svg>
        </a>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
        <input
          ref={mapInputRef}
          id="map-input"
          type="text"
          placeholder="Enter city or address"
          className="px-3 py-2 border rounded-lg border-amber-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
        />
        <button
          type="submit"
          className="px-4 py-3 border rounded-lg border-amber-700 bg-amber-400 text-amber-950 hover:bg-amber-500 hover:cursor-pointer active:bg-amber-600"
        >
          Search
        </button>
        {isSearchLoading && (
          <p className="px-4 py-3 border border-amber-800 bg-amber-900/90 text-amber-100 rounded-lg">
            Searching...
          </p>
        )}
      </form>

      {isLocationSubmitted && (
        <div className="flex flex-col rounded-xl p-1 md:p-2 gap-2 w-full max-w-3xl shadow">
          {searchLocationOptions}
        </div>
      )}

      <nav className="flex flex-col gap-2">
        <ul className="flex justify-center items-center flex-wrap gap-3">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <button
              type="button"
              className="min-w-34 rounded-lg bg-amber-800 px-2 py-0.5 text-amber-50 font-bold hover:bg-amber-700 active:bg-amber-900 hover:cursor-pointer"
              onClick={() => setIsDropOpen((prev) => !prev)}
            >
              {isDropOpen ? (
                <div className="py-0.5 flex items-center gap-1 justify-center">
                  Charts
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    // className="bi bi-arrow-up-circle"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path
                      // fill-rule="evenodd"
                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
                    />
                  </svg>
                </div>
              ) : (
                <div className="py-0.5 flex items-center gap-1 justify-center">
                  Charts
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    // className="bi bi-arrow-down-circle"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path
                      // fill-rule="evenodd"
                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
                    />
                  </svg>
                </div>
              )}
            </button>
          </li>
        </ul>
        {isDropOpen && (
          <ul className="flex flex-col gap-2 items-end">
            <li>
              <NavLink href="/monthly">Raw Data</NavLink>
            </li>
            <li>
              <NavLink href="/monthly/bar-chart">Bar Chart</NavLink>
            </li>
            <li>
              <NavLink href="/monthly/sync-line">Sync-Line Chart</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
