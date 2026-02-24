"use client"

import { createContext, type ReactNode, useContext, useState } from "react";

type LocationContextType = {
  lat: number | null;
  lng: number | null;
  setLocation: (lat: number, lng: number) => void;
};

type LocationProviderProps = {
  children: ReactNode;
};

const LocationContext = createContext<LocationContextType | null>(null);

function LocationContextProvider({ children }: LocationProviderProps) {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setlng] = useState<number | null>(null);
  function setLocation(lat: number, lng: number) {
    setLat(lat);
    setlng(lng);
  }

  return (
    <LocationContext.Provider value={{ lat, lng, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

function useLocationContext () {
    const context = useContext(LocationContext)
    if(!context) {
        throw new Error("useLocationContext to be used inside LocationProvider")
    }

    return context
}

export { LocationContextProvider, useLocationContext };
