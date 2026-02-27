"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapEvents } from "react-leaflet";
import { useLocationContext } from "@/context/LocationContext";

function MapClickHandler() {
  const { setLocation } = useLocationContext();

  useMapEvents({
    click(e) {
      console.log(e)
      setLocation(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapViewInner() {
  return (
    <div className="h-screen w-full mx-3">
      <MapContainer
        center={[40.4168, -3.7038]} // Madrid
        zoom={6}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
      </MapContainer>
    </div>
  );
}
