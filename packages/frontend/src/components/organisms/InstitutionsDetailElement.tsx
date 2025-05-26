import { useEffect, useState } from "react";
import Button from "../atoms/Button";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (institutionId) {
      fetchInstitutionIdDetails();
      fetchComments();
      checkAuthentication();
    }
  }, [institutionId]);

  const checkAuthentication = () => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  };

  const fetchInstitutionIdDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/${institutionId}`);
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const data = await response.json();
      setInstitution(data);
    } catch (error) {
      console.error("Erreur dans fetchInstitutionIdDetails:", error);
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

    if (!isAuthenticated) {
      alert("Vous devez être connecté pour ajouter un commentaire.");
      return;
    }

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

  const handleDeleteInstitution = async () => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette institution ?")
    ) {
      try {
        const response = await fetch(`${API_URL}/deleteinst/${institutionId}`, {
          method: "DELETE",
        });

        if (!response.ok)
          throw new Error("Erreur lors de la suppression de l'institution.");

        alert("Institution supprimée avec succès.");
        window.location.href = "/";
      } catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };

  if (!institution) {
    return <p>Chargement des détails de l'institution...</p>;
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center p-6">
      <header className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg">
        <img
          src={institution.image || "/default-image.jpg"}
          alt={institution.name}
          className="w-full h-72 object-cover"
        />
      </header>

      <section
        aria-labelledby="institution-infos"
        className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-md mt-6"
      >
        <h1 id="institution-infos" className="text-3xl font-bold text-gray-900">
          {institution.name}
        </h1>
        <p className="text-gray-600 text-lg">Genre : {institution.genre}</p>
        <address className="mt-4 not-italic space-y-2">
          <p>
            <strong>Téléphone :</strong> {institution.phone}
          </p>
          <p>
            <strong>Adresse :</strong> {institution.address}
          </p>
          <p>
            <strong>Mail :</strong> {institution.mail}
          </p>
        </address>
        <article className="mt-4">
          <p>
            <strong>Description :</strong> {institution.description}
          </p>
        </article>
      </section>

      <section
        aria-labelledby="commentaires-titre"
        className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-md mt-6"
      >
        <h2
          id="commentaires-titre"
          className="text-2xl font-bold text-gray-900"
        >
          Commentaires
        </h2>

        <div className="mt-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <article
                key={comment.id}
                className="p-2 border-b border-gray-300"
              >
                {comment.content}
              </article>
            ))
          ) : (
            <p className="text-gray-500">Aucun commentaire pour le moment.</p>
          )}
        </div>

        <form
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddComment();
          }}
        >
          <textarea
            className="w-full p-2 border rounded-lg"
            placeholder="Ajoutez un commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!isAuthenticated}
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-button text-white rounded-lg hover:bg-blue-700"
            disabled={!isAuthenticated}
          >
            Ajouter
          </button>
          {!isAuthenticated && (
            <p className="text-red-500 text-sm mt-2">
              Vous devez être connecté pour ajouter un commentaire.
            </p>
          )}
        </form>
      </section>

      <footer className="pt-4">
        <Button
          children="supprimer mon compte"
          onClick={handleDeleteInstitution}
        />
      </footer>
    </main>
  );
};

export default InstitutionDetailElement;
