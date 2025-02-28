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
    <div className="bg-background   rounded-2xl shadow-lg shadow-gray-300 p-6 w-full max-w-sm transition-all hover:shadow-xl">
      <img
        src="/images/imageRodia.png"
        alt={title}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h2 className="font-bold text-lg text-gray-800">{title}</h2>
      <p className="text-gray-600">
        <strong>Téléphone :</strong> {phone}
      </p>
      <p className="text-gray-600">
        <strong>Mail :</strong> {mail}
      </p>
      <p className="text-gray-600">
        <strong>Adresse :</strong> {address}
      </p>
      <p className="text-gray-600">
        <strong>Genre :</strong> {genre}
      </p>
      <p className="text-gray-500 mt-2">{description}</p>
      <a
        href={link}
        className="mt-4 block text-center px-2 py-2 text-gray-600 rounded-lg shadow-md "
      >
        En Savoir Plus
      </a>
    </div>
  );
};

export default Cards;
