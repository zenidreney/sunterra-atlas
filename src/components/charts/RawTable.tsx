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
      <tr key={month} className="border-t border-amber-700">
        <td className="px-2 py-1 text-amber-900">{month}</td>
        <td className="px-2 py-1 tabular-nums text-amber-800">
          {solarRadiation.toFixed(2)}
        </td>
        <td className="px-2 py-1">
          <div
            className="h-2 rounded-xl"
            style={{
              width: `${(solarRadiation / maxRadiation) * 100}%`,
              backgroundColor: monthlySolarColor,
            }}
          ></div>
        </td>
      </tr>
    );
  });

  return (
    <section>
      <table className="text-sm">
        <thead>
          <tr className="bg-amber-100 text-amber-900 align-top">
            <th className="text-left px-2 py-1 font-semibold">Month</th>
            <th className="text-left px-2 py-1 font-bold">
              Solar Radiation
              <span className="block text-xs"> (kWh/m²/day)</span>
            </th>
            <th className="text-left px-2 py-1 font-bold">
              Relative Intensity <span className="block text-xs">% of Max</span>
            </th>
          </tr>
        </thead>
        <tbody>{monthlyRadiationArray}</tbody>

        <tfoot>
          <tr key={annualRadiation} className="border-t-2 border-amber-900 bg-amber-100">
            <td className="px-2 py-3 font-medium text-lg text-amber-900">
              Average
            </td>
            <td className="px-2 py-3 tabular-nums text-amber-800 text-lg">
              {annualRadiation.toFixed(2)}
            </td>
            <td className="px-2 py-1">
              <div
                className="h-4 rounded-xl border border-amber-500"
                style={{
                  width: `${(annualRadiation / maxRadiation) * 100}%`,
                  backgroundColor: averageRadiatonColor,
                }}
              ></div>
            </td>
          </tr>
        </tfoot>

      </table>
     
    </section>
  );
}
