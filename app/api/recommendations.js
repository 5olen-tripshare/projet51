export const fetchRecommendations = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/recommend/${userId}`);
      
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des recommandations");
      }
  
      const data = await response.json();
      
      return data.recommendations;
    } catch (error) {
      console.error("Erreur API :", error);
      return [];
    }
  };
  