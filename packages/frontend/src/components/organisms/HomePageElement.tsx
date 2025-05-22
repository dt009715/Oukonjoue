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
    <main className="px-8">
      <section className="pt-10" aria-labelledby="objectif-titre">
        <h1 id="objectif-titre" className="font-semibold pb-6 text-2xl">
          Objectif du site
        </h1>
        <p className="text-justify">
          Nous sommes Valentin et Diego, deux musiciens passionnés qui ont
          décidé de créer un site pour aider les groupes amateurs à trouver des
          lieux pour jouer et se faire connaître. Ayant nous-mêmes vécu les
          difficultés de trouver des concerts et des événements où jouer, nous
          avons voulu simplifier cette recherche pour d’autres groupes...
        </p>
      </section>

      <section className="pt-10" aria-labelledby="institutions-titre">
        <h2 id="institutions-titre" className="font-semibold pb-6 text-2xl">
          Les Institutions
        </h2>
        <div className="flex sm:flex-col justify-center gap-10">
          {institutions.length > 0 ? (
            institutions.map((institution) => (
              <article key={institution.id}>
                <Cards
                  {...institution}
                  type="institutions"
                  id={institution.id}
                />
              </article>
            ))
          ) : (
            <p>Aucune institution trouvée.</p>
          )}
        </div>
      </section>

      <section className="pt-10" aria-labelledby="artistes-titre">
        <h2 id="artistes-titre" className="font-semibold pb-6 text-2xl">
          Les Artistes
        </h2>
        <div className="flex sm:flex-col justify-center gap-10">
          {artists.length > 0 ? (
            artists.map((artist) => (
              <article key={artist.id}>
                <Cards {...artist} type="artistes" id={artist.id} />
              </article>
            ))
          ) : (
            <p>Aucun artiste trouvé.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default HomePageElement;
