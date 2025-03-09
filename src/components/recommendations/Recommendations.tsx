import { useEffect, useState } from "react";
import { fetchRecommendations } from "@/app/api/recommendations";
import { AccommodationCard } from "../accommodations/accommodationCard";

type Accommodation = {
  _id: string;
  name: string;
  localisation: string;
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

type RecommendationsProps = {
  userId: string;
  userInterests: string[];
};

const Recommendations: React.FC<RecommendationsProps> = ({ userId, userInterests }) => {
  const [recommendations, setRecommendations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) return;

    const getRecommendations = async () => {
      try {
        const recs: Accommodation[] = await fetchRecommendations(userId);
        setRecommendations(recs);
      } catch (error) {
        console.error("Erreur lors du chargement des recommandations :", error);
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, [userId, userInterests]);

  if (loading) {
    return <p className="text-center text-gray-400">Chargement des recommandations...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommandations pour vous</h2>
      {recommendations.length === 0 ? (
        <p className="text-gray-500">Aucune recommandation trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recommendations.map((accommodation) => (
            <AccommodationCard key={accommodation._id} accommodation={accommodation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
