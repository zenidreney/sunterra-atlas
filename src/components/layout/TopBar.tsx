import { useRef, useState } from "react";
import getCoordinates from "@/utils/getCoordinates";
import { useLocationContext } from "@/context/LocationContext";

type GetCoordinatesResult = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  name: string;
  addresstype: string;
  boundingbox: string[];
};

export default function TopBar() {
  const [locationData, setLocationData] = useState<
    GetCoordinatesResult[] | null
  >(null);
  const [isLocationSubmitted, setIsLocationSubmitted] = useState<boolean>(false)

  const mapInputRef = useRef<HTMLInputElement>(null);

  const { setLocation } = useLocationContext();


  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLocationSubmitted(true)

    const locationQuery = mapInputRef.current?.value
      ? mapInputRef.current.value.trim()
      : "";

    if(!locationQuery) return

    try {
      const data = await getCoordinates(locationQuery);

  
     if (data.length > 0) {
       setLocationData(data);
       setLocation(Number(data[0].lat), Number(data[0].lon));
     } else {
      setIsLocationSubmitted(false)
     }
    } catch (error) {
      console.error(`Cannot fetch coordinates beacuse of ${error}`)
    }
  }

  function handleLocationOptionButton(location: GetCoordinatesResult) {
    setLocation(Number(location.lat), Number(location.lon));
    setIsLocationSubmitted(false)
    setLocationData(null)
  }

  const searchLocationOptions = locationData?.map((loc) => {
    return (
      <button
        type="button"
        key={loc.osm_id}
        onClick={() => handleLocationOptionButton(loc)}
        className="
              bg-linear-to-r
              from-blue-500
              to-green-500
              text-black
              font-semibold
              py-3
              rounded-lg
              shadow-lg
              hover:shadow-xl
              hover:scale-[1.02]
              active:scale-95
              transition-all
              duration-200
                        "
      >
        {loc.display_name}
      </button>
    );
  });

  return (
    <div
      className="flex 
        flex-col 
        items-center"
    >
      <h1
        className="mb-3 
            bg-blue-200 
            text-center
            px-3 
            py-4 
            rounded-lg
            shadow-lg"
      >
        SunTerra Atlas
      </h1>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={mapInputRef}
          id="map-input"
          type="text"
          placeholder="Enter lat,lng or address"
          className="w-80
         bg-green-500
              text-white
          px-4
          py-3
          rounded-lg
          border-b
          border-gray-300/50
          backdrop-blur-sm
          focus:outline-none
          focus:border-white/70
          transition-all"
        />
        <button
          type="submit"
          className="
              w-36
              bg-linear-to-r
              from-blue-500
              to-green-500
              text-black
              font-semibold
              py-3
              rounded-lg
              shadow-lg
              hover:shadow-xl
              hover:scale-[1.02]
              active:scale-95
              transition-all
              duration-200
                        "
        >
          Get Location
        </button>
      </form>
      {isLocationSubmitted && <div className="flex-col">{searchLocationOptions}</div>}
    </div>
  );
}
