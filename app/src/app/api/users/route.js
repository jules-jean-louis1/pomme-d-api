import { NextResponse } from "next/server";
import { getSequelizeConnection, Sequelize } from "../db";
import { defineUserModel } from "@/models/models";

export async function GET(request) {
  try {
    const sequelize = await getSequelizeConnection();
    const User = defineUserModel(sequelize);
    const users = await User.findAll();

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Error fetching users" });
  }
}

// Handles POST requests to /api
export async function POST(request) {
  // ...
  return NextResponse.json({ message: "Hello World" });
}
