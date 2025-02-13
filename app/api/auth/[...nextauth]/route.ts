import NextAuth from "next-auth";
import FusionAuthProvider from "next-auth/providers/fusionauth";

export const authOptions = {
  providers: [
    FusionAuthProvider({
      id: "fusionauth",
      name: "FusionAuth",
      clientId: process.env.NEXT_PUBLIC_FUSIONAUTH_CLIENT_ID!,
      clientSecret: process.env.FUSIONAUTH_CLIENT_SECRET!,
      issuer: process.env.FUSIONAUTH_ISSUER!,
      authorization: {
        url: `${process.env.FUSIONAUTH_ISSUER}/oauth2/authorize`,
        params: {
          scope: "openid profile email address phone",
          response_type: "code",
          redirect_uri: "http://localhost:3000/api/auth/callback/fusionauth",
        },
      },
      token: {
        url: `${process.env.FUSIONAUTH_ISSUER}/oauth2/token`,
      },
      userinfo: {
        url: `${process.env.FUSIONAUTH_ISSUER}/oauth2/userinfo`,
      },
      profile(profile) {
        console.log("Profil utilisateur reçu :", profile);
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          birthdate: profile.birthdate,
          mobilePhone: profile.phone_number || null,
          image: profile.picture || null,
          interests: profile.interests || null,
        };
      },
    }),
  ],
  session: { strategy: 'jwt' as const },
  callbacks: {
    async session({ session, token }: { session: any, token: any }) {
      session.user = {
        name: token.name || null,
        email: token.email || null,
        birthdate: token.birthdate || null,
        mobilePhone: token.mobilePhone || null,
        image: token.image || null,
        interests: token.interests || null,
      };
      console.log("Session :", session);
      return session;
    },
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        token.name = user.name || null;
        token.email = user.email || null;
        token.image = user.image || null;
        token.birthdate = user.birthdate || null;
        token.mobilePhone = user.mobilePhone || null;
        token.interests = user.interests || null;
      }
      console.log("Token :", token);
      return token;
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };