"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapEvents } from "react-leaflet";
import { useLocationContext } from "@/context/LocationContext";

import { setupLeafletIcons } from "@/lib/leaflet";

setupLeafletIcons();

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

  const lastCall = useRef(0);
  
  
  
  
  useMapEvents({
    click(e) {
      const now = Date.now();
      const diff = now - lastCall.current;
    
      console.log(now, `diff: ${diff}ms`);
      if (now - lastCall.current < 500) {
        console.log("fetch not allowed");
        return;
      }
      lastCall.current = now
      console.log("fetch allowed");
      setLocation(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapViewInner() {
  const { lat, lng } = useLocationContext();

  return (
    <div className="h-[76vh] w-full">
      <MapContainer
        center={[40.4168, -3.7038]} // Madrid
        zoom={5.5}
        scrollWheelZoom
        className="h-full w-full"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Standard OSM">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Humanitarian OSM">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/">OpenStreetMap France</a>'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <MapClickHandler />
        {lat && lng && <CenterMap lat={String(lat)} lng={String(lng)} />}
        {lat && lng && (
          <Marker position={[lat, lng]}>
            <Popup>
              Selected location: {lat.toFixed(4)}, {lng.toFixed(4)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
