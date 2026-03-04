export type GetCoordinatesResult = {
  place_id: number;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
};

export default async function getCoordinates(location: string) {
    
        const res = await fetch(`/api/search?location=${encodeURIComponent(location)}`);
        if (!res.ok) {
            const errorMessage = await res.json()
            throw new Error(`${errorMessage.error} Status: ${res.status} ` || "Unknown Error");
        }
        const data = await res.json() as GetCoordinatesResult[];
        console.log(data)

        if (!Array.isArray(data) || data.length === 0) {
            return null
        }

        return data;
    
}