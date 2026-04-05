import type { Metadata } from "next";
import "./globals.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MapView from "@/components/map/MapView";
import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/TopBar";
import { LocationContextProvider } from "@/context/LocationContext";
import { QueryProvider } from "./providers/QueryProvider";

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
            <div className="flex flex-col min-h-screen md:h-screen bg-amber-50">
              <TopBar />
              <main className="flex flex-col grow md:min-h-0 gap-3 p-2.5 md:p-4 justify-evenly md:flex-row-reverse z-50">
                <div className="w-full md:w-5/12 md:px-4 md:overflow-y-auto rounded-xl ">
                  {children}
                </div>
                <div className="w-full h-full md:w-7/12 md:h-auto border border-amber-700/80 md:px-0 rounded-xl overflow-hidden shadow-lg">
                  <MapView />
                </div>
              </main>
              <Footer />
            </div>
          </LocationContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
