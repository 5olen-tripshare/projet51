import NextAuth from "next-auth";
import FusionAuthProvider from "next-auth/providers/fusionauth";

export const authOptions = {
  providers: [
    FusionAuthProvider({
      id: "fusionauth",
      name: "FusionAuth",
      clientId: process.env.FUSIONAUTH_CLIENT_ID!,
      clientSecret: process.env.FUSIONAUTH_CLIENT_SECRET!,
      issuer: process.env.FUSIONAUTH_ISSUER!,
      authorization: {
        url: `${process.env.FUSIONAUTH_ISSUER}/oauth2/authorize`,
        params: {
          scope: "openid profile email",
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
          name: profile.name || profile.fullName || profile.email.split("@")[0],
          email: profile.email,
          image: profile.picture || null,
        };
      },
    }),
  ],
  session: { strategy: 'jwt' as const },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.name = token.name; 
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };