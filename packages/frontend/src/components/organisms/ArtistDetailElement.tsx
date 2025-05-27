import { useEffect, useState } from "react";
import Button from "../atoms/Button";

const API_URL = "http://localhost:3001/artistes";

interface Artist {
  id: number;
  name: string;
  genre: string;
  phone: string;
  address: string;
  mail: string;
  description: string;
  image: string;
}

const ArtistDetailElement = ({ artistId }: { artistId: number }) => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedArtist, setEditedArtist] = useState<Partial<Artist>>({});

  useEffect(() => {
    if (artistId) {
      fetchArtistDetails();
    }
  }, [artistId]);

  const fetchArtistDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/${artistId}`);
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const data = await response.json();
      setArtist(data);
    } catch (error) {
      console.error("Erreur dans fetchArtistDetails:", error);
    }
  };

  const handleDeleteArtist = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet artiste ?")) {
      try {
        const response = await fetch(`${API_URL}/deleteartist/${artistId}`, {
          method: "DELETE",
        });

        if (!response.ok)
          throw new Error("Erreur lors de la suppression de l'artiste.");

        alert("Artiste supprimé avec succès.");
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
      const response = await fetch(`${API_URL}/updateartist/${artistId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedArtist),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour.");

      alert("Artiste mis à jour !");
      setIsEditing(false);
      fetchArtistDetails();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la mise à jour.");
    }
  };

  if (!artist) {
    return <p>Chargement des détails de l'artiste...</p>;
  }

  console.log("isEditing", isEditing);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center p-6">
      <header className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg">
        {/*<img
    src={artist.image || "/default-image.jpg"}
    alt={artist.name}
    className="w-full max-w-4xl h-72 object-cover rounded-xl shadow-lg"
  />*/}
        <img
          src="/images/imageRodia.png"
          alt="Image de la Rodia"
          className="w-25 rounded-lg border border-gray-300 shadow-sm mx-auto"
        />
      </header>

      <section className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-md mt-6">
        <h1 className="text-3xl font-bold text-gray-900">{artist.name}</h1>
        <p className="text-gray-600 text-lg">Genre : {artist.genre}</p>
        <ul className="mt-4 space-y-2 text-gray-700">
          <li>
            <strong>Téléphone :</strong> {artist.phone}
          </li>
          <li>
            <strong>Adresse :</strong> {artist.address}
          </li>
          <li>
            <strong>Mail :</strong> {artist.mail}
          </li>
          <li>
            <strong>Description :</strong> {artist.description}
          </li>
        </ul>
      </section>

      <section className="pt-4 flex justify-center">
        <section className="flex gap-4 w-full max-w-md  h-12">
          <Button
            type="button"
            children="Supprimer l'artiste"
            onClick={handleDeleteArtist}
            className="w-1/2"
          ></Button>

          {!isEditing && (
            <Button
              type="button"
              children="modifier mes informations"
              onClick={() => {
                setEditedArtist(artist);
                setIsEditing(true);
              }}
              className="w-1/2"
            />
          )}
        </section>
      </section>

      {isEditing && (
        <form
          onSubmit={handleUpdateSubmit}
          className="mt-6 space-y-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow"
        >
          <input
            type="text"
            placeholder="Nom"
            value={editedArtist.name || ""}
            onChange={(e) =>
              setEditedArtist({ ...editedArtist, name: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Genre"
            value={editedArtist.genre || ""}
            onChange={(e) =>
              setEditedArtist({ ...editedArtist, genre: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Téléphone"
            value={editedArtist.phone || ""}
            onChange={(e) =>
              setEditedArtist({ ...editedArtist, phone: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Adresse"
            value={editedArtist.address || ""}
            onChange={(e) =>
              setEditedArtist({ ...editedArtist, address: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Mail"
            value={editedArtist.mail || ""}
            onChange={(e) =>
              setEditedArtist({ ...editedArtist, mail: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={editedArtist.description || ""}
            onChange={(e) =>
              setEditedArtist({
                ...editedArtist,
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
    </main>
  );
};

export default ArtistDetailElement;
