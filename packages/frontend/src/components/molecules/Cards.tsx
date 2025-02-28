import TextButton from "../atoms/TextButton";

interface InfoCardProps {
  title: string;
  phone?: string;
  mail?: string;
  address?: string;
  genre?: string;
  description?: string;
  link?: string;
}

const Cards = ({
  title,
  phone,
  address,
  genre,
  description,
  link,
  mail,
}: InfoCardProps) => {
  return (
    <div className=" p-4 rounded-lg shadow-md w-full max-w-md">
      <img src="/images/imageRodia.png" alt="test"></img>
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
      <p className="py-2">
        <strong className="pr-2">Genre musical préféré :</strong> {genre}
      </p>
      <p className="text-justify text-gray-600 pt-2 pb-3">
        <strong className="pr-2">Description :</strong>
        {description}
      </p>
      <div className="mt-4 block text-center px-4 py-2 text-gray-600 bg-gray-200 rounded-lg shadow-[4px_4px_8px_#babecc,-4px_-4px_8px_#ffffff] hover:bg-gray-300">
        <TextButton onClick={() => {}}> En Savoir Plus</TextButton>
      </div>
    </div>
  );
};

export default Cards;
