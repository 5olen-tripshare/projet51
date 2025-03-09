export type Accommodation = {
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

const API_URL = process.env.NEXT_PUBLIC_GATEWAY_API_URL;

export const fetchRecommendations = async (
  userId: string
): Promise<Accommodation[]> => {
  try {
    const response = await fetch(`${API_URL}/recommend/${userId}`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des recommandations");
    }

    const data: { recommendations: Accommodation[] } = await response.json();
    return data.recommendations;
  } catch (error) {
    console.error("Erreur API :", error);
    return [];
  }
};
