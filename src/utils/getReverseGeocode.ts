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
  
    const res = await fetch(`/api/reverse?lat=${lat}&lng=${lng}`);
    // console.log(res)

    if (!res.ok) {
      const errorMessage = await res.json()
      throw new Error(`${errorMessage.error} Status: ${res.status} ` || "Unknown Error")
    }

    const data = await res.json() as ReverseGeocodeResult;

    if (!data.display_name) {
      return null
    }

    return data;

}
