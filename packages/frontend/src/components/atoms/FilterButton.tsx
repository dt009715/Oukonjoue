interface FilterButtonProps {
  onClick: () => void;
}

const FilterButton = ({ onClick }: FilterButtonProps) => {
  return (
    <button
      className="bg-cardGrey font-semibold rounded-lg px-3 justify-center py-1 "
      onClick={onClick}
    >
      Filtres
    </button>
  );
};

export default FilterButton;
