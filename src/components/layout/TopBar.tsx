import { useRef } from "react";

export default function TopBar() {
  const mapInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(mapInputRef.current?.value);
  }

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
    </div>
  );
}
