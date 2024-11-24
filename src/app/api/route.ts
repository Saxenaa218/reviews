import { NextRequest, NextResponse } from "next/server";

// get topics
export async function GET(request: NextRequest) {
  const greeting = "Hello World!!";
  const json = {
    greeting,
  };

  return NextResponse.json(json);
}
