import TextButton from "../atoms/TextButton";

interface InfoCardProps {
  name: string;
  phone: string;
  address: string;
  genre: string;
  description: string;
  link: string;
}

const Cards = ({
  name,
  phone,
  address,
  genre,
  description,
  link,
}: InfoCardProps) => {
  return (
    <div className=" p-4 rounded-lg shadow-md w-full max-w-md">
      <img src="/images/imageRodia.png" alt="test"></img>
      <h2 className="font-bold text-lg pt-8">{name}</h2>
      <p className="py-2">
        <strong>Téléphone :</strong>
        {phone}
      </p>
      <p className="py-2">
        <strong>Adresse :</strong> {address}
      </p>
      <p className="py-2">
        <strong>Genre musical préféré :</strong> {genre}
      </p>
      <p className="text-justify text-gray-600 pt-2 pb-3">
        <strong>Description :</strong>
        {description}
      </p>
      <div className="flex justify-center">
        <TextButton href=""> En Savoir Plus</TextButton>
      </div>
    </div>
  );
};

export default Cards;
