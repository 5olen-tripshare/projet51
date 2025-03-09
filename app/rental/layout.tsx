"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ProtectedRoute from "@/src/components/ProtectedRoute";

const tabs = [
  { id: "info", label: "Mes annonces", href: "/rental/info" },
  { id: "availability", label: "Disponibilité", href: "/rental/availability" },
  { id: "payments", label: "Statistique", href: "/rental/statistic" },
];

export default function RentalLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const pathname = usePathname();
  
  return (
    <ProtectedRoute>
    <div className="p-2">
      <div className="px-5 mx-20 my-10 rounded-md shadow-lg border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`pb-4 px-5 border-b-2 font-medium text-lg ${
                pathname === tab.href
                  ? "text-blue-500 border-blue-500"
                  : "border-transparent text-gray-500 hover:text-blue-500 hover:border-blue-500"
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
