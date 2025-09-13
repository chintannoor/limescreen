import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      link: string;
      file: string;
      fname: string;
    };
  }

  interface User {
    id: string;
    email: string;
    link: string;
    file: string;
    fname: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    link: string;
    file: string;
    fname: string;
  }
}
