import { NextResponse } from "next/server";
import { getSequelizeConnection } from "../db";
import { defineUserModel } from "@/models/models";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

export async function GET(request) {
  return NextResponse.json({ message: "Hello World" });
}

// Handles POST requests to /api
export async function POST(request) {
  try {
    const data = await request.json();
    if (data.username === "" && data.password === "") {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }
    if (data.username === "" || data.password === "") {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const sequelize = await getSequelizeConnection();
    const User = defineUserModel(sequelize);

    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: data.username }, { email: data.username }],
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }

    const passwordMatch = bcrypt.compareSync(data.password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
