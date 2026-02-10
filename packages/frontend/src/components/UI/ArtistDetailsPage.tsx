import { useParams } from "react-router-dom";
import ArtistDetailElement from "../organisms/ArtistDetailElement";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";

const ArtistDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Identifiant invalide.</div>;
  }

  return (
    <div>
      <div className="bg-background h-full">
        <Header />
        <ArtistDetailElement artistId={id} />
        <Footer />
      </div>
    </div>
  );
};

export default ArtistDetailsPage;
