interface FilterItemProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  filters: {
    category: string;
    city: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{ category: string; city: string }>
  >;
  title: string;
  categoryLabel: string;
  categories: { value: string; label: string }[];
  cityLabel: string;
  cities: { value: string; label: string }[];
}

const FilterItem: React.FC<FilterItemProps> = ({
  isOpen,
  onClose,
  onApply,
  filters,
  setFilters,
  title,
  categoryLabel,
  categories,
  cityLabel,
  cities,
}) => {
  if (!isOpen) return null;

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-dialog-title"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white w-11/12 sm:w-2/3 md:w-1/2 upLg:w-1/3 p-6 rounded-lg shadow-lg relative">
        <header>
          <h2 id="filter-dialog-title" className="text-xl font-semibold mb-4">
            {title}
          </h2>
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
            onClick={onClose}
            aria-label="Fermer la fenêtre des filtres"
          >
            ✕
          </button>
        </header>

        <form>
          <fieldset className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-1"
              >
                {categoryLabel}
              </label>
              <select
                id="category"
                className="w-full border p-2 rounded"
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1">
                {cityLabel}
              </label>
              <select
                id="city"
                className="w-full border p-2 rounded"
                value={filters.city}
                onChange={(e) =>
                  setFilters({ ...filters, city: e.target.value })
                }
              >
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          <footer className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Annuler
            </button>

            <button
              type="button"
              onClick={onApply}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Appliquer
            </button>
          </footer>
        </form>
      </div>
    </section>
  );
};

export default FilterItem;
