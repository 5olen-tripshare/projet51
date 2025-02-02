import Link from "next/link";
import Image from "next/image";

export function AccommodationCard(props: {
  accommodation: {
    _id: string;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activated":
        return "bg-green-100 text-green-800";
      case "desactivated":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "activated":
        return "Activé";
      case "desactivated":
        return "Désactivé";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-4 p-2">
      <div className="bg-white p-6 rounded-lg shadow-md ">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-56 h-32">
            <Image
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/437582157.jpg?k=af0d3f936d81804499134f0c06d372be35d032473ef3738ad2e4917064ac7d35&o=&hp=1"
              alt="name"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{accommodation.name}</h3>
                <p className="text-gray-600">{accommodation.location}</p>
                <p className="mt-2">
                  Du {"2024-08-15"} au {"2024-08-22"}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{accommodation.price} €</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(
                    accommodation.isAvailable ? "activated" : "desactivated"
                  )}`}
                >
                  {getStatusText(
                    accommodation.isAvailable ? "activated" : "desactivated"
                  )}
                </span>
                <br />
                <br />
                <Link
                  href={`/accommodations/edit/${accommodation._id}`}
                  className={`px-4 py-2 rounded  hover:bg-orange-600 hover:text-white
                  `}
                >
                  Modifier
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
