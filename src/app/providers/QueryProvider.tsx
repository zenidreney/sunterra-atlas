"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import getReverseGeocode from "@/utils/getReverseGeocode";
import getSolarData from "@/utils/getSolarData";

function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
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

  return query
}

export { QueryProvider, useSolarData, useReverseGeoCode };
