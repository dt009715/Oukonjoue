const ContactForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className=" p-6 rounded-lg shadow-lg w-[400px]">
        <label className="block font-semibold text-gray-700 mb-2">Nom</label>
        <input
          type="text"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block font-semibold text-gray-700 mb-2">Sujet</label>
        <input
          type="text"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block font-semibold text-gray-700 mb-2">
          Message
        </label>
        <textarea
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        <button
          type="submit"
          className="mt-4 w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
