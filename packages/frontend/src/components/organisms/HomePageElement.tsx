import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "../molecules/Cards";

interface Artists {
  id: string;
  image: string;
  name: string;
  phone: string;
  mail: string;
  address: string;
  genre: string;
  description: string;
  link: string;
}

interface Institution {
  id: string;
  name: string;
  genre: string;
  phone: string;
  address: string;
  mail: string;
  description: string;
  image: string;
}

const HomePageElement = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [artists, setArtists] = useState<Artists[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [institutionsRes, artistsRes] = await Promise.all([
          axios.get("http://localhost:3001/institutions"),
          axios.get("http://localhost:3001/artistes"),
        ]);

        setInstitutions(institutionsRes.data.slice(0, 3));
        setArtists(artistsRes.data.slice(0, 3));
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Chargement en cours...</p>;
  }

  return (
    <div>
      <div className="pt-10 px-8">
        <h1 className="font-semibold pb-6 text-2xl">Objectif du site</h1>
        <p className="text-justify ">
          Nous sommes Valentin et Diego, deux musiciens passionnés qui ont
          décidé de créer un site pour aider les groupes amateurs à trouver des
          lieux pour jouer et se faire connaître. Ayant nous-mêmes vécu les
          difficultés de trouver des concerts et des événements où jouer, nous
          avons voulu simplifier cette recherche pour d’autres groupes en
          offrant une plateforme où ils peuvent facilement trouver des salles de
          concert, des bars, des festivals, et bien d’autres lieux prêts à
          accueillir des artistes dans leur région. Notre objectif est de donner
          aux groupes amateurs les moyens de se produire et d'augmenter leur
          visibilité sans se soucier des barrières administratives ou
          logistiques. Grâce à notre site, chaque groupe peut découvrir des
          opportunités près de chez eux et ainsi se concentrer sur ce qui compte
          vraiment : la musique. Nous croyons en la force de la scène locale et
          voulons aider les artistes à se connecter, à grandir et à faire
          entendre leur musique là où ils sont les plus susceptibles de toucher
          leur public.
        </p>
      </div>

      <div className="pt-8 px-8">
        <h1 className="font-semibold pb-6 text-2xl">Les Institutions</h1>
        <div className="flex sm:flex-col justify-center gap-10">
          {institutions.length > 0 ? (
            institutions.map((institution) => (
              <Cards
                key={institution.id}
                {...institution}
                type="institutions"
                id={institution.id}
              />
            ))
          ) : (
            <p>Aucune institution trouvée.</p>
          )}
        </div>
      </div>

      <div className="pt-8 px-8">
        <h1 className="font-semibold pb-6 text-2xl">Les Artistes</h1>
        <div className="flex sm:flex-col justify-center gap-10">
          {artists.length > 0 ? (
            artists.map((artist) => (
              <Cards
                key={artist.id}
                {...artist}
                type="artistes"
                id={artist.id}
              />
            ))
          ) : (
            <p>Aucun artiste trouvé.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePageElement;
