"use client";

import Link from "next/link";
import { useReverseGeoCode, useSolarData } from "@/app/providers/QueryProvider";
import { useLocationContext } from "@/context/LocationContext";
import getSolarColor from "@/utils/getSolarColor";

export default function AnalysisPanel() {
  const { lat, lng } = useLocationContext();
  const { data, isLoading } = useSolarData(lat, lng);
  const { data: locationData } = useReverseGeoCode(lat, lng);

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white/90 p-4 text-sm font-medium text-stone-600 shadow-sm">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
        Analyzing solar potential…
      </div>
    );
  }

  if (!data) {
    return (
      <section className="flex min-h-52 flex-col items-center justify-center rounded-3xl border border-white/80 bg-white/85 p-6 text-center shadow-[0_18px_50px_-30px_rgba(28,25,23,0.4)] ring-1 ring-stone-200/70 backdrop-blur-sm">
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        </span>
        <h2 className="text-lg font-bold tracking-tight text-stone-950">
          Choose a location
        </h2>
        <p className="mt-2 max-w-xs text-sm leading-6 text-stone-500">
          Search for a place above or click anywhere on the map to reveal its
          solar potential.
        </p>
      </section>
    );
  }

  const solarRadiation = data.properties.parameter.ALLSKY_SFC_SW_DWN.ANN;
  const dataType = data.parameters.ALLSKY_SFC_SW_DWN.longname;
  const units = data.parameters.ALLSKY_SFC_SW_DWN.units;
  const dataSource = data.header.title;
  const dataRange = data.header.range;
  const locationName = locationData?.display_name ?? "Open water";
  const solarColor = getSolarColor(solarRadiation);

  return (
    <section className="flex w-full flex-col gap-4 rounded-3xl border border-white/80 bg-white/90 p-4 shadow-[0_18px_50px_-30px_rgba(28,25,23,0.4)] ring-1 ring-stone-200/70 backdrop-blur-sm sm:p-5">
      <header>
        <p className="text-[0.68rem] font-bold tracking-[0.16em] text-amber-700 uppercase">
          Location intelligence
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-950">
          Solar potential
        </h2>
        <p className="mt-2 break-words text-sm leading-6 font-medium text-stone-700">
          {locationName}
        </p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-stone-500">
          <span className="rounded-full bg-stone-100 px-2.5 py-1 tabular-nums">
            {lat?.toFixed(2)}° lat
          </span>
          <span className="rounded-full bg-stone-100 px-2.5 py-1 tabular-nums">
            {lng?.toFixed(2)}° lng
          </span>
        </div>
      </header>

      <div className="relative overflow-hidden rounded-2xl bg-stone-950 p-5 text-white shadow-xl">
        <div className="absolute -top-16 -right-12 h-44 w-44 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-stone-300 uppercase">
            <span
              className="h-2.5 w-2.5 rounded-full ring-4 ring-white/10"
              style={{ backgroundColor: solarColor }}
            />
            Annual solar radiation
          </div>
          <div className="mt-4 flex items-end gap-2">
            <span className="text-4xl font-bold tracking-tight text-amber-300 tabular-nums sm:text-5xl">
              {solarRadiation.toFixed(2)}
            </span>
            <span className="pb-1 text-sm text-stone-400">{units}</span>
          </div>
          <Link
            href="/monthly"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-stone-950 shadow-sm transition-all hover:bg-amber-300 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Explore monthly data
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <dl className="divide-y divide-stone-100 rounded-2xl border border-stone-200/80 bg-stone-50/70 px-4 text-sm">
        <div className="grid gap-1 py-3 sm:grid-cols-[6rem_1fr]">
          <dt className="font-medium text-stone-500">Source</dt>
          <dd className="font-medium text-stone-800">{dataSource}</dd>
        </div>
        <div className="grid gap-1 py-3 sm:grid-cols-[6rem_1fr]">
          <dt className="font-medium text-stone-500">Period</dt>
          <dd className="font-medium text-stone-800">{dataRange}</dd>
        </div>
        <div className="grid gap-1 py-3 sm:grid-cols-[6rem_1fr]">
          <dt className="font-medium text-stone-500">Metric</dt>
          <dd className="font-medium text-stone-800">{dataType}</dd>
        </div>
      </dl>
    </section>
  );
}
