import ArtistsPageElement from "../organisms/ArtistsPageElement";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";

const ArtistsPage = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <ArtistsPageElement />
      </div>
      <Footer />
    </div>
  );
};

export default ArtistsPage;
