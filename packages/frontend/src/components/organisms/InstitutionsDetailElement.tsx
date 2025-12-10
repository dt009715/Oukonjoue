import { useEffect, useState } from "react";
import Button from "../atoms/Button";

const API_URL = "http://localhost:3001/institutions";
const AUTH_API_URL = "http://localhost:3001/auth";

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
  id: number | string;
  content: string;
  createdAt?: string;
  author?: {
    id: string;
    email: string;
  };
}

interface User {
  id: string;
  email: string;
  role: string;
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  // Nouveaux états pour l'édition
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

  const checkAuthentication = async () => {
    // Vérifier d'abord dans localStorage
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    if (!token) {
      setIsAuthenticated(false);
      setCurrentUser(null);
      return;
    }

    // Vérifier via l'API que le token est toujours valide
    try {
      const response = await fetch(`${AUTH_API_URL}/check`, {
        credentials: "include", // Inclure les cookies
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.user) {
          setIsAuthenticated(true);
          setCurrentUser(data.data.user);
        } else {
          setIsAuthenticated(false);
          setCurrentUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("authToken");
        }
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'authentification:", error);
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
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
      const response = await fetch(`http://localhost:3001/api/comments/${institutionId}`);
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
      setError("Vous devez être connecté pour ajouter un commentaire.");
      return;
    }

    setError("");

    try {
      const response = await fetch(`http://localhost:3001/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important : inclure les cookies pour l'authentification
        body: JSON.stringify({ 
          institutionId: institutionId.toString(), 
          content: newComment 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'ajout du commentaire.");
      }

      const addedComment = await response.json();
      setComments((prev) => [addedComment, ...prev]); // Ajouter au début de la liste
      setNewComment("");
      setError("");
    } catch (error: any) {
      console.error("Erreur:", error);
      setError(error.message || "Erreur lors de l'ajout du commentaire.");
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

      if (!response.ok) throw new Error("Erreur lors de la mise à jour.");

      alert("Institution mise à jour !");
      setIsEditing(false);
      fetchInstitutionIdDetails();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la mise à jour.");
    }
  };

  if (!institution) {
    return <div>Chargement...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-md">
        {!isEditing ? (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {institution.name}
            </h1>
            {institution.image && (
              <img
                src={institution.image}
                alt={institution.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <p className="text-gray-700 mb-2">
              <strong>Genre:</strong> {institution.genre}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Téléphone:</strong> {institution.phone}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Adresse:</strong> {institution.address}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> {institution.mail}
            </p>
            <p className="text-gray-700 mt-4">{institution.description}</p>
          </div>
        ) : (
          <form onSubmit={handleUpdateSubmit}>
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
              value={editedInstitution.genre ?? institution.genre}
              onChange={(e) =>
                setEditedInstitution({
                  ...editedInstitution,
                  genre: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Téléphone"
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
          className="text-2xl font-bold text-gray-900 mb-4"
        >
          Commentaires
        </h2>

        <div className="mt-4 space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <article
                key={comment.id}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    {comment.author && (
                      <p className="text-sm font-semibold text-gray-700">
                        {comment.author.email}
                      </p>
                    )}
                    {comment.createdAt && (
                      <p className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                  {currentUser && comment.author && currentUser.id === comment.author.id && (
                    <button
                      className="text-red-500 text-sm hover:text-red-700"
                      onClick={async () => {
                        if (window.confirm("Supprimer ce commentaire ?")) {
                          try {
                            const response = await fetch(
                              `http://localhost:3001/api/comments/${comment.id}`,
                              {
                                method: "DELETE",
                                credentials: "include",
                              }
                            );
                            if (response.ok) {
                              setComments((prev) =>
                                prev.filter((c) => c.id !== comment.id)
                              );
                            }
                          } catch (error) {
                            console.error("Erreur lors de la suppression:", error);
                          }
                        }
                      }}
                    >
                      Supprimer
                    </button>
                  )}
                </div>
                <p className="text-gray-800">{comment.content}</p>
              </article>
            ))
          ) : (
            <p className="text-gray-500">Aucun commentaire pour le moment.</p>
          )}
        </div>

        {isAuthenticated ? (
          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddComment();
            }}
          >
            {error && (
              <p className="text-red-500 text-sm mb-2" role="alert">
                {error}
              </p>
            )}
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Ajoutez un commentaire en tant que ${currentUser?.email}...`}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
            />
            <button
              type="submit"
              className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!newComment.trim()}
            >
              Publier le commentaire
            </button>
          </form>
        ) : (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              Vous devez être connecté pour ajouter un commentaire.{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Se connecter
              </a>
            </p>
          </div>
        )}
      </section>

      <section className="pt-4 flex justify-center">
        {!isEditing && (
          <section className="flex gap-4 w-full max-w-md h-12">
            <Button
              className="w-1/2"
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
