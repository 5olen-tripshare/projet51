"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchTransactionByUserId } from "@/src/lib/transaction-api";

export default function History() {
  // const rentals = [
  //   {
  //     id: 1,
  //     name: "Rental 1",
  //     location: "Location 1",
  //     startDate: "2024-08-15",
  //     endDate: "2024-08-22",
  //     price: 200,
  //     imageUrl:
  //       "https://cf.bstatic.com/xdata/images/hotel/max1024x768/437582157.jpg?k=af0d3f936d81804499134f0c06d372be35d032473ef3738ad2e4917064ac7d35&o=&hp=1",
  //   },
  //   {
  //     id: 2,
  //     name: "Rental 2",
  //     location: "Location 2",
  //     startDate: "2024-09-01",
  //     endDate: "2024-09-10",
  //     price: 300,
  //     imageUrl:
  //       "https://cf.bstatic.com/xdata/images/hotel/max1024x768/437582157.jpg?k=af0d3f936d81804499134f0c06d372be35d032473ef3738ad2e4917064ac7d35&o=&hp=1",
  //   },
  // ];

  type Transaction = {
    _id: string;
    userId: string;
    accommodationId: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: "pending" | "confirmed" | "canceled";
    createdAt: string;
    updatedAt: string;
    accommodation: {
      _id: string;
      userId: string;
      name: string;
      localisation: string;
      price: number;
      description: string;
      image: string[];
      topCriteria: string[];
      interests: string[];
      isAvailable: boolean;
      totalPlaces: number;
      numberRoom: number;
      squareMeter: number;
      bedRoom: number;
      createdAt: string;
      updatedAt: string;
    };
  };

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await fetchTransactionByUserId(token);
        console.log(data);
        setTransactions(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des hébergements :",
          error
        );
      } finally {
        setLoading(false);
      }
    }
    loadTransactions();
  }, [token]);

  return (
    <div className="mx-20">
      <h2 className="py-3 text-2xl font-bold">Historique</h2>
      <div className="space-y-4">
        {loading ? (
          <span className="loading loading-dots loading-xl"></span>
        ) : (
          transactions.map((transactions) => (
            <div
              key={transactions._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-56 h-32">
                  <Image
                    src={`${
                      process.env.NEXT_PUBLIC_IMAGE_URI
                    }/${encodeURIComponent(
                      transactions.accommodation.image[0]
                    )}`}
                    alt={transactions.accommodationId}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex h-full justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-xl">
                        {transactions.accommodation.name}
                      </h3>
                      <p className="text-lg">
                        {transactions.accommodation.localisation}
                      </p>
                    </div>
                    <div className="">
                      <div className="flex space-x-4">
                        <div>
                          <p className="font-light">Départ</p>
                          <p className="font-semibold">
                            {new Date(
                              transactions.startDate
                            ).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="font-light">Arrivé</p>
                          <p className="font-semibold">
                            {new Date(transactions.endDate).toLocaleDateString(
                              "fr-FR",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center text-right">
                      <p className="font-bold text-lg mb-2">
                        {transactions.totalPrice} €
                      </p>
                      <button
                        onClick={() =>
                          (window.location.href = `/accommodations/${transactions.accommodationId}`)
                        }
                        className={`px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white`}
                      >
                        Détails
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
