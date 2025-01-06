import { AccommodationCard } from "@/src/components/accommodationCard";
import accommodationsData from "@/src/data/accommodations.json";

export default function Home() {
  return (
    <div className="container mx-auto px-56 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accommodationsData.accommodations.map((accommodation) => (
          <AccommodationCard
            key={accommodation.id}
            accommodation={accommodation}
          />
        ))}
      </div>
    </div>
  );
}
