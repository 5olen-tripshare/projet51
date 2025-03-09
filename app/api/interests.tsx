const API_URL = process.env.NEXT_PUBLIC_GATEWAY_API_URL;

// Recup les interests
export const fetchUserInterests = async (userId: string): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/interests/${userId}`);

    if (!response.ok)
      throw new Error("Erreur lors de la récupération des intérêts");

    const data: { interests: string[] } = await response.json();

    return data.interests;
  } catch (error) {
    console.error("Erreur API :", error);
    return [];
  }
};

// Sauvegarder les interests
export const saveUserInterests = async (
  userId: string,
  interests: string[]
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/interests/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, interests }),
    });

    if (!response.ok)
      throw new Error("Erreur lors de l'enregistrement des intérêts");

    await response.json();
  } catch (error) {
    console.error("Erreur API :", error);
  }
};
