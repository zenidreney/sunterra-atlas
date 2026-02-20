import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
