import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-600">
            TripShare
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/rental"
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

            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
