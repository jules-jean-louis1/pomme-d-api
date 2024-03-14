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

const defineUserFavoritesModel = (sequelize) => {
  const UserFavorites = sequelize.define(
    "UserFavorites",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      date_added: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "user_favorites",
      timestamps: false,
    }
  );

  return UserFavorites;
};
const defineProductsModel = (sequelize) => {
  const Products = sequelize.define(
    "Products",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      brand: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      date_added: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "products",
      timestamps: false,
    }
  );

  return Products;
};
const defineConsumedFoodsModel = (sequelize) => {
  const ConsumedFoods = sequelize.define(
    "ConsumedFoods",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      date_consumed: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      consumed_quantity_gr: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      consumed_quantity_cal: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "consumed_foods",
      timestamps: false,
    }
  );

  return ConsumedFoods;
};

const defineUserGoalsModel = (sequelize) => {
  const UserGoals = sequelize.define(
    "UserGoals",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      goals_type: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      goals_value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      goals_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "user_goals",
      timestamps: false,
    }
  );

  return UserGoals;
};

export {
  defineUserModel,
  defineUserFavoritesModel,
  defineProductsModel,
  defineConsumedFoodsModel,
  defineUserGoalsModel,
};
