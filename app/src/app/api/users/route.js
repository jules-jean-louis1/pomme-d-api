import { NextResponse } from "next/server";
import { getSequelizeConnection, Sequelize } from "../db";

export async function GET(request) {
  try {
    const sequelize = await getSequelizeConnection();

    // Define your user model (assuming you have a model named "User")
    const User = sequelize.define(
      "user",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          field: "created_at",
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
          field: "updated_at",
        },
      },
      {
        tableName: "user", // Spécifiez le nom de la table ici
      }
    );
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
