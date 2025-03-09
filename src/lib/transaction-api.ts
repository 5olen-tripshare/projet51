export const API_URL = process.env.NEXT_PUBLIC_GATEWAY_API_URL + "/api";

export const countTransactionByAccommodationId = async (
  reservationData: object
) => {
  const response = await fetch(`${API_URL}/transactions/count/accommodation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationData),
  });
  if (!response.ok) throw new Error("Aucune réservation");
  return response.json();
};

export const fetchFilterAccommodations = async (
  search: string,
  startDate: Date,
  endDate: Date
) => {
  const queryParams = new URLSearchParams({
    search: search,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  }).toString();

  const response = await fetch(`${API_URL}/transactions/filter?${queryParams}`);
  if (!response.ok)
    throw new Error("Erreur lors du chargement des hébergements");
  return response.json();
};

export const fetchTransactionByUserId = async (token: string | undefined) => {
  const auth = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/transactions/user`, {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) throw new Error("Aucune réservation");
  return response.json();
};

export const fetchTransactionByAccommodationId = async (
  token: string | undefined,
  id: string
) => {
  const auth = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/transactions/accommodation/${id}`, {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) throw new Error("Aucune réservation");
  return response.json();
};

export const createTransaction = async (
  token: string | undefined,
  formData: FormData
) => {
  const auth = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/transactions`, {
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

export const deleteTransaction = async (
  token: string | undefined,
  id: string
) => {
  const auth = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/transactions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: auth,
    },
    credentials: "include",
  });
  if (!response.ok) throw new Error("Erreur lors de la modification");
  return response.json();
};

export const checkUserTransaction = async (
  token: string | undefined,
  reservationData: object
) => {
  const auth = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/transactions/check`, {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "same-origin",
    body: JSON.stringify(reservationData),
  });
  if (!response.ok) throw new Error("Erreur lors de la vérification");
  return response.json();
};
