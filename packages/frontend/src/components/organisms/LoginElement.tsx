import axios from "axios";
import { useState } from "react";

const LoginElement = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      alert("Connexion réussie !");
    } catch (err) {
      setError("Échec de la connexion");
    }
  };
  return (
    <div className="relative flex flex-col w-full h-full pt-10 items-center justify-between pb-8">
      <h1 className="font-semibold text-3xl  left-1/2 transform -translate-x-1/2 pb-12">
        Connexion
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-background p-6 rounded shadow-md w-80 h-full"
      >
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
