import { useEffect, useState } from "react";
import { fetchRecommendations } from "@/app/api/recommendations";
import { AccommodationCard } from "../accommodations/accommodationCard";

const Recommendations = ({ userId, userInterests }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const getRecommendations = async () => {
      const recs = await fetchRecommendations(userId);
      setRecommendations(recs);
      setLoading(false);
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
