"use client";

import { signOut } from "next-auth/react";

export const handleLogout = async () => {
  // Déconnexion de NextAuth
  await signOut({ redirect: false });

  // Déconnexion de FusionAuth
  const clientId = process.env.NEXT_PUBLIC_FUSIONAUTH_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
  window.location.href = `${process.env.NEXT_PUBLIC_FUSIONAUTH_ISSUER}/oauth2/logout?client_id=${clientId}&redirect_uri=${redirectUri}`;
};
