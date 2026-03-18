import type { Metadata } from "next";
import "./globals.css";

import MapView from "@/components/map/MapView";
import TopBar from "@/components/panels/TopBar";
import { LocationContextProvider } from "@/context/LocationContext";
import { QueryProvider } from "./providers/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
  title: "SunTerra Atlas",
  description: "Geospatial Solar Potential Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <LocationContextProvider>
            <div className="flex flex-col min-h-screen bg-amber-50">
              <TopBar />
              <main className="flex flex-col gap-3 p-1 md:p-4 md:flex-row-reverse">
                <div className="w-full md:w-5/12 px-1 md:px-4 rounded-xl ">
                  {children}
                </div>
                <div className="w-full md:w-7/12 h-auto max-h-[76vh] px-3 md:px-0 rounded-xl overflow-hidden shadow-lg ">
                  <MapView />
                </div>
              </main>
            </div>
          </LocationContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
