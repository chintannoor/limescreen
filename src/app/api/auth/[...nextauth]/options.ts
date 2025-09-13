import { loginAction } from "@/app/(home)/login/_actions/loginServerActions";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  pages: {
    signIn: "/login", // Custom login page
    // signOut: 'http://user.limescreen.net',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email:",
          type: "email",
          placeholder: "john@gmail.com",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials.password) {
          return null;
        }
        let data = {
          email: credentials.email as string,
          password: credentials.password as string,
        };

        const user = await loginAction(data);
        if (user.status === null || user.data.id === undefined) {
          throw new Error("Invalid credentials");
        }
        return {
          id: String(user.data.id),
          email: user.data.email,
          link: user.data.link,
          file: user.data.file,
          fname: user.data.fname,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.link = user.link;
        token.file = user.file;
        token.fname = user.fname;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.link = token.link;
        session.user.file = token.file;
        session.user.fname = token.fname;
      }
      return session;
    },
  },
};
