import React, { useEffect, useState } from "react";
import { getInstitutions } from "../../utils/api";
import FilterButton from "../atoms/FilterButton";
import Cards from "../molecules/Cards";

interface Institution {
  image: string;
  title: string;
  phone: string;
  mail: string;
  address: string;
  genre: string;
  description: string;
  link: string;
}

const InstitutionElement: React.FC = () => {
  const [cardDataList, setCardDataList] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInstitutions();

        if (!Array.isArray(data)) {
          throw new Error("Les données récupérées ne sont pas un tableau !");
        }

        const formattedData: Institution[] = data.map((institution) => ({
          image: institution.image || "",
          title: institution.name || "Nom inconnu",
          phone: institution.phone || "Non disponible",
          mail: institution.mail || "Non disponible",
          address: institution.address || "Adresse inconnue",
          genre: institution.genre || "Genre inconnu",
          description: institution.description || "Aucune description",
          link: institution.id.toString() || "#",
        }));

        setCardDataList(formattedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <div className="relative flex w-full pt-10 items-center justify-between pb-8">
        <h1 className="font-semibold text-3xl absolute left-1/2 transform -translate-x-1/2">
          Institutions
        </h1>

        <div className="ml-auto pr-8">
          <FilterButton onClick={() => {}} />
        </div>
      </div>
      <div className="grid grid-cols-1 pl-8 grid-cols-2 grid-cols-3 gap-6 p-4">
        {cardDataList.map((cardData, index) => (
          <Cards
            key={index}
            {...cardData}
            type="institutions"
            id={cardData.link}
          />
        ))}
      </div>
    </div>
  );
};

export default InstitutionElement;
