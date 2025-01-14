"use client";

import Link from "next/link";

const tabs = [
  { id: "info", label: "Mes annonces", href: "/rental/info" },
  { id: "availability", label: "Disponibilité", href: "/rental/availability" },
  { id: "payments", label: "Statistique", href: "/rental/statistic" },
];

export default function RentalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-6">Mes annonces</h1>

      <div className="border-b border-gray-200 ">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </div>
  );
}
