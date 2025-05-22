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
    }
    setEmailError(null);

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
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 rounded-lg shadow-lg"
      aria-labelledby="form-title"
      aria-describedby="form-status"
    >
      <h2 id="form-title" className="text-xl font-bold mb-4 text-center">
        Formulaire de contact
      </h2>

      <label className="block mb-2 font-semibold text-gray-700" htmlFor="name">
        Adresse mail
      </label>
      <input
        type="email"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring-2"
        aria-describedby={emailError ? "email-error" : undefined}
        required
      />
      {emailError && (
        <p id="email-error" className="text-red-500 text-sm mb-2" role="alert">
          {emailError}
        </p>
      )}

      <label
        className="block mb-2 font-semibold text-gray-700"
        htmlFor="subject"
      >
        Sujet
      </label>
      <input
        type="text"
        id="subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring-2"
        required
      />

      <label
        className="block mb-2 font-semibold text-gray-700"
        htmlFor="message"
      >
        Message
      </label>
      <textarea
        id="message"
        name="message"
        rows={4}
        value={formData.message}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring-2"
        required
      ></textarea>

      <button
        type="submit"
        disabled={!isFormValid || !isValidEmail}
        className={`mt-4 w-full py-3 rounded-lg transition font-semibold ${
          isFormValid && isValidEmail
            ? "bg-button text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Envoyer
      </button>

      {status && (
        <p id="form-status" className="mt-4 text-center text-sm" role="status">
          {status}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
