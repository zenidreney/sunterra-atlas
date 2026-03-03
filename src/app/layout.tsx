import type { Metadata } from "next";
import "./globals.css";
import { LocationContextProvider } from "@/context/LocationContext";

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
        <LocationContextProvider>{children}</LocationContextProvider>
      </body>
    </html>
  );
}
