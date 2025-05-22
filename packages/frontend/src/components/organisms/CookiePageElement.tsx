import React from "react";

const CookiePageElement: React.FC = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <header>
        <h1 className="text-3xl font-semibold mb-6">Politique des Cookies</h1>
      </header>

      <article>
        <section className="mb-6">
          <p>
            Cette politique de cookies vous explique comment nous utilisons les
            cookies et technologies similaires lorsque vous visitez notre site
            web. En utilisant notre site, vous acceptez l'utilisation des
            cookies conformément à cette politique.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            1. Qu'est-ce qu'un cookie ?
          </h2>
          <p>
            Un <strong>cookie</strong> est un petit fichier texte que nous
            plaçons sur votre appareil lorsque vous visitez notre site web. Les
            cookies permettent à notre site de se souvenir de certaines
            informations vous concernant, comme vos préférences de navigation,
            pour améliorer votre expérience utilisateur.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            2. Pourquoi utilisons-nous des cookies ?
          </h2>
          <ul className="list-disc pl-6">
            <li>
              Améliorer votre expérience utilisateur en mémorisant vos
              préférences de navigation.
            </li>
            <li>
              Analyser la performance du site pour nous aider à améliorer notre
              service.
            </li>
            <li>Afficher des publicités adaptées à vos intérêts.</li>
            <li>Faciliter le partage de contenu via les réseaux sociaux.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            3. Types de cookies utilisés
          </h2>
          <ul className="list-disc pl-6">
            <li>
              <strong>Cookies strictement nécessaires :</strong> essentiels pour
              que le site fonctionne correctement.
            </li>
            <li>
              <strong>Cookies de performance :</strong> recueillent des infos
              pour améliorer le site.
            </li>
            <li>
              <strong>Cookies fonctionnels :</strong> mémorisent vos
              préférences.
            </li>
            <li>
              <strong>Cookies publicitaires :</strong> affichent des publicités
              ciblées.
            </li>
            <li>
              <strong>Cookies de réseaux sociaux :</strong> facilitent
              l’intégration de fonctions sociales.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            4. Comment gérer les cookies ?
          </h2>
          <p>
            Vous pouvez <strong>contrôler les cookies</strong> en modifiant les
            paramètres de votre navigateur. Certains outils tiers peuvent aussi
            vous aider à gérer vos préférences.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">5. Consentement</h2>
          <p>
            En poursuivant votre navigation sur notre site après l'affichage du
            bandeau d'information, vous acceptez notre utilisation des cookies.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            6. Partage des informations avec des tiers
          </h2>
          <p>
            Des informations collectées peuvent être partagées avec nos{" "}
            <strong>partenaires tiers</strong> pour personnaliser la publicité
            ou analyser le trafic.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            7. Durée de conservation des cookies
          </h2>
          <p>
            Les cookies peuvent être <strong>de session</strong> ou{" "}
            <strong>persistants</strong>, avec une durée allant de 30 à 365
            jours.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            8. Liens vers d'autres sites
          </h2>
          <p>
            Nous ne sommes pas responsables des politiques de cookies des sites
            externes accessibles via des liens depuis notre site.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            9. Modifications de la politique de cookies
          </h2>
          <p>
            Nous nous réservons le droit de modifier cette politique à tout
            moment. Vérifiez régulièrement cette page pour rester informé.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">10. Contact</h2>
          <p>
            Pour toute question, contactez-nous à l’adresse suivante :{" "}
            <a
              href="mailto:Oukonjoue@gmail.com"
              className="underline text-blue-600"
            >
              Oukonjoue@gmail.com
            </a>
          </p>
        </section>
      </article>
    </main>
  );
};

export default CookiePageElement;
