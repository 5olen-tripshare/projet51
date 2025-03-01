import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("fusionAuthToken"); // Remplace avec le bon storage
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.sub; // L'ID utilisateur est souvent dans "sub"
  } catch (error) {
    console.error("Erreur de décodage du token :", error);
    return null;
  }
};