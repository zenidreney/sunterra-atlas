"use client"

import { createContext, type ReactNode, useContext, useState } from "react";

type LocationContextType = {
  lat: number | null;
  lan: number | null;
  setLocation: (lat: number, lan: number) => void;
};

type LocationProviderProps = {
  children: ReactNode;
};

const LocationContext = createContext<LocationContextType | null>(null);

function LocationContextProvider({ children }: LocationProviderProps) {
  const [lat, setLat] = useState<number | null>(null);
  const [lan, setLan] = useState<number | null>(null);
  function setLocation(lat: number, lan: number) {
    setLat(lat);
    setLan(lan);
  }

  return (
    <LocationContext.Provider value={{ lat, lan, setLocation }}>
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
