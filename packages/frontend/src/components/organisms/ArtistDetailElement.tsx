import { useState } from "react";

const ArtistDetailElement = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Image principale */}
      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg">
        <img
          src="/band-image.jpg"
          alt="The Electric Waves"
          className="w-full h-72 object-cover"
        />
      </div>

      {/* Détails du groupe */}
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

      {/* Section Commentaires */}
      <div className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-md mt-6">
        <h2 className="text-2xl font-bold text-gray-900">Commentaires</h2>
        <div className="mt-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="p-2 border-b border-gray-300">
                {comment}
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
export default ArtistDetailElement;
