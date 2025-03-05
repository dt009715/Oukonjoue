import { useParams } from "react-router-dom";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import InstitutionDetailElement from "../organisms/InstitutionsDetailElement";

const InstitutionDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <div className="bg-background h-full">
        <Header />
        <InstitutionDetailElement institutionId={Number(id)} />
        <Footer />
      </div>
    </div>
  );
};

export default InstitutionDetailsPage;
