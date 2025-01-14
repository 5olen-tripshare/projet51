"use client";
import Image from "next/image";

export default function Info() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "waiting":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmée";
      case "waiting":
        return "En attente";
      case "cancelled":
        return "Annulée";
      case "completed":
        return "Terminée";
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">
          Historique des réservations
        </h2>

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
                        "confirmed"
                      )}`}
                    >
                      {getStatusText("confirmed")}
                    </span>
                    <br />
                    <br />
                    <button
                      onClick={() => ""}
                      className={`px-4 py-2 rounded  hover:bg-red-600 hover:text-white
                  `}
                    >
                      Annuler la réservation
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
