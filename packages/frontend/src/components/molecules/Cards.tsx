import { useNavigate } from "react-router-dom";
import TextButton from "../atoms/TextButton";

interface InfoCardProps {
  id: string;
  type: "artistes" | "institutions";
  name: string;
  phone?: string;
  mail?: string;
  address?: string;
  genre?: string;
  description?: string;
}

const Cards = ({
  id,
  type,
  name,
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
      <h2 className="font-bold text-lg pt-8 pb-2">{name}</h2>
      <p className="py-2">
        <strong className="pr-2">Téléphone :</strong>
        {phone}
      </p>
      {type === "institutions" && (
        <p className="py-2">
          <strong className="pr-2">Adresse :</strong>{" "}
          {address || "Non renseignée"}
        </p>
      )}
      <div className="mt-4 block text-center px-4 py-2 text-gray-600 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 ">
        <TextButton onClick={handleClick}> En Savoir Plus</TextButton>
      </div>
    </div>
  );
};

export default Cards;
