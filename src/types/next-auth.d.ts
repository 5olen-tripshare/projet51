import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      birthdate?: string | null;
      mobilePhone?: string | null;
      image?: string | null;
      interests?: string;
    };
  }
}