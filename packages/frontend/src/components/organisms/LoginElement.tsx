import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

      localStorage.setItem("token", data.token);
      alert("Connexion réussie !");
      navigate("/");
    } catch (err: any) {
      console.error("Erreur lors de la connexion:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Impossible de se connecter au serveur.");
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-semibold mb-8">Connexion</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4"
        aria-label="Formulaire de connexion"
      >
        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Adresse e-mail"
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            placeholder="Mot de passe"
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Se connecter
        </button>
      </form>
    </main>
  );
};

export default LoginElement;
