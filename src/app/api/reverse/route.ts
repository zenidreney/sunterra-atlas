import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  console.log(lat, lng);

  if (!lat || !lng) {
    return NextResponse.json(
      {
        error: "No coordinates",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        headers: {
          "User-Agent":
            "sunterra-atlas-student-project/1.0 (contact: zenid@tuta.io)",
        },
      },
    );
  
    if (!res.ok) {
      return NextResponse.json(
        { error: `Nomatim error: ${res.status}` },
        { status: res.status },
      );
    }
  
    const data = await res.json()
  
    return NextResponse.json(data);
  } catch (error) {
     return NextResponse.json(
      { error: `Server error ${error}` },
      { status: 500 })
  }
}
