import * as Icons from "lucide-react";
import topCriteriaData from "@/src/data/topCriteria.json";

export default function New() {
  function getIconComponent(iconName: string) {
    return Icons[iconName as keyof typeof Icons] as React.ElementType;
  }

  return (
    <form action="" method="post">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-row  justify-between">
          <div className="">
            <h1 className="text-3xl font-bold mb-2">
              <input
                name="name"
                className="border-collapse border border-neutral-300 rounded-lg"
                placeholder="Nom du logement"
              />
            </h1>
            <div className="flex items-center text-gray-600 mb-2">
              <Icons.MapPin className="h-4 w-4 opacity-70 mr-1" />
              <input
                name="localisation"
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

            return (
              <div className="flex items-center gap-2 mb-2" key={criteria}>
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    className="checkbox mr-1"
                    name="criteria[]"
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
              name="metre2"
              className="border-collapse border border-neutral-300 rounded-md text-right mr-1 w-14"
            />{" "}
            m²
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="number"
              name="pieces"
              className="border-collapse border border-neutral-300 rounded-md text-right mr-1 w-10"
            />{" "}
            pièces
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="number"
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
