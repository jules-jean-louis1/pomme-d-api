import { NextResponse } from "next/server";
import { getSequelizeConnection } from "../db";
import { defineUserModel } from "@/models/models";
import bcrypt from "bcryptjs";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/utils/auth";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Data:", data);
    if (
      data.username.length === 0 ||
      data.email.length === 0 ||
      data.password.length === 0 ||
      data.confirmPassword.length === 0
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
    const usersUsername = await User.findOne({
      where: {
        username: data.username,
      },
    });
    if (usersUsername) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }
    if (!validateUsername(data.username)) {
      return NextResponse.json(
        { message: "Invalid Username" },
        { status: 400 }
      );
    }
    if (!validateEmail(data.email)) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }
    const UsersEmail = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (UsersEmail) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }
    if (data.password !== data.confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }
    if (!validatePassword(data.password)) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }
    const hashedPassword = bcrypt.hashSync(
      data.password,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );
    const user = await User.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });
    return NextResponse.json(
      { message: "Create succesfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function GET(request) {
  return NextResponse.json({ message: "Register GET" });
}