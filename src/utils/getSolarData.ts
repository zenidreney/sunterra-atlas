export default async function getSolarData(
  lat: number | null,
  lng: number | null,
) {
  const res = await fetch(`/api/solar?lat=${lat}&lng=${lng}`);

  if (!res.ok) {
    const errorMessage = await res.json();

    throw new Error(
      `${errorMessage.error} Status: ${res.status} ` || "Unknown Error",
    );
  }
  const data = await res.json();

  return data;
}
