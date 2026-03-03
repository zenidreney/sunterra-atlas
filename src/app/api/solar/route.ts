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
      `https://power.larc.nasa.gov/api/temporal/climatology/point?` +
        `start=2001&end=2020&` +
        `latitude=${lat}&longitude=${lng}&` +
        `community=re&` +
        `parameters=ALLSKY_SFC_SW_DWN&` +
        `format=json&units=metric`,
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `NASA POWER API error: ${res.status}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: `Server error` },
      { status: 500 },
    );
  }
}
