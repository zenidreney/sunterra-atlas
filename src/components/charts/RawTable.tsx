"use client";

export default function RawTable({
  data,
}: {
  data: { month: string; solarRadiation: number }[];
}) {
  const dataElement = data.map(({ month, solarRadiation }) => {
    console.log(month);

    const maxRadiation = Math.max(...data.map((value) => value.solarRadiation));
    console.log(maxRadiation);

    return (
      <tr key={month} className="border-t border-amber-700">
        <td className="px-2 py-1 font-medium text-amber-900">{month}</td>
        <td className="px-2 py-1 tabular-nums text-amber-800">
          {solarRadiation.toFixed(2)}
        </td>
        <td className="px-2 py-1">
          <div
            className="h-2 bg-amber-400 rounded-xl"
            style={{ width: `${(solarRadiation / maxRadiation) * 100}%` }}
          ></div>
        </td>
      </tr>
    );
  });

  return (
    <table className="text-sm">
      <thead>
        <tr className="bg-amber-100 text-amber-900 align-top">
          <th className="text-left px-2 py-1 font-semibold">Month</th>
          <th className="text-left px-2 py-1 font-bold">
            Solar Radiation<span className="block text-xs"> (kWh/m²/day)</span>
          </th>
          <th className="text-left px-2 py-1 font-bold">Relative Intensity <span className="block text-xs">% of Max</span></th>
        </tr>
      </thead>
      <tbody>{dataElement}</tbody>
    </table>
  );
}
