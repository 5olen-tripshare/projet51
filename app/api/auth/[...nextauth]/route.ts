import NextAuth from "next-auth";
import FusionAuthProvider from "next-auth/providers/fusionauth";

export const authOptions = {
  providers: [
    FusionAuthProvider({
      id: "fusionauth",
      name: "FusionAuth",
      clientId: process.env.NEXT_PUBLIC_FUSIONAUTH_CLIENT_ID!,
      clientSecret: process.env.FUSIONAUTH_CLIENT_SECRET!,
      issuer: process.env.NEXT_PUBLIC_FUSIONAUTH_ISSUER!,
      authorization: {
        url: `${process.env.NEXT_PUBLIC_FUSIONAUTH_ISSUER}/oauth2/authorize`,
        params: {
          scope: "openid profile email address phone",
          response_type: "code",
          redirect_uri: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/callback/fusionauth`,
        },
      },
      token: {
        url: `${process.env.NEXT_PUBLIC_FUSIONAUTH_ISSUER}/oauth2/token`,
      },
      userinfo: {
        url: `${process.env.NEXT_PUBLIC_FUSIONAUTH_ISSUER}/oauth2/userinfo`,
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          birthdate: profile.birthdate,
          mobilePhone: profile.phone_number || null,
          image: profile.picture || null,
        };
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        id: token.id,
        name: token.name || null,
        email: token.email || null,
        birthdate: token.birthdate || null,
        mobilePhone: token.mobilePhone || null,
        image: token.image || null,
        accessToken: token.accessToken || null,
      };
      return session;
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: any;
      user?: any;
      account?: any;
    }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
        token.name = user.name || null;
        token.email = user.email || null;
        token.image = user.image || null;
        token.birthdate = user.birthdate || null;
        token.mobilePhone = user.mobilePhone || null;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
