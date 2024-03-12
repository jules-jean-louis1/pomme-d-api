import { NextResponse } from "next/server";
import { getSequelizeConnection } from "../db";
import { defineUserModel } from "@/models/models";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Data:", data);
    if (
      !data.username || data.username.length === 0 ||
      !data.password || data.password.length === 0
    ) {
      return NextResponse.json(
        {
          message: "Missing fields",
        },
        { status: 400 }
      );
    }
    const sequelize = await getSequelizeConnection();
    const User = defineUserModel(sequelize);
    const user = await User.findOne({
      where: {
        username: data.username,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }
    const isPasswordValid = bcrypt.compareSync(data.password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function GET(request) {
  return NextResponse.json({ message: "Profil GET" });
}