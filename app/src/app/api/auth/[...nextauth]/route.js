import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import { getSequelizeConnection } from "../../db";
import { defineUserModel } from "@/models/models";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        if (username === "" || password === "") {
          throw new Error("Missing fields");
        }

        const sequelize = await getSequelizeConnection();
        const User = defineUserModel(sequelize);

        const user = await User.findOne({
          where: {
            [Op.or]: [{ username: username }, { email: username }],
          },
        });

        if (!user) {
          throw new Error("User does not exist");
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return { id: user.id, name: user.username, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
