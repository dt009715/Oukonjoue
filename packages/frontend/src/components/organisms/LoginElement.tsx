import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import de useNavigate

const LoginElement = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!mail || !password) {
      setError("L'email et le mot de passe sont requis.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3001/auth/login",
        { mail, password },
        { withCredentials: true }
      );

      console.log("Réponse du backend:", data);
      localStorage.setItem("token", data.token);
      alert("Connexion réussie !");
      navigate("/");
    } catch (err: any) {
      console.error("Erreur lors de la connexion:", err);
      if (err.response) {
        const { message } = err.response.data;
        setError(message || "Une erreur inconnue est survenue.");
      } else {
        setError("Impossible de se connecter au serveur.");
      }
    }
  };
  return (
    <div className="relative flex flex-col w-full h-full pt-10 items-center justify-between pb-8">
      <h1 className="font-semibold text-3xl pb-12">Connexion</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-background p-6 rounded shadow-md w-80 h-full"
      >
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-button text-white p-2 rounded">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginElement;
