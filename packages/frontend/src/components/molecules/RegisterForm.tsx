import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("INSTITUTIONS");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    image: undefined,
    name: "",
    password: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    category: "",
    description: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name) newErrors.name = "Le nom est requis.";
    if (!formData.password) newErrors.password = "Le mot de passe est requis.";
    if (!formData.phone) newErrors.phone = "Le téléphone est requis.";
    if (!formData.email) newErrors.email = "L'email est requis.";
    if (!formData.city) newErrors.city = "La ville est requise.";
    if (!formData.category) newErrors.category = "Le genre est requis.";
    if (!formData.description)
      newErrors.description = "La description est requise.";
    if (type !== "ARTISTS" && !formData.address) {
      newErrors.address = "L'adresse est requise.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event: any) => {
    const { name, value, files } = event.target;

    if (name === "image") {
      const file = files ? files[0] : null;
      if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
        setFormData({ ...formData, image: file });
      } else {
        alert("Veuillez télécharger une image au format PNG ou JPEG");
      }
    } else if (name === "phone") {
      let rawNumber = value.replace(/\D/g, "");
      let formattedNumber = rawNumber.replace(/(\d{2})(?=\d)/g, "$1 ").trim();

      setFormData({ ...formData, phone: formattedNumber });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTypeChange = (e: any) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

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
        } else {
          console.error("Erreur lors du téléchargement de l'image");
        }
      } catch (error) {
        console.error("Erreur de communication avec le serveur", error);
      }
    }

    try {
      const url = "http://localhost:3001/auth/register";
      const dataToSend = {
        ...formData,
        mail: formData.email,
        type: type,
      };

      if (imageUrl) {
        dataToSend.image = imageUrl;
      } else {
        delete dataToSend.image;
      }

      if (type === "ARTISTS") {
        dataToSend.address = "";
      }

      const response = await axios.post(url, dataToSend, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Réponse serveur:", response.data);
      setSuccessMessage("Inscription réussie !");

      // ✅ Redirection après 2 secondes
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de l'envoi des données", error);
    }
  };

  return (
    <section className="full-page-form-section">
      <header>
        <h1 className="text-2xl font-semibold mb-4">Formulaire de Création</h1>
      </header>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md shadow-sm">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset className="mb-4">
          <legend className="text-sm font-medium text-gray-700">
            Que voulez-vous enregistrer :
          </legend>
          <select
            id="typeSelect"
            value={type}
            onChange={handleTypeChange}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="INSTITUTIONS">Institution</option>
            <option value="ARTISTS">Artiste</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
        </fieldset>

        <fieldset className="mb-4">
          <legend className="text-sm font-medium text-gray-700">Image :</legend>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg"
            onChange={handleChange}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </fieldset>

        <fieldset className="mb-4">
          <legend className="text-sm font-medium text-gray-700">
            Informations personnelles :
          </legend>

          <label htmlFor="name" className="block text-sm font-medium">
            Nom :
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <label htmlFor="password" className="block text-sm font-medium mt-4">
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <label htmlFor="phone" className="block text-sm font-medium mt-4">
            Téléphone :
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}

          <label htmlFor="email" className="block text-sm font-medium mt-4">
            Email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <label htmlFor="city" className="block text-sm font-medium mt-4">
            Ville :
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

          {type !== "ARTISTS" && (
            <>
              <label
                htmlFor="address"
                className="block text-sm font-medium mt-4"
              >
                Adresse :
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </>
          )}

          <label htmlFor="category" className="block text-sm font-medium mt-4">
            Genre :
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}

          <label
            htmlFor="description"
            className="block text-sm font-medium mt-4"
          >
            Description :
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </fieldset>

        <button
          type="submit"
          className="w-full bg-button text-white px-4 py-2 rounded-md mt-4"
        >
          S'inscrire
        </button>
      </form>
    </section>
  );
};

export default RegisterForm;
