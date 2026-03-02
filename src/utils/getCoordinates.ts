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
            console.log(res.status);
            throw new Error(`Request Error Code: ${res.status} `);
        }
        const data = await res.json() as GetCoordinatesResult[];

        if (!Array.isArray(data) || data.length === 0) {
            // alert("Please enter a valid city or town in the text box");
            return null
        }

        return data;
    
}