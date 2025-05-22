import { useEffect, useState } from "react";
import { getArtists } from "../../utils/api";
import FilterButton from "../atoms/FilterButton";
import Cards from "../molecules/Cards";
import FilterItem from "../molecules/FilterItem";

interface Artists {
  image: string;
  name: string;
  phone: string;
  mail: string;
  city: string;
  category: string;
  description: string;
  link: string;
}

const ArtistsPageElement = () => {
  const [cardDataList, setCardDataList] = useState<Artists[]>([]);
  const [filteredData, setFilteredData] = useState<Artists[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ category: "", city: "" });

  const [artistCategories, setArtistCategories] = useState<
    { value: string; label: string }[]
  >([{ value: "", label: "Tous" }]);
  const [artistCities, setArtistCities] = useState<
    { value: string; label: string }[]
  >([{ value: "", label: "Toutes" }]);

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
          city: artist.city || "Ville inconnue",
          category: artist.category || "Genre inconnu",
          description: artist.description || "Aucune description",
          link: artist.id.toString(),
        }));

        setCardDataList(formattedData);

        const uniqueCategories = Array.from(
          new Set(formattedData.map((artist) => artist.category))
        )
          .filter((category) => category)
          .map((category) => ({ value: category, label: category }));

        setArtistCategories([
          { value: "", label: "Tous" },
          ...uniqueCategories,
        ]);

        const uniqueCities = Array.from(
          new Set(formattedData.map((artist) => artist.city))
        )
          .filter((city) => city)
          .map((city) => ({ value: city, label: city }));

        setArtistCities([{ value: "", label: "Toutes" }, ...uniqueCities]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    const filtered = cardDataList.filter((artist) => {
      const matchGenre = filters.category
        ? artist.category.toLowerCase() === filters.category.toLowerCase()
        : true;

      const matchCity = filters.city
        ? artist.city.toLowerCase() === filters.city.toLowerCase()
        : true;

      return matchGenre && matchCity;
    });

    setFilteredData(filtered);
    setIsFilterOpen(false);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="h-full pt-10 px-4 pb-8 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl absolute left-2/4 transform -translate-x-1/2">
          Artistes
        </h1>
        <div className="ml-auto pr-8">
          <FilterButton onClick={() => setIsFilterOpen(true)} />
        </div>
      </header>

      <FilterItem
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={applyFilters}
        filters={filters}
        setFilters={setFilters}
        title="Filtrer les Artistes"
        categoryLabel="Genre"
        categories={artistCategories}
        cityLabel="Ville"
        cities={artistCities}
      />

      <section className="custom-grid-section">
        {(filteredData.length > 0 ? filteredData : cardDataList).map(
          (cardData, index) => (
            <Cards
              key={index}
              {...cardData}
              type="artistes"
              id={cardData.link}
            />
          )
        )}
      </section>
    </main>
  );
};

export default ArtistsPageElement;
