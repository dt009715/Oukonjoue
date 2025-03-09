import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import InstitutionsElement from "../organisms/InstitutionsElement";

const Institutions = () => {
  return (
    <div className="bg-background flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <InstitutionsElement />
      </div>
      <Footer />
    </div>
  );
};

export default Institutions;
