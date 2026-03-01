export default async function getSolarData(
  lat: number | null,
  lng: number | null,
) {
  console.log("I am solar data");
  const res = await fetch(
    `https://power.larc.nasa.gov/api/temporal/climatology/point?` +
      `start=2001&end=2020&` +
      `latitude=${lat}&longitude=${lng}&` +
      `community=re&` +
      `parameters=ALLSKY_SFC_SW_DWN&` +
      `format=json&units=metric`,
  );
  const data = await res.json();

  return data;
}
