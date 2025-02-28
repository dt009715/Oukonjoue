import FilterButton from "../atoms/FilterButton";
import Cards from "../molecules/Cards";

const ArtistsPageElement = () => {
  const cardDataList = [
    {
      image: "image1.jpg",
      title: "La Rodia",
      phone: "03 81 87 86 00",
      mail: "blabla@test.fr",
      address: "4 Av. de Chardonnet, 25000 Besançon",
      genre: "Tout genre",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      link: "",
    },
    {
      image: "image2.jpg",
      title: "La Rodia",
      phone: "03 81 87 86 00",
      mail: "blabla@test.fr",
      address: "4 Av. de Chardonnet, 25000 Besançon",
      genre: "Tout genre",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      link: "",
    },
    {
      image: "image3.jpg",
      title: "La Rodia",
      phone: "03 81 87 86 00",
      mail: "blabla@test.fr",
      address: "4 Av. de Chardonnet, 25000 Besançon",
      genre: "Tout genre",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      link: "",
    },
  ];
  return (
    <div>
      <div>
        <div className="relative flex w-full pt-10 items-center justify-between pb-8">
          <h1 className="font-semibold text-3xl absolute left-1/2 transform -translate-x-1/2">
            Artistes
          </h1>

          <div className="ml-auto pr-8">
            <FilterButton onClick={() => {}} />
          </div>
        </div>
        <div className="flex justify-center  gap-10 ">
          {cardDataList.map((cardData, index) => (
            <Cards key={index} {...cardData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistsPageElement;
