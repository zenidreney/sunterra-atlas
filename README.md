🌞 SunTerra Atlas

Geospatial Solar Potential Intelligence Platform

SunTerra Atlas is a geospatial web application that analyzes solar radiation potential for any selected location on Earth.

It integrates public climate datasets with interactive map-based exploration.

🚀 [Live Demo](https://sunterra-atlas.vercel.app) Deployed on Vercel

📌 Features

🌍 Interactive map-based location selection

📍 Reverse geocoding for human-readable place names

☀️ Solar radiation analysis (2001–2020 climatology)

📊 Annual solar potential data display

⚡ Server-side API proxying for external services

## Tech Stack

Frontend

- React (App Router)
- TypeScript
- Context API

Backend (Serverless)

- Next.js API Routes

External APIs

- NASA POWER API (solar climatology data)
- OpenStreetMap Nominatim (geocoding and reverser geocoding)

Deployment

- Vercel

⚙️ Architecture Notes

- External API calls are proxied through Next.js API routes

- Prevents CORS issues

- Protects request headers

- Keeps client clean and minimal

👨‍💻 Author

Deniz Yener

Frontend Developer | Geospatial Systems Enthusiast

[LinkedIn](https://www.linkedin.com/in/zenid/)

[Portfolio](https://zenid.netlify.app)
