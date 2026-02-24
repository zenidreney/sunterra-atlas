

export default function TopBar() {

  return (
    <div className="flex-col justify-items-center">
      <h1>SunTerra Atas</h1>
     
      <input
        id="map-input"
        type="text"
        placeholder="Enter lat,lng or address"
        className="w-full 
        bg-gray-900/50 
        text-white 
        placeholder-white/40 
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
    </div>
  );
}
