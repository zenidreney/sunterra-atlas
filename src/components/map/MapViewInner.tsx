"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapEvents } from "react-leaflet";
import { useLocationContext } from "@/context/LocationContext";

type CenterMapProps = {
	lng: string | null;
	lat: string | null;
};

function CenterMap({ lat, lng }: CenterMapProps) {
	const map = useMap();

	useEffect(() => {
		if (lat && lng) {
			const center: [number, number] = [parseFloat(lat), parseFloat(lng)];
			map.setView(center, map.getZoom());
		}
	}, [lat, lng, map]);

	return null;
}

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
  const {lat, lng} = useLocationContext()

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
        <CenterMap lat={String(lat)} lng={String(lng)} />
      </MapContainer>
    </div>
  );
}
