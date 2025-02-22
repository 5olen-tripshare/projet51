import Link from "next/link";
import Image from "next/image";

export function AccommodationCard(props: {
  accommodation: {
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
}) {
  const accommodation = props.accommodation;
  const url_img = `http://localhost:5000/uploads/${encodeURIComponent(
    accommodation.image[0]
  )}`;

  return (
    <Link href={`/accommodations/${accommodation._id}`}>
      <div className="bg-brown border-collapse border border-brown rounded-lg shadow-xl overflow-hidden transition-transform hover:scale-105 cursor-pointer w-full h-96">
        <div className="relative h-48 w-full">
          <Image
            src={url_img}
            alt={accommodation.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="relative p-4 h-48">
          <div className="max-h-36 overflow-hidden">
            <p className="text-lightGreen text-sm mb-1">
              {accommodation.localisation}
            </p>
            <h3 className="text-lg font-semibold text-white ">
              {accommodation.name} - {accommodation.totalPlaces} personnes
            </h3>

            <div className="text-lightGreen text-sm mt-2">
              {accommodation.description}
            </div>
          </div>

          <div className="absolute  bottom-2">
            <span className="text-lg font-bold text-white">
              {accommodation.price}€
            </span>
            <span className="text-lightGreen"> / nuit</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
