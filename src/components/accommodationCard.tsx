import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

export function AccommodationCard(props: {
  accommodation: {
    id: string;
    name: string;
    location: string;
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
}) {
  const accommodation = props.accommodation;

  return (
    <Link href={`/accommodation/${accommodation.id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer w-80">
        <div className="relative h-48 w-full">
          <Image
            src={accommodation.image[0]}
            alt={accommodation.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="p-4">
          <p className="text-gray-600 text-sm mb-1">{accommodation.location}</p>
          <h3 className="text-lg font-semibold text-gray-800">
            {accommodation.name} - {accommodation.totalPlaces} personnes
          </h3>

          <div className="text-gray-500 text-sm mt-2">
            {accommodation.description}
          </div>

          <div className="mt-4">
            <span className="text-lg font-bold text-gray-900">
              {accommodation.price}€
            </span>
            <span className="text-gray-600"> / nuit</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
