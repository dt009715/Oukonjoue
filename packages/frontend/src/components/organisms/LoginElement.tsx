import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.scss";

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

      if (data?.success) {
        localStorage.setItem("isAuthenticated", "true");
        alert("Connexion reussie !");
        navigate("/");
      } else {
        setError(data?.message || "Erreur de connexion.");
      }
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
    <main className="login-container">
      <h1 className="login-title">Connexion</h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="login-form"
        aria-label="Formulaire de connexion"
      >
        {error && <p className="login-error">{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Adresse e-mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-button">
          Se connecter
        </button>
      </form>
    </main>
  );
};

export default LoginElement;
