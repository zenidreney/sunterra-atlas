import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const location = searchParams.get("location");

  if (!location) {
    return NextResponse.json(
      {
        error: "No location parameter",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const res = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
              {
                  headers: { "User-Agent": "sunterra-atlas-student-project/1.0 (contact: zenid@tuta.io)"},
              },
          );
  
      if(!res.ok) {
          return NextResponse.json(
              {error: `Nomatim error: ${res.status}`},
              {status: res.status}
          )
      }
  
      const data = await res.json()
  
      // console.log(data)
  
      return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: `Server error` },
      { status: 500 })
  }

}
