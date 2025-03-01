import { useEffect, useState } from "react";
import { fetchUserInterests, saveUserInterests } from "@/app/api/interests";

const UserInterests = ({ userId, onUpdateInterests }) => {
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const loadInterests = async () => {
      const userInterests = await fetchUserInterests(userId);
      setInterests(userInterests);
      setLoading(false);
    };
    loadInterests();
  }, [userId]);

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const handleSave = async () => {
    await saveUserInterests(userId, interests);
    onUpdateInterests(interests);
  };

  if (loading) return <p>Chargement des intérêts...</p>;

  return (
    <div>
      {/* Titre */}
      <label className="font-light block mb-2 text-lg" style={{ textTransform: "capitalize" }}>
        Vos intérêts :
      </label>

      {/* Zone d'ajout d'intérêt */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ajoutez un intérêt"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          className="border border-gray-300 rounded p-2 w-60"
        />
        <button onClick={handleAddInterest} className="bg-blue-500 text-white px-4 py-2 rounded">
          Ajouter
        </button>
      </div>

      {/* Liste des intérêts */}
      <div className="mt-4">
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

      {/* Bouton "Sauvegarder" aligné à droite et centré verticalement */}
      <div className="flex justify-between mt-6">
        <button onClick={handleSave} className="bg-green-500 text-white px-6 py-2 rounded">
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default UserInterests;
