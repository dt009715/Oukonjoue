import axios from "axios";
import { useState } from "react";

const RegisterForm = () => {
  const [type, setType] = useState("institution"); // "institution" ou "artist"
  const [formData, setFormData] = useState({
    image: "default.jpg",
    title: "Nom inconnu",
    phone: "Non disponible",
    mail: "Non disponible",
    address: "Adresse inconnue",
    genre: "Genre inconnu",
    description: "Aucune description",
    artisteAdditionalField: "Info artiste spécifique",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTypeChange = (e: any) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const url = "http://localhost:3001/auth/register"; // L'URL de votre API
      const dataToSend = {
        ...formData,
        type: type, // Ajoute le type pour savoir si c'est un artiste ou une institution
      };

      const response = await axios.post(url, dataToSend);
      console.log("Données envoyées avec succès:", response.data);
      // Vous pouvez rediriger ou afficher un message de confirmation
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
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
          <option value="institution">Institution</option>
          <option value="artist">Artiste</option>
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
            type="text"
            id="image"
            name="image"
            value={formData.image}
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
            id="title"
            name="title"
            value={formData.title}
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
            value={formData.phone}
            onChange={handleChange}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="mail"
            className="block text-sm font-medium text-gray-700"
          >
            Email :
          </label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={formData.mail}
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
            value={formData.description}
            onChange={handleChange}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {type === "artist" && (
          <div className="mb-4">
            <label
              htmlFor="artisteAdditionalField"
              className="block text-sm font-medium text-gray-700"
            >
              Champ supplémentaire pour Artiste :
            </label>
            <input
              type="text"
              id="artisteAdditionalField"
              name="artisteAdditionalField"
              value={formData.artisteAdditionalField}
              onChange={handleChange}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
