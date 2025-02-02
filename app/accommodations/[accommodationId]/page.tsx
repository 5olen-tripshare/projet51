import * as Icons from "lucide-react";
import topCriteriaData from "@/src/data/topCriteria.json";
import { fetchAccommodationById } from "@/src/lib/api";
import AccommodationDetailImage from "@/src/components/accommodations/accommodationDetailImage";

export default async function DetailAccommodation(props: {
  params: {
    accommodationId: string;
  };
}) {
  const params = props.params;

  const accommodation = await fetchAccommodationById(params.accommodationId);

  function getIconComponent(iconName: string) {
    return Icons[iconName as keyof typeof Icons] as React.ElementType;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-row  justify-between  ">
        <div className="">
          <h1 className="text-3xl font-bold mb-2">{accommodation.name}</h1>
          <div className="flex items-center text-gray-600 mb-2">
            <Icons.MapPin className="h-4 w-4 opacity-70 mr-1" />
            {accommodation.location}
          </div>
          <div className="flex items-center text-gray-950 mb-6">
            <Icons.CircleUserRound className="h-4 w-4 opacity-70 mr-1" /> Ces
            personnes ont réservés : John Doe, John Doe
          </div>
        </div>
        <div className="end-0 flex flex-col items-end">
          <br />
          <div className="text-orange-500 mb-2">
            <span className="text-2xl font-bold">{accommodation.price}€</span>
            <span> /nuit</span>
          </div>
          <button className="bg-brown btn btn-md w-32 hover:bg-orange-300">
            Réserver
          </button>
        </div>
      </div>
      <AccommodationDetailImage accommodation={accommodation} />

      <hr className="my-6" />
      <h2 className="text-xl font-bold mb-4">Détails</h2>
      <div className="mb-8">{accommodation.description}</div>
      <h2 className="text-xl font-bold mb-4">Top critères</h2>
      <div className="grid grid-cols-3 gap-2 mb-8">
        {accommodation.topCriteria.map((criteria: string) => {
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
          {accommodation.squareMeter} m²
        </div>
        <div className="flex items-center gap-2 mb-2">
          {accommodation.numberRoom} pièces
        </div>
        <div className="flex items-center gap-2 mb-2">
          {accommodation.bedRoom} chambre(s)
        </div>
      </div>
    </div>
  );
}
