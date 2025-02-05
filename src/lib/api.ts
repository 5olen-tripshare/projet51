export const API_URL = process.env.NEXT_PUBLIC_ACCOMMODATION_API_URL;

export const fetchAccommodations = async () => {
  const response = await fetch(`${API_URL}/accommodations`);
  if (!response.ok)
    throw new Error("Erreur lors du chargement des hébergements");
  return response.json();
};

export const fetchAccommodationById = async (id: string) => {
  const response = await fetch(`${API_URL}/accommodations/${id}`);
  if (!response.ok) throw new Error("Hébergement non trouvé");
  return response.json();
};

export const createAccommodation = async (data: any) => {
  const response = await fetch(`${API_URL}/accommodations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erreur lors de la création");
  return response.json();
};

export const updateAccommodation = async (id: string, data: any) => {
  const response = await fetch(`${API_URL}/accommodations/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erreur lors de la modification");
  return response.json();
};
