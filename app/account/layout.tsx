"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import ProtectedRoute from "@/src/components/ProtectedRoute";

const tabs = [
  { id: "info", label: "Compte", href: "/account/info" },
  { id: "history", label: "Historique", href: "/account/history" },
  { id: "payment", label: "Moyens de paiement", href: "/account/payment" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
    <div className="p-2">
      <div className="pt-10 flex flex-col justify-center items-center">
        <img
          src={session?.user?.image || "/images/user-icon.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4 border-4 border-blue-500"
        />
        <h1 className="text-2xl font-bold mb-2">{session?.user?.name || "Invité"}</h1>
        <p>{session?.user?.email || "email non disponible"}</p>
      </div>
      <div className="px-5 mx-20 my-10 rounded-md shadow-lg">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`pb-4 px-5 border-b-2 font-medium text-lg ${
                pathname === tab.href
                  ? "text-blue-500 border-blue-500"
                  : "border-transparent hover:text-blue-500 hover:border-blue-500"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </div>
    </ProtectedRoute>
  );
}