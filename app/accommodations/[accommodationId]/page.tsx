import Image from "next/image";
import accommodationsData from "@/src/data/accommodations.json";
import * as Icons from "lucide-react";
import topCriteriaData from "@/src/data/topCriteria.json";

export default async function DetailAccommodation(props: {
  params: Promise<{
    accommodationId: string;
  }>;
}) {
  const params = await props.params;

  function getIconComponent(iconName: string) {
    return Icons[iconName as keyof typeof Icons] as React.ElementType;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-row  justify-between  ">
        <div className="">
          <h1 className="text-3xl font-bold mb-2">
            {
              accommodationsData.accommodations[
                Number(params.accommodationId) - 1
              ].name
            }
          </h1>
          <div className="flex items-center text-gray-600 mb-2">
            <Icons.MapPin className="h-4 w-4 opacity-70 mr-1" />
            {
              accommodationsData.accommodations[
                Number(params.accommodationId) - 1
              ].location
            }
          </div>
          <div className="flex items-center text-gray-950 mb-6">
            <Icons.CircleUserRound className="h-4 w-4 opacity-70 mr-1" /> Ces
            personnes ont réservés : John Doe, John Doe
          </div>
        </div>
        <div className="end-0 flex flex-col items-end">
          <br />
          <div className="text-orange-500 mb-2">
            <span className="text-2xl font-bold">
              {
                accommodationsData.accommodations[
                  Number(params.accommodationId) - 1
                ].price
              }
              €
            </span>
            <span> /nuit</span>
          </div>
          <button className="bg-brown btn btn-md w-32 hover:bg-orange-300">
            Réserver
          </button>
        </div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
        {accommodationsData.accommodations[Number(params.accommodationId) - 1]
          .image[0] ? (
          <div className="relative h-96 ">
            <Image
              src={
                accommodationsData.accommodations[
                  Number(params.accommodationId) - 1
                ].image[0]
              }
              alt={
                accommodationsData.accommodations[
                  Number(params.accommodationId) - 1
                ].name[0]
              }
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ) : (
          <div className="card bg-base-300 rounded-box grid h-48 place-items-center"></div>
        )}
        <div className="hidden md:grid grid-cols-2 gap-2">
          {accommodationsData.accommodations[Number(params.accommodationId) - 1]
            .image[1] ? (
            <div className="relative h-48 ">
              <Image
                src={
                  accommodationsData.accommodations[
                    Number(params.accommodationId) - 1
                  ].image[1]
                }
                alt={
                  accommodationsData.accommodations[
                    Number(params.accommodationId) - 1
                  ].name[1]
                }
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="card bg-base-300 rounded-box grid h-48 place-items-center"></div>
          )}
          {accommodationsData.accommodations[Number(params.accommodationId) - 1]
            .image[2] ? (
            <div className="relative h-48 ">
              <Image
                src={
                  accommodationsData.accommodations[
                    Number(params.accommodationId) - 1
                  ].image[2]
                }
                alt={
                  accommodationsData.accommodations[
                    Number(params.accommodationId) - 1
                  ].name[2]
                }
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="card bg-base-300 rounded-box grid h-48 place-items-center"></div>
          )}
          {accommodationsData.accommodations[Number(params.accommodationId) - 1]
            .image[3] ? (
            <div className="relative h-48 ">
              <Image
                src={
                  accommodationsData.accommodations[
                    Number(params.accommodationId) - 1
                  ].image[3]
                }
                alt={
                  accommodationsData.accommodations[
                    Number(params.accommodationId) - 1
                  ].name[3]
                }
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="card bg-base-300 rounded-box grid h-48 place-items-center"></div>
          )}
          {accommodationsData.accommodations[Number(params.accommodationId) - 1]
            .image[4] ? (
            <div className="relative h-48 ">
              <Image
                src={
                  accommodationsData.accommodations[
                    Number(params.accommodationId) - 1
                  ].image[4]
                }
                alt={
                  accommodationsData.accommodations[
                    Number(params.accommodationId) - 1
                  ].name[4]
                }
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
        <button className="bg-brown btn btn-md w-48 hover:bg-orange-300 relative z-20 -mt-20 mr-4">
          Voir toutes les photos
        </button>
      </div>

      <hr className="my-6" />
      <h2 className="text-xl font-bold mb-4">Détails</h2>
      <div className="mb-8">
        {
          accommodationsData.accommodations[Number(params.accommodationId) - 1]
            .description
        }
      </div>
      <h2 className="text-xl font-bold mb-4">Top critères</h2>
      <div className="grid grid-cols-3 gap-2 mb-8">
        {accommodationsData.accommodations[
          Number(params.accommodationId) - 1
        ].topCriteria.map((criteria) => {
          type CriteriaKeys = keyof typeof topCriteriaData;

          const icon = topCriteriaData[criteria as CriteriaKeys].icon;
          const IconComponent = getIconComponent(icon);

          return (
            <div className="flex items-center gap-2 mb-2" key={criteria}>
              {IconComponent && (
                <IconComponent className="h-5 w-5 opacity-70 mr-1" />
              )}{" "}
              {topCriteriaData[criteria as CriteriaKeys].label}
            </div>
          );
        })}
      </div>
      <h2 className="text-xl font-bold mb-4">Description intérieure</h2>
      <div className="grid grid-cols-3 gap-2 mb-8">
        <div className="flex items-center gap-2 mb-2">
          {
            accommodationsData.accommodations[
              Number(params.accommodationId) - 1
            ].squareMeter
          }{" "}
          m²
        </div>
        <div className="flex items-center gap-2 mb-2">
          {
            accommodationsData.accommodations[
              Number(params.accommodationId) - 1
            ].numberRoom
          }{" "}
          pièces
        </div>
        <div className="flex items-center gap-2 mb-2">
          {
            accommodationsData.accommodations[
              Number(params.accommodationId) - 1
            ].bedRoom
          }{" "}
          chambre(s)
        </div>
      </div>
    </div>
  );
}
