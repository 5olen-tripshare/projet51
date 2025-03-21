"use client";
import { AccommodationCard } from "@/src/components/accommodations/accommodationCard";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchAccommodations } from "@/src/lib/accommodation-api";
import { fetchFilterAccommodations } from "@/src/lib/transaction-api";
import Recommendations from "@/src/components/recommendations/Recommendations";
import { fetchUserInterests } from "@/app/api/interests";
import { useSession } from "next-auth/react";

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

export default function Home() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id || null;

  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!userId) return;

    const loadInterests = async () => {
      const interests = await fetchUserInterests(userId);
      setUserInterests(interests);
    };

    loadInterests();
  }, [userId]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAccommodations() {
      try {
        const data = await fetchAccommodations();
        setAccommodations(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des hébergements :",
          error
        );
      } finally {
        setLoading(false);
      }
    }
    loadAccommodations();
  }, []);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(accommodations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = accommodations.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const destination = formData.get("destination") as string;
      const startDate = formData.get("startDate") as string;
      const endDate = formData.get("endDate") as string;

      if (!destination || !startDate || !endDate) {
        try {
          const data = await fetchAccommodations();
          setAccommodations(data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des hébergements :",
            error
          );
        } finally {
          setLoading(false);
        }

        return;
      }

      const filteredAccommodations = await fetchFilterAccommodations(
        destination,
        new Date(startDate),
        new Date(endDate)
      );

      const cleanAccommodations = filteredAccommodations.map(
        ({ available, ...rest }) => rest
      );

      setAccommodations(cleanAccommodations);
    } catch (error) {
      setLoading(false);
      console.error("Erreur:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-24 md:px-12 lg:px-28  py-8  ">
      <div className="relative h-96 w-full rounded-lg overflow-hidden ">
        <Image
          src="/images/image_accueil.jpg"
          alt="accueil"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <h1 className="text-white text-4xl font-bold">
            Prévois ton prochain voyage en 2 cliques
          </h1>
          <p className="text-white text-lg mt-2">
            Explore des destinations, réserve ton logement, et connecte-toi avec
            <br />
            d'autres voyageurs. Simple, rapide et social !
          </p>
        </div>
      </div>

      <div className="relative z-20 -mt-8 flex justify-center">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="bg-white p-2 rounded-lg shadow-lg max-w-6xl w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                name="destination"
                className="grow"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Où allez-vous ?"
              />
              <MapPin className="h-4 w-4 opacity-70" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 transition-colors w-full"
            >
              Rechercher
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-16">
        {loading ? (
          <span className="loading loading-dots loading-xl"></span>
        ) : (
          currentData.map((accommodation) => (
            <AccommodationCard
              key={accommodation._id}
              accommodation={accommodation}
            />
          ))
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="btn bg-gray-400 sm:w-24 hover:bg-gray-300 text-white"
        >
          Précédent
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="btn bg-gray-400 sm:w-24 hover:bg-gray-300 text-white"
        >
          Suivant
        </button>
      </div>

      {userId && (
        <div style={{ marginTop: "20px" }}>
          <Recommendations userId={userId} userInterests={userInterests} />
        </div>
      )}
    </div>
  );
}
