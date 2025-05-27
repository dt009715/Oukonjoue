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
    <article
      className="p-4 rounded-lg shadow-md w-full max-w-md"
      aria-labelledby={`card-title-${id}`}
    >
      <img
        src="/images/imageRodia.png"
        alt={`Image de ${name}`}
        className="rounded-xl"
      />

      <header>
        <h2 id={`card-title-${id}`} className="font-bold text-lg pt-8 pb-2">
          {name}
        </h2>
      </header>

      <section className="py-2">
        <p>
          <strong className="pr-2">Téléphone :</strong>
          {phone || "Non renseigné"}
        </p>
        {type === "institutions" && (
          <p>
            <strong className="pr-2">Adresse :</strong>
            {address || "Non renseignée"}
          </p>
        )}
      </section>

      <footer className="mt-4 text-center">
        <div className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300">
          <TextButton onClick={handleClick}>En Savoir Plus</TextButton>
        </div>
      </footer>
    </article>
  );
};

export default Cards;
