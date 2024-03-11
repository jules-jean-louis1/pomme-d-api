import { NextResponse } from "next/server";
// Handles GET requests to /api
const Sequelize = require("sequelize");

async function getSequelizeConnection() {
  const sequelize = new Sequelize("pomme_d_api", "admin", "password", {
    host: "localhost",
    dialect: "mysql",
  });

  // Tester la connexion
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie !");
  } catch (error) {
    console.error("Échec de la connexion à la base de données :", error);
    throw error;
  }

  return sequelize;
}

export async function GET(request) {
  try {
    const sequelize = await getSequelizeConnection();
    console.log(sequelize);
    // Utiliser sequelize ici
    console.log("Connexion à la base de données réussie !");
    return NextResponse.json({ message: "Hello World" });
  } catch (error) {
    console.error("Erreur de connexion à la base de données :", error);
    return NextResponse.json({
      error: "La connexion à la base de données a échoué.",
    });
  }
}

// Handles POST requests to /api
export async function POST(request) {
  // ...
  return NextResponse.json({ message: "Hello World" });
}
