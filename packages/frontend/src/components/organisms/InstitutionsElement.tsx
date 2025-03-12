import React, { useEffect, useState } from "react";
import { getInstitutions } from "../../utils/api";
import FilterButton from "../atoms/FilterButton";
import Cards from "../molecules/Cards";
import FilterItem from "../molecules/FilterItem";

interface Institution {
  image: string;
  name: string;
  phone: string;
  city: string;
  mail: string;
  address: string;
  category: string;
  description: string;
  link: string;
}

const InstitutionElement: React.FC = () => {
  const [cardDataList, setCardDataList] = useState<Institution[]>([]);
  const [filteredData, setFilteredData] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    city: "",
  });

  const [institutionCities, setInstitutionCities] = useState<
    { value: string; label: string }[]
  >([{ value: "", label: "Toutes" }]);

  const [institutionCategories, setInstitutionCategories] = useState<
    { value: string; label: string }[]
  >([{ value: "", label: "Tous" }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInstitutions();

        if (!Array.isArray(data)) {
          throw new Error("Les données récupérées ne sont pas un tableau !");
        }

        const formattedData: Institution[] = data.map((institution) => ({
          image: institution.image || "",
          name: institution.name || "Nom inconnu",
          phone: institution.phone || "Non disponible",
          mail: institution.mail || "Non disponible",
          address: institution.address || "Adresse inconnue",
          category: institution.category || "Genre inconnu",
          city: institution.city,
          description: institution.description || "Aucune description",
          link: institution.id?.toString() || "#",
        }));

        setCardDataList(formattedData);
        setFilteredData(formattedData);

        const uniqueCities = Array.from(
          new Set(
            formattedData.map((inst) => inst.address.toLowerCase().trim())
          )
        ).map((city) => ({
          value: city,
          label: city.charAt(0).toUpperCase() + city.slice(1),
        }));

        const uniqueCategories = Array.from(
          new Set(
            formattedData.map((inst) => inst.category.toLowerCase().trim())
          )
        ).map((category) => ({
          value: category,
          label: category.charAt(0).toUpperCase() + category.slice(1),
        }));

        setInstitutionCities([{ value: "", label: "Toutes" }, ...uniqueCities]);
        setInstitutionCategories([
          { value: "", label: "Tous" },
          ...uniqueCategories,
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    const filtered = cardDataList.filter((institution) => {
      const matchGenre = filters.category
        ? institution.category.toLowerCase() === filters.category.toLowerCase()
        : true;

      const matchCity = filters.city
        ? institution.city.toLowerCase().includes(filters.city.toLowerCase())
        : true;

      return matchGenre && matchCity;
    });

    setFilteredData(filtered);
    setIsFilterOpen(false);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <div className="relative flex w-full pt-10 items-center justify-between pb-8">
        <h1 className="font-semibold text-3xl absolute left-1/2 transform -translate-x-1/2">
          Institutions
        </h1>

        <div className="ml-auto pr-8">
          <FilterButton onClick={() => setIsFilterOpen(true)} />
        </div>
      </div>

      <FilterItem
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={applyFilters}
        filters={filters}
        setFilters={setFilters}
        title="Filtrer les Institutions"
        categoryLabel="Genre"
        categories={institutionCategories}
        cityLabel="Ville"
        cities={institutionCities}
      />

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 upLg:grid-cols-4 gap-6 px-4">
        {filteredData.map((cardData, index) => (
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
