export const API_URL = process.env.NEXT_PUBLIC_GATEWAY_API_URL + "/api";

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

export const fetchAccommodationByUserId = async (token: string | undefined) => {
  const auth = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/accommodations/user`, {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-type": "application/json",
    },
    mode: "cors",
    credentials: "same-origin",
  });
  if (!response.ok) throw new Error("Erreur lors de la modification");
  return response.json();
};

export const createAccommodation = async (
  token: string | undefined,
  formData: FormData
) => {
  const auth = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/accommodations`, {
    method: "POST",
    headers: {
      Authorization: auth,
    },
    credentials: "include",
    body: formData,
  });
  if (!response.ok) throw new Error("Erreur lors de la modification");
  return response.json();
};

export const updateAccommodation = async (
  token: string | undefined,
  id: string,
  formData: FormData
) => {
  const auth = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/accommodations/${id}`, {
    method: "PUT",
    headers: {
      Authorization: auth,
    },
    credentials: "include",
    body: formData,
  });
  if (!response.ok) throw new Error("Erreur lors de la modification");
  return response.json();
};
