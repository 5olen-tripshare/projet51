import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      birthdate?: string | null;
      mobilePhone?: string | null;
      image?: string | null;
      interests?: string;
      accessToken?: string;
    };
  }
}
