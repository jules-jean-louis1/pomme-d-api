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
