import { useEffect, useState } from "react";
import { getArtists } from "../../utils/api";
import FilterButton from "../atoms/FilterButton";
import Cards from "../molecules/Cards";
interface Artists {
  image: string;
  name: string;
  phone: string;
  mail: string;
  address: string;
  genre: string;
  description: string;
  link: string;
}

const ArtistsPageElement = () => {
  const [cardDataList, setCardDataList] = useState<Artists[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArtists();

        if (!Array.isArray(data)) {
          throw new Error("Les données récupérées ne sont pas un tableau !");
        }

        const formattedData: Artists[] = data.map((artist) => ({
          image: artist.image || "default.jpg",
          name: artist.name || "Nom inconnu",
          phone: artist.phone || "Non disponible",
          mail: artist.mail || "Non disponible",
          address: artist.address || "Adresse inconnue",
          genre: artist.genre || "Genre inconnu",
          description: artist.description || "Aucune description",
          link: artist.id.toString(),
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
  return (
    <div className="h-full">
      <div className="h-full">
        <div className="relative h-full flex w-full pt-10 items-center justify-between pb-8">
          <h1 className="font-semibold text-3xl absolute left-1/2 transform -translate-x-1/2">
            Artistes
          </h1>

          <div className="ml-auto pr-8">
            <FilterButton onClick={() => {}} />
          </div>
        </div>
        <div className="grid pl-8 grid-cols-3 gap-10 justify-center">
          {cardDataList.map((cardData, index) => (
            <Cards
              key={index}
              {...cardData}
              type="artistes"
              id={cardData.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistsPageElement;
