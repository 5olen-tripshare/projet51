import { AccommodationCard } from "@/src/components/accommodationCard";
import accommodationsData from "@/src/data/accommodations.json";
import Image from "next/image";
import Form from "next/form";
import { MapPin } from "lucide-react";

export default function Home() {
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
        <Form
          action={async () => {
            "use server";
          }}
          className="bg-white p-2 rounded-lg shadow-lg max-w-6xl w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Où allez-vous ?"
              />
              <MapPin className="h-4 w-4 opacity-70" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="grow"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input type="date" name="endDate" id="endDate" className="grow" />
            </label>
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 transition-colors w-full"
            >
              Rechercher
            </button>
          </div>
        </Form>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2  xl:grid-cols-3 gap-6 pt-16">
        {accommodationsData.accommodations.map((accommodation) => (
          <AccommodationCard
            key={accommodation.id}
            accommodation={accommodation}
          />
        ))}
      </div>
    </div>
  );
}
