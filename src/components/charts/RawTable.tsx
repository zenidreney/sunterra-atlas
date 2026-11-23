"use client";

import getSolarColor from "@/utils/getSolarColor";

export default function RawTable({
  data,
  annualRadiation,
}: {
  data: { month: string; solarRadiation: number }[];
  annualRadiation: number;
}) {
  const maxRadiation = Math.max(...data.map((value) => value.solarRadiation));
  const averageRadiatonColor = getSolarColor(annualRadiation);

  const monthlyRadiationArray = data.map(({ month, solarRadiation }) => {
    const monthlySolarColor = getSolarColor(solarRadiation);

    return (
      <tr
        key={month}
        className="border-t border-stone-100 transition-colors hover:bg-amber-50/60"
      >
        <td className="px-3 py-2.5 font-semibold text-stone-700">{month}</td>
        <td className="px-3 py-2.5 text-right font-medium text-stone-800 tabular-nums">
          {solarRadiation.toFixed(2)}
        </td>
        <td className="min-w-36 px-3 py-2.5">
          <div className="h-2 overflow-hidden rounded-full bg-stone-100">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(solarRadiation / maxRadiation) * 100}%`,
                backgroundColor: monthlySolarColor,
              }}
            />
          </div>
        </td>
      </tr>
    );
  });

  return (
    <section className="overflow-x-auto">
      <table className="w-full min-w-[460px] text-sm">
        <thead>
          <tr className="bg-stone-100/80 align-top text-[0.68rem] tracking-wide text-stone-500 uppercase">
            <th className="px-3 py-3 text-left font-bold">Month</th>
            <th className="px-3 py-3 text-right font-bold">
              Solar Radiation
              <span className="block text-[0.6rem] font-medium normal-case">
                kWh/m²/day
              </span>
            </th>
            <th className="px-3 py-3 text-left font-bold">
              Relative intensity
              <span className="block text-[0.6rem] font-medium normal-case">
                % of maximum
              </span>
            </th>
          </tr>
        </thead>
        <tbody>{monthlyRadiationArray}</tbody>

        <tfoot>
          <tr
            key={annualRadiation}
            className="border-t border-amber-200 bg-amber-50"
          >
            <td className="px-3 py-3 font-bold text-stone-900">Average</td>
            <td className="px-3 py-3 text-right font-bold text-amber-800 tabular-nums">
              {annualRadiation.toFixed(2)}
            </td>
            <td className="px-3 py-3">
              <div className="h-2 overflow-hidden rounded-full bg-amber-100">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(annualRadiation / maxRadiation) * 100}%`,
                    backgroundColor: averageRadiatonColor,
                  }}
                />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
}
