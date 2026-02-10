import { useParams } from "react-router-dom";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import InstitutionDetailElement from "../organisms/InstitutionsDetailElement";

const InstitutionDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Identifiant invalide.</div>;
  }

  return (
    <div>
      <div className="bg-background h-full">
        <Header />
        <InstitutionDetailElement institutionId={id} />
        <Footer />
      </div>
    </div>
  );
};

export default InstitutionDetailsPage;
