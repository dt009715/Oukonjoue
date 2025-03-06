import axios from "axios";
import { useState } from "react";

const RegisterForm = () => {
  const [type, setType] = useState("INSTITUTIONS"); // "institution" ou "artist"
  const [formData, setFormData] = useState({
    image: undefined,
    name: "",
    password: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    genre: "",
    description: "",
  });

  const handleChange = (event: any) => {
    const { name, value, files } = event.target;

    if (name === "image") {
      // Vérifie si un fichier est sélectionné et s'il est valide
      const file = files ? files[0] : null;
      if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
        setFormData({
          ...formData,
          image: file,
        });
      } else {
        alert("Veuillez télécharger une image au format PNG ou JPEG");
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleTypeChange = (e: any) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    console.log("Bouton cliqué, handleSubmit exécuté");
    e.preventDefault();

    let imageUrl = undefined;

    if (formData.image) {
      const formDataToSend = new FormData();
      formDataToSend.append("image", formData.image);

      try {
        const response = await fetch("/upload", {
          method: "POST",
          body: formDataToSend,
        });

        if (response.ok) {
          const result = await response.json();
          imageUrl = result.imageUrl;
          console.log("Image téléchargée avec succès :", imageUrl);
        } else {
          console.error("Erreur lors du téléchargement de l'image");
        }
      } catch (error) {
        console.error("Erreur de communication avec le serveur", error);
      }
    } else {
      console.log("Aucune image sélectionnée");
    }

    try {
      const url = "http://localhost:3001/auth/register";
      const dataToSend: any = {
        ...formData,
        mail: formData.email,
        type: type,
        image: formData.image ? formData.image : "",
      };

      if (imageUrl) {
        dataToSend.image = imageUrl;
      } else {
        delete dataToSend.image;
      }

      console.log("Données envoyées :", dataToSend);

      const response = await axios.post(url, dataToSend, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Données envoyées avec succès:", response.data);
    } catch (error: any) {
      if (error.response) {
        console.error("Erreur API :", error.response.data);
        if (error.response.data.data) {
          error.response.data.data.forEach((err: any) =>
            console.error(`Champ invalide: ${err.message}`)
          );
        }
      } else {
        console.error("Erreur lors de l'envoi des données:", error);
      }
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Formulaire de Création</h1>

      <div className="mb-4">
        <label
          htmlFor="typeSelect"
          className="block text-sm font-medium text-gray-700"
        >
          Que voulez-vous enregistrer :
        </label>
        <select
          id="typeSelect"
          value={type}
          onChange={handleTypeChange}
          className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="INSTITUTIONS">Institution</option>
          <option value="ARTISTS">Artiste</option>
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image :
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg" // Restreint aux formats PNG et JPEG
            onChange={handleChange}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Nom :
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Entrez votre nom"
            value={formData.name || ""}
            onChange={handleChange}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            value={formData.password || ""}
            onChange={handleChange}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Téléphone :
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Entrez votre numéro"
            value={formData.phone}
            onChange={handleChange}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Entrez votre mail"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            Ville :
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Entrez la ville ou vous êtes situé"
            value={formData.city}
            onChange={handleChange}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Adresse :
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Entrez votre adresse"
            value={formData.address}
            onChange={handleChange}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700"
          >
            Genre :
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="Entrez le type d'institution"
            value={formData.genre}
            onChange={handleChange}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description :
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description de votre institutions"
            value={formData.description}
            onChange={handleChange}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-button font-semibold text-white px-4 py-2 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
