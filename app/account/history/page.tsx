"use client";
import Image from "next/image";
import Link from "next/link";

export default function History() {
  const rentals = [
    {
      id: 1,
      name: "Rental 1",
      location: "Location 1",
      startDate: "2024-08-15",
      endDate: "2024-08-22",
      price: 200,
      imageUrl:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/437582157.jpg?k=af0d3f936d81804499134f0c06d372be35d032473ef3738ad2e4917064ac7d35&o=&hp=1",
    },
    {
      id: 2,
      name: "Rental 2",
      location: "Location 2",
      startDate: "2024-09-01",
      endDate: "2024-09-10",
      price: 300,
      imageUrl:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/437582157.jpg?k=af0d3f936d81804499134f0c06d372be35d032473ef3738ad2e4917064ac7d35&o=&hp=1",
    },
  ];

  return (
    <div className="mx-20">
      <h2 className="py-3 text-2xl font-bold">Historique</h2>
      <div className="space-y-4">
        {rentals.map((rental) => (
          <div key={rental.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative w-full md:w-56 h-32">
                <Image
                  src={rental.imageUrl}
                  alt={rental.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex h-full justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-xl">{rental.name}</h3>
                    <p className="text-lg">{rental.location}</p>
                  </div>
                  <div className="">
                    <div className="flex space-x-4">
                      <div>
                      <p className="font-light">Départ</p>
                      <p className="font-semibold">{rental.startDate}</p>
                      </div>
                      <div>
                      <p className="font-light">Arrivé</p>
                      <p className="font-semibold">{rental.endDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-right">
                    <p className="font-bold text-lg mb-2">{rental.price} €</p>
                    <button
                      onClick={() =>
                        (window.location.href = `/accommodations/info/${rental.id}`)
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
        ))}
      </div>
    </div>
  );
}
