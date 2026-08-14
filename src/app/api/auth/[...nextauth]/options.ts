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

        // loginAction can return an error shape (bad credentials, backend
        // unreachable); never assume `data` is a populated object.
        const account = user?.data as Record<string, unknown> | undefined;
        if (!user || user.status !== 200 || !account || account.id === undefined) {
          throw new Error(user?.message || "Invalid credentials");
        }

        return {
          id: String(account.id),
          email: account.email as string,
          link: account.link as string,
          file: account.file as string,
          fname: account.fname as string,
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
