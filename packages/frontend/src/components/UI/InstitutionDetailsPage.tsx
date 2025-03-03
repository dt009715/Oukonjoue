import ArtistDetailElement from "../organisms/ArtistDetailElement";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";

const InstitutionDetailsPage = () => {
  return (
    <div>
      <div className="bg-background h-full">
        <Header />
        <ArtistDetailElement artistId={Number(id)} />
        <Footer />
      </div>
    </div>
  );
};

export default InstitutionDetailsPage;
