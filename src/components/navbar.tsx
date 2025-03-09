"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { handleLogout } from "../utils/auth";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-600">
            TripShare
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {session && (
              <>
                <Link
                  href="/messenger"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Messagerie
                </Link>
                <Link
                  href="/rental/info"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Mes annonces
                </Link>
                <Link
                  href="/account/info"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Mon Compte
                </Link>
              </>
            )}
            {session ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Déconnexion
              </button>
            ) : (
              <button
                onClick={() => signIn("fusionauth")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Connexion
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
