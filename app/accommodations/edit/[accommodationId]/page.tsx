import { AddEdit } from "@/src/components/accommodations/AddEdit";
import { fetchAccommodationById } from "@/src/lib/accommodation-api";

export default async function EditAccommodation(props: {
  params: {
    accommodationId: string;
  };
}) {
  const params = props.params;
  const accommodation = await fetchAccommodationById(params.accommodationId);

  if (!accommodation) {
    return <h1>Hébergement non trouvé</h1>;
  }

  return <AddEdit accommodation={accommodation} />;
}
