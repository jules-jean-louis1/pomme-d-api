import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  console.log("data", data);
  return NextResponse.json({ message: `Username ${data.username}` });
}

export async function GET(request) {
  return NextResponse.json({ message: "Register GET" });
}
