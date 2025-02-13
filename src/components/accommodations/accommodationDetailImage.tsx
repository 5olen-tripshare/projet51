"use client"; // ✅ Obligatoire pour activer les hooks React

import { useState } from "react";
import Image from "next/image";
import * as Icons from "lucide-react";

type Props = {
  accommodation: {
    name: string;
    localisation: string;
    price: number;
    image: string[];
    description: string;
    topCriteria: string[];
    squareMeter: number;
    numberRoom: number;
    bedRoom: number;
  };
};

export default function AccommodationDetailClient({ accommodation }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const nextImage = () =>
    setCurrentImageIndex((prevIndex) =>
      prevIndex === accommodation.image.length - 1 ? 0 : prevIndex + 1
    );

  const prevImage = () =>
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? accommodation.image.length - 1 : prevIndex - 1
    );

  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
        {accommodation.image[0] ? (
          <div className="relative h-96 ">
            <Image
              src={accommodation.image[0]}
              alt={accommodation.name[0]}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ) : (
          <div className="card bg-base-300 rounded-box grid h-48 place-items-center"></div>
        )}
        <div className="hidden md:grid grid-cols-2 gap-2">
          {accommodation.image[1] ? (
            <div className="relative h-48 ">
              <Image
                src={accommodation.image[1]}
                alt={accommodation.name[1]}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="card bg-base-300 rounded-box grid h-48 place-items-center"></div>
          )}
          {accommodation.image[2] ? (
            <div className="relative h-48 ">
              <Image
                src={accommodation.image[2]}
                alt={accommodation.name[2]}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="card bg-base-300 rounded-box grid h-48 place-items-center"></div>
          )}
          {accommodation.image[3] ? (
            <div className="relative h-48 ">
              <Image
                src={accommodation.image[3]}
                alt={accommodation.name[3]}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="card bg-base-300 rounded-box grid h-48 place-items-center"></div>
          )}
          {accommodation.image[4] ? (
            <div className="relative h-48 ">
              <Image
                src={accommodation.image[4]}
                alt={accommodation.name[4]}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="card bg-base-300 rounded-box grid h-48 place-items-center"></div>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="bg-brown btn btn-md w-48 hover:bg-orange-300 relative z-20 -mt-20 mr-4"
          onClick={openModal}
        >
          Voir toutes les photos
        </button>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg max-w-4xl w-full">
            <button
              className="absolute top-1 lg:-top-20 right-1 lg:-right-20 z-20 bg-gray-600 bg-opacity-50 text-white  rounded-full hover:bg-opacity-75"
              onClick={closeModal}
            >
              <Icons.X className="h-6 w-6" />
            </button>

            <div className="relative h-96">
              <Image
                src={accommodation.image[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                className="object-cover rounded-lg"
                fill
              />

              <button
                className="absolute left-0 lg:-left-20 top-1/2 transform -translate-y-1/2 bg-gray-600 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                onClick={prevImage}
              >
                <Icons.ChevronLeft className="h-6 w-6" />
              </button>

              <button
                className="absolute right-0 lg:-right-20 top-1/2 transform -translate-y-1/2 bg-gray-600 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                onClick={nextImage}
              >
                <Icons.ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="text-center mt-4">
              {currentImageIndex + 1} / {accommodation.image.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
