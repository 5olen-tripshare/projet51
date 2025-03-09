import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("fusionAuthToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.sub;
  } catch (error) {
    console.error("Erreur de décodage du token :", error);
    return null;
  }
};