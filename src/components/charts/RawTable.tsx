"use client";

export default function RawTable({
  data,
}: {
  data: { month: string; solarRadiation: number }[];
}) {
  console.log(data);

  const dataElement = data.map(({ month, solarRadiation }) => {
    console.log(month);

    return (
      <tr key={month} className="border-t">
        <td>{month}</td>
        <td>{solarRadiation}</td>
      </tr>
    );
  });

  return (
    <table className="text-sm">
        <thead>

            <tr>
                <th className="text-left">Month</th>
                <th className="text-left">Solar Radiation</th>
            </tr>
        </thead>
      <tbody>{dataElement}</tbody>
    </table>
  );
}
