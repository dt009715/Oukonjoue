import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/api/comments";

interface Comment {
  id: number;
  content: string;
}

const InstitutionsDetailElement = ({ artistId }: { artistId: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (artistId) {
      fetchComments();
    }
  }, [artistId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_URL}/${artistId}`);
      if (!response.ok)
        throw new Error("Erreur lors du chargement des commentaires.");
      const data = await response.json();
      setComments(data); //
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistId, content: newComment }),
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg">
        <img
          src="/band-image.jpg"
          alt="The Electric Waves"
          className="w-full h-72 object-cover"
        />
      </div>

      <div className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-md mt-6">
        <h1 className="text-3xl font-bold text-gray-900">The Electric Waves</h1>
        <p className="text-gray-600 text-lg">Genre : Rock</p>
        <div className="mt-4 space-y-2">
          <p>
            <span className="font-semibold">Téléphone :</span> +33 6 12 34 56 78
          </p>
          <p>
            <span className="font-semibold">Adresse :</span> 12 Rue des
            Concerts, Paris
          </p>
          <p>
            <span className="font-semibold">Mail :</span>{" "}
            contact@electricwaves.com
          </p>
          <p>
            <span className="font-semibold">Description :</span> Un groupe de
            rock innovant avec des sons électrisants.
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

export default InstitutionsDetailElement;
