import { useEffect, useState } from "react";

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

interface Comment {
  id: number;
  content: string;
}

const ArtistDetailElement = ({ artistId }: { artistId: number }) => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (artistId) {
      fetchArtistDetails();
      fetchComments();
      checkAuthentication();
    }
  }, [artistId]);

  const checkAuthentication = () => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  };

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

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_URL}/comments/${artistId}`);
      if (!response.ok)
        throw new Error("Erreur lors du chargement des commentaires.");
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  if (!artist) {
    return <p>Chargement des détails de l'artiste...</p>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-6">
      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg">
        <img
          src={artist.image || "/default-image.jpg"}
          alt={artist.name}
          className="w-full h-72 object-cover"
        />
      </div>

      <div className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-md mt-6">
        <h1 className="text-3xl font-bold text-gray-900">{artist.name}</h1>
        <p className="text-gray-600 text-lg">Genre : {artist.genre}</p>
        <div className="mt-4 space-y-2">
          <p>
            <span className="font-semibold">Téléphone :</span> {artist.phone}
          </p>
          <p>
            <span className="font-semibold">Adresse :</span> {artist.address}
          </p>
          <p>
            <span className="font-semibold">Mail :</span> {artist.mail}
          </p>
          <p>
            <span className="font-semibold">Description :</span>{" "}
            {artist.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetailElement;
