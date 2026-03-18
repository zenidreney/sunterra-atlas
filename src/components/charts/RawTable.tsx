"use client";

export default function RawTable({
  data,
}: {
  data: { month: string; solarRadiation: number }[];
}) {

  const dataElement = data.map(({ month, solarRadiation }) => {
    console.log(month);

    return (
      <tr key={month} className="border-t border-amber-700">
        <td className="px-2 py-1 font-medium text-amber-900">{month}</td>
        <td className="px-2 py-1 tabular-nums text-amber-800">{solarRadiation.toFixed(2)}</td>
      </tr>
    );
  });

  return (
    <table className="text-sm">
        <thead>

            <tr className="bg-amber-100 text-amber-900">
                <th className="text-left px-2 py-1 font-semibold">Month</th>
                <th className="text-left px-2 py-1 font-bold">Solar Radiation (kWh/m²/day)</th>
            </tr>
        </thead>
      <tbody>{dataElement}</tbody>
    </table>
  );
}
