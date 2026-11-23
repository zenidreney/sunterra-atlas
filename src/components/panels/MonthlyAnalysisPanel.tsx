"use client";

import { useReverseGeoCode, useSolarData } from "@/app/providers/QueryProvider";
import { useLocationContext } from "@/context/LocationContext";
import SmallNavLink from "../utils/SmallNavLink";

type MonthlyData = {
  JAN: number;
  FEB: number;
  MAR: number;
  APR: number;
  MAY: number;
  JUN: number;
  JUL: number;
  AUG: number;
  SEP: number;
  OCT: number;
  NOV: number;
  DEC: number;
  ANN: number;
};

type ChartComponent = React.ComponentType<{
  data: { month: string; solarRadiation: number }[];
  annualRadiation: number;
}>;

export default function MonthlyAnalysisPanel({
  Chart,
}: {
  Chart: ChartComponent;
}) {
  const { lat, lng } = useLocationContext();
  const { data, isLoading } = useSolarData(lat, lng);
  const { data: locationData } = useReverseGeoCode(lat, lng);

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white/90 p-4 text-sm font-medium text-stone-600 shadow-sm">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
        Preparing monthly data…
      </div>
    );
  }

  if (!data) {
    return (
      <section className="flex min-h-52 flex-col items-center justify-center rounded-3xl border border-white/80 bg-white/85 p-6 text-center shadow-sm ring-1 ring-stone-200/70">
        <h2 className="text-lg font-bold tracking-tight text-stone-950">
          Choose a location first
        </h2>
        <p className="mt-2 max-w-xs text-sm leading-6 text-stone-500">
          Search above or select a point on the map to view monthly solar data.
        </p>
      </section>
    );
  }

  const solarRadiation: MonthlyData =
    data.properties.parameter.ALLSKY_SFC_SW_DWN;
  const dataType = data.parameters.ALLSKY_SFC_SW_DWN.longname;
  const units = data.parameters.ALLSKY_SFC_SW_DWN.units;
  const dataSource = data.header.title;
  const dataRange = data.header.range;
  const locationName = locationData?.display_name ?? "Open water";
  const annualRadiation = solarRadiation.ANN;

  const dataMap = Object.entries(solarRadiation)
    .filter(([month]) => month !== "ANN")
    .map(([month, value]) => ({
      month,
      solarRadiation: value,
    }));

  return (
    <section className="flex w-full flex-col gap-4 rounded-3xl border border-white/80 bg-white/90 p-4 shadow-[0_18px_50px_-30px_rgba(28,25,23,0.4)] ring-1 ring-stone-200/70 backdrop-blur-sm sm:p-5">
      <header>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.68rem] font-bold tracking-[0.16em] text-amber-700 uppercase">
              Monthly profile
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-950">
              Solar patterns
            </h2>
          </div>
          <div className="rounded-xl bg-stone-950 px-3 py-2 text-right text-white shadow-sm">
            <p className="text-[0.62rem] tracking-wide text-stone-400 uppercase">
              Annual avg.
            </p>
            <p className="font-bold text-amber-300 tabular-nums">
              {annualRadiation.toFixed(2)}
            </p>
          </div>
        </div>
        <p className="mt-3 break-words text-sm leading-6 font-medium text-stone-700">
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

      <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-50/70 p-2 sm:p-3">
        <div className="mb-3 flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-stone-900">
              Radiation by month
            </p>
            <p className="text-xs text-stone-500">{units}</p>
          </div>
          <nav
            aria-label="Chart style"
            className="w-fit rounded-xl bg-stone-100 p-1"
          >
            <ul className="flex flex-wrap gap-0.5">
              <li>
                <SmallNavLink href="/monthly">Raw</SmallNavLink>
              </li>
              <li>
                <SmallNavLink href="/monthly/bar-chart">Bar</SmallNavLink>
              </li>
              <li>
                <SmallNavLink href="/monthly/sync-line">Area</SmallNavLink>
              </li>
              <li>
                <SmallNavLink href="/monthly/radar-chart">Radar</SmallNavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="overflow-hidden rounded-xl bg-white">
          <Chart data={dataMap} annualRadiation={annualRadiation} />
        </div>
      </div>

      <dl className="divide-y divide-stone-100 rounded-2xl border border-stone-200/80 bg-stone-50/70 px-4 text-sm">
        <div className="grid gap-1 py-3 sm:grid-cols-[5rem_1fr]">
          <dt className="font-medium text-stone-500">Source</dt>
          <dd className="font-medium text-stone-800">{dataSource}</dd>
        </div>
        <div className="grid gap-1 py-3 sm:grid-cols-[5rem_1fr]">
          <dt className="font-medium text-stone-500">Period</dt>
          <dd className="font-medium text-stone-800">{dataRange}</dd>
        </div>
        <div className="grid gap-1 py-3 sm:grid-cols-[5rem_1fr]">
          <dt className="font-medium text-stone-500">Metric</dt>
          <dd className="font-medium text-stone-800">{dataType}</dd>
        </div>
      </dl>
    </section>
  );
}
