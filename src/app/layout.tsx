import type { Metadata } from "next";
import "./globals.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/TopBar";
import MapView from "@/components/map/MapView";
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
            <div className="app-shell flex min-h-screen flex-col md:h-screen">
              <TopBar />
              <main className="flex grow flex-col gap-4 px-3 py-4 md:min-h-0 md:flex-row-reverse lg:px-6 lg:py-5">
                <div className="w-full md:w-[38%] md:overflow-y-auto md:pr-1">
                  {children}
                </div>
                <div className="h-full min-h-[22rem] w-full overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_24px_70px_-28px_rgba(28,25,23,0.45)] ring-1 ring-stone-200/70 md:h-auto md:min-h-0 md:w-[62%]">
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
