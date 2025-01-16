"use client";
import Image from "next/image";
import Link from "next/link";

export default function Info() {
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

        <div className="space-y-4">
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
                    <h3 className="font-semibold text-lg">nom</h3>
                    <p className="text-gray-600">localisation</p>
                    <p className="mt-2">
                      Du {"2024-08-15"} au {"2024-08-22"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">200 €</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(
                        "activated"
                      )}`}
                    >
                      {getStatusText("activated")}
                    </span>
                    <br />
                    <br />
                    <button
                      onClick={() => ""}
                      className={`px-4 py-2 rounded  hover:bg-orange-600 hover:text-white
                  `}
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
