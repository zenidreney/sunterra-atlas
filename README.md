🌞 SunTerra Atlas

Geospatial Solar Potential Intelligence Platform

SunTerra Atlas is a geospatial web application that analyzes solar radiation potential for any selected location on Earth.

The platform combines interactive map exploration with climate datasets to help visualize solar energy potential worldwide.

🚀 [Live Demo](https://sunterra-atlas.vercel.app) deployed on Vercel

🌍 Interactive map-based location selection using React Leaflet

📍 Reverse geocoding to convert coordinates into human-readable locations

☀️ Solar radiation analysis based on long-term climatology datasets (2001–2020)

📊 Annual and monthly solar potential visualization

⚡ Optimized server-state fetching and caching with TanStack React Query

📈 Data visualization dashboards built with Recharts

## Tech Stack

Frontend

- React (App Router)
- TypeScript
- Context API

Data Fetching & State Management

- TanStack React Query
- React Context API

Backend (Serverless)

- Next.js API Routes

External APIs

- NASA POWER API (solar climatology data)
- OpenStreetMap Nominatim (geocoding and reverse geocoding)

Deployment

- Vercel

⚙️ Architecture Notes

- External API calls are proxied through Next.js API routes

- Prevents CORS issues

- Protects request headers

- Keeps client clean and minimal

Server-state caching with React Query ensures fast UI updates when switching between analysis views.

📊 Data Source

Solar radiation data is sourced from the NASA POWER API, which provides global climatological averages for solar energy potential.

Dataset used: ALLSKY_SFC_SW_DWN (Surface Downwelling Shortwave Radiation)

## License

This project is licensed under the MIT License — see the [LICENSE](https://github.com/zenidreney/sunterra-atlas/blob/main/LICENSE) file for details.  
Feel free to use, modify, and share.

👨‍💻 Author

Deniz Yener

Frontend Developer | Geospatial Systems Enthusiast

[LinkedIn](https://www.linkedin.com/in/zenid/)

[Portfolio](https://zenid.netlify.app)
