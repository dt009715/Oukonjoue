import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const isFormValid = formData.name && formData.subject && formData.message;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="p-6 rounded-lg shadow-lg w-[400px]">
        <label className="block font-semibold text-gray-700 mb-2">Nom</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

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
          disabled={!isFormValid}
          className={`mt-4 w-full py-3 rounded-lg transition ${
            isFormValid
              ? "bg-button text-white hover:bg-button"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
