import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/institutions";

interface Institution {
  id: number;
  name: string;
  genre: string;
  phone: string;
  address: string;
  mail: string;
  description: string;
  image: string;
}

interface Comment {
  id: number;
  content: string;
}

const InstitutionDetailElement = ({
  institutionId,
}: {
  institutionId: number;
}) => {
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (institutionId) {
      console.log("🆔 ID de l'institution reçu:", institutionId);
      fetchInstitutionIdDetails();
      fetchComments();
    }
  }, [institutionId]);

  const fetchInstitutionIdDetails = async () => {
    try {
      console.log(
        `🔍 Récupération des détails de l'artiste depuis ${API_URL}/${institutionId}`
      );

      const response = await fetch(`${API_URL}/${institutionId}`);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      console.log("✅ Réponse reçue:", response);
      console.log("📄 Content-Type:", response.headers.get("content-type"));

      const data = await response.json();
      console.log("🎨 Données de l'artiste:", data);

      setInstitution(data);
    } catch (error) {
      console.error("❌ Erreur dans fetchArtistDetails:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_URL}/comments/${institutionId}`);
      if (!response.ok)
        throw new Error("Erreur lors du chargement des commentaires.");
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const response = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ institutionId, content: newComment }),
      });

      if (!response.ok)
        throw new Error("Erreur lors de l'ajout du commentaire.");

      const addedComment = await response.json();
      setComments((prev) => [...prev, addedComment]);
      setNewComment("");
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  if (!institution) {
    return <p>Chargement des détails de l'artiste...</p>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-6">
      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg">
        <img
          src={institution.image || "/default-image.jpg"}
          alt={institution.name}
          className="w-full h-72 object-cover"
        />
      </div>

      <div className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-md mt-6">
        <h1 className="text-3xl font-bold text-gray-900">{institution.name}</h1>
        <p className="text-gray-600 text-lg">Genre : {institution.genre}</p>
        <div className="mt-4 space-y-2">
          <p>
            <span className="font-semibold">Téléphone :</span>{" "}
            {institution.phone}
          </p>
          <p>
            <span className="font-semibold">Adresse :</span>{" "}
            {institution.address}
          </p>
          <p>
            <span className="font-semibold">Mail :</span> {institution.mail}
          </p>
          <p>
            <span className="font-semibold">Description :</span>{" "}
            {institution.description}
          </p>
        </div>
      </div>

      <div className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-md mt-6">
        <h2 className="text-2xl font-bold text-gray-900">Commentaires</h2>
        <div className="mt-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="p-2 border-b border-gray-300">
                {comment.content}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Aucun commentaire pour le moment.</p>
          )}
        </div>

        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded-lg"
            placeholder="Ajoutez un commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleAddComment}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstitutionDetailElement;
