"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocationContext } from "@/context/LocationContext";
import getCoordinates, {
  type GetCoordinatesResult,
} from "@/utils/getCoordinates";
import NavLink from "../utils/NavLink";

export default function TopBar() {
  const [locationData, setLocationData] = useState<
    GetCoordinatesResult[] | null
  >(null);
  const [isLocationSubmitted, setIsLocationSubmitted] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const mapInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const { setLocation } = useLocationContext();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const locationQuery = mapInputRef.current?.value.trim() ?? "";

    if (!locationQuery) {
      setIsLocationSubmitted(false);
      alert("Enter a valid city or town!");
      return;
    }

    try {
      setIsSearchLoading(true);
      setIsLocationSubmitted(true);
      setLocationData(null);
      const data = await getCoordinates(locationQuery);

      if (!data || data.length === 0) {
        setIsLocationSubmitted(false);
        alert("Please enter a valid city or town in the text box");
        return;
      }

      setLocationData(data);
      setLocation(Number(data[0].lat), Number(data[0].lon));
    } catch (error) {
      setIsLocationSubmitted(false);
      alert(`Cannot fetch coordinates because of ${error}`);
    } finally {
      setIsSearchLoading(false);
    }
  }

  function handleLocationOptionButton(location: GetCoordinatesResult) {
    setLocation(Number(location.lat), Number(location.lon));
    setIsLocationSubmitted(false);
    setLocationData(null);
  }

  const searchLocationOptions = locationData?.map((location) => (
    <button
      type="button"
      key={location.osm_id}
      onClick={() => handleLocationOptionButton(location)}
      className="w-full rounded-xl px-3 py-3 text-left text-sm font-medium text-stone-700 transition-colors hover:bg-amber-50 hover:text-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
    >
      {location.display_name}
    </button>
  ));

  return (
    <header className="relative z-[1100] shrink-0 border-b border-stone-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 px-3 py-3 lg:flex-row lg:items-center lg:gap-5 lg:px-6">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 text-stone-950 shadow-[0_8px_24px_-10px_rgba(217,119,6,0.8)] transition-transform group-hover:rotate-6">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3.5" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
            </svg>
          </span>
          <span>
            <span className="block text-base font-bold tracking-tight text-stone-950">
              SunTerra Atlas
            </span>
            <span className="block text-[0.68rem] font-medium tracking-wide text-stone-500">
              SOLAR INTELLIGENCE
            </span>
          </span>
        </Link>

        <div className="relative min-w-0 flex-1 lg:max-w-2xl">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pointer-events-none absolute left-3.5 h-4 w-4 text-stone-400"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              ref={mapInputRef}
              id="map-input"
              type="search"
              placeholder="Search any city or address"
              className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50/90 py-2 pr-28 pl-10 text-sm text-stone-900 outline-none transition-all placeholder:text-stone-400 hover:border-stone-300 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15"
            />
            <button
              type="submit"
              disabled={isSearchLoading}
              className="absolute right-1.5 rounded-lg bg-amber-400 px-4 py-2 text-xs font-bold text-stone-950 shadow-sm transition-all hover:bg-amber-300 active:translate-y-px disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
            >
              {isSearchLoading ? "Searching…" : "Search"}
            </button>
          </form>

          {isLocationSubmitted && locationData && locationData.length > 0 && (
            <div className="absolute top-full right-0 left-0 z-50 mt-2 max-h-72 space-y-1 overflow-y-auto rounded-2xl border border-stone-200 bg-white p-2 shadow-[0_20px_50px_-20px_rgba(28,25,23,0.35)]">
              {searchLocationOptions}
            </div>
          )}
        </div>

        <nav aria-label="Main navigation" className="shrink-0">
          <ul className="flex items-center gap-1">
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li className="relative">
              <button
                type="button"
                aria-expanded={isDropOpen}
                aria-controls="charts-menu"
                className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 ${
                  pathname.startsWith("/monthly")
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-950"
                }`}
                onClick={() => setIsDropOpen((previous) => !previous)}
              >
                Charts
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-4 w-4 transition-transform ${isDropOpen ? "rotate-180" : ""}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 7.72a.75.75 0 0 1 1.06 0L10 11.44l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.78a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isDropOpen && (
                <div
                  id="charts-menu"
                  className="absolute top-full right-0 z-50 mt-2 w-52 rounded-2xl border border-stone-200 bg-white p-2 shadow-[0_20px_50px_-20px_rgba(28,25,23,0.4)]"
                >
                  <p className="px-3 pt-1 pb-2 text-[0.65rem] font-bold tracking-[0.16em] text-stone-400 uppercase">
                    Monthly views
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <NavLink
                        href="/monthly"
                        onClick={() => setIsDropOpen(false)}
                      >
                        Raw data
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        href="/monthly/bar-chart"
                        onClick={() => setIsDropOpen(false)}
                      >
                        Bar chart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        href="/monthly/sync-line"
                        onClick={() => setIsDropOpen(false)}
                      >
                        Area chart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        href="/monthly/radar-chart"
                        onClick={() => setIsDropOpen(false)}
                      >
                        Radar chart
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <button
                type="button"
                onClick={() => setIsAboutOpen(true)}
                className="rounded-xl px-3 py-2 text-sm font-semibold text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              >
                About
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {isAboutOpen &&
        createPortal(
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <button
              type="button"
              aria-label="Close about dialog"
              className="absolute inset-0 bg-stone-950/55 backdrop-blur-sm"
              onClick={() => setIsAboutOpen(false)}
            />
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="about-title"
              className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col gap-5 overflow-y-auto rounded-3xl border border-white/80 bg-white p-5 text-stone-700 shadow-2xl sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1 text-xs font-bold tracking-[0.16em] text-amber-700 uppercase">
                    About the project
                  </p>
                  <h2
                    id="about-title"
                    className="text-2xl font-bold tracking-tight text-stone-950"
                  >
                    SunTerra Atlas
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label="Close about dialog"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-xl text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-950"
                  onClick={() => setIsAboutOpen(false)}
                >
                  ×
                </button>
              </div>
              <p className="leading-7">
                <strong>SunTerra Atlas</strong> is a geospatial solar potential
                intelligence platform for exploring solar radiation data across
                the globe.
              </p>
              <p className="leading-7">
                Search for any location or click directly on the map to retrieve
                NASA POWER solar radiation insights and explore them through
                monthly tables and charts.
              </p>
              <p className="leading-7">
                The application is built with Next.js, React, TypeScript, React
                Query, and React Leaflet.
              </p>
              <Link
                href="https://github.com/zenidreney/sunterra-atlas"
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-500 hover:text-stone-950"
              >
                View source on GitHub
                <span aria-hidden="true">↗</span>
              </Link>
            </section>
          </div>,
          document.body,
        )}
    </header>
  );
}
