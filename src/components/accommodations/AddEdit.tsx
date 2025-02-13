"use client";
import * as Icons from "lucide-react";
import topCriteriaData from "@/src/data/topCriteria.json";
import listInterests from "@/src/data/interests.json";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { createAccommodation, updateAccommodation } from "@/src/lib/api";
import { useRouter } from "next/navigation";

export function AddEdit(props: {
  accommodation?: {
    _id: string;
    name: string;
    localisation: string;
    price: number;
    description: string;
    image: string[];
    // reviews: {
    //   rating: number;
    //   count: number;
    // };
    topCriteria: string[];
    interests: string[];
    isAvailable: boolean;
    totalPlaces: number;
    numberRoom: number;
    squareMeter: number;
    bedRoom: number;
  };
}) {
  const router = useRouter();

  function getIconComponent(iconName: string) {
    return Icons[iconName as keyof typeof Icons] as React.ElementType;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("isAvailable", "true");
    formData.append("userId", "67a5e07sedf96772235c36f3");

    try {
      console.log("Données envoyées :", formData);

      if (accommodation?._id) {
        await updateAccommodation(accommodation._id, formData);
      } else {
        await createAccommodation(formData);
      }

      router.push("/rental/info");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  }

  const accommodation = props.accommodation;

  const [name, setName] = useState(accommodation?.name);
  const [localisation, setLocalisation] = useState(accommodation?.localisation);
  const [price, setPrice] = useState(accommodation?.price);
  const [metre2, setMetre2] = useState(accommodation?.squareMeter);
  const [description, setDescription] = useState(accommodation?.description);
  const [numberRoom, setNumberRoom] = useState(accommodation?.numberRoom);
  const [bedRoom, setBedRoom] = useState(accommodation?.bedRoom);
  const [topCriteria, setTopCriteria] = useState(accommodation?.topCriteria);
  const [interests, setInterests] = useState(accommodation?.interests);
  const [totalPlaces, setTotalPlaces] = useState(accommodation?.totalPlaces);
  const [image, setImage] = useState(accommodation?.image);
  const [countImage, setCountImage] = useState(0);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      method="post"
      encType="multipart/form-data"
    >
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/rental/info"
          className=" btn bg-gray-500 w-20 hover:bg-gray-400 text-white mb-6"
        >
          Retour
        </Link>
        <div className="flex flex-row  justify-between">
          <div className="">
            <h1 className="text-3xl font-bold mb-2">
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-collapse border border-neutral-300 rounded-lg"
                placeholder="Nom du logement"
              />
            </h1>
            <div className="flex items-center text-gray-600 mb-2">
              <Icons.MapPin className="h-4 w-4 opacity-70 mr-1" />
              <input
                name="localisation"
                value={localisation}
                onChange={(e) => setLocalisation(e.target.value)}
                className="border-collapse border border-neutral-300 rounded-md"
                placeholder="Localisation"
              />
            </div>
          </div>
          <div className="end-0 flex flex-col items-end">
            <br />

            <div className="text-orange-500 mb-2">
              <span className="text-2xl font-bold">
                <input
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="border-collapse border border-neutral-300 rounded-md text-right mr-1 w-20"
                  type="number"
                  placeholder="0"
                  min={0}
                />
                €
              </span>
              <span> /nuit</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
          {image?.map((img, index) => {
            const url_img = `http://localhost:5000/uploads/${encodeURIComponent(
              img
            )}`;
            return (
              <div key={index} className="relative h-48 ">
                <button
                  type="button"
                  className="absolute top-1 lg:-top-2 right-1 lg:-right-2 z-20 bg-red-600  text-white  rounded-full hover:bg-opacity-75"
                  onClick={() => setImage(image?.filter((c) => c !== img))}
                >
                  <Icons.X className="h-6 w-6" />
                </button>
                <Image
                  src={url_img}
                  alt={`image${index}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <input type="hidden" name="ancienneImage[]" value={img} />
              </div>
            );
          })}
        </div>
        <div className="my-4 flex flex-row">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-brown text-white py-2 px-4 rounded-lg hover:bg-orange-300"
          >
            Ajouter des images
          </label>
          <input
            id="file-upload"
            type="file"
            name="files"
            className="hidden"
            multiple={true}
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                console.log("Fichiers sélectionnés :", files);
                setCountImage(countImage + files.length);
              }
            }}
          />
          <div className="py-2 px-4">
            {countImage != 0 ? countImage + " images sélectionnées" : ""}
          </div>
        </div>

        <hr className="my-6" />
        <h2 className="text-xl font-bold mb-4">Détails</h2>

        <div className="mb-8">
          <textarea
            name="description"
            className="border-collapse border border-neutral-300 rounded-md w-full h-36"
          >
            {description}
          </textarea>
        </div>
        <div className="mb-8">
          Nombres de personnes maximum :{" "}
          <input
            type="number"
            value={totalPlaces}
            onChange={(e) => setTotalPlaces(Number(e.target.value))}
            name="totalPlaces"
            className="border-collapse border border-neutral-300 rounded-md text-right mr-1 w-14"
          />{" "}
        </div>
        <h2 className="text-xl font-bold mb-4">Description intérieure</h2>

        <h2 className="text-xl font-bold mb-4">Intérets</h2>
        <div className="grid grid-cols-3 gap-2 mb-8">
          {Object.keys(listInterests).map((interest) => {
            type InterestKeys = keyof typeof listInterests;

            const icon = listInterests[interest as InterestKeys].icon;
            const IconComponent = getIconComponent(icon);
            const checkedInterest = interests?.includes(interest)
              ? true
              : false;

            const handleCheckboxChange = () => {
              if (checkedInterest) {
                setInterests(interests?.filter((c) => c !== interest));
              } else {
                setInterests([...(interests || []), interest]);
              }
            };

            return (
              <div className="flex items-center gap-2 mb-2" key={interest}>
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    checked={checkedInterest}
                    onChange={handleCheckboxChange}
                    value={interest}
                    className="checkbox mr-1"
                    name={"interests[]"}
                  />
                  {IconComponent && (
                    <IconComponent className="h-5 w-5 opacity-70 mr-1" />
                  )}{" "}
                  <span className="label-text">
                    {listInterests[interest as InterestKeys].label}
                  </span>
                </label>
              </div>
            );
          })}
        </div>

        <h2 className="text-xl font-bold mb-4">Top critères</h2>
        <div className="grid grid-cols-3 gap-2 mb-8">
          {Object.keys(topCriteriaData).map((criteria) => {
            type CriteriaKeys = keyof typeof topCriteriaData;

            const icon = topCriteriaData[criteria as CriteriaKeys].icon;
            const IconComponent = getIconComponent(icon);
            const checked = topCriteria?.includes(criteria) ? true : false;

            const handleCheckboxChange = () => {
              if (checked) {
                setTopCriteria(topCriteria?.filter((c) => c !== criteria));
              } else {
                setTopCriteria([...(topCriteria || []), criteria]);
              }
            };

            return (
              <div className="flex items-center gap-2 mb-2" key={criteria}>
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleCheckboxChange}
                    value={criteria}
                    className="checkbox mr-1"
                    name={"topCriteria[]"}
                  />
                  {IconComponent && (
                    <IconComponent className="h-5 w-5 opacity-70 mr-1" />
                  )}{" "}
                  <span className="label-text">
                    {topCriteriaData[criteria as CriteriaKeys].label}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
        <h2 className="text-xl font-bold mb-4">Description intérieure</h2>
        <div className="grid grid-cols-3 gap-2 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <input
              type="number"
              value={metre2}
              onChange={(e) => setMetre2(Number(e.target.value))}
              name="squareMeter"
              className="border-collapse border border-neutral-300 rounded-md text-right mr-1 w-14"
            />{" "}
            m²
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="number"
              value={numberRoom}
              onChange={(e) => setNumberRoom(Number(e.target.value))}
              name="numberRoom"
              className="border-collapse border border-neutral-300 rounded-md text-right mr-1 w-10"
            />{" "}
            pièces
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="number"
              value={bedRoom}
              onChange={(e) => setBedRoom(Number(e.target.value))}
              name="bedRoom"
              className="border-collapse border border-neutral-300 rounded-md text-right mr-1 w-10"
            />{" "}
            chambre(s)
          </div>
        </div>
        <button
          type="submit"
          className="btn bg-green-600 w-full hover:bg-green-500"
        >
          Valider
        </button>
      </div>
    </form>
  );
}
