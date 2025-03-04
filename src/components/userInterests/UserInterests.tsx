import { useEffect, useState } from "react";
import { fetchUserInterests, saveUserInterests } from "@/app/api/interests";

// 🔹 Définition des types des props
type UserInterestsProps = {
  userId: string;
  onUpdateInterests: (interests: string[]) => void;
};

const UserInterests: React.FC<UserInterestsProps> = ({ userId, onUpdateInterests }) => {
  // 🔹 Typage correct des états
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) return;
    const loadInterests = async () => {
      try {
        const userInterests = await fetchUserInterests(userId);
        setInterests(userInterests);
      } catch (error) {
        console.error("Erreur lors du chargement des intérêts :", error);
      } finally {
        setLoading(false);
      }
    };
    loadInterests();
  }, [userId]);

  const handleAddAndSaveInterest = async () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      const updatedInterests = [...interests, newInterest.trim()];
      setInterests(updatedInterests);
      setNewInterest("");
  
      try {
        await saveUserInterests(userId, updatedInterests);
        onUpdateInterests(updatedInterests);
      } catch (error) {
        console.error("Erreur lors de la sauvegarde :", error);
      }
    }
  };
  
  if (loading) return <p>Chargement des intérêts...</p>;

  return (
    <div>
      <label className="font-light block mb-2 text-lg" style={{ textTransform: "capitalize" }}>
        Vos intérêts :
      </label>
      <div className="flex gap-2 items-center">
        {/* Liste des intérêts */}
        <div>
          {interests.length === 0 ? (
            <p className="text-gray-500">Aucun intérêt ajouté.</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <li key={index} className="bg-gray-200 px-3 py-1 rounded">{interest}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Zone d'ajout d'intérêt */}
        <div className="flex gap-2 items-center justify-end w-full">
          <input
            type="text"
            placeholder="Ajoutez un intérêt"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            className="border border-gray-300 rounded p-2 w-60"
          />
          <button onClick={handleAddAndSaveInterest} className="bg-blue-500 text-white px-4 py-2 rounded">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInterests;
