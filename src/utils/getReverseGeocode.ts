export type ReverseGeocodeResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
  };
};

export default async function getReverseGeocode(
  lat: number,
  lng: number,
): Promise<ReverseGeocodeResult | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        headers: { "User-Agent": "sunterra-atlas-student-project/1.0" },
      },
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = (await res.json()) as ReverseGeocodeResult;

    if (!data.display_name) {
      throw new Error("No location found");
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
