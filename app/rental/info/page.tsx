"use client";
import Link from "next/link";
import { AccommodationCard } from "@/src/components/rental/accommodationCard";
import { useState, useEffect } from "react";
import { fetchAccommodations } from "@/src/lib/api";

type Accommodation = {
  _id: string;
  name: string;
  localisation: string;
  price: number;
  description: string;
  image: string[];
  reviews: {
    rating: number;
    count: number;
  };
  topCriteria: string[];
  interests: string[];
  isAvailable: boolean;
  totalPlaces: number;
  numberRoom: number;
  squareMeter: number;
  bedRoom: number;
};

export default function Info() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  useEffect(() => {
    async function loadAccommodations() {
      const data = await fetchAccommodations();
      console.log(data);
      setAccommodations(data);
    }
    loadAccommodations();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row justify-between ">
          <h2 className="text-xl font-semibold mb-6">Liste des logements</h2>
          <Link
            href="/accommodations/new"
            className=" btn bg-green-600 w-52 hover:bg-green-500 text-white"
          >
            Ajouter un logement
          </Link>
        </div>

        {accommodations.map((accommodation) => (
          <AccommodationCard
            key={accommodation._id}
            accommodation={accommodation}
          />
        ))}
      </div>
    </div>
  );
}
