import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.scss";

const LoginElement = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

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

      console.log(data);

      // Le backend retourne { success, data: { token, user }, message }
      if (data?.success && data?.data?.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("authToken", data.data.token); // Pour compatibilité avec autres composants
        setSuccess(data.message || "Connexion réussie !");
        
        // Rediriger après un court délai pour voir le message de succès
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(data?.message || "Erreur de connexion : token manquant.");
      }
    } catch (err: any) {
      console.error("Erreur lors de la connexion:", err);
      // Le backend retourne { success: false, message: "..." }
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
        {error && <p className="login-error" role="alert">{error}</p>}
        {success && <p className="login-success" role="status">{success}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text" // <- Change "email" to "text" to bypass browser validation
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
