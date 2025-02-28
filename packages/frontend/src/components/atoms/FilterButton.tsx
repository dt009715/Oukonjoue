interface FilterButtonProps {
  onClick: () => void;
}

const FilterButton = ({ onClick }: FilterButtonProps) => {
  return (
    <button
      className="bg-cardGrey font-semibold rounded-lg px-2 "
      onClick={onClick}
    >
      Filtres
    </button>
  );
};

export default FilterButton;
