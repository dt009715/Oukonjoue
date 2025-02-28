import FilterButton from "../atoms/FilterButton";
import Cards from "../molecules/Cards";

const InstitutionsElement = () => {
  const cardData = {
    name: "La rodia",
    phone: "0782676596",
    address: "13 rue des fluttes agasses",
    genre: "black metal",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only",
    link: "",
  };
  return (
    <div>
      <div className="relative flex w-full pt-10 items-center justify-between pb-6">
        <h1 className="font-semibold text-3xl absolute left-1/2 transform -translate-x-1/2">
          Institutions
        </h1>

        <div className="ml-auto pr-8">
          <FilterButton onClick={() => {}} />
        </div>
      </div>
      <div className="flex gap-10">
        {[...Array(3)].map((_, index) => (
          <Cards key={index} {...cardData} />
        ))}
      </div>
    </div>
  );
};

export default InstitutionsElement;
