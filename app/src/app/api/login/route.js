import { NextResponse } from "next/server";
// Handles GET requests to /api

export async function GET(request) {
  try {
    const sequelize = await getSequelizeConnection();
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
