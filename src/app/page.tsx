"use client"

import AppLayout from "@/components/layout/AppLayout";
import { useLocationContext } from "@/context/LocationContext";

export default function Home() {

  const {lat, lan} = useLocationContext()

  console.log(lat, lan)


  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-[900px] mx-auto p-4">
      <p>SunTerra Atlas</p>
      <p>Latitude: {lat?.toFixed(2)}</p>
      <p>Longitude: {lan?.toFixed(2)}</p>
      <AppLayout />
    </div>
  );
}
