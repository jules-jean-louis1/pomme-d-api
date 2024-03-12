const { Sequelize } = require("sequelize");

const defineUserModel = (sequelize) => {
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
      tableName: "user",
    }
  );
  return User;
};

export { defineUserModel };
