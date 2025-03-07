export const API_URL = process.env.NEXT_PUBLIC_GATEWAY_API_URL;

export const countTransactionByAccommodationId = async (id: string) => {
  const response = await fetch(
    `${API_URL}/transactions/count/accommodation/${id}`
  );
  if (!response.ok) throw new Error("Aucune réservation");
  return response.json();
};

export const fetchTransactionByUserId = async (
  token: string | undefined,
  id: string
) => {
  const auth = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/transactions/user/${id}`, {
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
