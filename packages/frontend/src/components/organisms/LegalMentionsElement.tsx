import React from "react";

const LegalMentionsElement: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Mentions Légales
      </h1>

      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            1. Identification
          </h2>
          <p className="text-lg text-gray-700">
            Le site <strong className="text-blue-600">Oukonjoue.com</strong> est
            édité par :<br />
            <strong className="text-gray-900">Oukonjoue?</strong>
            <br />
            Contact :{" "}
            <a
              href="mailto:oukonjoue@gmail.com"
              className="text-blue-600 hover:underline"
            >
              oukonjoue@gmail.com
            </a>
            <br />
            Ce site n'est pas une entreprise, il est édité à titre personnel.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            2. Hébergeur du site
          </h2>
          <p className="text-lg text-gray-700">
            Le site est hébergé par :<br />
            <strong className="text-gray-900">Nom de l'hébergeur</strong>
            <br />
            Adresse : 123 Rue Hébergeur, 75000 Paris, France
            <br />
            Contact :{" "}
            <a
              href="mailto:support@hebergeur.com"
              className="text-blue-600 hover:underline"
            >
              support@hebergeur.com
            </a>
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            3. Cookies
          </h2>
          <p className="text-lg text-gray-700">
            Ce site utilise des cookies pour améliorer l'expérience utilisateur.
            Pour plus d'informations, consultez notre{" "}
            <a
              href="/politique-des-cookies"
              className="text-blue-600 hover:underline"
            >
              Politique de cookies
            </a>
            .
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            4. Responsabilité
          </h2>
          <p className="text-lg text-gray-700">
            L'éditeur du site ne peut être tenu responsable des erreurs ou des
            omissions dans le contenu présenté sur le site.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            5. Loi applicable
          </h2>
          <p className="text-lg text-gray-700">
            Les présentes mentions légales sont régies par la loi française.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalMentionsElement;
