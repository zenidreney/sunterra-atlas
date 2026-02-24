"use client";

import dynamic from "next/dynamic";

const MapViewInner = dynamic(() => import("./MapViewInner"), {
  ssr: false,
});

export default function MapView() {
  return <MapViewInner />;
}
