const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// 🔹 Fonction pour récupérer les intérêts de l'utilisateur
export const fetchUserInterests = async (userId: string): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/interests/${userId}`);
    
    if (!response.ok) throw new Error("Erreur lors de la récupération des intérêts");

    const data: { interests: string[] } = await response.json();
    
    return data.interests;
  } catch (error) {
    console.error("Erreur API :", error);
    return [];
  }
};

// 🔹 Fonction pour sauvegarder les intérêts de l'utilisateur
export const saveUserInterests = async (userId: string, interests: string[]): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/interests/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, interests }),
    });

    if (!response.ok) throw new Error("Erreur lors de l'enregistrement des intérêts");

    await response.json();
  } catch (error) {
    console.error("Erreur API :", error);
  }
};
