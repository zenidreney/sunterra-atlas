"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import getReverseGeocode from "@/utils/getReverseGeocode";
import getSolarData from "@/utils/getSolarData";
import { useState } from "react";

const queryClient = new QueryClient();
function QueryProvider({ children }: { children: React.ReactNode }) {
  const [toggle, setToggle] = useState(0); // ← ADD STATE TOGGLE
  console.log("QueryProviderInside re-rendered! New queryClient created.");

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      {children}
      {/* TEMP DEVTOOLS FOR TESTING */}
      <div style={{ position: "fixed", bottom: 10, right: 10, zIndex: 9999 }}>
        <button
          type="button"
          onClick={() => setToggle((t) => t + 1)}
          style={{
            padding: "8px 12px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: 4,
          }}
        >
          Force Re-render #{toggle}
        </button>
      </div>
    </QueryClientProvider>
  );
}

function useSolarData(lat: number | null, lng: number | null) {
  const query = useQuery({
    queryKey: ["solar", lat, lng],
    queryFn: () => getSolarData(lat, lng),
    enabled: lat !== null && lng !== null,
    staleTime: 1000 * 60 * 60,
  });

  return query;
}

function useReverseGeoCode(lat: number | null, lng: number | null) {
  const query = useQuery({
    queryKey: ["reverse-geocode", lat, lng],
    queryFn: () => getReverseGeocode(lat, lng),
    enabled: lat !== null && lng !== null,
    staleTime: Infinity,
  });

  return query;
}

export { QueryProvider, useSolarData, useReverseGeoCode };
