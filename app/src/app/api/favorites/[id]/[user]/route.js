import { getSequelizeConnection } from "@/app/api/db";
import { defineUserFavoritesModel } from "@/models/models";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id, user } = params;
  try {
    const sequelize = await getSequelizeConnection();
    const Favorite = defineUserFavoritesModel(sequelize);
    const userFavorite = await Favorite.findOne({
      where: {
        product_id: id,
        user_id: user,
      },
    });
    if (userFavorite) {
      return NextResponse.json({ favorite: true });
    } else {
      return NextResponse.json({ favorite: false });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req, { params }) {
  const { id, user } = params;
  try {
    const sequelize = await getSequelizeConnection();
    const Favorite = defineUserFavoritesModel(sequelize);

    await Favorite.create({
      product_id: id,
      user_id: user,
      date_added: new Date(),
    });
    return NextResponse.json({ message: "Favorite added" });
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(req, { params }) {
  const { id, user } = params;
  try {
    const sequelize = await getSequelizeConnection();
    const Favorite = defineUserFavoritesModel(sequelize);
    await Favorite.destroy({
      where: {
        product_id: id,
        user_id: user,
      },
    });
    return NextResponse.json({ message: "Favorite removed" });
  } catch (error) {
    console.error(error);
  }
}
