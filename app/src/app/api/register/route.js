import { NextResponse } from "next/server";

export async function POST(request) {
  return NextResponse.json({ message: "Register POST" });
}

export async function GET(request) {
  return NextResponse.json({ message: "Register GET" });
}
