import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ message: "Hello World" });
}

// Handles POST requests to /api
