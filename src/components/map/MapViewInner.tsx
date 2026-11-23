"use client";

import { useEffect, useRef } from "react";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Circle, useMapEvents } from "react-leaflet";
import { useSolarData } from "@/app/providers/QueryProvider";
import { useLocationContext } from "@/context/LocationContext";
import { setupLeafletIcons } from "@/lib/leaflet";
import getSolarColor from "@/utils/getSolarColor";

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
        console.error(
          "Too short time between fetch requests. Fetch not allowed",
        );
        return;
      }
      lastCall.current = now;
      // console.log("fetch allowed");
      setLocation(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapViewInner() {
  const { lat, lng } = useLocationContext();
  const { data } = useSolarData(lat, lng);

  const annualRadiation =
    data?.properties?.parameter?.ALLSKY_SFC_SW_DWN?.ANN ?? null;

  const solarColor = getSolarColor(annualRadiation);

  return (
    <div className="relative h-[52vh] w-full md:h-full">
      <div className="pointer-events-none absolute top-3 left-3 z-[500] flex items-center gap-2 rounded-full border border-white/70 bg-stone-950/85 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_0_4px_rgba(251,191,36,0.18)]" />
        Click anywhere to analyze
      </div>
      <MapContainer
        center={[40.4168, -3.7038]} // Madrid
        zoom={5.5}
        scrollWheelZoom
        className="h-full w-full"
      >
        {lat && lng && (
          <Circle
            center={[lat, lng]}
            radius={annualRadiation * 25000}
            pathOptions={{
              color: solarColor,
              fillColor: solarColor,
              fillOpacity: 0.4,
            }}
          />
        )}

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
