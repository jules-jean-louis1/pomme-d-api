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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        if (username === "" || password === "") {
          throw new Error("Champs manquants");
        }

        const sequelize = await getSequelizeConnection();
        const User = defineUserModel(sequelize);

        const user = await User.findOne({
          where: {
            [Op.or]: [{ username: username }, { email: username }],
          },
        });
        if (!user) {
          throw new Error("Utilisateur introuvable");
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
          throw new Error("Mot de passe incorrect");
        }

        return { id: user.id, username: user.username, email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.token.user.id,
        name: token.token.user.username,
        email: token.token.user.email,
      };
      console.log("session", session);
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    storage: "jwt",
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
