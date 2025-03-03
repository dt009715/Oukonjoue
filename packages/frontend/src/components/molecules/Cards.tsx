import { useNavigate } from "react-router-dom";
import TextButton from "../atoms/TextButton";

interface InfoCardProps {
  id: string;
  type: "artistes" | "institutions";
  title: string;
  phone?: string;
  mail?: string;
  address?: string;
  genre?: string;
  description?: string;
}

const Cards = ({
  id,
  type,
  title,
  phone,
  address,
  genre,
  description,
  mail,
}: InfoCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${type}/${id}`);
  };

  return (
    <div className="p-4 rounded-lg shadow-md w-full max-w-md">
      <img src="/images/imageRodia.png" alt="test" />
      <h2 className="font-bold text-lg pt-8 pb-2">{title}</h2>
      <p className="py-2">
        <strong className="pr-2">Téléphone :</strong>
        {phone}
      </p>
      <p className="py-2">
        <strong className="pr-2">Adresse :</strong> {address}
      </p>
      <p className="py-2">
        <strong className="pr-2">Mail :</strong> {mail}
      </p>
      {genre && (
        <p className="py-2">
          <strong className="pr-2">Genre musical :</strong> {genre}
        </p>
      )}
      <p className="text-justify text-gray-600 pt-2 pb-3">
        <strong className="pr-2">Description :</strong>
        {description}
      </p>
      <div className="mt-4 block text-center px-4 py-2 text-gray-600 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 ">
        <TextButton onClick={handleClick}> En Savoir Plus</TextButton>
      </div>
    </div>
  );
};

export default Cards;
