"use client";
import { useSession, signIn } from "next-auth/react";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("fusionauth"); // Redirection directe vers FusionAuth
    }
  }, [status]);

  if (status === "loading") {
    return <p>Chargement...</p>; // Affiche un message pendant la vérification de la session
  }

  return <>{session ? children : null}</>;
}
