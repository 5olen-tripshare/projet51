// 🔹 Définition du type pour un hébergement
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

// 🔹 Fonction pour récupérer les recommandations avec typage
export const fetchRecommendations = async (userId: string): Promise<Accommodation[]> => {
  try {
    const response = await fetch(`http://localhost:8000/recommend/${userId}`);
    
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
