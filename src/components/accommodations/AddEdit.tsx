"use client";
import * as Icons from "lucide-react";
import topCriteriaData from "@/src/data/topCriteria.json";
import Link from "next/link";

export function AddEdit(props: {
  accommodation?: {
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
  function getIconComponent(iconName: string) {
    return Icons[iconName as keyof typeof Icons] as React.ElementType;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    // const data = Object.fromEntries(formData.entries());
    const name = formData.get("name");
    const localisation = formData.get("localisation");
    const price = formData.get("price");
    const criteria = formData.getAll("criteria[]");
    const metre2 = formData.get("metre2");
    const pieces = formData.get("pieces");
    const chambre = formData.get("chambre");
    const files = formData.getAll("file") as File[];

    files.forEach((file, index) => {
      console.log(`Fichier ${index + 1}:`);
      console.log(`- Nom: ${file.name}`);
      console.log(`- Taille: ${file.size} bytes`);
      console.log(`- Type: ${file.type}`);
    });

    const data = {
      name,
      localisation,
      price,
      criteria,
      metre2,
      pieces,
      chambre,
      files,
    };

    console.log(data);
  }

  const accommodation = props.accommodation;

  const isAddMode = !accommodation;

  let action = "/api/accommodation/add";

  if (!isAddMode) {
    action = "/api/accommodation/edit";
  }

  return (
    <form
      // action={action}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      method="post"
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
                value={accommodation?.name}
                className="border-collapse border border-neutral-300 rounded-lg"
                placeholder="Nom du logement"
              />
            </h1>
            <div className="flex items-center text-gray-600 mb-2">
              <Icons.MapPin className="h-4 w-4 opacity-70 mr-1" />
              <input
                name="localisation"
                value={accommodation?.location}
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
                  value={accommodation?.price}
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
        <div className="relative h-96 mx-56 my-4">
          <div className="object-cover rounded-lg md:border-collapse md:border border-neutral-400  h-96">
            <div className="absolute inset-0 flex flex-row items-center justify-center text-center z-10">
              <input
                type="file"
                name="file"
                className=" text-lg mt-2 mr-2"
                multiple={true}
              />
              <Icons.Download />
            </div>
          </div>
        </div>

        <hr className="my-6" />
        <h2 className="text-xl font-bold mb-4">Détails</h2>

        <div className="mb-8">
          <textarea className="border-collapse border border-neutral-300 rounded-md w-full h-36" />
        </div>
        <h2 className="text-xl font-bold mb-4">Top critères</h2>
        <div className="grid grid-cols-3 gap-2 mb-8">
          {Object.keys(topCriteriaData).map((criteria) => {
            type CriteriaKeys = keyof typeof topCriteriaData;

            const icon = topCriteriaData[criteria as CriteriaKeys].icon;
            const IconComponent = getIconComponent(icon);
            const checked = accommodation?.topCriteria.includes(criteria)
              ? true
              : false;

            return (
              <div className="flex items-center gap-2 mb-2" key={criteria}>
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="checkbox mr-1"
                    name={"criteria[]"}
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
              value={accommodation?.numberRoom}
              name="metre2"
              className="border-collapse border border-neutral-300 rounded-md text-right mr-1 w-14"
            />{" "}
            m²
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="number"
              value={accommodation?.numberRoom}
              name="pieces"
              className="border-collapse border border-neutral-300 rounded-md text-right mr-1 w-10"
            />{" "}
            pièces
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="number"
              value={accommodation?.bedRoom}
              name="chambre"
              className="border-collapse border border-neutral-300 rounded-md text-right mr-1 w-10"
            />{" "}
            chambre(s)
          </div>
        </div>
        <button
          type="submit"
          className="btn bg-brown w-full hover:bg-orange-300"
        >
          Créer
        </button>
      </div>
    </form>
  );
}
