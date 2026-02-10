import { useEffect, useState } from "react";
import Button from "../atoms/Button";

const API_URL = "http://localhost:3001/institutions";

interface Institution {
  id: string;
  name: string;
  category: string;
  phone: string;
  address: string;
  mail: string;
  description: string;
  image: string;
}

interface Comment {
  id: string;
  content: string;
}

const InstitutionDetailElement = ({
  institutionId,
}: {
  institutionId: string;
}) => {
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedInstitution, setEditedInstitution] = useState<
    Partial<Institution>
  >({});

  useEffect(() => {
    if (institutionId) {
      fetchInstitutionIdDetails();
      fetchComments();
      checkAuthentication();
    }
  }, [institutionId]);

  const checkAuthentication = () => {
    const authFlag = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(!!authFlag);
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
      alert("Vous devez etre connecte pour ajouter un commentaire.");
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
      window.confirm("Etes-vous sur de vouloir supprimer cette institution ?")
    ) {
      try {
        const response = await fetch(`${API_URL}/deleteinst/${institutionId}`, {
          method: "DELETE",
        });

        if (!response.ok)
          throw new Error("Erreur lors de la suppression de l'institution.");

        alert("Institution supprimee avec succes.");
        window.location.href = "/";
      } catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/updateinst/${institutionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedInstitution),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise a jour.");

      alert("Institution mise a jour !");
      setIsEditing(false);
      fetchInstitutionIdDetails();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la mise a jour.");
    }
  };

  if (!institution) {
    return <p>Chargement des details de l'institution...</p>;
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center p-6">
      <header className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg">
        <img
          src="/images/imageRodia.png"
          alt="Image de la rodia"
          className="w-25 rounded-lg border border-gray-300 shadow-sm"
        />
      </header>

      <section
        aria-labelledby="institution-infos"
        className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-md mt-6"
      >
        {!isEditing ? (
          <>
            <h1
              id="institution-infos"
              className="text-3xl font-bold text-gray-900"
            >
              {institution.name}
            </h1>
            <p className="text-gray-600 text-lg">
              Genre : {institution.category}
            </p>
            <address className="mt-4 not-italic space-y-2">
              <p>
                <strong>Telephone :</strong> {institution.phone}
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
          </>
        ) : (
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nom"
              value={editedInstitution.name ?? institution.name}
              onChange={(e) =>
                setEditedInstitution({
                  ...editedInstitution,
                  name: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Genre"
              value={editedInstitution.category ?? institution.category}
              onChange={(e) =>
                setEditedInstitution({
                  ...editedInstitution,
                  category: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Telephone"
              value={editedInstitution.phone ?? institution.phone}
              onChange={(e) =>
                setEditedInstitution({
                  ...editedInstitution,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Adresse"
              value={editedInstitution.address ?? institution.address}
              onChange={(e) =>
                setEditedInstitution({
                  ...editedInstitution,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Mail"
              value={editedInstitution.mail ?? institution.mail}
              onChange={(e) =>
                setEditedInstitution({
                  ...editedInstitution,
                  mail: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={editedInstitution.description ?? institution.description}
              onChange={(e) =>
                setEditedInstitution({
                  ...editedInstitution,
                  description: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-4">
              <Button type="submit">Enregistrer</Button>
              <Button type="button" onClick={() => setIsEditing(false)}>
                Annuler
              </Button>
            </div>
          </form>
        )}
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
              Vous devez etre connecte pour ajouter un commentaire.
            </p>
          )}
        </form>
      </section>

      <section className="pt-4 flex justify-center">
        {!isEditing && (
          <section className="flex gap-4 w-full max-w-md  h-12">
            <Button
              className="w-1/2 "
              onClick={() => {
                setEditedInstitution(institution);
                setIsEditing(true);
              }}
            >
              Modifier mes infos
            </Button>
            <Button className="w-1/2" onClick={handleDeleteInstitution}>
              Supprimer l'institution
            </Button>
          </section>
        )}
      </section>
    </main>
  );
};

export default InstitutionDetailElement;
