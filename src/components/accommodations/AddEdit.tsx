"use client";
import * as Icons from "lucide-react";
import topCriteriaData from "@/src/data/topCriteria.json";
import listInterests from "@/src/data/interests.json";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  createAccommodation,
  updateAccommodation,
} from "@/src/lib/accommodation-api";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function AddEdit(props: {
  accommodation?: {
    _id: string;
    name: string;
    localisation: string;
    price: number;
    description: string;
    image: string[];
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

  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  function getIconComponent(iconName: string) {
    return Icons[iconName as keyof typeof Icons] as React.ElementType;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("isAvailable", isAvailable.toString());

    try {
      if (formData.get("name") === "") {
        alert("Le nom du logement est obligatoire");
        return;
      }

      if (formData.get("localisation") === "") {
        alert("La localisation du logement est obligatoire");
        return;
      }

      if (formData.get("price") === "" || Number(formData.get("price")) <= 0) {
        alert("Le prix du logement est obligatoire");
        return;
      }

      if (formData.get("description") === "") {
        alert("La description du logement est obligatoire");
        return;
      }

      if (
        formData.get("totalPlaces") === "" ||
        Number(formData.get("totalPlaces")) <= 0
      ) {
        alert("Le nombre de places maximum est obligatoire");
        return;
      }

      if (
        formData.get("squareMeter") === "" ||
        Number(formData.get("squareMeter")) <= 0
      ) {
        alert("Le nombre de m² est obligatoire");
        return;
      }

      if (
        formData.get("numberRoom") === "" ||
        Number(formData.get("numberRoom")) <= 0
      ) {
        alert("Le nombre de pièces est obligatoire");
        return;
      }

      if (
        formData.get("bedRoom") === "" ||
        Number(formData.get("bedRoom")) <= 0
      ) {
        alert("Le nombre de chambres est obligatoire");
        return;
      }

      let countAncienneImage = 0;
      if (image) countAncienneImage = image.length;
      if (countImage + countAncienneImage < 5) {
        alert("Il faut au moins 5 images pour un logement");
        return;
      }

      if (accommodation?._id) {
        await updateAccommodation(token, accommodation._id, formData);
      } else {
        await createAccommodation(token, formData);
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
  const [isAvailable, setIsAvailable] = useState(accommodation?.isAvailable);
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

            <div className="flex items-center mb-2">
              <label htmlFor="isAvailable" className="mr-2 text-sm">
                Disponible
              </label>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input
                  id="isAvailable"
                  type="checkbox"
                  className="absolute w-0 h-0 opacity-0"
                  checked={isAvailable}
                  onChange={(e) => setIsAvailable(e.target.checked)}
                />
                <label
                  htmlFor="isAvailable"
                  className={`block w-12 h-6 overflow-hidden rounded-full cursor-pointer ${
                    isAvailable ? "bg-orange-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out ${
                      isAvailable ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></span>
                </label>
              </div>
            </div>

            <div className="text-orange-500 mb-2">
              <span className="text-2xl font-bold">
                <input
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="border-collapse border border-neutral-300 rounded-md text-right mr-1 w-20"
                  type="number"
                  placeholder="0"
                  min={1}
                />
                €
              </span>
              <span> /nuit</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
          {image?.map((img, index) => {
            const url_img = `${
              process.env.NEXT_PUBLIC_IMAGE_URI
            }/${encodeURIComponent(img)}`;
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
            min={1}
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
              min={1}
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
              min={1}
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
              min={1}
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
