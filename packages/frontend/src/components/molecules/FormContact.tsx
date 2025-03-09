import axios from "axios";
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const isFormValid = formData.name && formData.subject && formData.message;
  const isValidEmail = /\S+@\S+\.\S+/.test(formData.name);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail) {
      setEmailError("L'adresse e-mail est invalide.");
      return;
    } else {
      setEmailError(null);
    }

    try {
      setStatus("Envoi en cours...");

      const apiUrl =
        process.env.REACT_APP_API_URL ||
        "http://localhost:3001/contact/send-email";
      await axios.post(apiUrl, formData);

      setStatus("E-mail envoyé avec succès !");
      setFormData({ name: "", subject: "", message: "" });
    } catch (error) {
      console.error("Erreur d'envoi de l'e-mail :", error);
      setStatus("Échec de l'envoi de l'e-mail.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="p-6 rounded-lg shadow-lg w-[400px]"
        onSubmit={handleSubmit}
      >
        <label className="block font-semibold text-gray-700 mb-2">
          Adresse mail
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

        <label className="block font-semibold text-gray-700 mb-2">Sujet</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block font-semibold text-gray-700 mb-2">
          Message
        </label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        <button
          type="submit"
          disabled={!isFormValid || !isValidEmail}
          className={`mt-4 w-full py-3 rounded-lg transition ${
            isFormValid && isValidEmail
              ? "bg-button text-white "
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Envoyer
        </button>

        {status && <p className="mt-4 text-center text-sm">{status}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
