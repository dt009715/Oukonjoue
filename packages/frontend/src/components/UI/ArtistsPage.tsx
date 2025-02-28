import ArtistsPageElement from "../organisms/ArtistsPageElement";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";

const ArtistsPage = () => {
  return (
    <div className="bg-background">
      <Header />
      <ArtistsPageElement />
      <Footer />
    </div>
  );
};

export default ArtistsPage;
